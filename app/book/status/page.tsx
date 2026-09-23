import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = {
  title: "Appointment Status",
  description: "Check the status of your appointment with Dr. Rohan Sharma.",
};

export default function BookStatusPage() {
  return (
    <div className="min-h-screen bg-surface-container-low py-space-xl px-margin pb-28 md:pb-space-xl">
      <div className="max-w-md mx-auto flex flex-col gap-space-md">
        {/* Status states */}
        <div className="bg-primary text-on-primary rounded-lg p-space-lg shadow-glow-cyan relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary-container/30 blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-space-xs mb-space-sm">
              <span className="material-symbols-outlined text-[20px] material-symbols-filled">check_circle</span>
              <span className="text-label-sm font-display font-semibold uppercase tracking-wider text-primary-fixed">Appointment Confirmed</span>
            </div>
            <p className="text-display-hero-mobile font-display font-extrabold tracking-tight">Token #07</p>
            <p className="text-body-sm text-surface-container-highest mt-1">Friday, Oct 27 • 05:00 PM • GK-1 Clinic</p>
          </div>
        </div>

        {/* Status tracker */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card p-space-lg">
          <h2 className="text-title-md font-display font-bold text-on-surface mb-space-md">Appointment Progress</h2>
          <div className="flex flex-col gap-space-md">
            {[
              { icon: "check_circle", label: "Slot Confirmed", detail: "Token #07 assigned", done: true },
              { icon: "check_circle", label: "Coordinator Notified", detail: "Sister Neha has your details", done: true },
              { icon: "hourglass_top", label: "Day of Appointment", detail: "Friday, Oct 27 — 5:00 PM", done: false, current: true },
              { icon: "radio_button_unchecked", label: "Vitals Check", detail: "Counter B • Sister Neha", done: false },
              { icon: "radio_button_unchecked", label: "Consultation with Dr. Sharma", detail: "~20 min session", done: false },
              { icon: "radio_button_unchecked", label: "Prescription & Follow-up Plan", detail: "Digital Rx via WhatsApp", done: false },
            ].map((step) => (
              <div key={step.label} className="flex items-start gap-space-md">
                <span className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${step.done ? "text-tertiary material-symbols-filled" : step.current ? "text-primary" : "text-outline"}`}>
                  {step.icon}
                </span>
                <div>
                  <div className={`text-label-md font-display font-bold ${step.done || step.current ? "text-on-surface" : "text-on-surface-variant"}`}>{step.label}</div>
                  <div className="text-body-sm text-on-surface-variant">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-space-xs">
          <Link href="/book/confirmation" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]">
            View Digital OPD Pass
            <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
          </Link>
          <Link href="/appointment" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-surface-container text-primary text-label-md font-display font-semibold hover:bg-surface-container-high transition-all min-h-[48px]">
            Reschedule or Cancel
            <span className="material-symbols-outlined text-[18px]">settings</span>
          </Link>
        </div>

        {/* Emergency */}
        <div className="bg-error-container/60 rounded-DEFAULT p-space-md flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5 material-symbols-filled">emergency</span>
          <p className="text-body-sm text-on-error-container">{doctor.emergency.message}</p>
        </div>
      </div>
    </div>
  );
}
