import type { Metadata } from "next";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = { title: "Patient Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface py-space-xl pb-28 md:pb-space-xl">
      <div className="max-w-3xl mx-auto px-margin">
        <h1 className="text-headline-lg-mobile md:text-headline-md font-display font-bold text-on-surface mb-space-lg">Patient Privacy Policy</h1>
        <div className="text-body-md text-secondary leading-relaxed flex flex-col gap-space-md">
          <p>This website is operated by the practice of {doctor.name}, {doctor.title} (NMC Reg. {doctor.nmc}), and is committed to protecting the privacy and confidentiality of all patient information.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">Information We Collect</h2>
          <p>We collect only the information necessary to provide appointment booking and clinical coordination services: patient name, mobile number, and preferred appointment details. This information is used solely to confirm and coordinate your clinical appointment.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">How We Use Your Information</h2>
          <p>Your contact information is used exclusively to confirm appointments via WhatsApp, send appointment reminders, and enable our Care Coordinator to assist you. We do not sell, share, or transfer your personal data to third parties except as required by law or for direct clinical care.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">Clinical Record Confidentiality</h2>
          <p>All clinical information shared during consultations is governed by Indian medical ethics guidelines and the NMC (National Medical Commission) patient confidentiality standards. Consultation notes, prescriptions, and diagnostic findings are strictly confidential.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">WhatsApp Communication</h2>
          <p>When you communicate with our clinic via WhatsApp, you acknowledge that WhatsApp is governed by Meta&apos;s privacy policy. We recommend sharing sensitive medical documents only through encrypted means. Our team will never request financial information via WhatsApp.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">Contact</h2>
          <p>For privacy-related concerns, contact us at {doctor.phone}.</p>
          <p className="text-label-sm text-outline">Last updated: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
