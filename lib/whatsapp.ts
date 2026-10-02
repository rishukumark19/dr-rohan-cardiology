import { site as doctor } from "@/config/site.config";

interface WhatsAppOptions {
  purpose: "booking" | "inquiry" | "followup" | "cancel" | "reschedule" | "confirmation";
  patientName?: string;
  clinic?: string;
  date?: string;
  time?: string;
  token?: string;
}

export function buildWhatsAppUrl(opts: WhatsAppOptions): string {
  const { purpose, patientName, clinic, date, time, token } = opts;
  const number = doctor.whatsapp;

  let message = "";

  switch (purpose) {
    case "confirmation":
    case "booking":
      message = [
        `Hello Sister Neha 🙏`,
        token ? `I have reserved an appointment with ${doctor.shortName}.` : `I would like to book an appointment with ${doctor.shortName}.`,
        token ? `Token: ${token}` : "",
        patientName ? `Patient: ${patientName}` : "",
        clinic ? `Clinic: ${clinic}` : "",
        date ? `Date: ${date}` : "",
        time ? `Time: ${time}` : "",
        `Please confirm my slot. Thank you.`,
      ].filter(Boolean).join("\n");
      break;

    case "followup":
      message = `Hello Sister Neha 🙏\nI have an upcoming appointment with ${doctor.shortName} and had a quick query. Could you please help?`;
      break;

    case "cancel":
      message = `Hello Sister Neha 🙏\nI need to cancel my upcoming appointment with ${doctor.shortName}. Please guide me on the cancellation process. Thank you.`;
      break;

    case "reschedule":
      message = [
        `Hello Sister Neha 🙏`,
        `I need to reschedule my appointment with ${doctor.shortName}.`,
        date ? `New Preferred Date: ${date}` : "",
        time ? `New Preferred Time: ${time}` : "",
        `Could you please confirm availability? Thank you.`,
      ].filter(Boolean).join("\n");
      break;

    case "inquiry":
    default:
      message = `Hello 🙏\nI would like to enquire about an appointment with ${doctor.shortName}. Could you please share the available dates and clinics?`;
      break;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildCallUrl(): string {
  return `tel:${doctor.phoneRaw}`;
}
