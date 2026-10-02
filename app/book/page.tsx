"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { site as doctor } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface BookingData {
  clinicId: string;
  day: string;
  dayDate: string;
  time: string;
  name: string;
  phone: string;
  age: string;
  gender: string;
  reason: string;
  patientType: "new" | "existing";
}

const COMMON_REASONS = [
  "Chest Pain / Angina",
  "Post-Stent Follow-up",
  "Preventive Calcium Score",
  "Second Opinion",
  "Hypertension / BP Check",
  "Routine Heart Checkup",
];

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
      date: `${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`,
      fullDate: `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`,
      dayIndex: d.getDay(),
    });
  }
  return days;
}

function getClinicTimeSlots(clinicId: string): string[] {
  if (clinicId === "saket") {
    return ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"];
  }
  if (clinicId === "video") {
    return ["08:30 PM", "08:50 PM", "09:10 PM", "09:30 PM", "09:50 PM"];
  }
  // Default to GK-1 evening OPD
  return ["04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"];
}

function saveBookingToStorage(data: BookingData & { token: string; bookingId: string }) {
  try {
    localStorage.setItem("dr-booking", JSON.stringify(data));
  } catch {}
}

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState<0 | 1>(0);
  const [submitting, setSubmitting] = useState(false);

  const DAYS = generateDays(7);
  const defaultClinic = doctor.clinics[0];
  const firstValidDay = DAYS.find((d) => defaultClinic.daysArray.includes(d.dayIndex)) ?? DAYS[0];
  const defaultSlots = getClinicTimeSlots(defaultClinic.id);

  const [booking, setBooking] = useState<BookingData>({
    clinicId: defaultClinic.id,
    day: firstValidDay.label,
    dayDate: firstValidDay.fullDate,
    time: defaultSlots[0],
    name: "",
    phone: "",
    age: "",
    gender: "Male",
    reason: "",
    patientType: "new",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});

  const selectedClinic = doctor.clinics.find((c) => c.id === booking.clinicId) ?? defaultClinic;
  const availableSlots = getClinicTimeSlots(selectedClinic.id);

  function set<K extends keyof BookingData>(key: K, value: BookingData[K]) {
    setBooking((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleClinicChange(clinicId: string) {
    const nextClinic = doctor.clinics.find((c) => c.id === clinicId) ?? defaultClinic;
    const validDay = DAYS.find((d) => nextClinic.daysArray.includes(d.dayIndex)) ?? DAYS[0];
    const slots = getClinicTimeSlots(clinicId);

    setBooking((prev) => ({
      ...prev,
      clinicId,
      day: validDay.label,
      dayDate: validDay.fullDate,
      time: slots[0],
    }));
  }

  function validateStep0(): boolean {
    // Clinic and slot are selected by default
    return true;
  }

  function validateStep1(): boolean {
    const e: Partial<Record<keyof BookingData, string>> = {};
    if (!booking.name.trim()) e.name = "Please enter patient name";
    if (!/^[6-9]\d{9}$/.test(booking.phone.trim())) {
      e.phone = "Enter a valid 10-digit mobile number";
    }
    if (!booking.age.trim()) {
      e.age = "Please enter patient age";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleConfirmAppointment() {
    if (!validateStep1()) return;
    setSubmitting(true);

    const token = `RS-${selectedClinic.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const bookingId = `BK${Date.now().toString(36).toUpperCase()}`;

    saveBookingToStorage({
      ...booking,
      token,
      bookingId,
    });

    router.push("/book/confirmation");
  }

  return (
    <div className="min-h-screen bg-surface-container-low" style={{ paddingBottom: "calc(var(--mobile-bar-height, 0px) + 2rem)" }}>
      <div className="max-w-2xl mx-auto px-margin py-space-xl">

        {/* Header & Steps */}
        <div className="mb-space-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-primary text-label-sm font-display font-bold uppercase tracking-wider">
                Direct OPD Desk
              </span>
              <h1 className="text-headline-md font-display font-extrabold text-on-surface">
                Book Consultation
              </h1>
            </div>
            <span className="text-label-sm font-display font-bold px-3 py-1 rounded-full bg-surface-container text-on-surface-variant">
              Step {step + 1} of 2
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden my-3">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: step === 0 ? "50%" : "100%" }}
            />
          </div>
          <div className="text-body-sm font-display font-semibold text-on-surface-variant">
            {step === 0 ? "1. Select Clinic & Preferred Slot" : "2. Patient Details & Instant Confirmation"}
          </div>
        </div>

        {/* STEP 0: Select Clinic, Date, and Time */}
        {step === 0 && (
          <div className="space-y-space-lg">
            {/* Clinic Selection */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-card p-5 sm:p-space-lg border border-surface-container">
              <h2 className="text-title-md font-display font-bold text-on-surface mb-space-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">location_on</span>
                Select Consultation Location
              </h2>
              <div className="grid grid-cols-1 gap-space-sm">
                {doctor.clinics.map((clinic) => {
                  const isSelected = booking.clinicId === clinic.id;
                  return (
                    <button
                      key={clinic.id}
                      type="button"
                      onClick={() => handleClinicChange(clinic.id)}
                      className={`text-left p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? "border-primary bg-primary-container/10 shadow-sm ring-1 ring-primary"
                          : "border-outline-variant/30 hover:border-outline-variant hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-display font-bold px-2 py-0.5 rounded-full ${
                            clinic.isVirtual
                              ? "bg-primary-container/20 text-primary"
                              : clinic.type === "flagship"
                              ? "bg-tertiary-fixed text-on-tertiary-fixed"
                              : "bg-surface-container text-on-surface-variant"
                          }`}>
                            {clinic.badge}
                          </span>
                          <span className="font-display font-bold text-on-surface text-label-lg">
                            {clinic.name}
                          </span>
                        </div>
                        <p className="text-body-sm text-on-surface-variant">
                          {clinic.days} • {clinic.hours}
                        </p>
                        <p className="text-[12px] text-outline font-medium">
                          {clinic.notes}
                        </p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/20">
                        <span className="text-title-md font-display font-extrabold text-primary">
                          ₹{clinic.fee.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-on-surface-variant font-medium">
                          {clinic.isVirtual ? "Digital Rx" : "Pay at Clinic"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date Selection */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-card p-5 sm:p-space-lg border border-surface-container">
              <h2 className="text-title-md font-display font-bold text-on-surface mb-space-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">calendar_month</span>
                Select Preferred Date
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DAYS.map((d) => {
                  const isOpen = selectedClinic.daysArray.includes(d.dayIndex);
                  const isSelected = booking.day === d.label;
                  return (
                    <button
                      key={d.label}
                      type="button"
                      disabled={!isOpen}
                      onClick={() => {
                        if (isOpen) {
                          setBooking((prev) => ({
                            ...prev,
                            day: d.label,
                            dayDate: d.fullDate,
                          }));
                        }
                      }}
                      className={`p-3 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-0.5 min-h-[64px] border ${
                        !isOpen
                          ? "bg-surface-container/30 border-transparent text-outline cursor-not-allowed opacity-50"
                          : isSelected
                          ? "bg-primary border-primary text-on-primary shadow-glow-cyan-sm"
                          : "bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      <span className="text-label-md font-display font-bold leading-tight">
                        {d.label}
                      </span>
                      <span className={`text-[11px] leading-tight ${isSelected ? "text-primary-fixed" : "text-on-surface-variant"}`}>
                        {d.date}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[12px] text-on-surface-variant mt-3 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-primary">info</span>
                Only dates when {selectedClinic.shortName} OPD is in session are selectable.
              </p>
            </div>

            {/* Time Slot Selection */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-card p-5 sm:p-space-lg border border-surface-container">
              <h2 className="text-title-md font-display font-bold text-on-surface mb-space-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-primary">schedule</span>
                Select Time Slot
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {availableSlots.map((slot) => {
                  const isSelected = booking.time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => set("time", slot)}
                      className={`py-3 px-2 rounded-xl text-label-md font-display font-bold text-center transition-all border min-h-[46px] ${
                        isSelected
                          ? "bg-primary border-primary text-on-primary shadow-glow-cyan-sm"
                          : "bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  if (validateStep0()) setStep(1);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 active:scale-[0.98] transition-all min-h-[50px]"
              >
                <span>Continue to Patient Details</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Patient Details & Instant Confirmation */}
        {step === 1 && (
          <div className="space-y-space-lg">
            {/* Booking Summary Box */}
            <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[11px] font-display font-bold uppercase tracking-wider text-primary">
                  Selected Appointment Slot
                </span>
                <div className="text-title-md font-display font-extrabold text-on-surface mt-0.5">
                  {selectedClinic.name}
                </div>
                <div className="text-body-sm text-on-surface-variant flex items-center gap-2 mt-1">
                  <span>{booking.dayDate}</span>
                  <span>•</span>
                  <span className="font-bold text-primary">{booking.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] text-on-surface-variant font-medium uppercase tracking-wider">Consultation Fee</div>
                  <div className="text-title-md font-display font-extrabold text-primary">
                    ₹{selectedClinic.fee.toLocaleString()}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="text-label-sm font-display font-bold text-primary hover:underline px-3 py-1.5 rounded-lg bg-surface-container-high"
                >
                  Change Slot
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-card p-5 sm:p-space-lg border border-surface-container space-y-space-md">
              <h2 className="text-title-md font-display font-bold text-on-surface">
                Patient Information
              </h2>

              {/* Patient Type */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => set("patientType", "new")}
                  className={`flex-1 py-2 rounded-xl text-label-sm font-display font-bold transition-all border ${
                    booking.patientType === "new"
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container-low border-outline-variant/30 text-on-surface"
                  }`}
                >
                  New Patient
                </button>
                <button
                  type="button"
                  onClick={() => set("patientType", "existing")}
                  className={`flex-1 py-2 rounded-xl text-label-sm font-display font-bold transition-all border ${
                    booking.patientType === "existing"
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container-low border-outline-variant/30 text-on-surface"
                  }`}
                >
                  Follow-up Patient
                </button>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-label-sm font-display font-bold text-on-surface mb-1">
                  Patient Full Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  value={booking.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                {errors.name && <p className="text-error text-body-sm mt-1">{errors.name}</p>}
              </div>

              {/* Mobile Phone */}
              <div>
                <label className="block text-label-sm font-display font-bold text-on-surface mb-1">
                  Mobile Number (WhatsApp) <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant font-display font-bold text-label-md">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9810123456"
                    value={booking.phone}
                    onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-14 pr-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-mono"
                  />
                </div>
                {errors.phone && <p className="text-error text-body-sm mt-1">{errors.phone}</p>}
                <p className="text-[11px] text-on-surface-variant mt-1">
                  Slot token and prescription details will be sent to this number.
                </p>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="block text-label-sm font-display font-bold text-on-surface mb-1">
                    Age <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Years"
                    value={booking.age}
                    onChange={(e) => set("age", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  {errors.age && <p className="text-error text-body-sm mt-1">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-label-sm font-display font-bold text-on-surface mb-1">
                    Gender
                  </label>
                  <select
                    value={booking.gender}
                    onChange={(e) => set("gender", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Consultation Reason */}
              <div>
                <label className="block text-label-sm font-display font-bold text-on-surface mb-1">
                  Reason for Consultation (Optional)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {COMMON_REASONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => set("reason", r)}
                      className={`text-[11px] font-display font-semibold px-2.5 py-1 rounded-full transition-colors ${
                        booking.reason === r
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Or describe briefly (e.g. breathless on exertion, previous angiogram CD)"
                  value={booking.reason}
                  onChange={(e) => set("reason", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-on-surface text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              {/* Pay at Clinic Guarantee Note */}
              <div className="p-3.5 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">
                  verified
                </span>
                <div className="text-body-sm text-on-surface">
                  <strong>Zero Advance Payment Required:</strong> Your slot token is reserved instantly. Consultation fee of ₹{selectedClinic.fee.toLocaleString()} is collected at the clinic counter via UPI, Card, or Cash.
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-space-sm">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="px-6 py-3.5 rounded-full bg-surface-container text-on-surface font-display font-bold text-label-md hover:bg-surface-container-high transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleConfirmAppointment}
                  className="flex-1 inline-flex items-center justify-center gap-space-xs py-3.5 px-space-xl rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 min-h-[50px]"
                >
                  {submitting ? (
                    <span>Reserving Slot...</span>
                  ) : (
                    <>
                      <span>Confirm Appointment (Pay at Clinic)</span>
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Alternative */}
              <div className="text-center pt-2 border-t border-outline-variant/20">
                <span className="text-[12px] text-on-surface-variant block mb-2">
                  Prefer direct personal assistance from our clinical care desk?
                </span>
                <a
                  href={buildWhatsAppUrl({
                    purpose: "booking",
                    patientName: booking.name || undefined,
                    clinic: selectedClinic.shortName,
                    date: booking.dayDate,
                    time: booking.time,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-space-lg py-2.5 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 font-display font-bold text-label-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                  Book via WhatsApp with Sister Neha
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
