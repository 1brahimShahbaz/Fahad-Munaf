"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders the contact email as a `mailto:` link that is assembled in the
 * browser after hydration. The address never appears in the static HTML that
 * ships to the client, so spam harvesters that scrape page source don't see it,
 * while real users still get a normal clickable link.
 */
const USER = "hi.fahadmunafparekh";
const DOMAIN = "gmail.com";

type Props = {
  className?: string;
  /** Prefix content rendered inside the link (e.g. an icon). */
  children?: ReactNode;
  /** Show the address itself as the text (default). If false, `label` is shown. */
  showAddress?: boolean;
  /** Visible text before hydration, and the link text when `showAddress` is false. */
  label?: string;
};

export function ObfuscatedEmail({
  className,
  children,
  showAddress = true,
  label = "Email us",
}: Props) {
  const [addr, setAddr] = useState<string | null>(null);

  useEffect(() => {
    setAddr(`${USER}@${DOMAIN}`);
  }, []);

  const text = showAddress ? (addr ?? label) : label;

  if (!addr) {
    return (
      <span className={className}>
        {children}
        {text}
      </span>
    );
  }

  return (
    <a href={`mailto:${addr}`} className={className}>
      {children}
      {text}
    </a>
  );
}
