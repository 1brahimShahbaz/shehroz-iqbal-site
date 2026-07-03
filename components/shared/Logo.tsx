import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "light" | "dark";
  withSubline?: boolean;
  size?: "sm" | "md" | "header" | "lg";
  /** Show logo file as-is (no color filter) */
  natural?: boolean;
  /** Gold tint + scale up on hover (header) */
  interactive?: boolean;
  className?: string;
};

const SIZE_CLASSES: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "h-10 w-auto sm:h-11",
  header: "h-12 w-auto sm:h-14 lg:h-16",
  md: "h-14 w-auto lg:h-20",
  lg: "h-24 w-auto sm:h-28 lg:h-32",
};

export function Logo({
  variant = "dark",
  size = "md",
  natural = false,
  interactive = false,
  className,
}: LogoProps) {
  // Logo is a full-colour mark that reads on both light and dark backgrounds,
  // so it is always rendered natural (no tint filter). `variant`/`natural`
  // are kept for API compatibility with existing call sites.
  void variant;
  void natural;
  void interactive;

  return (
    <Link
      href="/"
      aria-label="Shehroz Iqbal — Home"
      className={cn(
        "logo-link group relative inline-flex shrink-0 items-center",
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt="Shehroz Iqbal"
        width={240}
        height={240}
        priority
        loading="eager"
        sizes={
          size === "header"
            ? "(min-width: 1024px) 160px, (min-width: 640px) 120px, 88px"
            : "(min-width: 1024px) 120px, (min-width: 640px) 96px, 72px"
        }
        className={cn(SIZE_CLASSES[size], "logo-mark")}
      />
    </Link>
  );
}
