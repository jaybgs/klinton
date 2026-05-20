"use client";

import { useEffect } from "react";

export function HeaderHeroState({ heroId }: { heroId: string }) {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".nadon-header");
    const hero = document.getElementById(heroId);

    if (!header || !hero) {
      return;
    }

    const updateHeader = () => {
      const headerHeight = header.offsetHeight || 96;
      const isOverHero = hero.getBoundingClientRect().bottom > headerHeight;
      header.dataset.overHero = isOverHero ? "true" : "false";
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
      delete header.dataset.overHero;
    };
  }, [heroId]);

  return null;
}
