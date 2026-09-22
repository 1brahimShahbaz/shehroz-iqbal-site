"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { SITE } from "@/lib/constants";

/**
 * Renders the contact email client-side only, so the raw address never appears
 * in the static HTML (defeats spam scrapers that read page source). Before
 * hydration it shows a neutral "Email us" label.
 */
export function ObfuscatedEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const [user, domain] = SITE.email.split("@");
    setEmail(`${user}@${domain}`);
  }, []);

  const icon = (
    <Mail
      className="mt-0.5 h-4 w-4 shrink-0 text-gold-500"
      strokeWidth={2}
      aria-hidden
    />
  );

  if (!email) {
    return (
      <span className="footer-link inline-flex items-start gap-2.5">
        {icon}
        Email us
      </span>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      className="footer-link inline-flex items-start gap-2.5"
    >
      {icon}
      {email}
    </a>
  );
}
