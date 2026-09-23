# Doctor Portfolio Template — Deployment Guide

This template can be deployed for **any doctor in any speciality** by editing a single file: `config/doctor.ts`. No component code needs to change.

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/rishukumark19/dr-rohan-cardiology.git my-doctor-site
cd my-doctor-site
npm install
```

---

## Step 2 — Edit `config/doctor.ts`

This is the **only file you need to change** for a new doctor deployment. Every page, component, SEO tag, and schema reads from this config.

### Required fields to update:

```typescript
// Identity
name: "Dr. [Full Name]",
shortName: "Dr. [Last Name]",
title: "[Speciality Title]",
qualifications: "MD, [Speciality] — [Institution]",
speciality: "[Speciality]",
institution: "[Medical College]",
nmc: "#[Registration Number]",

// Contact
phone: "+91 [Mobile]",
phoneRaw: "+91[Mobile without space]",
whatsapp: "91[Mobile without country code plus]",

// Booking behaviour
bookingMode: "confirmation",  // "instant" | "confirmation" | "whatsapp" | "call"

// Key metrics
experience: "12+",
consultations: "10,000+",
procedures: "2,500+",
```

### Clinic locations:

```typescript
clinics: [
  {
    id: "clinic1",                   // Unique ID (used in URLs)
    name: "Full Clinic Name",         // Displayed in cards
    shortName: "Short Name",          // Used in buttons
    type: "flagship",                 // "flagship" | "hospital" | "visiting" | "telehealth"
    address: "Full address",
    fee: 1500,                        // In INR
    days: "Mon, Wed & Fri",           // Human-readable
    hours: "5:00 PM – 8:00 PM",
    daysArray: [1, 3, 5],             // JS .getDay() indexes: 0=Sun, 1=Mon...
    mapsUrl: "https://maps.google.com/?q=...",
    phone: "+91 ...",
    isVirtual: false,
    badge: "Flagship Private Clinic",
    tagColor: "tertiary",
    diagnostics: ["ECG", "Echo", "Blood Lab"],
    notes: "Pay at Clinic • UPI / Cash",
  },
]
```

### Education & Experience:

```typescript
education: [
  { year: "2000–2005", degree: "MBBS", institution: "...", type: "Medical Degree" },
  // Add as many entries as needed
],

experience_timeline: [
  { year: "2010–Now", role: "Senior Consultant", institution: "...", type: "Hospital" },
],

memberships: [
  { name: "FACC", full: "Fellow, American College of Cardiology", country: "USA" },
],
```

---

## Step 3 — Replace the Doctor Photo

Place the doctor's photo at:

```
/public/doctor-photo.jpg
```

**Recommended specs:**
- Format: JPG or WebP
- Dimensions: 800×800px minimum (square crop)
- Subject: Professional headshot or semi-formal portrait
- Background: White, light grey, or blurred clinical setting

The template uses `<img>` with a circular crop and gradient ring — no code changes needed.

---

## Step 4 — Update SEO Domain

In `config/doctor.ts`:

```typescript
seo: {
  domain: "https://yourdomain.com",   // Used in sitemap, OG tags, schema
  siteName: "Dr. [Name] — [Speciality], [City]",
  description: "...",
  keywords: "...",
}
```

In `public/robots.txt`:

```
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Step 5 — Update the OG Image

Replace `/public/og-image.jpg` (1200×630px) with a branded image showing the doctor's name and speciality. The current file is an SVG-based placeholder.

---

## Step 6 — Adjust Booking Mode

The `bookingMode` field in `doctor.ts` controls the **entire booking flow behaviour**:

| Mode | Behaviour |
|---|---|
| `"instant"` | Patient books → Digital OPD Pass issued immediately |
| `"confirmation"` | Patient books → Coordinator confirms via WhatsApp in 10 min |
| `"whatsapp"` | Booking button opens WhatsApp directly with pre-filled message |
| `"call"` | Booking shows a "Call Clinic" screen |

---

## Step 7 — Update FAQ Content

The FAQ questions are hardcoded in `app/faq/page.tsx`. They auto-generate JSON-LD schema for Google rich snippets. Update the `FAQS` array with doctor-specific questions.

---

## Step 8 — Update Reviews

Patient testimonials are in `app/reviews/page.tsx` in the `reviews` array. Replace with actual verified patient quotes (get written consent before publishing names).

---

## Step 9 — Deploy to Vercel

```
1. Go to vercel.com/new
2. Import your GitHub repository
3. Default settings → Deploy
4. Assign your custom domain in Vercel project settings
```

Vercel auto-deploys on every push to `main`. CI/CD is built-in at no extra cost.

---

## Step 10 — Connect Google Analytics (Optional)

Replace Vercel Analytics with Google Analytics 4 if you prefer:

1. Install: `npm install @next/third-parties`
2. Add to `app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google'
// Inside <body>:
<GoogleAnalytics gaId="G-XXXXXXXXXX" />
```

---

## Colour Palette Customisation

The entire colour system is defined in `app/globals.css` under `@theme {}`. To change the brand colour, update:

```css
@theme {
  --color-primary: #[your-primary];
  --color-primary-container: #[your-accent];
  --color-on-primary: #[text-on-primary];
  /* ... */
}
```

Recommended speciality palettes:

| Speciality | Primary | Container |
|---|---|---|
| Cardiology (current) | `#00677d` (teal) | `#00b4d8` (cyan) |
| Dermatology | `#6750a4` (purple) | `#b69df8` (lavender) |
| Orthopaedics | `#1a5276` (navy) | `#3498db` (blue) |
| Gynaecology | `#b5179e` (pink) | `#f72585` (hot pink) |
| Paediatrics | `#087f5b` (green) | `#69db7c` (lime) |

---

## Checklist Before Going Live

- [ ] Doctor photo replaced (not the SVG placeholder)
- [ ] All `doctor.ts` fields updated with real data
- [ ] NMC registration number verified
- [ ] Phone/WhatsApp numbers tested (send a test WhatsApp)
- [ ] Domain DNS configured in Vercel
- [ ] OG image updated (test at opengraph.xyz)
- [ ] Privacy policy reviewed and updated with practice name
- [ ] Medical Disclaimer reviewed (remove AIIMS-specific content if irrelevant)
- [ ] Test all 4 booking modes end-to-end
- [ ] Google Search Console → Add property → Submit sitemap URL

---

## File Structure Reference

```
dr-rohan-cardiology/
├── config/
│   └── doctor.ts              ← Edit this for any new doctor
├── lib/
│   └── whatsapp.ts            ← WhatsApp URL builder (don't edit)
├── app/
│   ├── page.tsx               ← Homepage
│   ├── about/page.tsx         ← Doctor profile
│   ├── book/page.tsx          ← 7-step booking wizard
│   ├── book/confirmation/     ← OPD Digital Pass
│   ├── locations/page.tsx     ← Clinic cards + schedule
│   ├── faq/page.tsx           ← Filterable FAQ with schema
│   ├── reviews/page.tsx       ← Reviews + trust section
│   ├── resources/page.tsx     ← Article listing
│   ├── resources/[slug]/      ← Individual article pages
│   ├── appointment/page.tsx   ← Manage/Reschedule/Cancel
│   ├── preparation/page.tsx   ← Pre-visit checklist
│   ├── privacy/page.tsx       ← Privacy policy
│   └── disclaimer/page.tsx    ← Medical disclaimer
├── components/
│   ├── layout/                ← Header, Footer, MobileBottomBar
│   └── ui/                    ← CookieConsent, FloatingWhatsApp, Animations
└── public/
    └── doctor-photo.jpg       ← Replace with real photo
```
