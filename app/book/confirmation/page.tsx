import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = {
  title: "Appointment Confirmed",
  description: "Your OPD appointment with Dr. Rohan Sharma has been confirmed. View your digital health pass.",
};

export default function BookConfirmationPage() {
  return (
    <div className="min-h-screen bg-surface-container-low flex items-start justify-center py-space-xl px-margin pb-24 md:pb-space-xl">
      <div className="w-full max-w-sm flex flex-col gap-space-md">

        {/* Confirmed badge */}
        <div className="flex items-center justify-between bg-surface-container rounded-full px-space-md py-space-xs shadow-card">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary text-[20px] material-symbols-filled">check_circle</span>
            <span className="text-label-sm font-display font-semibold text-tertiary uppercase tracking-wider">Appointment Confirmed & Scheduled</span>
          </div>
          <span className="text-label-sm font-display font-semibold text-on-surface-variant bg-surface-container-high px-space-xs py-0.5 rounded-full">#RS-GK1-8429</span>
        </div>

        {/* Token banner */}
        <div className="relative overflow-hidden bg-primary text-on-primary rounded-lg p-space-md shadow-glow-cyan">
          <div className="absolute -right-6 -bottom-10 w-36 h-36 rounded-full bg-primary-container opacity-40 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-space-xs">
              <p className="text-label-md text-primary-fixed uppercase tracking-wider">Live OPD Queue Slot</p>
              <p className="text-display-hero-mobile font-display font-extrabold text-on-primary tracking-tight">Token #07</p>
              <p className="text-body-sm text-surface-container-highest">Evening Batch • 5:00 PM Window</p>
            </div>
            <div className="flex flex-col items-end gap-space-xs">
              <span className="inline-flex items-center px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-display font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse mr-1.5" />
                Priority Inflow
              </span>
              <span className="text-label-sm text-primary-fixed">Estimated Call: 5:10 PM</span>
            </div>
          </div>
        </div>

        {/* Digital OPD Pass */}
        <div className="relative bg-surface-container-lowest rounded-lg shadow-xl overflow-hidden">
          {/* Pass header */}
          <div className="bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary-fixed text-[18px]">cardiology</span>
              <span className="text-label-md font-display font-semibold tracking-wide">DIGITAL OPD HEALTH PASS</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-tertiary-fixed text-[16px] material-symbols-filled">verified</span>
              <span className="text-label-sm text-secondary-fixed">NMC Verified</span>
            </div>
          </div>

          {/* Doctor & appointment details */}
          <div className="p-space-md space-y-space-md">
            <div className="flex items-center gap-space-md">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-surface-container ring-2 ring-primary-container/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={doctor.photo} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-headline-sm font-display font-bold text-on-surface">{doctor.name}</div>
                <div className="text-body-sm text-on-surface-variant">MD, DM (Cardiology), FSCAI</div>
                <div className="text-label-sm text-primary">{doctor.title}</div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-DEFAULT p-space-sm grid grid-cols-2 gap-space-sm">
              <div>
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block">Patient</span>
                <span className="text-label-lg text-on-surface font-display font-semibold">Rajesh Khanna</span>
                <span className="text-body-sm text-secondary block">54 Yrs • Male</span>
              </div>
              <div>
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block">Date & Time</span>
                <span className="text-label-lg text-on-surface font-display font-semibold">Fri, Oct 27, 2025</span>
                <span className="text-body-sm text-primary block">05:00 PM IST</span>
              </div>
              <div className="col-span-2 pt-space-xs">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block">Consultation Venue</span>
                <div className="flex items-start gap-space-xs mt-0.5">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">location_on</span>
                  <span className="text-body-sm text-on-surface">Sharma Heart & Vascular Clinic, E-24 Main Market Road, Greater Kailash-1 (GK-1), New Delhi</span>
                </div>
              </div>
            </div>

            {/* Fee / Desk */}
            <div className="flex items-center justify-between bg-surface-container px-space-md py-space-sm rounded-DEFAULT">
              <div>
                <span className="text-label-sm text-on-surface-variant block">Consultation Fee</span>
                <span className="text-title-md font-display text-on-surface">₹1,500</span>
                <span className="text-body-sm text-tertiary block">Pay at clinic via UPI/Cash</span>
              </div>
              <div className="text-right">
                <span className="text-label-sm text-on-surface-variant block">Assigned Desk</span>
                <span className="text-label-md font-display font-semibold text-on-surface block">Counter B • Vitals</span>
                <span className="text-body-sm text-secondary block">Sister Neha (RN)</span>
              </div>
            </div>
          </div>

          {/* Perforated divider */}
          <div className="relative w-full flex items-center justify-between px-space-xs py-1">
            <div className="w-5 h-5 -ml-3 rounded-full bg-surface-container-low" />
            <div className="flex-1 flex justify-between gap-1.5 px-space-sm overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="w-2 h-0.5 bg-outline-variant rounded-full shrink-0" />
              ))}
            </div>
            <div className="w-5 h-5 -mr-3 rounded-full bg-surface-container-low" />
          </div>

          {/* QR code */}
          <div className="p-space-md flex flex-col items-center text-center gap-space-xs">
            <span className="text-label-sm text-on-surface-variant tracking-wider uppercase">Contactless Reception Fast-Track</span>
            <div className="p-space-xs bg-surface-container-lowest rounded-DEFAULT shadow-card">
              <svg className="w-32 h-32 text-on-surface" fill="currentColor" viewBox="0 0 100 100">
                <path d="M10 10h24v24H10zM14 14v16h16V14H14z" /><path d="M18 18h8v8h-8z" />
                <path d="M66 10h24v24H66zM70 14v16h16V14H70z" /><path d="M74 18h8v8h-8z" />
                <path d="M10 66h24v24H10zM14 70v16h16V70H14z" /><path d="M18 74h8v8h-8z" />
                <rect height="6" width="6" x="42" y="10" /><rect height="6" width="6" x="52" y="10" />
                <rect height="12" width="6" x="42" y="20" /><rect height="8" width="6" x="52" y="24" />
                <rect height="6" width="8" x="10" y="42" /><rect height="6" width="12" x="22" y="42" />
                <rect height="8" width="8" x="40" y="40" /><rect height="6" width="6" x="54" y="40" />
                <rect height="6" width="12" x="48" y="52" /><rect height="12" width="6" x="40" y="62" />
                <rect height="12" width="6" x="42" y="78" /><rect height="6" width="8" x="66" y="42" />
                <rect height="10" width="6" x="66" y="66" /><rect height="18" width="4" x="86" y="70" />
                <rect height="10" width="14" x="66" y="80" />
              </svg>
            </div>
            <p className="text-label-sm text-on-surface-variant font-mono">PASS-TOKEN-RS-8429-DELHI</p>
            <div className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
              <span className="text-label-sm font-display font-semibold">Auto-scanned at reception</span>
            </div>
          </div>
        </div>

        {/* Pre-visit checklist */}
        <div className="flex flex-col gap-space-sm">
          <h2 className="text-headline-sm font-display font-bold text-on-surface px-space-xs">Visit Preparation</h2>
          {[
            { icon: "schedule", title: "Arrive by 04:45 PM", desc: "Allows Sister Neha 15 minutes for baseline vitals: BP, SpO2, and pulse rhythm check.", color: "bg-secondary-container text-on-secondary-container" },
            { icon: "folder_open", title: "Carry Medical Portfolio", desc: "Bring prior ECG strips, angiogram/echo CDs, and your current medication blister strips.", color: "bg-primary-fixed text-on-primary-fixed" },
            { icon: "checkroom", title: "Wear Loose Sleeves", desc: "Allows quick BP cuff wrapping and 12-lead ECG lead placement.", color: "bg-tertiary-fixed text-on-tertiary-fixed" },
          ].map((item) => (
            <div key={item.title} className="bg-surface-container-low rounded-DEFAULT p-space-md flex items-start gap-space-sm">
              <div className={`p-space-xs rounded-full shrink-0 mt-0.5 ${item.color}`}>
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <div>
                <p className="text-label-md font-display font-semibold text-on-surface">{item.title}</p>
                <p className="text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Manage appointment */}
        <Link href="/appointment" className="w-full flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high transition-all">
          Reschedule or Cancel
          <span className="material-symbols-outlined text-[18px]">settings</span>
        </Link>
      </div>
    </div>
  );
}
