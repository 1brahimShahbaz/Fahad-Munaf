"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = {
  id: string;
  text: string;
};

export function TOC({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block">
      <p className="text-[11px] font-semibold uppercase tracking-wider2 text-gold-500">
        In This Article
      </p>
      <ul className="mt-4 space-y-2 border-l border-gray-200">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block border-l-2 -ml-px py-1 pl-4 text-[14px] transition-colors",
                active === h.id
                  ? "border-gold-500 font-semibold text-gold-500"
                  : "border-transparent text-gray-500 hover:text-navy-900"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
