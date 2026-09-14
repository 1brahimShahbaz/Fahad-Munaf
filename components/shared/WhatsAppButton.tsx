"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Props = {
  message?: string;
  context?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function WhatsAppButton({
  message,
  context = "generic",
  children,
  className,
  size = "md",
}: Props) {
  const padding =
    size === "sm"
      ? "px-4 py-2 text-sm"
      : size === "lg"
        ? "px-7 py-3.5 text-base"
        : "px-6 py-3 text-[15px]";
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { context })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp font-inter font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-200 hover:-translate-y-0.5",
        padding,
        className
      )}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={2} fill="white" />
      {children ?? "Chat on WhatsApp"}
    </a>
  );
}
