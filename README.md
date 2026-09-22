# Dr. Rohan Sharma — Cardiology Platform

Production-ready doctor portfolio and patient booking platform built with **Next.js 16 App Router**, **Tailwind CSS v4**, and deployed on **Vercel**.

## ✅ Live Routes

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
| `/reviews` | 6 verified patient testimonials |
| `/preparation` | Pre-visit checklist & instructions |
| `/privacy` | Patient privacy policy |
| `/disclaimer` | Medical disclaimer (NMC compliant) |

## 🏗️ Architecture

```
config/doctor.ts          ← Single source of truth for all content
lib/whatsapp.ts           ← Dynamic WhatsApp URL builder
components/layout/        ← Header, Footer, MobileBottomBar, EmergencyBanner
app/                      ← All 14 routes (Next.js App Router)
```

## 🎨 Design System

**Clinical Radiance** — MD3-based token system defined in `app/globals.css`:
- Primary: Teal/Cyan (`#00677d` / `#00b4d8`)
- Typography: Plus Jakarta Sans (display) + Inter (body)
- Mobile: Sticky bottom bar with Call/WhatsApp/Book CTAs
- Desktop: Pill navigation in obsidian header

## 🚀 Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `rishukumark19/dr-rohan-cardiology`
3. Default settings — Vercel auto-detects Next.js
4. Click **Deploy** → Live in ~60 seconds

## 🔧 To Deploy for a Different Doctor

Edit only **`config/doctor.ts`** — every page, component, and SEO tag reads from this config.

## 📱 Booking Modes Supported

1. **Instant Slot** — Select clinic/date/time → WhatsApp confirmation
2. **Request-to-Confirm** — Submit request → coordinator calls back within 10 min
3. **WhatsApp Concierge** — Direct message to Sister Neha
4. **Call to Book** — Direct phone link

## 🏃 Local Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Production build
```

## Tech Stack

- **Next.js 16.3** (App Router, Server Components)
- **Tailwind CSS v4** (CSS-native theme config)
- **TypeScript**
- **Google Fonts** (Plus Jakarta Sans + Inter)
- **Material Symbols Outlined** (icons)
- **WhatsApp Business API** (booking integration)
- **Vercel** (hosting + CI/CD)
