"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import StaggeredMenu, {
  type StaggeredMenuItem,
} from "@/components/shared/StaggeredMenu";
import { CTA_LABELS, NAV_ITEMS, SITE } from "@/lib/constants";

function buildMenuItems(): StaggeredMenuItem[] {
  const items: StaggeredMenuItem[] = [];

  for (const item of NAV_ITEMS) {
    if (item.children) {
      for (const child of item.children) {
        items.push({
          label: child.label,
          link: child.href,
          ariaLabel: `Go to ${child.label} Accounting course`,
        });
      }
    } else {
      items.push({
        label: item.label,
        link: item.href,
        ariaLabel: `Go to ${item.label}`,
      });
    }
  }

  items.push({
    label: "Enroll",
    link: "/register",
    ariaLabel: CTA_LABELS.enrollInterest,
  });

  return items;
}

const socialItems = [
  { label: "Facebook", link: SITE.socials.facebook },
  { label: "Instagram", link: SITE.socials.instagram },
  { label: "YouTube", link: SITE.socials.youtube },
  { label: "Orb-Ed", link: SITE.socials.whatsapp },
];

export function MobileStaggeredNav() {
  const pathname = usePathname();
  const menuItems = useMemo(() => buildMenuItems(), []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <StaggeredMenu
      className="site-mobile-menu"
      isFixed
      hideLogo
      simpleToggleIcon
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      colors={["#0A2740", "#12466E", "#DC2626"]}
      accentColor="#DC2626"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen={false}
      routePath={pathname}
      onMenuOpen={() => {
        document.body.style.overflow = "hidden";
      }}
      onMenuClose={() => {
        document.body.style.overflow = "";
      }}
    />
  );
}
