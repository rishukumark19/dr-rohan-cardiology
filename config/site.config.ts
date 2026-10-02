// ============================================================
// SITE CONFIGURATION — Edit this file to deploy for any doctor
// ============================================================

export const site = {
  // ── BRANDING & THEME ──────────────────────────────
  brand: {
    primaryColor: "#00677d",      // Main brand color (hex)
    primaryContainer: "#00b4d8",  // Secondary/accent color (hex)
    fontFamily: "Inter, sans-serif",
  },

  // ── DOCTOR IDENTITY ────────────────────────────────
  name: "Dr. Rohan Sharma",
  shortName: "Dr. Sharma",
  title: "Senior Interventional Cardiologist",
  qualifications: "MD, DM Cardiology (AIIMS New Delhi) • FACC (USA) • FCSI Fellow",
  speciality: "Cardiology",
  institution: "AIIMS New Delhi",
  nmc: "#54219",
  photo: "/doctor-photo.jpg",
  experience: "15+",
  experienceYears: 15,
  heroTagline: "Unhurried 20-minute consultations in interventional cardiac care.",
  philosophy: '"Treating the human, not just the angiogram. Unhurried 20+ minute consultations with clear bilingual explanations."',
  languages: ["Hindi", "English"],
  footerBio: "Specializing in trans-radial coronary interventions and cardiovascular care across South Delhi & NCR.",

  // ── METRICS (shown on homepage) ───────────────────
  stats: [
    { key: "experience",    label: "Years Practice",       sub: "AIIMS & Senior Fellowships",   icon: "award_star",    color: "text-primary" },
    { key: "consultations", label: "Consultations",        sub: "Clinical OPD Patients",         icon: "ecg_heart",     color: "text-primary" },
    { key: "procedures",    label: "Radial Interventions", sub: "Wrist-entry Angioplasties",     icon: "blood_pressure", color: "text-primary" },
    { key: "satisfaction",  label: "Satisfaction",         sub: "Over 2,100+ Reviews",           icon: "thumb_up",      color: "text-primary" },
  ],
  statsValues: {
    experience: "15+",
    consultations: "18,000+",
    procedures: "4,500+",
    satisfaction: "99.2%",
  },
  rating: "4.9",
  reviewCount: "2,100+",
  reviewCountRaw: 2100,

  // ── CONTACT ────────────────────────────────────────
  phone: "+91 9810123456",
  phoneRaw: "+919810123456",
  whatsapp: "919810123456",
  email: "",
  locationDesc: "South Delhi & NCR",

  city: "New Delhi",
  state: "Delhi",
  pincode: "110048",
  country: "IN",

  // ── BOOKING & PAYMENT ──────────────────────────────
  coordinator: {
    name: "Sister Neha",
    role: "Clinical Care Coordinator",
    whatsapp: "919810123456",
  },
  consultationDuration: 25,
  bookingMode: "confirmation" as "instant" | "confirmation" | "whatsapp" | "call",
  
  payment: {
    mode: "razorpay" as "razorpay" | "upi" | "clinic",
    razorpayKeyId: "rzp_test_YOUR_KEY_ID", // Replace with real key
  },

  // ── CLINICS ────────────────────────────────────────
  clinics: [
    {
      id: "gk1",
      name: "Sharma Heart & Vascular Clinic",
      shortName: "GK-1 Clinic",
      type: "flagship",
      address: "E-24 Main Market Road, Greater Kailash 1 (GK-1), New Delhi 110048",
      fee: 1500,
      days: "Tue, Thu & Sat",
      hours: "4:30 PM – 8:00 PM",
      daysArray: [2, 4, 6],
      mapsUrl: "https://maps.google.com/?q=Greater+Kailash+1+Market+New+Delhi",
      phone: "+91 9810123456",
      isVirtual: false,
      badge: "Flagship Private Clinic",
      tagColor: "tertiary",
      diagnostics: ["2D-Echo", "12-Lead ECG", "Treadmill Test (TMT)", "Blood Lab"],
      notes: "Pay at Clinic • Token Verified • 7-day free follow-up",
    },
    {
      id: "saket",
      name: "Max Super Speciality Hospital",
      shortName: "Max Saket",
      type: "hospital",
      address: "Room 214, Cardiology Wing, 2 Press Enclave Marg, Saket, South Delhi",
      fee: 1600,
      days: "Mon, Wed & Fri",
      hours: "10:00 AM – 1:30 PM",
      daysArray: [1, 3, 5],
      mapsUrl: "https://maps.google.com/?q=Max+Super+Speciality+Hospital+Saket+New+Delhi",
      phone: "+91 9810123456",
      isVirtual: false,
      badge: "Tertiary Care Attachment",
      tagColor: "secondary",
      diagnostics: ["Cath Lab", "Critical Care Desk", "TPA Cashless"],
      notes: "Hospital OPD Desk billing • TPA Cashless Active",
    },
    {
      id: "video",
      name: "Virtual Video Consultation",
      shortName: "Video OPD",
      type: "telehealth",
      address: "Encrypted HD Video + Digital Rx via WhatsApp",
      fee: 1200,
      days: "Mon – Sat",
      hours: "8:30 PM – 10:00 PM",
      daysArray: [1, 2, 3, 4, 5, 6],
      mapsUrl: null,
      phone: null,
      isVirtual: true,
      badge: "Virtual Telehealth",
      tagColor: "tertiary",
      diagnostics: ["NMC e-Prescription", "Digital Rx on WhatsApp", "Pan-India & Global"],
      notes: "Ideal for 2nd opinions & follow-ups",
    },
  ],

  // ── SPECIALITIES ───────────────────────────────────
  specialities: [
    {
      id: "angioplasty",
      name: "Trans-Radial Angioplasty",
      subtitle: "Wrist artery route • Same-day discharge",
      icon: "monitor_heart",
      description: "Advanced radial coronary stenting via the wrist artery instead of the groin. Minimizes bleeding risk, permits immediate walking after the procedure, and facilitates discharge within 24 hours.",
    },
    {
      id: "preventive",
      name: "Preventive Cardiology & Calcium Score",
      subtitle: "Coronary CT scanning & early risk profiling",
      icon: "health_and_safety",
      description: "Comprehensive coronary artery calcium scoring (CAC), genetic lipid panels, and lifestyle recalibration to reverse arterial plaque build-up before symptoms emerge.",
    },
  ],
  footerSpecialities: [
    "Trans-Radial Angioplasty",
    "Drug-Eluting Stents",
    "Preventive Calcium Score",
    "Video Telehealth OPD",
  ],

  // ── ABOUT PAGE ─────────────────────────────────────
  aboutBio: {
    p1: "Dr. Rohan Sharma is a Senior Interventional Cardiologist with over 15 years of hands-on clinical experience in complex coronary interventions, preventive cardiology, and advanced cardiac device implantation. Trained at AIIMS New Delhi — one of India's most prestigious medical institutions — he is a Fellow of the American College of Cardiology (FACC) and the Cardiological Society of India (FCSI).",
    p2: "Dr. Sharma is widely recognised for his expertise in trans-radial (wrist-entry) coronary angioplasty, enabling patients to walk within 3 hours of the procedure with same-day discharge in eligible cases. He conducts unhurried 20–30 minute consultations and communicates clinical findings in both Hindi and English, believing that informed patients make better health decisions.",
  },
  credentialPills: [
    "MD, AIIMS New Delhi",
    "DM Cardiology (Gold Medalist)",
    "FACC — American College of Cardiology",
    "FCSI — Cardiological Society of India",
    "NMC #54219",
  ],
  education: [
    { year: "2000–2005", degree: "MBBS", institution: "All India Institute of Medical Sciences (AIIMS), New Delhi", type: "Medical Degree" },
    { year: "2008–2011", degree: "DM — Cardiology", institution: "AIIMS New Delhi", type: "Super-Specialty" },
  ],
  experience_timeline: [
    { year: "2015–2020", role: "Consultant Interventional Cardiologist", institution: "Max Super Speciality Hospital, Saket", type: "Hospital" },
    { year: "2020–Now", role: "Senior Consultant & Director", institution: "Sharma Heart & Vascular Clinic, GK-1", type: "Private Practice" },
  ],
  hospitalAffiliations: [
    { name: "Max Super Speciality Hospital, Saket", role: "Consultant Interventional Cardiologist", icon: "local_hospital", color: "bg-primary-container/15 text-primary" },
    { name: "Medanta – The Medicity", role: "Visiting Specialist", icon: "apartment", color: "bg-primary-container/15 text-primary" },
  ],
  memberships: [
    { name: "FACC", full: "Fellow, American College of Cardiology", country: "USA" },
    { name: "FCSI", full: "Fellow, Cardiological Society of India", country: "India" },
  ],

  // ── TESTIMONIALS ───────────────────────────────────
  testimonials: [
    {
      initials: "VG",
      name: "Vikram Grover",
      detail: "Radial Angioplasty • Max Saket",
      quote: '"Dr. Rohan did my stenting through the wrist. I was walking just 3 hours later and discharged the next morning. His warmth took away 90% of our family\'s anxiety."',
      color: "bg-primary-container/20 text-primary",
    },
    {
      initials: "AS",
      name: "Ananya Sengupta",
      detail: "Preventive Calcium Scoring • GK-1",
      quote: '"Never felt rushed. Dr. Sharma sat with us for 25 minutes explaining every metric in Hindi and English."',
      color: "bg-primary-container/20 text-primary",
    },
    {
      initials: "RK",
      name: "Rajesh Khanna",
      detail: "Post-stent Follow-up • Video OPD",
      quote: '"Booked via WhatsApp, got confirmation in 8 minutes. The video call was crystal clear."',
      color: "bg-primary-container/20 text-primary",
    },
  ],

  // ── TRUST PILLS (hero) ─────────────────────────────
  trustPills: [
    { icon: "schedule",              text: "15+ Yrs Practice" },
    { icon: "assignment_turned_in",  text: "NMC #54219" },
    { icon: "apartment",             text: "Ex-AIIMS New Delhi" },
  ],

  // ── EMERGENCY ──────────────────────────────────────
  emergency: {
    number: "102",
    alternateNumber: "108",
    hospital: "Max Hospital Saket",
    hospitalPhone: "011-26515050",
    message: "Experiencing chest pain, sudden breathlessness, or cold sweats? Do not wait for OPD. Call 102/108 immediately or go to the nearest 24/7 cardiac emergency.",
  },

  // ── FAQs ───────────────────────────────────────────
  faqs: [
    {
      q: "How do I book an appointment?",
      a: "Use the 'Book Appointment' button on this website. Our wizard takes under 2 minutes. Confirmation is instant.",
    },
    {
      q: "Do I need an appointment before visiting the clinic?",
      a: "Yes, we strongly recommend booking in advance to guarantee your time and avoid long waiting.",
    },
    {
      q: "What should I bring for my first consultation?",
      a: "Carry all prior ECG strips and Echo CDs, recent blood reports, your current medication blister strips, and a photo ID.",
    },
    {
      q: "How does a video consultation work?",
      a: "Book using the 'Video Consultation' option. Sister Neha will send a secure HD video link to your WhatsApp 15 minutes before your slot.",
    },
  ],

  // ── SEO ────────────────────────────────────────────
  seo: {
    siteName: "Dr. Rohan Sharma — Interventional Cardiologist, New Delhi",
    description: "Book a consultation with Dr. Rohan Sharma, Senior Interventional Cardiologist (AIIMS New Delhi).",
    domain: "https://drrohansharma.in",
    keywords: "cardiologist new delhi, interventional cardiologist delhi, angioplasty specialist, heart specialist delhi",
    twitterHandle: "",
  },

  // ── SOCIALS ─────────────────────────────────────────
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com", icon: "share" },
    { name: "YouTube", url: "https://youtube.com", icon: "video_library" },
    { name: "Practo", url: "https://practo.com", icon: "medical_services" },
  ]
};

export type Clinic = (typeof site.clinics)[0];
export type Speciality = (typeof site.specialities)[0];
export type Education = (typeof site.education)[0];
export type ExperienceItem = (typeof site.experience_timeline)[0];
export type HospitalAffiliation = (typeof site.hospitalAffiliations)[0];
export type FAQ = (typeof site.faqs)[0];
export type Review = (typeof site.testimonials)[0];
