"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import QRCode from "react-qr-code";
import { doctor } from "@/config/doctor";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

interface BookingData {
  name: string;
  phone: string;
  age?: string;
  gender?: string;
  clinicId: string;
  day: string;
  time: string;
  patientType: "new" | "existing";
  reason?: string;
  token: string;
  bookingId: string;
}

function buildCalendarUrl(data: BookingData, clinic: typeof doctor.clinics[0]) {
  const title = encodeURIComponent(`OPD Appointment — ${doctor.name}`);
  const details = encodeURIComponent(`Token: ${data.token}\nClinic: ${clinic.name}\nAddress: ${clinic.address}\nFee: ₹${clinic.fee}`);
  const location = encodeURIComponent(clinic.address);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
}

function buildMapsUrl(clinic: typeof doctor.clinics[0]) {
  return clinic.mapsUrl ?? `https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`;
}

export default function BookConfirmationPage() {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dr-booking");
      if (stored) setBooking(JSON.parse(stored));
    } catch {}
  }, []);

  const clinic = booking
    ? (doctor.clinics.find((c) => c.id === booking.clinicId) ?? doctor.clinics[0])
    : doctor.clinics[0];

  // QR data payload
  const qrValue = booking
    ? `DRROHAN|TOKEN:${booking.token}|DATE:${booking.day}|TIME:${booking.time}|CLINIC:${clinic.shortName}|PT:${booking.name}`
    : "DRROHAN|DEMO-PASS";

  const displayName = booking?.name ?? "Patient";
  const displayToken = booking?.token ?? "RS-GK1-DEMO";
  const displayDay = booking?.day ?? "—";
  const displayTime = booking?.time ?? "—";

  return (
    <div className="min-h-screen bg-surface-container-low flex items-start justify-center py-space-xl px-margin pb-24 md:pb-space-xl">
      <div className="w-full max-w-sm flex flex-col gap-space-md">

        {/* Confirmed badge */}
        <div className="flex items-center justify-between bg-surface-container rounded-full px-space-md py-space-xs shadow-card">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary text-[20px] material-symbols-filled">check_circle</span>
            <span className="text-label-sm font-display font-semibold text-tertiary uppercase tracking-wider">Appointment Confirmed</span>
          </div>
          <span className="text-label-sm font-display font-semibold text-on-surface-variant bg-surface-container-high px-space-xs py-0.5 rounded-full font-mono">{displayToken}</span>
        </div>

        {/* Token banner */}
        <div className="relative overflow-hidden bg-primary text-on-primary rounded-lg p-space-md shadow-glow-cyan">
          <div className="absolute -right-6 -bottom-10 w-36 h-36 rounded-full bg-primary-container opacity-40 blur-2xl pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-space-xs">
              <p className="text-label-md text-primary-fixed uppercase tracking-wider">Live OPD Queue Slot</p>
              <p className="text-display-hero-mobile font-display font-extrabold text-on-primary tracking-tight">{displayToken.split("-").pop()}</p>
              <p className="text-body-sm text-surface-container-highest">{clinic.shortName} · {displayDay}</p>
            </div>
            <div className="flex flex-col items-end gap-space-xs">
              <span className="inline-flex items-center px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-display font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse mr-1.5" />Confirmed
              </span>
              <span className="text-label-sm text-primary-fixed">Preferred: {displayTime}</span>
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
              <span className="text-label-sm text-secondary-fixed">NMC {doctor.nmc}</span>
            </div>
          </div>

          {/* Doctor row */}
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

            {/* Appointment details grid */}
            <div className="bg-surface-container-low rounded-DEFAULT p-space-sm grid grid-cols-2 gap-space-sm">
              <div>
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block">Patient</span>
                <span className="text-label-lg text-on-surface font-display font-semibold">{displayName}</span>
                {booking?.age && <span className="text-body-sm text-secondary block">{booking.age} Yrs{booking.gender ? ` · ${booking.gender}` : ""}</span>}
              </div>
              <div>
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block">Date & Time</span>
                <span className="text-label-lg text-on-surface font-display font-semibold">{displayDay}</span>
                <span className="text-body-sm text-primary block">{displayTime} IST</span>
              </div>
              <div className="col-span-2 pt-space-xs">
                <span className="text-label-sm text-on-surface-variant uppercase tracking-wider block">Consultation Venue</span>
                <div className="flex items-start gap-space-xs mt-0.5">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 shrink-0">location_on</span>
                  <span className="text-body-sm text-on-surface">{clinic.isVirtual ? "Encrypted Video Consultation — Link sent via WhatsApp" : clinic.address}</span>
                </div>
              </div>
            </div>

            {/* Fee row */}
            <div className="flex items-center justify-between bg-surface-container px-space-md py-space-sm rounded-DEFAULT">
              <div>
                <span className="text-label-sm text-on-surface-variant block">Consultation Fee</span>
                <span className="text-title-md font-display text-on-surface">₹{clinic.fee.toLocaleString()}</span>
                <span className="text-body-sm text-tertiary block">{clinic.isVirtual ? "Pay via UPI link sent on WhatsApp" : "Pay at clinic via UPI/Cash"}</span>
              </div>
              <div className="text-right">
                <span className="text-label-sm text-on-surface-variant block">Type</span>
                <span className="text-label-md font-display font-semibold text-on-surface block">{booking?.patientType === "new" ? "New Patient" : "Existing Patient"}</span>
              </div>
            </div>
          </div>

          {/* Perforated divider */}
          <div className="relative w-full flex items-center justify-between px-space-xs py-1">
            <div className="w-5 h-5 -ml-3 rounded-full bg-surface-container-low" />
            <div className="flex-1 flex justify-between gap-1.5 px-space-sm overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (<span key={i} className="w-2 h-0.5 bg-outline-variant rounded-full shrink-0" />))}
            </div>
            <div className="w-5 h-5 -mr-3 rounded-full bg-surface-container-low" />
          </div>

          {/* QR code — real encoded data */}
          <div className="p-space-md flex flex-col items-center text-center gap-space-xs">
            <span className="text-label-sm text-on-surface-variant tracking-wider uppercase">Contactless Reception Fast-Track</span>
            <div className="p-space-sm bg-white rounded-DEFAULT shadow-card">
              <QRCode value={qrValue} size={120} level="M" />
            </div>
            <p className="text-label-sm text-on-surface-variant font-mono break-all max-w-[200px]">{displayToken}</p>
            <div className="flex items-center gap-1 text-tertiary">
              <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
              <span className="text-label-sm font-display font-semibold">Scanned at reception desk</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-space-xs">
          {!clinic.isVirtual && (
            <a href={buildMapsUrl(clinic)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 py-space-sm bg-surface-container-lowest rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
              <span className="material-symbols-outlined text-[22px] text-primary">directions</span>
              <span className="text-label-sm font-display font-semibold text-on-surface">Get Directions</span>
            </a>
          )}
          <a href={buildCalendarUrl({ ...booking!, day: displayDay, time: displayTime, token: displayToken, bookingId: "" }, clinic)} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 py-space-sm bg-surface-container-lowest rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[22px] text-primary">event_add</span>
            <span className="text-label-sm font-display font-semibold text-on-surface">Add to Calendar</span>
          </a>
          <a href={buildWhatsAppUrl({ purpose: "followup" })} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1 py-space-sm bg-surface-container-lowest rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[22px] text-tertiary">chat</span>
            <span className="text-label-sm font-display font-semibold text-on-surface">WhatsApp Desk</span>
          </a>
          <a href={buildCallUrl()} className="flex flex-col items-center justify-center gap-1 py-space-sm bg-surface-container-lowest rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
            <span className="material-symbols-outlined text-[22px] text-primary">call</span>
            <span className="text-label-sm font-display font-semibold text-on-surface">Call Clinic</span>
          </a>
        </div>

        {/* Pre-visit checklist */}
        <div className="flex flex-col gap-space-sm">
          <h2 className="text-headline-sm font-display font-bold text-on-surface">Visit Preparation</h2>
          {[
            { icon: "schedule", title: "Arrive 15 mins early", desc: "Allows Sister Neha time for baseline vitals: BP, SpO2, and pulse check.", color: "bg-secondary-container text-on-secondary-container" },
            { icon: "folder_open", title: "Carry Medical Records", desc: "Prior ECG strips, echo CDs, current medication blister strips.", color: "bg-primary-fixed text-on-primary-fixed" },
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

        <Link href="/appointment" className="w-full flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high transition-all">
          Reschedule or Cancel <span className="material-symbols-outlined text-[18px]">settings</span>
        </Link>
      </div>
    </div>
  );
}
