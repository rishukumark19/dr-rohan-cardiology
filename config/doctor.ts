// ============================================================
// DOCTOR CONFIGURATION — Edit this file to deploy for any doctor
// ============================================================

export const doctor = {
  name: "Dr. Rohan Sharma",
  shortName: "Dr. Sharma",
  title: "Senior Interventional Cardiologist",
  qualifications: "MD, DM Cardiology (AIIMS New Delhi) • FACC (USA) • FCSI Fellow",
  speciality: "Cardiology",
  institution: "AIIMS New Delhi",
  nmc: "#54219",
  photo: "/doctor-photo.jpg",

  // Key metrics
  experience: "15+",
  consultations: "18,000+",
  procedures: "4,500+",
  satisfaction: "99.2%",
  reviewCount: "2,100+",
  rating: "4.9",

  // Contact
  phone: "+91 9810123456",
  phoneRaw: "+919810123456",
  whatsapp: "919810123456",
  email: "",
  languages: ["Hindi", "English"],

  // Coordinator
  coordinator: {
    name: "Sister Neha",
    role: "Clinical Care Coordinator",
    whatsapp: "919810123456",
  },

  // Consulting locations
  clinics: [
    {
      id: "gk1",
      name: "Sharma Heart & Vascular Clinic",
      shortName: "GK-1 Clinic",
      type: "flagship" as const,
      address: "E-24 Main Market Road, Greater Kailash 1 (GK-1), New Delhi 110048",
      fee: 1500,
      days: "Tue, Thu & Sat",
      hours: "4:30 PM – 8:00 PM",
      mapsUrl: "https://maps.google.com/?q=Greater+Kailash+1+Market+New+Delhi",
      phone: "+91 9810123456",
      isVirtual: false,
      badge: "Flagship Private Clinic",
      tagColor: "tertiary" as const,
      diagnostics: ["2D-Echo", "12-Lead ECG", "Treadmill Test (TMT)", "Blood Lab"],
      notes: "Pay at Clinic • Token Verified • 7-day free follow-up",
    },
    {
      id: "saket",
      name: "Max Super Speciality Hospital",
      shortName: "Max Saket",
      type: "hospital" as const,
      address: "Room 214, Cardiology Wing, 2 Press Enclave Marg, Saket, South Delhi",
      fee: 1600,
      days: "Mon, Wed & Fri",
      hours: "10:00 AM – 1:30 PM",
      mapsUrl: "https://maps.google.com/?q=Max+Super+Speciality+Hospital+Saket+New+Delhi",
      phone: "+91 9810123456",
      isVirtual: false,
      badge: "Tertiary Care Attachment",
      tagColor: "secondary" as const,
      diagnostics: ["Cath Lab", "Critical Care Desk", "TPA Cashless"],
      notes: "Hospital OPD Desk billing • TPA Cashless Active",
    },
    {
      id: "gurugram",
      name: "Medanta – The Medicity",
      shortName: "Medanta Gurugram",
      type: "visiting" as const,
      address: "Floor 3, Room 18, Sector 38, CH Bakhtawar Singh Rd, Gurugram",
      fee: 1800,
      days: "Alternate Saturdays",
      hours: "10:30 AM – 2:00 PM",
      mapsUrl: "https://maps.google.com/?q=Medanta+The+Medicity+Gurugram",
      phone: "+91 9810123456",
      isVirtual: false,
      badge: "Super-Speciality Chamber",
      tagColor: "primary" as const,
      diagnostics: ["Complex CTO Angioplasty", "CRT-D Pacemakers", "TAVI Evaluations"],
      notes: "Prior booking required",
    },
    {
      id: "video",
      name: "Virtual Video Consultation",
      shortName: "Video OPD",
      type: "telehealth" as const,
      address: "Encrypted HD Video + Digital Rx via WhatsApp",
      fee: 1200,
      days: "Mon – Sat",
      hours: "8:30 PM – 10:00 PM",
      mapsUrl: null,
      phone: null,
      isVirtual: true,
      badge: "Virtual Telehealth",
      tagColor: "tertiary" as const,
      diagnostics: ["NMC e-Prescription", "Digital Rx on WhatsApp", "Pan-India & Global"],
      notes: "Ideal for 2nd opinions & follow-ups",
    },
  ],

  // Specialities
  specialities: [
    {
      id: "angioplasty",
      name: "Trans-Radial Angioplasty",
      subtitle: "Wrist artery route • Same-day discharge",
      icon: "monitor_heart",
      description:
        "Advanced radial coronary stenting via the wrist artery instead of the groin. Minimizes bleeding risk, permits immediate walking after the procedure, and facilitates discharge within 24 hours.",
    },
    {
      id: "preventive",
      name: "Preventive Cardiology & Calcium Score",
      subtitle: "Coronary CT scanning & early risk profiling",
      icon: "health_and_safety",
      description:
        "Comprehensive coronary artery calcium scoring (CAC), genetic lipid panels, and lifestyle recalibration to reverse arterial plaque build-up before symptoms emerge.",
    },
    {
      id: "heartfailure",
      name: "Heart Failure & Pacemakers / AICD",
      subtitle: "Cardiac resynchronization & leadless devices",
      icon: "cardiology",
      description:
        "State-of-the-art dual-chamber pacing, leadless implantable cardioverter-defibrillators (AICD), and guideline-directed medical therapy for reduced ejection fraction (EF%).",
    },
    {
      id: "hypertension",
      name: "Resistant BP & Complex Cholesterol",
      subtitle: "Refractory hypertension & PCSK9 therapies",
      icon: "vital_signs",
      description:
        "Personalized treatment for secondary hypertension, 24-hr ambulatory BP monitoring, and advanced biologic PCSK9 inhibitors for familial hypercholesterolemia.",
    },
  ],

  // Emergency
  emergency: {
    number: "102",
    alternateNumber: "108",
    hospital: "Max Hospital Saket",
    hospitalPhone: "011-26515050",
    message:
      "Experiencing chest pain, sudden breathlessness, or cold sweats? Do not wait for OPD. Call 102/108 immediately or go to the nearest 24/7 cardiac emergency.",
  },

  // SEO
  seo: {
    siteName: "Dr. Rohan Sharma — Interventional Cardiologist, New Delhi",
    description:
      "Book a consultation with Dr. Rohan Sharma, Senior Interventional Cardiologist (AIIMS New Delhi). Clinics at Greater Kailash-1, Max Saket & Medanta. Video OPD available.",
    keywords:
      "cardiologist new delhi, interventional cardiologist delhi, angioplasty specialist, heart specialist delhi, dr rohan sharma, max saket cardiology, GK1 heart clinic",
    domain: "https://drrohansharma.in",
    twitterHandle: "",
  },

  // Care philosophy quote
  philosophy:
    '"Treating the human, not just the angiogram. Unhurried 20+ minute consultations with clear bilingual explanations."',
};

export type Clinic = (typeof doctor.clinics)[0];
export type Speciality = (typeof doctor.specialities)[0];
