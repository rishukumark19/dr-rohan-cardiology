"use client";
import { getNextOpdSummary } from "@/lib/utils";
import { site as doctor } from "@/config/site.config";

/**
 * NextOpdBadge — dynamically calculates the next OPD availability
 * from the doctor's clinic schedule and renders an accurate live badge.
 * Replaces the hardcoded "OPD Today — GK-1 Clinic" in the hero.
 */
export default function NextOpdBadge() {
  const { label, clinicName, hours, isToday } = getNextOpdSummary(doctor.clinics);

  return (
    <div className="inline-flex items-center gap-space-sm px-space-md py-2 rounded-full bg-surface-container/50 backdrop-blur-md border border-outline-variant/30 shadow-sm mb-space-md max-w-full hover:bg-surface-container/70 transition-colors duration-300">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            isToday ? "bg-green-500" : "bg-primary-container"
          }`}
        />
        <span
          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
            isToday ? "bg-green-500" : "bg-primary"
          }`}
        />
      </span>
      <span className="text-label-sm font-display font-medium text-on-surface-variant tracking-wide leading-none pt-[1px] truncate min-w-0">
        <span className="whitespace-nowrap">
          {isToday ? "OPD Today" : `Next OPD: ${label}`}
          <span className="opacity-50 mx-1.5">|</span>
          <span className="font-semibold text-on-surface">{clinicName}</span>
          <span className="opacity-50 mx-1.5">•</span>
          <strong className={isToday ? "text-green-600 font-bold" : "text-primary font-bold"}>{hours}</strong>
        </span>
      </span>
    </div>
  );
}
