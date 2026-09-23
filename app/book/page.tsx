"use client";
import { useState } from "react";
import Link from "next/link";
import { doctor } from "@/config/doctor";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

// ─── Types ────────────────────────────────────────────────
type PatientType = "new" | "existing" | null;
type ConsultType = "clinic" | "video" | null;
type BookingState = "form" | "submitted" | "whatsapp" | "call" | "no_slots";

interface BookingData {
  patientType: PatientType;
  consultType: ConsultType;
  clinicId: string;
  day: string;
  time: string;
  name: string;
  phone: string;
  age: string;
  gender: string;
  reason: string;
}

const STEPS = ["Patient", "Type", "Clinic", "Date", "Time", "Details", "Review"];

const TIMES = ["10:00 AM", "10:30 AM", "11:00 AM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "07:00 PM"];

/** Generate the next N calendar days starting from today */
function generateDays(n = 7) {
  const days = [];
  const today = new Date();
  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : DAY_NAMES[d.getDay()],
      date: `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`,
      dayIndex: d.getDay(),
    });
  }
  return days;
}

// ─── Helpers ──────────────────────────────────────────────
function saveBookingToStorage(data: BookingData & { token: string; bookingId: string }) {
  try {
    localStorage.setItem("dr-booking", JSON.stringify(data));
  } catch {}
}

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<BookingState>("form");
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingData>({
    patientType: null,
    consultType: null,
    clinicId: doctor.clinics[0].id,
    day: "Today",
    time: "05:00 PM",
    name: "",
    phone: "",
    age: "",
    gender: "",
    reason: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});

  const DAYS = generateDays(7);

  const selectedClinic = doctor.clinics.find((c) => c.id === booking.clinicId) ?? doctor.clinics[0];
  const filteredClinics = booking.consultType === "video"
    ? doctor.clinics.filter((c) => c.isVirtual)
    : doctor.clinics.filter((c) => !c.isVirtual);

  function set<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setBooking((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep(): boolean {
    const e: Partial<Record<keyof BookingData, string>> = {};
    if (step === 5) {
      if (!booking.name.trim()) e.name = "Please enter patient name";
      if (!/^[6-9]\d{9}$/.test(booking.phone)) e.phone = "Enter a valid 10-digit mobile number";
      if (booking.patientType === "new" && !booking.age) e.age = "Please enter patient age";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleSubmit() {
    if (!validateStep()) return;
    setLoading(true);
    setTimeout(() => {
      const token = `RS-${booking.clinicId.toUpperCase()}-${(Math.floor(Math.random() * 9000) + 1000)}`;
      const bookingId = `BK${(Date.now()).toString(36).toUpperCase()}`;
      saveBookingToStorage({ ...booking, token, bookingId });
      setLoading(false);

      if (doctor.bookingMode === "whatsapp") {
        setState("whatsapp");
        window.open(buildWhatsAppUrl({
          purpose: "booking",
          patientName: booking.name,
          clinic: selectedClinic.name,
          date: booking.day,
          time: booking.time,
        }), "_blank");
      } else if (doctor.bookingMode === "call") {
        setState("call");
      } else {
        setState("submitted");
      }
    }, 1400);
  }

  // ── Submitted / Done states ────────────────────────────
  if (state === "submitted") {
    const stored = (() => { try { return JSON.parse(localStorage.getItem("dr-booking") ?? "{}"); } catch { return {}; } })();
    return (
      <div className="min-h-screen bg-surface-container-low flex items-start justify-center py-space-xl px-margin pb-24 md:pb-space-xl">
        <div className="max-w-md w-full flex flex-col gap-space-md animate-fade-in">
          <div className="bg-surface-container-lowest rounded-xl shadow-card p-space-xl text-center flex flex-col items-center gap-space-md">
            <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary shadow-card">
              <span className="material-symbols-outlined text-[32px] material-symbols-filled">verified</span>
            </div>
            <div>
              <h1 className="text-headline-sm font-display font-bold text-on-surface">Token Registered!</h1>
              <p className="text-body-md text-on-surface-variant mt-space-xs">
                {doctor.coordinator.name} will WhatsApp your confirmed slot within 10 minutes.
              </p>
              <p className="text-label-sm text-on-surface-variant mt-1">Ref: <strong className="text-on-surface">{stored.token}</strong></p>
            </div>
            <div className="bg-surface-container rounded-lg p-space-md w-full text-left grid grid-cols-2 gap-space-xs text-body-sm">
              <div><span className="text-on-surface-variant">Patient:</span> <strong className="text-on-surface">{stored.name}</strong></div>
              <div><span className="text-on-surface-variant">Clinic:</span> <strong className="text-on-surface">{selectedClinic.shortName}</strong></div>
              <div><span className="text-on-surface-variant">Date:</span> <strong className="text-on-surface">{stored.day}</strong></div>
              <div><span className="text-on-surface-variant">Time:</span> <strong className="text-on-surface">{stored.time}</strong></div>
              <div><span className="text-on-surface-variant">Type:</span> <strong className="text-on-surface">{stored.patientType === "new" ? "New Patient" : "Existing Patient"}</strong></div>
              <div><span className="text-on-surface-variant">Fee:</span> <strong className="text-primary">₹{selectedClinic.fee.toLocaleString()}</strong></div>
            </div>
            <div className="flex flex-col w-full gap-space-xs">
              <Link href="/book/confirmation" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-lg font-display font-bold hover:opacity-90 transition-all">
                View Digital OPD Pass <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              </Link>
              <Link href="/book/status" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high transition-all">
                Track Appointment Status
              </Link>
            </div>
          </div>
          <div className="bg-error-container/60 rounded-DEFAULT p-space-md flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5 material-symbols-filled">emergency</span>
            <p className="text-body-sm text-on-error-container">Emergency? Call <a href="tel:102" className="font-bold underline">102</a> / <a href="tel:108" className="font-bold underline">108</a> immediately — don&apos;t wait for OPD.</p>
          </div>
        </div>
      </div>
    );
  }

  if (state === "whatsapp") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl pb-24">
        <div className="max-w-sm w-full bg-surface-container-lowest rounded-xl shadow-card p-space-xl text-center flex flex-col items-center gap-space-lg animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary"><span className="material-symbols-outlined text-[32px]">chat</span></div>
          <div><h1 className="text-headline-sm font-display font-bold text-on-surface">WhatsApp Opened</h1><p className="text-body-md text-on-surface-variant mt-space-xs">{doctor.coordinator.name} will confirm your slot. Keep WhatsApp open.</p></div>
          <Link href="/" className="text-primary text-label-md font-display font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  if (state === "call") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl pb-24">
        <div className="max-w-sm w-full bg-surface-container-lowest rounded-xl shadow-card p-space-xl text-center flex flex-col items-center gap-space-lg animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary"><span className="material-symbols-outlined text-[32px]">call</span></div>
          <div><h1 className="text-headline-sm font-display font-bold text-on-surface">Call to Confirm</h1><p className="text-body-md text-on-surface-variant mt-space-xs">Call our clinic reception to confirm your preferred slot.</p></div>
          <a href={buildCallUrl()} className="w-full flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold hover:opacity-90"><span className="material-symbols-outlined text-[22px]">call</span>{doctor.phone}</a>
          <Link href="/" className="text-primary text-label-md font-display font-semibold hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  if (state === "no_slots") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl pb-24">
        <div className="max-w-sm w-full bg-surface-container-lowest rounded-xl shadow-card p-space-xl text-center flex flex-col items-center gap-space-lg animate-fade-in">
          <span className="material-symbols-outlined text-[48px] text-outline">calendar_off</span>
          <div><h1 className="text-headline-sm font-display font-bold text-on-surface">No Slots Available</h1><p className="text-body-md text-on-surface-variant mt-space-xs">No slots available for your selected date and clinic. Try another date or reach us directly.</p></div>
          <div className="flex flex-col w-full gap-space-xs">
            <button onClick={() => { setState("form"); setStep(3); }} className="py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-md font-display font-bold">Choose Another Date</button>
            <a href={buildWhatsAppUrl({ purpose: "booking" })} target="_blank" rel="noopener noreferrer" className="py-[14px] rounded-full bg-tertiary text-on-tertiary text-label-md font-display font-semibold flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[18px]">chat</span>WhatsApp Clinic</a>
            <a href={buildCallUrl()} className="py-[14px] rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[18px]">call</span>Call Clinic</a>
          </div>
        </div>
      </div>
    );
  }

  // ── WIZARD FORM ──────────────────────────────────────
  return (
    <div className="min-h-screen bg-surface-container-low pb-24 md:pb-0">
      <div className="max-w-2xl mx-auto px-margin py-space-xl">

        {/* Progress */}
        <div className="mb-space-lg">
          <div className="flex items-center justify-between mb-space-xs">
            <h1 className="text-headline-sm font-display font-bold text-on-surface">Book a Consultation</h1>
            <span className="text-label-md font-display font-semibold text-on-surface-variant">Step {step + 1} of {STEPS.length}</span>
          </div>
          <div className="flex gap-space-xs items-center">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-space-xs flex-1 last:flex-none">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-label-sm font-display font-bold shrink-0 transition-all ${i < step ? "bg-tertiary text-on-tertiary" : i === step ? "bg-primary text-on-primary" : "bg-surface-container text-outline"}`}>
                  {i < step ? <span className="material-symbols-outlined text-[16px]">check</span> : i + 1}
                </div>
                {i < STEPS.length - 1 && <div className={`h-0.5 flex-1 rounded-full transition-all ${i < step ? "bg-tertiary" : "bg-outline-variant"}`} />}
              </div>
            ))}
          </div>
          <div className="mt-space-xs text-body-sm text-on-surface-variant font-display font-semibold">{STEPS[step]}</div>
        </div>

        {/* Step card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card p-space-lg animate-fade-in" key={step}>

          {/* ── STEP 0: New vs Existing ─── */}
          {step === 0 && (
            <div className="flex flex-col gap-space-md">
              <h2 className="text-headline-sm font-display font-bold text-on-surface">Are you a new or existing patient?</h2>
              <p className="text-body-md text-on-surface-variant">This helps us personalise your booking experience.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">
                {[
                  { id: "new" as PatientType, label: "New Patient", desc: "First time visiting Dr. Sharma", icon: "person_add" },
                  { id: "existing" as PatientType, label: "Existing Patient", desc: "I have consulted before", icon: "person_check" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => { set("patientType", option.id); setStep(1); }}
                    className={`p-space-lg rounded-lg border-2 text-left transition-all flex flex-col gap-space-sm hover:-translate-y-0.5 ${booking.patientType === option.id ? "border-primary bg-primary-container/10" : "border-outline-variant hover:border-primary/40"}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[24px]">{option.icon}</span>
                    </div>
                    <div>
                      <div className="text-label-lg font-display font-bold text-on-surface">{option.label}</div>
                      <div className="text-body-sm text-on-surface-variant mt-0.5">{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 1: Consultation Type ─── */}
          {step === 1 && (
            <div className="flex flex-col gap-space-md">
              <h2 className="text-headline-sm font-display font-bold text-on-surface">How would you like to consult?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">
                {[
                  { id: "clinic" as ConsultType, label: "In-Clinic Visit", desc: "GK-1, Max Saket or Medanta", icon: "local_hospital", badge: "₹1,500–₹1,800" },
                  { id: "video" as ConsultType, label: "Video Consultation", desc: "Mon–Sat, 8:30–10 PM. Digital Rx on WhatsApp.", icon: "videocam", badge: "₹1,200" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => { set("consultType", option.id); setStep(2); }}
                    className={`p-space-lg rounded-lg border-2 text-left transition-all flex flex-col gap-space-sm hover:-translate-y-0.5 ${booking.consultType === option.id ? "border-primary bg-primary-container/10" : "border-outline-variant hover:border-primary/40"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[24px]">{option.icon}</span>
                      </div>
                      <span className="text-label-md font-display font-bold text-primary bg-primary-fixed px-space-sm py-0.5 rounded-full">{option.badge}</span>
                    </div>
                    <div>
                      <div className="text-label-lg font-display font-bold text-on-surface">{option.label}</div>
                      <div className="text-body-sm text-on-surface-variant mt-0.5">{option.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Select Clinic ─── */}
          {step === 2 && (
            <div className="flex flex-col gap-space-md">
              <h2 className="text-headline-sm font-display font-bold text-on-surface">Choose your clinic</h2>
              <div className="flex flex-col gap-space-sm">
                {filteredClinics.map((clinic) => (
                  <button
                    key={clinic.id}
                    onClick={() => set("clinicId", clinic.id)}
                    className={`p-space-md rounded-lg border-2 text-left transition-all flex items-start justify-between gap-space-md ${booking.clinicId === clinic.id ? "border-primary bg-primary-container/10" : "border-outline-variant hover:border-primary/40"}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-space-xs">
                        <span className="text-label-lg font-display font-bold text-on-surface">{clinic.shortName}</span>
                        {clinic.type === "flagship" && <span className="text-label-sm font-display font-bold text-on-tertiary-fixed bg-tertiary-fixed px-space-xs py-0.5 rounded-full">Flagship</span>}
                      </div>
                      <p className="text-body-sm text-on-surface-variant mt-0.5">{clinic.isVirtual ? clinic.address : clinic.address.split(",").slice(0, 2).join(",")}</p>
                      <div className="flex items-center gap-space-xs mt-space-xs text-body-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
                        {clinic.days} · {clinic.hours}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-label-lg font-display font-extrabold text-primary">₹{clinic.fee.toLocaleString()}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${booking.clinicId === clinic.id ? "border-primary bg-primary" : "border-outline-variant"}`}>
                        {booking.clinicId === clinic.id && <span className="material-symbols-outlined text-on-primary text-[14px]">check</span>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 3: Select Day ─── */}
          {step === 3 && (
            <div className="flex flex-col gap-space-md">
              <h2 className="text-headline-sm font-display font-bold text-on-surface">Choose your preferred date</h2>
              <div className="grid grid-cols-3 gap-space-xs">
                {DAYS.map((d) => {
                  const isClinicOpen = selectedClinic.daysArray.includes(d.dayIndex);
                  const isSelected = booking.day === d.label;
                  return (
                    <button
                      key={d.label}
                      onClick={() => isClinicOpen && set("day", d.label)}
                      disabled={!isClinicOpen}
                      title={!isClinicOpen ? `${selectedClinic.shortName} is not open on ${d.date}` : undefined}
                      className={`py-space-md px-space-xs rounded-lg text-center transition-all flex flex-col items-center gap-0.5 relative ${
                        !isClinicOpen
                          ? "bg-surface-container/40 text-outline cursor-not-allowed opacity-50"
                          : isSelected
                          ? "bg-primary text-on-primary shadow-glow-cyan-sm"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      <span className="text-label-lg font-display font-bold">{d.label}</span>
                      <span className={`text-label-sm ${
                        !isClinicOpen ? "text-outline" : isSelected ? "text-primary-fixed" : "text-on-surface-variant"
                      }`}>{d.date}</span>
                      {!isClinicOpen && (
                        <span className="text-[9px] font-display font-bold text-outline uppercase tracking-wide mt-0.5">Closed</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="bg-surface-container rounded-DEFAULT p-space-sm flex items-start gap-space-xs text-body-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-primary mt-0.5">info</span>
                <span>{selectedClinic.name} is open <strong className="text-on-surface">{selectedClinic.days}</strong>, {selectedClinic.hours}.</span>
              </div>
            </div>
          )}

          {/* ── STEP 4: Select Time ─── */}
          {step === 4 && (
            <div className="flex flex-col gap-space-md">
              <h2 className="text-headline-sm font-display font-bold text-on-surface">Choose a time window</h2>
              <p className="text-body-sm text-on-surface-variant">Your preferred time will be sent to the clinic for confirmation.</p>
              <div className="grid grid-cols-2 gap-space-xs">
                {TIMES.map((t) => (
                  <button
                    key={t}
                    onClick={() => set("time", t)}
                    className={`py-space-sm rounded-full text-label-md font-display font-semibold text-center transition-all ${booking.time === t ? "bg-primary-container text-on-primary-container shadow-glow-cyan-sm" : "bg-surface-container text-on-surface hover:bg-surface-container-high"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 5: Patient Details ─── */}
          {step === 5 && (
            <div className="flex flex-col gap-space-md">
              <h2 className="text-headline-sm font-display font-bold text-on-surface">
                {booking.patientType === "new" ? "New Patient Details" : "Confirm Your Details"}
              </h2>
              <div className="flex flex-col gap-space-md">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-label-sm font-display font-bold text-on-surface block mb-1">Patient Full Name <span className="text-error">*</span></label>
                  <input id="name" type="text" value={booking.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Ramesh Kumar Sharma" className={`w-full px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.name ? "ring-2 ring-error" : ""}`} />
                  {errors.name && <p className="text-label-sm text-error mt-1">{errors.name}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="text-label-sm font-display font-bold text-on-surface block mb-1">WhatsApp Mobile (+91) <span className="text-error">*</span></label>
                  <div className="flex gap-space-xs">
                    <span className="px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-label-md font-display font-semibold shrink-0">+91</span>
                    <input id="phone" type="tel" value={booking.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="98100 XXXXX" maxLength={10} className={`w-full px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.phone ? "ring-2 ring-error" : ""}`} />
                  </div>
                  {errors.phone && <p className="text-label-sm text-error mt-1">{errors.phone}</p>}
                </div>
                {/* Age & Gender (new patients only) */}
                {booking.patientType === "new" && (
                  <div className="grid grid-cols-2 gap-space-md">
                    <div>
                      <label htmlFor="age" className="text-label-sm font-display font-bold text-on-surface block mb-1">Age <span className="text-error">*</span></label>
                      <input id="age" type="number" min="1" max="120" value={booking.age} onChange={(e) => set("age", e.target.value)} placeholder="e.g. 52" className={`w-full px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.age ? "ring-2 ring-error" : ""}`} />
                      {errors.age && <p className="text-label-sm text-error mt-1">{errors.age}</p>}
                    </div>
                    <div>
                      <label className="text-label-sm font-display font-bold text-on-surface block mb-1">Gender</label>
                      <div className="flex gap-space-xs">
                        {["Male", "Female", "Other"].map((g) => (
                          <button key={g} type="button" onClick={() => set("gender", g)} className={`flex-1 py-3 rounded-DEFAULT text-label-sm font-display font-semibold transition-all ${booking.gender === g ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface hover:bg-surface-container-high"}`}>{g}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {/* Reason (optional) */}
                <div>
                  <label htmlFor="reason" className="text-label-sm font-display font-bold text-on-surface block mb-1">Reason for Consultation <span className="text-on-surface-variant font-normal">(optional)</span></label>
                  <input id="reason" type="text" value={booking.reason} onChange={(e) => set("reason", e.target.value)} placeholder="e.g. Chest pain, follow-up after ECG, second opinion..." className="w-full px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 6: Review ─── */}
          {step === 6 && (
            <div className="flex flex-col gap-space-md">
              <h2 className="text-headline-sm font-display font-bold text-on-surface">Review Your Appointment</h2>
              <div className="bg-surface-container rounded-lg p-space-md grid grid-cols-2 gap-space-sm text-body-sm">
                {[
                  ["Doctor", doctor.name],
                  ["Speciality", doctor.speciality],
                  ["Patient Type", booking.patientType === "new" ? "New Patient" : "Existing Patient"],
                  ["Clinic", selectedClinic.name],
                  ["Date", booking.day],
                  ["Time", booking.time],
                  ["Patient", booking.name],
                  ["Mobile", `+91 ${booking.phone}`],
                  ...(booking.age ? [["Age", `${booking.age} Yrs${booking.gender ? ` · ${booking.gender}` : ""}`]] : []),
                  ...(booking.reason ? [["Reason", booking.reason]] : []),
                ].map(([label, value]) => (
                  <div key={label} className={label === "Clinic" || label === "Doctor" || label === "Reason" ? "col-span-2" : ""}>
                    <span className="text-on-surface-variant uppercase tracking-wider text-label-sm block">{label}</span>
                    <span className="font-display font-semibold text-on-surface">{value}</span>
                  </div>
                ))}
                <div className="col-span-2 pt-space-xs border-t border-surface-container-high">
                  <span className="text-on-surface-variant uppercase tracking-wider text-label-sm block">Consultation Fee</span>
                  <span className="text-title-md font-display font-extrabold text-primary">₹{selectedClinic.fee.toLocaleString()}</span>
                  <span className="text-body-sm text-tertiary block">Pay at clinic via UPI / Cash — no advance</span>
                </div>
              </div>
              <div className="text-body-sm text-on-surface-variant bg-surface-container-low rounded-DEFAULT px-space-md py-space-sm">
                {doctor.bookingMode === "confirmation"
                  ? "Your slot request will be reviewed. Our coordinator will WhatsApp confirmation within 10 minutes."
                  : "Your booking will be confirmed immediately. You will receive a digital OPD pass."}
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full flex items-center justify-center gap-space-sm py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>Confirming...</>
                ) : (
                  <>{doctor.bookingMode === "confirmation" ? "Request Appointment" : "Confirm Appointment"}<span className="material-symbols-outlined text-[20px]">check_circle</span></>
                )}
              </button>
              <div className="flex gap-space-md justify-center text-label-sm">
                <a href={buildWhatsAppUrl({ purpose: "booking", clinic: selectedClinic.name })} target="_blank" rel="noopener noreferrer" className="text-tertiary font-display font-semibold flex items-center gap-1 hover:underline"><span className="material-symbols-outlined text-[16px]">chat</span>Book via WhatsApp instead</a>
                <span className="text-outline">·</span>
                <a href={buildCallUrl()} className="text-primary font-display font-semibold flex items-center gap-1 hover:underline"><span className="material-symbols-outlined text-[16px]">call</span>Call Clinic</a>
              </div>
            </div>
          )}

        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-space-md">
          {step > 0 ? (
            <button onClick={back} className="flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back
            </button>
          ) : <div />}

          {step < 6 && step > 1 && (
            <button onClick={next} className="flex items-center gap-space-xs px-space-xl py-space-sm rounded-full bg-primary text-on-primary text-label-md font-display font-bold hover:opacity-90 transition-all">
              Continue <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          )}
        </div>

        {/* Emergency note */}
        <div className="mt-space-lg bg-error-container/60 rounded-DEFAULT p-space-md flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5 material-symbols-filled">emergency</span>
          <p className="text-body-sm text-on-error-container"><strong>Emergency?</strong> Do not book an OPD slot. Call <a href="tel:102" className="font-bold underline">102</a> / <a href="tel:108" className="font-bold underline">108</a> or go directly to <strong>{doctor.emergency.hospital}</strong> 24/7 ER.</p>
        </div>
      </div>
    </div>
  );
}
