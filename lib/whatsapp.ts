import { doctor } from "@/config/doctor";

/**
 * Build a pre-filled WhatsApp URL with dynamic message content
 */
export function buildWhatsAppUrl(options: {
  clinic?: string;
  date?: string;
  time?: string;
  patientName?: string;
  purpose?: "booking" | "inquiry" | "coordinator" | "followup";
}): string {
  const { clinic, date, time, patientName, purpose = "inquiry" } = options;
  const base = `https://wa.me/${doctor.whatsapp}`;

  let message = "";

  if (purpose === "booking") {
    message = `Hello Dr. ${doctor.shortName.replace("Dr. ", "")}'s Care Desk,\n\nI would like to book a consultation.\n`;
    if (patientName) message += `Patient Name: ${patientName}\n`;
    if (clinic) message += `Preferred Clinic: ${clinic}\n`;
    if (date) message += `Preferred Date: ${date}\n`;
    if (time) message += `Preferred Time: ${time}\n`;
    message += `\nPlease confirm my appointment slot.`;
  } else if (purpose === "coordinator") {
    message = `Hi Sister Neha, I need guidance booking an OPD slot with ${doctor.name}.`;
  } else if (purpose === "followup") {
    message = `Hello, I am an existing patient of ${doctor.name} and would like to coordinate a follow-up visit.`;
  } else {
    message = `Hello ${doctor.name}'s Care Desk, I would like to inquire about a consultation.`;
  }

  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a tel: link
 */
export function buildCallUrl(phone?: string): string {
  return `tel:${phone ?? doctor.phoneRaw}`;
}
