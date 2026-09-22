"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

/** Contact-card email, assembled client-side so the raw address is never in the static HTML. */
export function ContactEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const [user, domain] = SITE.email.split("@");
    setEmail(`${user}@${domain}`);
  }, []);

  return (
    <>
      <p className="mt-1.5 font-fraunces text-[20px] font-semibold text-navy-900">
        {email ?? "Email us"}
      </p>
      {email ? (
        <a
          href={`mailto:${email}`}
          className="mt-3 inline-block text-sm font-medium text-navy-900 hover:text-navy-500"
        >
          Send an email →
        </a>
      ) : (
        <span className="mt-3 inline-block text-sm font-medium text-navy-900">
          Send an email →
        </span>
      )}
    </>
  );
}
