"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import ListingCard from "@/components/ListingCard";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { useListings } from "@/hooks/useListings";
import { useSearchParams } from "next/navigation";
import { Map } from "lucide-react";
import { useState } from "react";

interface Listing {
  _id: string;
  location: string;
  rating: number;
  title: string;
  category: string;
  price: number;
  images: string[];
}

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "National parks";

  const { listings, isLoading, error } = useListings(category);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {showOnboarding && (
        <OnboardingFlow onClose={() => setShowOnboarding(false)} />
      )}

      <CategoryBar />

      <div className="max-w-[2520px] mx-auto px-4 sm:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="bg-neutral-200 aspect-square rounded-xl animate-pulse" />
                <div className="h-4 bg-neutral-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-neutral-200 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-neutral-800">
              Something went wrong
            </h2>
            <p className="text-neutral-500 mt-2">{(error as Error).message}</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-semibold text-neutral-800">
              No matches
            </h2>
            <p className="text-neutral-500">
              Try searching for something else or check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {listings.map((listing: Listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Map Button */}
      <button className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#222222] text-white px-5 py-3.5 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition active:scale-95 z-40">
        Show map
        <Map className="w-4 h-4" />
      </button>
    </main>
  );
}
