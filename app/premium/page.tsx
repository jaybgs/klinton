"use client";

import { useEffect, useState } from "react";
import { setupResourcePage, trackResourcePage } from "@nibgate/sdk";
// Re-use the same testResource definition on the client, or define it locally.
// We'll define it here so it matches the server's expectation.
const testResource = {
  id: "test_premium_post",
  title: "Premium Photo Collection",
  type: "article",
  price: "0.01",
  currency: "USDC",
  recipient: "0x0000000000000000000000000000000000000000",
  path: `/premium`,
  url: `http://localhost:5000/premium`,
  access: { humans: "paid" as const, agents: "paid" as const },
  unlock: { mode: "one_time" }
};

export default function PremiumPage() {
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    // 1. Track the page view for analytics
    trackResourcePage(testResource, { source: "creator-site" });

    // 2. Setup the widget to handle unlocks and fetch the protected API route
    setupResourcePage(testResource, {
      source: "creator-site",
      accessPath: "/api/nibgate/access", // Matches the route we just created
      button: "[data-nibgate-unlock]", // The CSS selector for our pay button
      status: "[data-nibgate-status]" // The CSS selector for status updates
    });

    // To actually load the content when unlocked, you can also fetch it directly.
    // The widget handles intercepting the 402 and triggering payment, 
    // but here is a simple fetch that retry after unlock logic would normally handle.
    // Real implementation usually relies on the widget's onStatus or intercepting fetches.
  }, []);

  const handleFetchPremium = async () => {
    try {
      const res = await fetch("/api/nibgate/access");
      if (res.ok) {
        const data = await res.json();
        setContent(data.secretContent);
      } else {
        console.error("Not unlocked yet, status:", res.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 text-white min-h-screen pt-32">
      <h1 className="text-4xl font-bold mb-4">Premium Content</h1>
      <p className="text-gray-400 mb-8">This page is protected by Nibgate.</p>

      {content ? (
        <div className="p-6 bg-white/10 rounded-xl border border-white/20">
          <h2 className="text-2xl font-semibold mb-2">Unlocked Content! 🎉</h2>
          <p>{content}</p>
        </div>
      ) : (
        <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
          <p className="mb-4">You need to unlock this content to view it.</p>
          
          <button 
            data-nibgate-unlock
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg mb-2"
          >
            Pay 0.01 USDC to Unlock
          </button>
          
          <div data-nibgate-status className="text-sm text-gray-500 mt-2">
            Status: Waiting for payment...
          </div>

          <button 
            onClick={handleFetchPremium}
            className="mt-8 text-sm underline text-gray-400 hover:text-white block mx-auto"
          >
            Attempt to load content
          </button>
        </div>
      )}
    </div>
  );
}
