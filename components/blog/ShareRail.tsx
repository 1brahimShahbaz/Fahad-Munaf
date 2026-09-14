"use client";

import { Copy, MessageCircle } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { whatsappShareLink } from "@/lib/constants";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
  </svg>
);
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

type Props = {
  title: string;
  slug: string;
};

export function ShareRail({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      trackEvent("blog_share", { channel: "copy", slug });
    } catch {}
  };

  const links = [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: whatsappShareLink(`${title} ${url}`),
      bg: "bg-whatsapp",
      channel: "whatsapp",
    },
    {
      label: "Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      bg: "bg-navy-900",
      channel: "facebook",
    },
    {
      label: "X / Twitter",
      icon: TwitterIcon,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      bg: "bg-ink-900",
      channel: "twitter",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider2 text-gray-500">
        Share
      </p>
      <div className="flex flex-row items-center gap-2 lg:flex-col">
        {links.map(({ label, icon: Icon, href, bg, channel }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            onClick={() => trackEvent("blog_share", { channel, slug })}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:-translate-y-0.5 ${bg}`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </a>
        ))}
        <button
          onClick={onCopy}
          aria-label="Copy link"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-navy-900 transition-transform hover:-translate-y-0.5"
        >
          <Copy className="h-4 w-4" strokeWidth={2} />
          {copied && (
            <span className="absolute left-12 whitespace-nowrap rounded-md bg-navy-900 px-2 py-1 text-[11px] font-semibold text-white">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
