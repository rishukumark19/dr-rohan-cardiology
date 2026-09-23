# Client Go-Live Checklist

> Complete every item before going live with a new doctor deployment.

---

## 1. Config Files

- [ ] **`config/doctor.ts`** — All fields filled with real data
  - [ ] `name`, `shortName`, `title`, `qualifications`
  - [ ] `phone`, `phoneRaw`, `whatsapp` (tested with a live test message)
  - [ ] `nmc` — verified NMC registration number
  - [ ] `experience`, `consultations`, `procedures`, `satisfaction`, `rating`, `reviewCount`, `reviewCountRaw`
  - [ ] `city`, `state`, `pincode`, `country` — used in Google search schema
  - [ ] `heroTagline` — short tagline under qualifications
  - [ ] `trustPills[]` — up to 4 pills in the hero section
  - [ ] `aboutBio.p1` and `aboutBio.p2` — full about bio paragraphs
  - [ ] `credentialPills[]` — credential badges on About page
  - [ ] `hospitalAffiliations[]` — hospital cards on About page
  - [ ] `differentiators[]` — trust points on Reviews page
  - [ ] `clinics[]` — all clinics with correct `daysArray`, `fee`, `hours`, `mapsUrl`
  - [ ] `seo.domain` — updated to real domain (no trailing slash)
  - [ ] `seo.siteName`, `seo.description`, `seo.keywords`

- [ ] **`config/content.ts`** — FAQs and reviews updated
  - [ ] FAQ questions are clinic-specific (no "Sister Neha" if coordinator has different name)
  - [ ] Patient reviews have patient consent (written consent recommended)

---

## 2. Assets

- [ ] `/public/doctor-photo.jpg` — Real doctor photo (800×800px min, square crop, professional)
- [ ] `/public/og-image.jpg` — Social share image (1200×630px, shows doctor name + speciality)
- [ ] `/public/apple-touch-icon.png` — 180×180px icon for iOS home screen
- [ ] `/favicon.ico` — Replaced with new favicon (not default)

---

## 3. Domain & SEO

- [ ] Domain DNS configured in Vercel project settings
- [ ] `public/robots.txt` — Sitemap URL updated to match real domain
- [ ] Test sitemap at `https://yourdomain.com/sitemap.xml`
- [ ] Test OG image at [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Test schema.org at [schema.org/validator](https://validator.schema.org)
- [ ] Google Search Console → Add property → Submit sitemap

---

## 4. Functionality Testing

- [ ] All 4 booking modes tested end-to-end:
  - [ ] `"instant"` → Digital OPD pass issued immediately
  - [ ] `"confirmation"` → Coordinator WhatsApp confirmation shown
  - [ ] `"whatsapp"` → Opens WhatsApp with pre-filled message
  - [ ] `"call"` → Shows call screen with doctor.phone
- [ ] WhatsApp links work on both desktop and mobile
- [ ] Phone `tel:` links work
- [ ] Google Maps links for each clinic open correctly
- [ ] Cookie consent appears and persists on next visit

---

## 5. Content Review

- [ ] No placeholder text remains (e.g. "Dr. Rohan Sharma", "Sister Neha" if changed)
- [ ] Medical Disclaimer reviewed — remove institution-specific content if irrelevant
- [ ] Privacy Policy reviewed — update practice name and contact
- [ ] Emergency numbers (`102`/`108`) correct for this region
- [ ] All FAQ answers reflect this doctor's actual policies

---

## 6. Performance & Accessibility

- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, SEO
- [ ] Test on mobile 375px (smallest iPhone SE)
- [ ] Test on desktop 1440px
- [ ] `prefers-reduced-motion` — animations are disabled for users with reduced motion preference (already implemented)
- [ ] Skip-to-content link works (Tab key from homepage)

---

## 7. Analytics

- [ ] Vercel Analytics enabled in Vercel dashboard (zero config — already in `layout.tsx`)
- [ ] OR replace with Google Analytics 4 if preferred (see `TEMPLATE.md`)

---

## 8. Final Check Before Handing to Client

- [ ] `CLAUDE.md` removed ✅ (done)
- [ ] No `console.log` statements in production code
- [ ] `.env.local` contains real API keys (if any)
- [ ] `.env.local` is in `.gitignore` ✅ (already configured)

---

*Template by CrossTech. For support, contact your development team.*
