"use client";
import { useState } from "react";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { doctor } from "@/config/doctor";

type TabState = "view" | "reschedule" | "cancel" | "cancelled";

export default function AppointmentPage() {
  const [tab, setTab] = useState<TabState>("view");
  const [showCancelModal, setShowCancelModal] = useState(false);

  const appointmentDetails = {
    token: "#RS-GK1-8429",
    patient: "Rajesh Khanna",
    age: "54 Yrs • Male",
    date: "Friday, Oct 27, 2025",
    time: "05:00 PM IST",
    clinic: "Sharma Heart & Vascular Clinic, GK-1",
    desk: "Counter B • Sister Neha (RN)",
    fee: "₹1,500",
    tokenNo: "07",
  };

  return (
    <div className="min-h-screen bg-surface-container-low py-space-xl px-margin pb-28 md:pb-space-xl">
      <div className="max-w-2xl mx-auto">

        {/* Page header */}
        <div className="mb-space-lg">
          <Link href="/" className="text-primary text-label-md font-display font-semibold inline-flex items-center gap-1 hover:underline mb-space-sm min-h-[44px]">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="text-headline-sm font-display font-bold text-on-surface">Manage My Appointment</h1>
          <p className="text-body-sm text-on-surface-variant mt-0.5">Ref: <strong className="text-on-surface">{appointmentDetails.token}</strong> • Dr. {doctor.shortName}</p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-space-xs bg-surface-container p-1 sm:p-space-xs rounded-full mb-space-lg overflow-x-auto no-scrollbar">
          {(["view", "reschedule", "cancel"] as TabState[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setShowCancelModal(false); }}
              className={`flex-1 sm:flex-initial flex-shrink-0 flex items-center justify-center gap-1 px-space-md py-2.5 rounded-full text-label-sm sm:text-label-md font-display font-semibold transition-all capitalize min-h-[44px] ${
                tab === t ? "bg-surface-container-lowest shadow-card text-on-surface" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {t === "view" ? "info" : t === "reschedule" ? "event_repeat" : "cancel"}
              </span>
              {t === "view" ? "View Pass" : t === "reschedule" ? "Reschedule" : "Cancel"}
            </button>
          ))}
        </div>

        {/* ── VIEW TAB ─────────────────────── */}
        {tab === "view" && (
          <div className="flex flex-col gap-space-md animate-fade-in">
            <div className="bg-surface-container-lowest rounded-xl shadow-card p-4 sm:p-space-lg">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-tertiary text-[20px] material-symbols-filled">check_circle</span>
                  <span className="text-label-sm font-display font-semibold text-tertiary uppercase tracking-wider">Confirmed</span>
                </div>
                <span className="text-label-sm text-on-surface-variant bg-surface-container px-space-sm py-0.5 rounded-full font-display font-semibold">
                  Token #{appointmentDetails.tokenNo}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-space-md">
                {[
                  ["Patient", appointmentDetails.patient],
                  ["Date", appointmentDetails.date],
                  ["Time", appointmentDetails.time],
                  ["Clinic", appointmentDetails.clinic],
                  ["Desk", appointmentDetails.desk],
                  ["Fee", appointmentDetails.fee],
                ].map(([label, value]) => (
                  <div key={label} className={label === "Clinic" || label === "Desk" ? "col-span-2" : ""}>
                    <div className="text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</div>
                    <div className="text-label-sm sm:text-label-md font-display font-semibold text-on-surface mt-0.5">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <Link href="/book/confirmation" className="w-full flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary text-on-primary text-label-md font-display font-bold shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]">
              View Digital OPD Pass
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
            </Link>
          </div>
        )}

        {/* ── RESCHEDULE TAB ───────────────── */}
        {tab === "reschedule" && (
          <div className="flex flex-col gap-space-md animate-fade-in">
            <div className="bg-surface-container-lowest rounded-xl shadow-card p-4 sm:p-space-lg">
              <h2 className="text-title-md font-display font-bold text-on-surface mb-space-md">Choose a New Slot</h2>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-space-xs mb-space-md">
                {["Tomorrow", "Friday", "Saturday", "Next Mon", "Next Tue", "Next Wed"].map((d) => (
                  <button key={d} className="py-2.5 px-1 rounded-DEFAULT text-[12px] sm:text-label-md font-display font-semibold bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary active:scale-[0.98] transition-all text-center min-h-[44px] flex items-center justify-center">
                    {d}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-space-xs mb-space-lg">
                {["04:30 PM", "04:45 PM", "05:15 PM", "06:00 PM", "07:00 PM", "07:30 PM"].map((t) => (
                  <button key={t} className="py-2.5 px-1 rounded-full text-[12px] sm:text-label-md font-display font-semibold bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary active:scale-[0.98] transition-all text-center min-h-[44px] flex items-center justify-center">
                    {t}
                  </button>
                ))}
              </div>
              <a
                href={buildWhatsAppUrl({ purpose: "inquiry" })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-tertiary text-on-tertiary text-label-lg font-display font-bold hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
              >
                Confirm Reschedule via WhatsApp
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </a>
            </div>
          </div>
        )}

        {/* ── CANCEL TAB ───────────────────── */}
        {tab === "cancel" && !showCancelModal && (
          <div className="flex flex-col gap-space-md animate-fade-in">
            <div className="bg-surface-container-lowest rounded-xl shadow-card p-4 sm:p-space-lg text-center flex flex-col items-center gap-space-md">
              <span className="material-symbols-outlined text-[48px] text-primary material-symbols-filled">sentiment_dissatisfied</span>
              <h2 className="text-title-md font-display font-bold text-on-surface">Need to Cancel?</h2>
              <p className="text-body-md text-on-surface-variant max-w-sm">
                Zero cancellation charge. You can always re-book anytime. Can we offer a Video OPD instead?
              </p>
              <a
                href={buildWhatsAppUrl({ purpose: "followup" })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-tertiary text-on-tertiary text-label-md font-display font-bold hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
              >
                <span className="material-symbols-outlined text-[20px]">videocam</span>
                Switch to Video OPD (₹1,200)
              </a>
              <button
                onClick={() => setShowCancelModal(true)}
                className="w-full py-[14px] rounded-full bg-error-container text-on-error-container text-label-md font-display font-semibold hover:bg-error hover:text-on-error active:scale-[0.98] transition-all min-h-[48px]"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        )}

        {tab === "cancel" && showCancelModal && (
          <div className="flex flex-col gap-space-md animate-fade-in">
            <div className="bg-surface-container-lowest rounded-xl shadow-card p-4 sm:p-space-lg text-center flex flex-col items-center gap-space-md">
              <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
                <span className="material-symbols-outlined text-[32px] material-symbols-filled">check_circle</span>
              </div>
              <h2 className="text-headline-sm font-display font-bold text-on-surface">Appointment Cancelled</h2>
              <p className="text-body-md text-on-surface-variant">Token #{appointmentDetails.tokenNo} has been released. No charges were applied.</p>
              <div className="flex flex-col w-full gap-space-xs">
                <Link href="/book" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary text-on-primary text-label-md font-display font-bold shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]">
                  Book a New Slot
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </Link>
                <Link href="/" className="py-[14px] text-primary text-label-md font-display font-semibold hover:underline min-h-[44px] flex items-center justify-center">
                  Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
