// ============================================================
// UTILITY FUNCTIONS — Shared helpers used across the platform
// ============================================================

/**
 * Returns the first name initials from a full name.
 * e.g. "Dr. Rohan Sharma" → "RS"
 */
export function getInitials(name: string): string {
  return name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0].toUpperCase())
    .join("")
    .slice(0, 2);
}

/**
 * Format a fee number to Indian currency string.
 * e.g. 1500 → "₹1,500"
 */
export function formatFee(fee: number): string {
  return `₹${fee.toLocaleString("en-IN")}`;
}

/**
 * Format a Date to a human-readable Indian format.
 * e.g. new Date() → "Monday, 29 September 2026"
 */
export function formatIndianDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Format a Date to a short Indian date.
 * e.g. new Date() → "Mon, 29 Sep"
 */
export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/**
 * Given an array of JS day indexes (0=Sun, 1=Mon ... 6=Sat),
 * returns the next upcoming date that matches one of those days.
 * If today matches, returns today.
 */
export function getNextOpdDate(daysArray: number[]): Date {
  const today = new Date();
  const todayDay = today.getDay();

  // Find the smallest positive offset to the next matching day
  const offsets = daysArray.map((d) => {
    const diff = (d - todayDay + 7) % 7;
    return diff;
  });

  const minOffset = Math.min(...offsets);
  const next = new Date(today);
  next.setDate(today.getDate() + minOffset);
  return next;
}

/**
 * Given the doctor's clinic list, returns a human-readable string
 * describing the next OPD availability across all physical clinics.
 * e.g. "Today · GK-1 Clinic · 4:30–8:00 PM"
 */
export function getNextOpdSummary(
  clinics: { id: string; shortName: string; daysArray: number[]; hours: string; isVirtual: boolean }[]
): { label: string; clinicName: string; hours: string; isToday: boolean } {
  const physicalClinics = clinics.filter((c) => !c.isVirtual);
  const today = new Date();
  const todayDay = today.getDay();

  let bestOffset = Infinity;
  let bestClinic = physicalClinics[0];

  for (const clinic of physicalClinics) {
    for (const d of clinic.daysArray) {
      const offset = (d - todayDay + 7) % 7;
      if (offset < bestOffset) {
        bestOffset = offset;
        bestClinic = clinic;
      }
    }
  }

  const isToday = bestOffset === 0;
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + bestOffset);

  let label: string;
  if (isToday) {
    label = "Today";
  } else if (bestOffset === 1) {
    label = "Tomorrow";
  } else {
    label = nextDate.toLocaleDateString("en-IN", { weekday: "long" });
  }

  return {
    label,
    clinicName: bestClinic.shortName,
    hours: bestClinic.hours,
    isToday,
  };
}

/**
 * Truncate text to a max character count with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
