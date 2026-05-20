"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 240);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className="nadon-back-to-top"
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      data-visible={isVisible}
    >
      <svg viewBox="0 0 24 88" aria-hidden="true">
        <path d="M12 88V5" />
        <path d="m5.5 11.5 6.5-6.5 6.5 6.5" />
      </svg>
    </button>
  );
}
