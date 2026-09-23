# Dr. Rohan Sharma — Cardiology Portfolio Platform

Production-ready doctor portfolio and patient booking platform built with **Next.js 16 App Router**, **Tailwind CSS v4**, and deployed on **Vercel**.

---

## ✅ Live Routes (20 pages)

| Route | Description |
|---|---|
| `/` | Homepage — Hero, Metrics, Booking Modes, Specialities, Clinics, Reviews |
| `/about` | Doctor profile, credentials, affiliations |
| `/book` | 4-mode booking flow (Instant / Request / WhatsApp / Call) |
| `/book/status` | Appointment progress tracker |
| `/book/confirmation` | Digital OPD Pass with QR code |
| `/appointment` | Manage appointment: View / Reschedule / Cancel |
| `/locations` | Weekly schedule, 4 clinic cards, directions |
| `/faq` | Live-search FAQ with 15+ clinical questions |
| `/resources` | 6 editorial articles + 3 downloadable handouts |
| `/resources/[slug]` | Individual article pages (3 SSG) |
| `/reviews` | 6 verified patient testimonials |
| `/preparation` | Pre-visit checklist & instructions |
| `/privacy` | Patient privacy policy |
| `/disclaimer` | Medical disclaimer (NMC compliant) |
| `/sitemap.xml` | Auto-generated sitemap |

---

## 🏗️ Architecture

```
config/doctor.ts          ← Single source of truth for ALL content
lib/whatsapp.ts           ← Dynamic WhatsApp URL builder
lib/utils.ts              ← Shared utilities (getInitials, formatFee, getNextOpdDate...)
components/layout/        ← Header, Footer, MobileBottomBar, EmergencyBanner
components/ui/            ← Animations, CookieConsent, FloatingWhatsApp,
                             NextOpdBadge, ScrollToTop
app/                      ← All routes (Next.js App Router)
public/                   ← Static assets (doctor-photo.jpg, og-image.jpg, robots.txt)
```

---

## 🎨 Design System

**Clinical Radiance** — MD3-based token system defined in `app/globals.css`:
- **Primary:** Teal/Cyan (`#00677d` / `#00b4d8`)
- **Tertiary:** Emerald green (`#006c49`)
- **Typography:** Plus Jakarta Sans (display) + Inter (body)
- **Mobile:** Sticky bottom bar with Call / WhatsApp / Book CTAs
- **Desktop:** Pill navigation in obsidian header
- **Dynamic:** `NextOpdBadge` calculates real-time OPD availability from clinic schedule

---

## 🔧 To Deploy for a Different Doctor

Edit **only** `config/doctor.ts` — every page, component, and SEO tag reads from this single file.

**Key fields to update:**
- `name`, `shortName`, `title`, `qualifications`, `speciality`, `institution`
- `photo` — replace `/public/doctor-photo.jpg`
- `bookingMode` — `"instant"` | `"confirmation"` | `"whatsapp"` | `"call"`
- `experience`, `consultations`, `procedures`, `satisfaction`
- `clinics[]` — location, address, days, hours, fees, daysArray
- `specialities[]` — treatment areas
- `testimonials[]` — patient reviews
- `footerSpecialities[]` — footer specialities list
- `seo` — domain, keywords, description
- `emergency` — emergency number and hospital

Then run:
```bash
vercel --prod
```

---

## 📱 Booking Modes Supported

| Mode | Behaviour |
|---|---|
| `instant` | Select clinic/date/time → Immediate WhatsApp confirmation |
| `confirmation` | Submit request → Coordinator confirms within 10 min via WhatsApp |
| `whatsapp` | Wizard skips to WhatsApp pre-filled booking message |
| `call` | Shows phone number with tap-to-call |

---

## 🏃 Local Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build (verify before deploy)
npx tsc --noEmit  # TypeScript check only
```

---

## 🚀 Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repository
3. Default settings — Vercel auto-detects Next.js
4. Copy `.env.local.example` → `.env.local` and fill in values
5. Click **Deploy** → Live in ~60 seconds

---

## 🗂️ Adding Content

### Add a new testimonial
In `config/doctor.ts`, append to `testimonials[]`:
```ts
{
  initials: "AB",
  name: "Amit Bhatia",
  detail: "Angioplasty • GK-1",
  quote: '"Your quote here."',
  color: "bg-primary-container/20 text-primary",
}
```

### Add a new clinic
In `config/doctor.ts`, append to `clinics[]`:
```ts
{
  id: "newclinic",
  name: "New Hospital Name",
  shortName: "Short Name",
  type: "hospital" as const,
  address: "Full address",
  fee: 1500,
  days: "Mon, Wed",
  hours: "10:00 AM – 1:00 PM",
  daysArray: [1, 3],   // 0=Sun, 1=Mon, 2=Tue ... 6=Sat
  mapsUrl: "https://maps.google.com/?q=...",
  phone: "+91 XXXXXXXXXX",
  isVirtual: false,
  badge: "Clinic Type",
  tagColor: "primary" as const,
  diagnostics: ["Service 1", "Service 2"],
  notes: "Notes for patients",
}
```

---

## 🔒 Security

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` (HSTS with preload)
- `Content-Security-Policy` — strict allowlist
- `Referrer-Policy: strict-origin-when-cross-origin`
- Patient-private pages (`/book/confirmation`, `/book/status`, `/appointment`) blocked from search indexing via `robots.txt`

---

## 🔍 SEO

- Schema.org `Physician` + per-clinic `MedicalClinic` JSON-LD structured data
- Dynamic sitemap at `/sitemap.xml`
- Open Graph + Twitter card meta tags
- Canonical URLs per page
- `theme-color` meta for PWA browser chrome

---

## Tech Stack

- **Next.js 16.3** (App Router, Server Components, Static Generation)
- **Tailwind CSS v4** (CSS-native `@theme` config)
- **TypeScript** (strict, zero errors)
- **Google Fonts** (Plus Jakarta Sans + Inter)
- **Material Symbols Outlined** (icons)
- **WhatsApp Business API** (booking integration)
- **Vercel** (hosting + CI/CD + Analytics)
