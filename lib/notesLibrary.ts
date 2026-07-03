import fs from "fs";
import path from "path";
import type {
  NoteFile,
  NoteGroup,
  NoteLevel,
  NoteResource,
  NotesLibraryData,
  YearlyPaperGroup,
} from "./notesTypes";

export type {
  NoteFile,
  NoteGroup,
  NoteLevel,
  NoteResource,
  NotesLibraryData,
  YearlyPaperGroup,
} from "./notesTypes";
export { countNoteFiles } from "./notesTypes";

const NOTES_ROOT = path.join(process.cwd(), "public", "notes");

const LEVEL_FOLDERS: Record<NoteLevel, string> = {
  AS: "As level",
  A2: "A2 lEVEL",
  O: "olevel",
};

function isYearlyRootFolder(name: string): boolean {
  return /Paper.*Yearly/i.test(name);
}

function isStudyRootFolder(name: string): boolean {
  return (
    /Micro PDF/i.test(name) ||
    /Macro PDF/i.test(name) ||
    /9_ Notes/i.test(name)
  );
}

function toPublicSrc(fileAbs: string): string {
  const fromPublic = path.relative(path.join(process.cwd(), "public"), fileAbs);
  const posix = fromPublic.replace(/\\/g, "/");
  const segments = posix.split("/").filter(Boolean);
  return "/" + segments.map((s) => encodeURIComponent(s)).join("/");
}

function stableId(relPosix: string) {
  return relPosix
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

function sortByLeadingNumber(a: string, b: string) {
  const na = parseInt(a.match(/^(\d+)/)?.[1] ?? "99999", 10);
  const nb = parseInt(b.match(/^(\d+)/)?.[1] ?? "99999", 10);
  if (na !== nb) return na - nb;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function cleanLabel(name: string): string {
  return name
    .replace(/^\d+\.\s*\d+\s*-\s*/, "")
    .replace(/^\d+\.\s*/, "")
    .replace(/_/g, " ")
    .trim();
}

function titleFromPdf(filename: string): string {
  return filename.replace(/\.pdf$/i, "").replace(/_/g, " ").trim();
}

function extractYear(folderName: string): string {
  const match = folderName.match(/\b(19|20)\d{2}\b/);
  return match ? match[0] : cleanLabel(folderName);
}

function collectPdfsRecursive(dirAbs: string, relPosix: string, out: NoteFile[]) {
  if (!fs.existsSync(dirAbs)) return;
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  } catch {
    return;
  }

  const sorted = entries.sort((a, b) => sortByLeadingNumber(a.name, b.name));

  for (const ent of sorted) {
    const full = path.join(dirAbs, ent.name);
    const rel = relPosix ? `${relPosix}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      collectPdfsRecursive(full, rel, out);
    } else if (ent.isFile() && /\.pdf$/i.test(ent.name)) {
      out.push({
        id: stableId(rel),
        title: titleFromPdf(ent.name),
        file: toPublicSrc(full),
      });
    }
  }
}

function buildGroupFromDir(dirAbs: string, relPosix: string): NoteGroup | null {
  if (!fs.existsSync(dirAbs)) return null;

  const files: NoteFile[] = [];
  const groups: NoteGroup[] = [];

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  } catch {
    return null;
  }

  const sorted = entries.sort((a, b) => sortByLeadingNumber(a.name, b.name));

  for (const ent of sorted) {
    const full = path.join(dirAbs, ent.name);
    const rel = relPosix ? `${relPosix}/${ent.name}` : ent.name;
    if (ent.isDirectory()) {
      const child = buildGroupFromDir(full, rel);
      if (child && (child.files.length > 0 || child.groups.length > 0)) {
        groups.push(child);
      }
    } else if (ent.isFile() && /\.pdf$/i.test(ent.name)) {
      files.push({
        id: stableId(rel),
        title: titleFromPdf(ent.name),
        file: toPublicSrc(full),
      });
    }
  }

  if (files.length === 0 && groups.length === 0) return null;

  return {
    id: stableId(relPosix || path.basename(dirAbs)),
    title: cleanLabel(path.basename(dirAbs)),
    files,
    groups,
  };
}

function buildYearlyGroups(yearlyRootAbs: string, relRoot: string): YearlyPaperGroup[] {
  if (!fs.existsSync(yearlyRootAbs)) return [];

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(yearlyRootAbs, { withFileTypes: true });
  } catch {
    return [];
  }

  const years: YearlyPaperGroup[] = [];

  const yearDirs = entries
    .filter((e) => e.isDirectory())
    .sort((a, b) => sortByLeadingNumber(a.name, b.name));

  for (const yearDir of yearDirs) {
    const yearAbs = path.join(yearlyRootAbs, yearDir.name);
    const rel = `${relRoot}/${yearDir.name}`;
    const papers: NoteFile[] = [];
    collectPdfsRecursive(yearAbs, rel, papers);
    if (papers.length === 0) continue;

    papers.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

    years.push({
      id: stableId(rel),
      year: extractYear(yearDir.name),
      papers,
    });
  }

  years.sort((a, b) => {
    const ya = parseInt(a.year, 10) || 0;
    const yb = parseInt(b.year, 10) || 0;
    return yb - ya;
  });

  return years;
}

function scanLevel(level: NoteLevel) {
  const studyNotes: NoteGroup[] = [];
  const yearlyPapers: YearlyPaperGroup[] = [];
  const levelAbs = path.join(NOTES_ROOT, LEVEL_FOLDERS[level]);

  if (!fs.existsSync(levelAbs)) {
    return { studyNotes, yearlyPapers };
  }

  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(levelAbs, { withFileTypes: true });
  } catch {
    return { studyNotes, yearlyPapers };
  }

  const sorted = entries.sort((a, b) => sortByLeadingNumber(a.name, b.name));

  for (const ent of sorted) {
    if (!ent.isDirectory()) continue;
    const full = path.join(levelAbs, ent.name);
    const rel = `${LEVEL_FOLDERS[level]}/${ent.name}`;

    if (isYearlyRootFolder(ent.name)) {
      yearlyPapers.push(...buildYearlyGroups(full, rel));
    } else if (isStudyRootFolder(ent.name)) {
      const group = buildGroupFromDir(full, rel);
      if (group) studyNotes.push(group);
    }
  }

  return { studyNotes, yearlyPapers };
}

/** Scans `public/notes/` for study notes and yearly past papers. */
export function getNotesLibraryData(): NotesLibraryData {
  const levels: NoteLevel[] = ["AS", "A2", "O"];
  const studyNotes = {} as Record<NoteLevel, NoteGroup[]>;
  const yearlyPapers = {} as Record<NoteLevel, YearlyPaperGroup[]>;

  for (const level of levels) {
    const scanned = scanLevel(level);
    studyNotes[level] = scanned.studyNotes;
    yearlyPapers[level] = scanned.yearlyPapers;
  }

  return { studyNotes, yearlyPapers };
}

function firstPdfInTree(group: NoteGroup): NoteFile | undefined {
  if (group.files.length > 0) return group.files[0];
  for (const child of group.groups) {
    const found = firstPdfInTree(child);
    if (found) return found;
  }
  return undefined;
}

function findNineNotesPack(groups: NoteGroup[]): NoteGroup | undefined {
  return groups.find((g) => /9[_\s-]*notes/i.test(g.title));
}

/** One featured note per level for the home page (from consolidated 9_ Notes packs). */
export function getSampleNotesForHome(): NoteResource[] {
  const { studyNotes } = getNotesLibraryData();
  const samples: NoteResource[] = [];

  for (const level of ["AS", "A2", "O"] as NoteLevel[]) {
    const groups = studyNotes[level];
    const ninePack = findNineNotesPack(groups);
    const first =
      (ninePack && firstPdfInTree(ninePack)) ??
      groups.map((g) => firstPdfInTree(g)).find(Boolean);

    if (first) {
      samples.push({ ...first, level });
    }
  }

  return samples;
}

