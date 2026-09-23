"use client";
import { getNextOpdSummary } from "@/lib/utils";
import { doctor } from "@/config/doctor";

/**
 * NextOpdBadge — dynamically calculates the next OPD availability
 * from the doctor's clinic schedule and renders an accurate live badge.
 * Replaces the hardcoded "OPD Today — GK-1 Clinic" in the hero.
 */
export default function NextOpdBadge() {
  const { label, clinicName, hours, isToday } = getNextOpdSummary(doctor.clinics);

  return (
    <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-2xl sm:rounded-full bg-surface-container shadow-card mb-space-lg max-w-full">
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isToday ? "bg-tertiary" : "bg-primary-container"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isToday ? "bg-tertiary" : "bg-primary"
          }`}
        />
      </span>
      <span className="text-label-sm font-display font-semibold text-on-surface leading-snug">
        {isToday ? "OPD Today" : `Next OPD: ${label}`}
        &nbsp;—&nbsp;
        {clinicName}&nbsp;•&nbsp;
        <strong className={isToday ? "text-tertiary" : "text-primary"}>{hours}</strong>
      </span>
    </div>
  );
}
