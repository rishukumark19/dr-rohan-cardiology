"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { doctor } from "@/config/doctor";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { href: "/about", label: "About", path: "/about" },
  { href: "/locations", label: "Locations", path: "/locations" },
  { href: "/book", label: "Consultation", path: "/book" },
  { href: "/faq", label: "FAQs", path: "/faq" },
  { href: "/resources", label: "Resources", path: "/resources" },
  { href: "/reviews", label: "Reviews", path: "/reviews" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop / tablet header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-nav">
        <div className="h-20 max-w-7xl mx-auto px-margin flex items-center justify-between gap-space-md">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-space-sm group flex-shrink-0" aria-label="Homepage">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-glow-cyan-sm transition-transform duration-300 group-hover:scale-105">
              <span className="material-symbols-outlined text-[22px]">cardiology</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-[13px] font-bold uppercase tracking-widest text-on-surface leading-none">
                {doctor.shortName.toUpperCase()}
              </span>
              <span className="font-display text-[10px] font-semibold uppercase tracking-widest text-primary mt-0.5">
                {doctor.speciality} • {doctor.institution}
              </span>
            </div>
          </Link>

          {/* Desktop nav pill */}
          <nav className="hidden lg:flex items-center bg-inverse-surface rounded-full px-space-xs py-space-xs shadow-md" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-space-md py-[6px] rounded-full text-label-md font-display font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary-container text-on-primary-container shadow-sm"
                      : "text-secondary-fixed hover:text-inverse-on-surface"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-space-sm flex-shrink-0">
            <a
              href={buildCallUrl()}
              className="hidden md:flex items-center gap-1.5 px-space-md py-[8px] rounded-full bg-surface-container text-primary text-label-md font-display font-semibold hover:bg-surface-container-high transition-colors"
              aria-label="Call clinic"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="hidden xl:inline">Call Clinic</span>
            </a>
            <Link
              href="/book"
              className="flex items-center gap-1.5 px-space-lg py-[8px] rounded-full bg-primary text-on-primary text-label-md font-display font-semibold shadow-glow-cyan-sm hover:opacity-90 transition-all"
            >
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <span className="material-symbols-outlined text-[22px]">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-inverse-surface/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer — slides in from the right */}
          <div
            id="mobile-drawer"
            className="absolute right-0 top-0 bottom-0 w-[80vw] max-w-xs bg-surface-container-lowest shadow-2xl flex flex-col pt-safe pb-safe"
            style={{ animation: "slideInRight 0.25s ease-out" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-space-md py-space-md border-b border-outline-variant">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[18px]">cardiology</span>
                </div>
                <span className="font-display font-bold text-on-surface text-label-lg">{doctor.shortName}</span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col gap-1 px-space-sm py-space-md flex-1 overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.path !== "/" && pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-space-md px-space-md py-space-sm rounded-DEFAULT text-body-md font-display font-semibold transition-colors ${
                      isActive
                        ? "bg-primary-container text-on-primary-container"
                        : "text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom actions */}
            <div className="px-space-md py-space-md flex flex-col gap-space-sm border-t border-outline-variant">
              <a
                href={buildWhatsAppUrl({ purpose: "inquiry" })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-space-sm py-space-sm rounded-full bg-tertiary text-on-tertiary text-label-lg font-display font-bold"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                WhatsApp Desk
              </a>
              <a
                href={buildCallUrl()}
                className="flex items-center justify-center gap-space-sm py-space-sm rounded-full bg-surface-container text-primary text-label-lg font-display font-semibold"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                {doctor.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
