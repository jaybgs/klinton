"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./site-data";

const mobileMenuItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Weddings" },
  { href: "/studios", label: "Studios" },
  { href: "/booking", label: "Bookings" }
];

const navAliases: Record<string, string[]> = {
  "/portfolio": ["/portfolio", "/weddings"],
  "/studios": ["/studios", "/studio"]
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  const matches = navAliases[href] ?? [href];
  return matches.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function SiteNavLinks({ onNavigate }: { onNavigate?: () => void } = {}) {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link href={item.href} key={item.href} aria-current={active ? "page" : undefined} onClick={onNavigate}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

function MobileSiteNavLinks({ onNavigate }: { onNavigate?: () => void } = {}) {
  return (
    <>
      {mobileMenuItems.map((item, index) => (
        <Link href={item.href} key={`${item.label}-${index}`} onClick={onNavigate}>
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function MobileSiteMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="nadon-mobile-menu">
      <button
        className="nadon-mobile-menu-toggle"
        type="button"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span />
        <span />
      </button>
      <nav className="nadon-mobile-menu-panel" aria-label="Mobile navigation" data-open={isOpen ? "true" : "false"}>
        <MobileSiteNavLinks onNavigate={() => setIsOpen(false)} />
      </nav>
    </div>
  );
}
