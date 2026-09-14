"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { FEEDBACK_ENDPOINT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a few words")
    .max(2000, "Message is too long (max 2000 characters)"),
  botcheck: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

export function FeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "", botcheck: "" },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.botcheck) return;
    setStatus("submitting");
    setServerError(null);

    if (!FEEDBACK_ENDPOINT) {
      setStatus("error");
      setServerError(
        "The feedback form isn't configured yet. Please use WhatsApp or email in the meantime."
      );
      return;
    }

    try {
      await fetch(FEEDBACK_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      });

      trackEvent("contact_submit", { form: "feedback" });
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError(
        "Couldn't reach the server. Check your connection and try again."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold-500/30 bg-white p-8 text-center sm:p-10">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
          <CheckCircle2 className="h-7 w-7" strokeWidth={1.75} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-navy-900">
          Thank you for your feedback
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-gray-500">
          Your message has been received. We appreciate you taking the time to
          share your thoughts.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline-navy mt-7"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-card-rest sm:p-8"
    >
      <input
        type="checkbox"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("botcheck")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="e.g. Ahmed Khan"
            className={cn("input-field", errors.name && fieldErrorClass)}
            {...register("name")}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn("input-field", errors.email && fieldErrorClass)}
            {...register("email")}
          />
        </Field>
      </div>

      <Field label="Your feedback" error={errors.message?.message} className="mt-5">
        <textarea
          rows={5}
          placeholder="Share your experience, suggestions, or any questions…"
          className={cn(
            "input-field min-h-[8rem] resize-y",
            errors.message && fieldErrorClass
          )}
          {...register("message")}
        />
      </Field>

      {status === "error" && serverError && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary mt-6 w-full justify-center sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
            Sending…
          </>
        ) : (
          <>
            Send feedback
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  );
}

const fieldErrorClass =
  "border-red-300 focus:border-red-400 focus:ring-red-400/20";

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="label-mini">{label}</span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs text-red-600">{error}</span>
      )}
    </label>
  );
}
