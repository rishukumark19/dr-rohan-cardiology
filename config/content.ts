// ============================================================
// CONTENT CONFIGURATION — Edit to update FAQs & Patient Reviews
// No component code needs to change for content updates.
// ============================================================

import { doctor } from "./doctor";

// ─── FAQ Content ──────────────────────────────────────────────────────────────
// Add, remove, or reorder questions here.
// Categories auto-generate filter tabs on the /faq page.
// ─────────────────────────────────────────────────────────────────────────────
export const FAQS = [
  {
    category: "Booking",
    q: `How do I book an appointment with ${doctor.shortName}?`,
    a: `Three easy ways: (1) Use the 'Book Appointment' button on this website — our 7-step wizard takes under 2 minutes. (2) WhatsApp ${doctor.coordinator.name} directly on the number at the bottom of this page. (3) Call the clinic number during OPD hours. Confirmation is sent via WhatsApp within 10 minutes.`,
  },
  {
    category: "Booking",
    q: "Do I need an appointment before visiting the clinic?",
    a: `Yes, we strongly recommend booking in advance. Walk-in patients are seen only if slots are available. Prior booking guarantees your time, avoids long waiting, and ensures ${doctor.coordinator.name} can complete pre-consultation vitals before you see the doctor.`,
  },
  {
    category: "Booking",
    q: "Can I request a specific consultation time?",
    a: `Yes. Our booking wizard lets you choose your preferred date and time window. Requests are processed on a first-come basis. For urgent same-day requests, WhatsApp ${doctor.coordinator.name} directly — she handles priority bookings personally.`,
  },
  {
    category: "New Patients",
    q: "What should I bring for my first consultation?",
    a: "Carry: (1) All prior ECG strips and Echo CDs. (2) Recent blood reports (lipid profile, HbA1c, creatinine, TSH). (3) Your current medication blister strips — not just the prescription. (4) Aadhaar card or photo ID. (5) Insurance/TPA card if applicable. See our full Preparation Guide for details.",
  },
  {
    category: "New Patients",
    q: "How early should I arrive before my appointment?",
    a: `Please arrive 15 minutes before your scheduled time. This allows ${doctor.coordinator.name} time to record your baseline BP, SpO2, pulse, and weight — which ${doctor.shortName} reviews before entering the consultation room.`,
  },
  {
    category: "Locations",
    q: `Where does ${doctor.shortName} consult?`,
    a: `${doctor.shortName} consults at ${doctor.clinics.filter(c => !c.isVirtual).map(c => c.shortName).join(", ")}, and conducts Video OPD consultations from Monday to Saturday, 8:30 PM–10 PM. Visit our Locations page for the full week-wise schedule and directions.`,
  },
  {
    category: "Video Consultation",
    q: "How does a video consultation work?",
    a: `Book using the 'Video Consultation' option in our booking wizard. ${doctor.coordinator.name} will send a secure HD video link to your WhatsApp 15 minutes before your slot. Prescription and investigation orders are shared on WhatsApp within 10 minutes of the session ending. NMC-compliant digital Rx included.`,
  },
  {
    category: "Video Consultation",
    q: "Can I share prior reports during a video OPD?",
    a: `Yes. WhatsApp your ECG, Echo, or blood report images to ${doctor.coordinator.name} at least 2 hours before your video slot. ${doctor.shortName} reviews reports before starting the session.`,
  },
  {
    category: "Existing Patients",
    q: "Can an existing patient book a follow-up online?",
    a: `Yes. Select 'Existing Patient' in Step 1 of the booking wizard. Enter your registered mobile number. ${doctor.coordinator.name} will pull up your previous records automatically. Follow-up consultations are 15 minutes; new consultations are ${doctor.consultationDuration}–30 minutes.`,
  },
  {
    category: "Existing Patients",
    q: "I have a query between appointments. What should I do?",
    a: `WhatsApp ${doctor.coordinator.name} for minor queries (lab results, medication doubts, travel precautions). For new symptoms or anything clinical, please book a proper consultation slot. ${doctor.shortName} does not provide medical advice via WhatsApp directly.`,
  },
  {
    category: "Payments",
    q: "What is the consultation fee and how do I pay?",
    a: `Fees: ${doctor.clinics.filter(c => !c.isVirtual).map(c => `${c.shortName} — ₹${c.fee.toLocaleString()}`).join(". ")}. Video OPD — ₹${doctor.clinics.find(c => c.isVirtual)?.fee.toLocaleString() ?? "—"}. Payment is collected at the clinic via UPI or cash. TPA/insurance cashless may be available at select hospital clinics. No advance payment required for booking.`,
  },
  {
    category: "Rescheduling",
    q: "Can I reschedule my appointment?",
    a: "Yes. Use the 'Manage Appointment' link in your confirmation WhatsApp message or visit the Appointment page on this website. You can reschedule up to 4 hours before your slot. For urgent changes, WhatsApp the coordinator directly.",
  },
  {
    category: "Cancellation",
    q: "How do I cancel my appointment?",
    a: "You can cancel via the Appointment Management page or by WhatsApp-ing our coordinator. Please cancel at least 2 hours before your slot so it can be offered to another patient. There is no cancellation charge.",
  },
  {
    category: "Booking",
    q: "Can I contact the clinic through WhatsApp?",
    a: `Yes. Our Care Coordinator ${doctor.coordinator.name} manages the clinic WhatsApp desk and responds to all booking, scheduling, and general queries. The number is ${doctor.phone}. Available Mon–Sat, 9 AM–9 PM.`,
  },
];

// ─── Patient Reviews ──────────────────────────────────────────────────────────
// Add, remove, or reorder reviews here.
// Shown on /reviews page. Ensure patient consent before publishing names.
// ─────────────────────────────────────────────────────────────────────────────
export const REVIEWS = [
  {
    initials: "VG",
    name: "Vikram Grover",
    age: 58,
    procedure: "Trans-Radial Angioplasty",
    clinic: "Max Saket",
    rating: 5,
    date: "Oct 2024",
    quote: "Dr. Rohan did my stenting through the wrist. I was walking just 3 hours later and discharged the next morning. His warmth took away 90% of our family's anxiety. He called us himself the next day to check recovery.",
  },
  {
    initials: "AS",
    name: "Ananya Sengupta",
    age: 51,
    procedure: "Preventive Calcium Scoring",
    clinic: "GK-1 Clinic",
    rating: 5,
    date: "Sep 2024",
    quote: "Never felt rushed. Dr. Sharma sat with us for 25 minutes explaining every metric in Hindi and English. He actually removed two redundant medications prescribed elsewhere — that took clinical confidence and courage.",
  },
  {
    initials: "RK",
    name: "Rajesh Khanna",
    age: 54,
    procedure: "Post-Stent Follow-up",
    clinic: "Video OPD",
    rating: 5,
    date: "Sep 2024",
    quote: "Booked via WhatsApp, got confirmation in 8 minutes. The video call was crystal clear. Digital prescription arrived on WhatsApp within 10 minutes of the session ending. Sister Neha is exceptional — always responsive.",
  },
  {
    initials: "PD",
    name: "Priya Dhingra",
    age: 44,
    procedure: "Resistant Hypertension",
    clinic: "GK-1 Clinic",
    rating: 5,
    date: "Aug 2024",
    quote: "After 3 years of uncontrolled blood pressure with other doctors, Dr. Sharma identified a secondary cause in one visit. My BP is now perfectly controlled. I only wish I had come here sooner.",
  },
  {
    initials: "SM",
    name: "Suresh Malhotra",
    age: 63,
    procedure: "Pacemaker Implant",
    clinic: "Max Saket",
    rating: 5,
    date: "Jul 2024",
    quote: "Complex dual-chamber device done under local anaesthesia. Dr. Sharma explained the procedure to my entire family before and after. We are grateful for his steady hands and his human approach to medicine.",
  },
  {
    initials: "NB",
    name: "Nisha Bhat",
    age: 47,
    procedure: "Cardiac Risk Assessment (Video OPD)",
    clinic: "Video OPD",
    rating: 5,
    date: "Jul 2024",
    quote: "I live in Bengaluru and reached out for a second opinion on my father's angiogram report. Video consultation was thorough. Dr. Sharma flagged a stent overlap issue no one else had caught in 3 prior opinions.",
  },
];

export type FAQ = (typeof FAQS)[0];
export type Review = (typeof REVIEWS)[0];
