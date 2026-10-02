"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const navItems = [
  { href: "/",          icon: "home",        iconFilled: "home",       label: "Home" },
  { href: "/about",     icon: "person",      iconFilled: "person",     label: "About" },
  { href: "/locations", icon: "location_on", iconFilled: "location_on", label: "Locations" },
];

export default function MobileBottomBar() {
  const pathname = usePathname();
  const isBooking = pathname.startsWith("/book");

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-[0_-4px_24px_rgba(19,27,46,0.06)] lg:hidden"
      aria-label="Mobile quick actions"
    >
      <div className="px-space-xs py-1.5 flex items-center justify-around gap-1 max-w-lg mx-auto">
        {/* Nav links */}
        {navItems.map((item) => {
          const isHome = item.href === "/";
          const isActive = isHome ? pathname === "/" : (pathname === item.href || pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[52px] min-h-[52px] px-1 py-1 rounded-xl transition-all ${
                isActive
                  ? "text-primary bg-primary-container/15"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive ? "material-symbols-filled" : ""}`}>
                {isActive ? item.iconFilled : item.icon}
              </span>
              <span className={`text-[10px] font-display font-bold mt-0.5 ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Book CTA — prominent pill */}
        <Link
          href="/book"
          className="flex flex-col items-center justify-center min-w-[64px] min-h-[52px] px-space-sm py-1 rounded-xl text-label-sm font-display font-bold transition-all active:scale-[0.97] bg-primary text-on-primary shadow-glow-cyan-sm hover:opacity-95"
          aria-label="Book Appointment"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isBooking ? "check_circle" : "calendar_month"}
          </span>
          <span className="text-[10px] mt-0.5">{isBooking ? "Booking" : "Book"}</span>
        </Link>

        {/* WhatsApp */}
        <a
          href={buildWhatsAppUrl({ purpose: "inquiry" })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-w-[52px] min-h-[52px] px-1 py-1 rounded-xl text-[#25D366] hover:opacity-90 transition-opacity"
          aria-label="WhatsApp desk"
        >
          <span className="material-symbols-outlined text-[22px]">chat</span>
          <span className="text-[10px] font-display font-bold mt-0.5 text-[#25D366]">Chat</span>
        </a>
      </div>
    </nav>
  );
}
