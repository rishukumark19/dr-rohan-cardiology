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

  // Booking behaviour — change this to switch all booking logic
  // "instant" | "confirmation" | "whatsapp" | "call"
  bookingMode: "confirmation" as "instant" | "confirmation" | "whatsapp" | "call",

  // Key metrics
  experience: "15+",
  experienceYears: 15,     // Numeric version for calculations
  consultations: "18,000+",
  procedures: "4,500+",
  satisfaction: "99.2%",
  reviewCount: "2,100+",
  reviewCountRaw: 2100,    // Used for schema.org (numeric, no formatting)
  rating: "4.9",

  // Key stats section — configurable labels & sub-labels
  stats: [
    { key: "experience",    label: "Years Practice",       sub: "AIIMS & Senior Fellowships",   icon: "award_star",    color: "text-primary" },
    { key: "consultations", label: "Consultations",        sub: "Clinical OPD Patients",         icon: "ecg_heart",     color: "text-primary" },
    { key: "procedures",    label: "Radial Interventions", sub: "Wrist-entry Angioplasties",     icon: "blood_pressure", color: "text-primary" },
    { key: "satisfaction",  label: "Satisfaction",         sub: "Over 2,100+ Reviews",           icon: "thumb_up",      color: "text-primary" },
  ] as { key: "experience" | "consultations" | "procedures" | "satisfaction"; label: string; sub: string; icon: string; color: string }[],

  // Contact
  phone: "+91 9810123456",
  phoneRaw: "+919810123456",
  whatsapp: "919810123456",
  email: "",               // Leave blank to hide email link in UI
  videoConsultUrl: "",     // Zoom / Google Meet / Doxy.me link for video OPD (leave blank to use WhatsApp booking)
  locationDesc: "South Delhi & NCR",  // City/area shown in hero bio — configurable per doctor
  languages: ["Hindi", "English"],

  // Address fields — used in schema.org structured data
  city: "New Delhi",
  state: "Delhi",
  pincode: "110048",
  country: "IN",

  // Coordinator
  coordinator: {
    name: "Sister Neha",
    role: "Clinical Care Coordinator",
    whatsapp: "919810123456",
  },

  // Consultation details
  consultationDuration: 25,   // Minutes — used in copy like "25-minute consultations"

  // Hero tagline — shown under qualifications on homepage
  heroTagline: "Unhurried 20-minute consultations in interventional cardiac care.",

  // Trust pills — shown under hero heading (configurable array)
  trustPills: [
    { icon: "schedule",              text: "15+ Yrs Practice" },
    { icon: "assignment_turned_in",  text: "NMC #54219" },
    { icon: "apartment",             text: "Ex-AIIMS New Delhi" },
    { icon: "verified",              text: "FACC (USA)" },
  ],

  // Footer bio — short paragraph shown in footer column
  footerBio: "Specializing in trans-radial coronary interventions and cardiovascular care across South Delhi & NCR.",

  // About page bio — full bio paragraphs (keeps page code clean & resellable)
  aboutBio: {
    p1: "Dr. Rohan Sharma is a Senior Interventional Cardiologist with over 15 years of hands-on clinical experience in complex coronary interventions, preventive cardiology, and advanced cardiac device implantation. Trained at AIIMS New Delhi — one of India's most prestigious medical institutions — he is a Fellow of the American College of Cardiology (FACC) and the Cardiological Society of India (FCSI).",
    p2: "Dr. Sharma is widely recognised for his expertise in trans-radial (wrist-entry) coronary angioplasty, enabling patients to walk within 3 hours of the procedure with same-day discharge in eligible cases. He conducts unhurried 20–30 minute consultations and communicates clinical findings in both Hindi and English, believing that informed patients make better health decisions.",
  },

  // About page credential pills — fully configurable
  credentialPills: [
    "MD, AIIMS New Delhi",
    "DM Cardiology (Gold Medalist)",
    "FACC — American College of Cardiology",
    "FCSI — Cardiological Society of India",
    "FSCAI — Interventional Cardiology",
    "NMC #54219",
  ],

  // Hospital affiliations — shown on About page
  hospitalAffiliations: [
    { name: "AIIMS New Delhi",                        role: "Senior Resident & Fellowship Training",      icon: "school",          color: "bg-primary-container/15 text-primary" },
    { name: "Max Super Speciality Hospital, Saket",   role: "Consultant Interventional Cardiologist",    icon: "local_hospital",  color: "bg-primary-container/15 text-primary" },
    { name: "Medanta – The Medicity, Gurugram",       role: "Visiting Specialist",                       icon: "apartment",       color: "bg-primary-container/15 text-primary" },
  ],

  // Why patients choose — differentiator points (shown on /reviews page)
  differentiators: [
    { icon: "timer",     title: "Unhurried Consultations",          desc: "Every patient receives focused, uninterrupted time. No 5-minute OPDs.", color: "text-primary" },
    { icon: "translate", title: "Bilingual — Hindi & English",      desc: "Medical explanations in the language the patient is most comfortable with.", color: "text-primary" },
    { icon: "verified",  title: "NMC-Registered & FACC-Certified",  desc: "International interventional cardiology fellowship from Cleveland Clinic, USA.", color: "text-primary" },
  ],

  // Education timeline
  education: [
    { year: "2000–2005", degree: "MBBS", institution: "All India Institute of Medical Sciences (AIIMS), New Delhi", type: "Medical Degree" },
    { year: "2005–2008", degree: "MD — General Medicine", institution: "AIIMS New Delhi", type: "Postgraduate" },
    { year: "2008–2011", degree: "DM — Cardiology (Gold Medalist)", institution: "AIIMS New Delhi", type: "Super-Specialty" },
    { year: "2011–2012", degree: "FSCAI Interventional Fellowship", institution: "Cleveland Clinic, Ohio, USA", type: "International Fellowship" },
  ],

  // Professional experience timeline
  experience_timeline: [
    { year: "2012–2015", role: "Assistant Professor & Senior Resident, Cardiology", institution: "AIIMS New Delhi", type: "Academic" },
    { year: "2015–2020", role: "Consultant Interventional Cardiologist", institution: "Max Super Speciality Hospital, Saket", type: "Hospital" },
    { year: "2020–Now", role: "Senior Consultant & Director", institution: "Sharma Heart & Vascular Clinic, GK-1", type: "Private Practice" },
  ],

  // Memberships
  memberships: [
    { name: "FACC", full: "Fellow, American College of Cardiology", country: "USA" },
    { name: "FCSI", full: "Fellow, Cardiological Society of India", country: "India" },
    { name: "FSCAI", full: "Fellow, Society for Cardiovascular Angiography & Interventions", country: "USA" },
    { name: "CSI", full: "Cardiological Society of India — Delhi Chapter Member", country: "India" },
    { name: "ISHI", full: "Indian Society of Hypertension", country: "India" },
  ],

  // Social / review links
  // Leave any URL blank ("") to automatically hide that link in the UI
  social: {
    googleReviews: "",   // e.g. "https://g.page/r/..."
    practo: "",          // e.g. "https://www.practo.com/doctors/..."
    linkedin: "",        // e.g. "https://linkedin.com/in/..."
  },

  // Patient testimonials — shown on homepage & /reviews page
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
      quote: '"Never felt rushed. Dr. Sharma sat with us for 25 minutes explaining every metric in Hindi and English. He actually removed two redundant medications prescribed elsewhere."',
      color: "bg-primary-container/20 text-primary",
    },
    {
      initials: "RK",
      name: "Rajesh Khanna",
      detail: "Post-stent Follow-up • Video OPD",
      quote: '"Booked via WhatsApp, got confirmation in 8 minutes. The video call was crystal clear. Digital prescription arrived on WhatsApp within 10 minutes of the call ending."',
      color: "bg-primary-container/20 text-primary",
    },
  ],

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
      daysArray: [2, 4, 6], // JS day indexes: 0=Sun, 2=Tue, 4=Thu, 6=Sat
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
      daysArray: [1, 3, 5], // Mon, Wed, Fri
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
      daysArray: [6], // Saturday
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
      daysArray: [1, 2, 3, 4, 5, 6],
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

  // Footer specialities list — shown in footer column
  footerSpecialities: [
    "Trans-Radial Angioplasty",
    "Drug-Eluting Stents",
    "Permanent Pacemaker (AICD)",
    "Preventive Calcium Score",
    "Heart Failure Clinic",
    "2D Echocardiogram",
    "Resistant Hypertension",
    "Video Telehealth OPD",
  ],
};

export type Clinic = (typeof doctor.clinics)[0];
export type Speciality = (typeof doctor.specialities)[0];
export type Education = (typeof doctor.education)[0];
export type ExperienceItem = (typeof doctor.experience_timeline)[0];
export type HospitalAffiliation = (typeof doctor.hospitalAffiliations)[0];
export type Differentiator = (typeof doctor.differentiators)[0];
