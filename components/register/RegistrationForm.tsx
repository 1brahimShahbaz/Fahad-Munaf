"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  REGISTER_GRADES,
  REGISTRATION_ENDPOINT,
} from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  grade: z.enum(REGISTER_GRADES, {
    message: "Please select your grade",
  }),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .regex(/^[+\d][\d\s()-]{6,}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email address"),
  // Honeypot — humans leave this empty; bots tend to fill it.
  botcheck: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

export function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      botcheck: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.botcheck) return; // bot caught
    setStatus("submitting");
    setServerError(null);

    if (!REGISTRATION_ENDPOINT) {
      setStatus("error");
      setServerError(
        "The form isn't fully configured yet. Please contact us on WhatsApp in the meantime."
      );
      return;
    }

    try {
      // Posted to a Google Apps Script Web App, which doesn't return CORS
      // headers — use no-cors + text/plain (a "simple" request, no preflight).
      // The response is opaque, so a resolved fetch is treated as success.
      await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          grade: values.grade,
          phone: values.phone,
          email: values.email,
        }),
      });

      trackEvent("register_submit", { level: values.grade });
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
          Registration received
        </h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-gray-500">
          Thank you for registering. Sir Fahad&rsquo;s team will get back to you
          shortly with the next steps.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-secondary mt-7"
        >
          Submit another response
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
      {/* Honeypot — visually hidden, off-screen, not announced to AT */}
      <input
        type="checkbox"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        {...register("botcheck")}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First name" error={errors.firstName?.message}>
          <input
            type="text"
            autoComplete="given-name"
            placeholder="e.g. Ahmed"
            className={cn("input-field", errors.firstName && fieldErrorClass)}
            {...register("firstName")}
          />
        </Field>

        <Field label="Last name" error={errors.lastName?.message}>
          <input
            type="text"
            autoComplete="family-name"
            placeholder="e.g. Khan"
            className={cn("input-field", errors.lastName && fieldErrorClass)}
            {...register("lastName")}
          />
        </Field>

        <Field label="Grade" error={errors.grade?.message}>
          <select
            defaultValue=""
            className={cn("input-field appearance-none", errors.grade && fieldErrorClass)}
            {...register("grade")}
          >
            <option value="" disabled>
              Select your grade
            </option>
            {REGISTER_GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Phone number" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="e.g. +92 300 1234567"
            className={cn("input-field", errors.phone && fieldErrorClass)}
            {...register("phone")}
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
            Submitting…
          </>
        ) : (
          <>
            Submit registration
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-gray-500">
        Your details are sent privately to Sir Fahad&rsquo;s team and are never
        shared. By submitting, you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}

const fieldErrorClass =
  "border-red-300 focus:border-red-400 focus:ring-red-400/20";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-mini">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
