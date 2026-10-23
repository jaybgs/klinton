"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { navItems } from "./site-data";
import s from "./shared-header.module.css";

export function SharedHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const update = () => {
      const hero = document.getElementById("nadon-home-hero");
      setOverHero(
        pathname === "/" &&
          !!hero &&
          hero.getBoundingClientRect().bottom > (headerRef.current?.offsetHeight ?? 100)
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  let active = navItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/")
  );
  if (active < 0 && (pathname.includes("wedding") || pathname === "/weddings")) active = 2;
  if (active < 0 && (pathname === "/studio" || pathname.startsWith("/studio"))) active = 3;
  if (active < 0 && (pathname === "/book" || pathname.startsWith("/book"))) active = 4;

  const isHome = pathname === "/";

  return (
    <header
      ref={headerRef}
      className={s.header}
      data-home={isHome ? "true" : "false"}
      data-over-hero={overHero ? "true" : "false"}
    >
      <nav className={s.nav} aria-label="Main navigation">
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active === index ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
