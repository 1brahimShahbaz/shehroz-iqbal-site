export type Affiliation = {
  name: string;
  logoSrc: string;
  href?: string;
  /** Short role/relationship label shown on the affiliation card. */
  role?: string;
  /** Visual scale multiplier to normalize logos with different inherent paddings. Default = 1. */
  scale?: number;
};

export const affiliations: Affiliation[] = [
  {
    name: "Kashan's Academy",
    logoSrc: "/images/kashans-academy.png",
    href: "https://www.facebook.com/KashansAcademy/",
    scale: 1.15,
  },
  {
    name: "Alpha College",
    logoSrc: "/images/alpha-college.png",
    href: "https://college.alpha.edu.pk/",
    scale: 1.28,
  },
  {
    name: "Orb-Ed",
    logoSrc: "/images/orbed.png",
    href: "https://orb-ed.pk/",
    scale: 1.12,
  },
];

