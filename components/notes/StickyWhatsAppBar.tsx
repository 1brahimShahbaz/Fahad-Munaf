"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function StickyWhatsAppBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-40 w-full transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="bg-navy-900 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.15)]">
        <div className="container-x flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <MessageCircle
              className="h-5 w-5 text-whatsapp"
              fill="currentColor"
              strokeWidth={0}
            />
            <p className="hidden text-[14px] font-medium sm:block">
              Want the full pack? Message me on WhatsApp
            </p>
            <p className="text-[13px] font-medium sm:hidden">
              Full notes pack on WhatsApp
            </p>
          </div>
          <a
            href={whatsappLink(
              "Hi Sir Fahad, I'd like the full notes pack."
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("whatsapp_click", { context: "notes_sticky_bar" })
            }
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-[13px] font-semibold text-white"
          >
            Chat now
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  );
}
