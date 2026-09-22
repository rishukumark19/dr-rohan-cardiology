"use client";
import { useState } from "react";
import Link from "next/link";
import { doctor } from "@/config/doctor";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

type BookingMode = "instant" | "confirmation" | "whatsapp" | "call";
type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default function BookPage() {
  const [mode, setMode] = useState<BookingMode>("instant");
  const [step, setStep] = useState<Step>(1);
  const [selectedClinic, setSelectedClinic] = useState(doctor.clinics[0]);
  const [selectedDay, setSelectedDay] = useState("Today");
  const [selectedTime, setSelectedTime] = useState("04:45 PM");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const modes = [
    { id: "instant" as BookingMode, label: "Instant Slot", icon: "calendar_month", desc: "Select & confirm in 60 seconds" },
    { id: "confirmation" as BookingMode, label: "Request Slot", icon: "assignment_turned_in", desc: "We confirm within 10 min" },
    { id: "whatsapp" as BookingMode, label: "WhatsApp", icon: "chat", desc: "Chat with Sister Neha" },
    { id: "call" as BookingMode, label: "Call to Book", icon: "call", desc: `Dial ${doctor.phone}` },
  ];

  const days = [
    { label: "Today", slots: 3 },
    { label: "Tomorrow", slots: 8 },
    { label: "Friday", slots: 5 },
    { label: "Saturday", slots: 6 },
    { label: "Next Mon", slots: 10 },
  ];

  const times = ["04:30 PM", "04:45 PM", "05:15 PM", "06:00 PM", "06:30 PM", "07:00 PM"];

  function validate() {
    const e: { name?: string; phone?: string } = {};
    if (!patientName.trim()) e.name = "Please enter patient name";
    if (!/^\d{10}$/.test(patientPhone.replace(/\s/g, ""))) e.phone = "Enter a valid 10-digit mobile number";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Open WhatsApp with pre-filled booking message
      const url = buildWhatsAppUrl({
        purpose: "booking",
        patientName,
        clinic: selectedClinic.name,
        date: selectedDay,
        time: selectedTime,
      });
      window.open(url, "_blank");
    }, 1200);
  }

  if (mode === "whatsapp") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl pb-24 md:pb-space-xl">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-xl shadow-card p-space-xl text-center flex flex-col items-center gap-space-lg">
          <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
            <span className="material-symbols-outlined text-[32px]">chat</span>
          </div>
          <div>
            <h1 className="text-headline-sm font-display font-bold text-on-surface">WhatsApp Booking</h1>
            <p className="text-body-md text-on-surface-variant mt-space-xs">
              Connect directly with <strong className="text-on-surface">{doctor.coordinator.name}</strong>, our Clinical Coordinator, to book your slot at the most convenient time.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl({ purpose: "coordinator" })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-space-sm py-[14px] rounded-full bg-tertiary text-on-tertiary text-label-lg font-display font-bold hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            Open WhatsApp
          </a>
          <button onClick={() => setMode("instant")} className="text-primary text-label-md font-display font-semibold hover:underline">
            ← Back to booking options
          </button>
        </div>
      </div>
    );
  }

  if (mode === "call") {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl pb-24 md:pb-space-xl">
        <div className="max-w-md w-full bg-surface-container-lowest rounded-xl shadow-card p-space-xl text-center flex flex-col items-center gap-space-lg">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[32px]">call</span>
          </div>
          <div>
            <h1 className="text-headline-sm font-display font-bold text-on-surface">Call to Book</h1>
            <p className="text-body-md text-on-surface-variant mt-space-xs">
              Call our clinic reception directly. Available Mon–Sat, 10 AM – 9 PM.
            </p>
          </div>
          <a
            href={buildCallUrl()}
            className="w-full flex items-center justify-center gap-space-sm py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
            {doctor.phone}
          </a>
          <button onClick={() => setMode("instant")} className="text-primary text-label-md font-display font-semibold hover:underline">
            ← Back to booking options
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-container-low pb-24 md:pb-0">
      <div className="max-w-3xl mx-auto px-margin py-space-xl">

        {/* Page title */}
        <div className="text-center mb-space-lg">
          <h1 className="text-headline-lg-mobile font-display font-bold text-on-surface">Book a Consultation</h1>
          <p className="text-body-md text-on-surface-variant mt-space-xs">
            With <strong className="text-on-surface">{doctor.name}</strong> — {doctor.title}
          </p>
        </div>

        {/* Mode switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs mb-space-lg bg-surface-container p-space-xs rounded-full">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex flex-col items-center py-space-sm px-space-xs rounded-full transition-all text-center ${
                mode === m.id
                  ? "bg-surface-container-lowest shadow-card text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-primary">{m.icon}</span>
              <span className="text-label-md font-display font-semibold mt-0.5">{m.label}</span>
              <span className="text-label-sm text-on-surface-variant hidden sm:block">{m.desc}</span>
            </button>
          ))}
        </div>

        {/* Booking form card */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card p-space-lg">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              {/* Clinic selector */}
              <div className="mb-space-lg">
                <label className="text-label-sm font-display font-bold text-on-surface uppercase tracking-wider block mb-space-sm">
                  1. Select Clinic / Consultation Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  {doctor.clinics.map((clinic) => (
                    <button
                      key={clinic.id}
                      type="button"
                      onClick={() => setSelectedClinic(clinic)}
                      className={`text-left p-space-md rounded-lg border-2 transition-all ${
                        selectedClinic.id === clinic.id
                          ? "border-primary bg-primary-container/10"
                          : "border-outline-variant bg-surface-container-low hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-label-md font-display font-bold text-on-surface">{clinic.shortName}</span>
                        <span className="text-label-md font-display font-bold text-primary">₹{clinic.fee.toLocaleString()}</span>
                      </div>
                      <div className="text-body-sm text-on-surface-variant mt-0.5">{clinic.days} • {clinic.hours}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Day selector */}
              <div className="mb-space-lg">
                <label className="text-label-sm font-display font-bold text-on-surface uppercase tracking-wider block mb-space-sm">
                  2. Select Day
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-space-xs">
                  {days.map((d) => (
                    <button
                      key={d.label}
                      type="button"
                      onClick={() => setSelectedDay(d.label)}
                      className={`py-space-sm px-space-xs rounded-DEFAULT text-center transition-all ${
                        selectedDay === d.label
                          ? "bg-primary text-on-primary shadow-glow-cyan-sm"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      <span className="text-label-md font-display font-bold block">{d.label}</span>
                      <span className="text-label-sm opacity-80">{d.slots} slots</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selector */}
              <div className="mb-space-lg">
                <label className="text-label-sm font-display font-bold text-on-surface uppercase tracking-wider block mb-space-sm">
                  3. Select Time Window
                </label>
                <div className="grid grid-cols-3 gap-space-xs">
                  {times.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`py-space-sm rounded-full text-center text-label-md font-display font-semibold transition-all ${
                        selectedTime === t
                          ? "bg-primary-container text-on-primary-container shadow-glow-cyan-sm"
                          : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Patient details */}
              <div className="mb-space-lg flex flex-col gap-space-md">
                <label className="text-label-sm font-display font-bold text-on-surface uppercase tracking-wider block">
                  4. Patient Details
                </label>
                <div>
                  <label htmlFor="patient-name" className="text-label-sm font-display font-semibold text-on-surface block mb-1">
                    Patient Full Name
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    value={patientName}
                    onChange={(e) => { setPatientName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.name ? "ring-2 ring-error" : ""}`}
                    required
                  />
                  {errors.name && <p className="text-label-sm text-error mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="patient-phone" className="text-label-sm font-display font-semibold text-on-surface block mb-1">
                    WhatsApp Mobile Number (+91)
                  </label>
                  <div className="flex items-center gap-space-xs">
                    <span className="px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-label-md font-display font-semibold shrink-0">
                      +91
                    </span>
                    <input
                      id="patient-phone"
                      type="tel"
                      value={patientPhone}
                      onChange={(e) => { setPatientPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                      placeholder="98100 XXXXX"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className={`w-full px-space-md py-3 rounded-DEFAULT bg-surface-container text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.phone ? "ring-2 ring-error" : ""}`}
                      required
                    />
                  </div>
                  {errors.phone && <p className="text-label-sm text-error mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-surface-container rounded-DEFAULT p-space-md mb-space-md">
                <div className="text-label-sm font-display font-bold text-on-surface-variant uppercase tracking-wider mb-space-xs">Booking Summary</div>
                <div className="flex flex-wrap gap-space-xs text-label-md font-display font-semibold text-on-surface">
                  <span className="bg-surface-container-high px-space-sm py-0.5 rounded-full">{selectedClinic.shortName}</span>
                  <span className="bg-surface-container-high px-space-sm py-0.5 rounded-full">{selectedDay}</span>
                  <span className="bg-surface-container-high px-space-sm py-0.5 rounded-full">{selectedTime}</span>
                  <span className="bg-primary-container text-on-primary-container px-space-sm py-0.5 rounded-full">₹{selectedClinic.fee.toLocaleString()}</span>
                </div>
                <p className="text-body-sm text-on-surface-variant mt-space-xs">
                  {mode === "confirmation"
                    ? "Your request will be reviewed. Coordinator will WhatsApp confirmation within 10 minutes."
                    : "Booking confirmation will be sent via WhatsApp after submission."}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-space-sm py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="animate-spin material-symbols-outlined text-[20px]">progress_activity</span>
                    Confirming...
                  </>
                ) : (
                  <>
                    <span>Confirm OPD Token</span>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </>
                )}
              </button>

              <p className="text-body-sm text-on-surface-variant text-center mt-space-sm">
                No advance payment required. Pay at clinic via UPI / Cash.
              </p>
            </form>
          ) : (
            // Success state
            <div className="flex flex-col items-center text-center py-space-xl gap-space-md">
              <div className="w-16 h-16 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
                <span className="material-symbols-outlined text-[32px] material-symbols-filled">verified</span>
              </div>
              <div>
                <h2 className="text-headline-sm font-display font-bold text-on-surface">Token Registered!</h2>
                <p className="text-body-md text-on-surface-variant mt-space-xs max-w-sm">
                  {doctor.coordinator.name} will WhatsApp your confirmed slot within 10 minutes.
                </p>
              </div>
              <div className="bg-surface-container rounded-lg p-space-md w-full text-left">
                <div className="grid grid-cols-2 gap-space-xs text-body-sm">
                  <div><span className="text-on-surface-variant">Patient:</span> <strong className="text-on-surface">{patientName}</strong></div>
                  <div><span className="text-on-surface-variant">Clinic:</span> <strong className="text-on-surface">{selectedClinic.shortName}</strong></div>
                  <div><span className="text-on-surface-variant">Date:</span> <strong className="text-on-surface">{selectedDay}</strong></div>
                  <div><span className="text-on-surface-variant">Time:</span> <strong className="text-on-surface">{selectedTime}</strong></div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-space-xs">
                <Link href="/appointment" className="flex items-center justify-center gap-space-xs py-space-sm rounded-full bg-primary text-on-primary text-label-md font-display font-bold">
                  View My Appointment
                </Link>
                <button onClick={() => { setSubmitted(false); setPatientName(""); setPatientPhone(""); }} className="py-space-sm text-primary text-label-md font-display font-semibold hover:underline">
                  Book Another Slot
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Emergency note */}
        <div className="mt-space-md bg-error-container/60 rounded-DEFAULT p-space-md flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5 material-symbols-filled">emergency</span>
          <p className="text-body-sm text-on-error-container">
            <strong>Emergency?</strong> Do not book an OPD slot. Call{" "}
            <a href="tel:102" className="font-bold underline">102</a> /{" "}
            <a href="tel:108" className="font-bold underline">108</a> or go directly to{" "}
            <strong>{doctor.emergency.hospital}</strong> 24/7 ER.
          </p>
        </div>
      </div>
    </div>
  );
}
