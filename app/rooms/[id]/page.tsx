"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Heart, Share, Star } from "lucide-react";
import { fetchListingById } from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { data: listing, isLoading, error } = useQuery({
    queryKey: ["listing", id],
    queryFn: () => fetchListingById(id),
    enabled: !!id,
  });
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900" />
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <button onClick={() => router.back()} className="text-blue-600 underline">
          Go back
        </button>
      </div>
    );
  }

  const images = listing.images && listing.images.length > 0 ? listing.images : ["/placeholder.jpg"];

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="hidden md:block">
        <Navbar />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-neutral-100">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-neutral-100">
              <Share className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-2">
            {listing.title}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-neutral-900 font-medium">
              <Star className="w-4 h-4 fill-black" />
              <span>{listing.rating?.toFixed(2) || "New"}</span>
              <span className="text-neutral-500 font-normal">·</span>
              <span className="underline cursor-pointer">{listing.location}</span>
            </div>
            <div className="hidden md:flex gap-4">
              <button className="flex items-center gap-2 text-sm font-medium hover:bg-neutral-100 px-3 py-2 rounded-lg transition">
                <Share className="w-4 h-4" /> Share
              </button>
              <button className="flex items-center gap-2 text-sm font-medium hover:bg-neutral-100 px-3 py-2 rounded-lg transition">
                <Heart className="w-4 h-4" /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Image Grid (Desktop) / Carousel (Mobile) */}
        <div className="rounded-xl overflow-hidden aspect-video md:aspect-[2/1] relative">
          <div className="grid md:grid-cols-4 md:grid-rows-2 gap-2 h-full w-full">
            <div className="md:col-span-2 md:row-span-2 relative h-full w-full">
              <Image src={images[0]} alt="Main" fill className="object-cover" />
            </div>
            <div className="hidden md:block relative h-full w-full">
              <Image src={images[1] || images[0]} alt="Secondary" fill className="object-cover" />
            </div>
            <div className="hidden md:block relative h-full w-full">
              <Image src={images[2] || images[0]} alt="Secondary" fill className="object-cover" />
            </div>
            <div className="hidden md:block relative h-full w-full">
              <Image src={images[3] || images[0]} alt="Secondary" fill className="object-cover" />
            </div>
            <div className="hidden md:block relative h-full w-full">
              <Image src={images[4] || images[0]} alt="Secondary" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-3 gap-12 mt-8 md:mt-12">
          {/* Main Details */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-start pb-6 border-b">
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-1">
                  Entire {listing.category} hosted by User
                </h2>
                <p className="text-neutral-500">2 guests · 1 bedroom · 1 bed · 1 bath</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-neutral-200 overflow-hidden relative">
                <Image src="/placeholder.jpg" alt="Host" fill className="object-cover" />
              </div>
            </div>

            <div className="py-8 border-b">
              <p className="text-neutral-700 leading-relaxed">
                {listing.description || "Come and enjoy a wonderful stay at this beautiful property located in a great neighborhood. The place is fully equipped with everything you need for a comfortable stay."}
              </p>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="hidden md:block">
            <div className="sticky top-28 bg-white border rounded-xl p-6 shadow-xl shadow-neutral-200/50">
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-semibold">${listing.price}</span>
                <span className="text-neutral-500 font-light">night</span>
              </div>
              
              <button className="w-full bg-[#E51D53] hover:bg-[#D70466] text-white py-3.5 rounded-lg font-semibold transition text-lg mb-4">
                Reserve
              </button>
              
              <p className="text-center text-sm text-neutral-500 mb-6">You won't be charged yet</p>
              
              <div className="flex justify-between py-2 text-neutral-600">
                <span className="underline">${listing.price} x 5 nights</span>
                <span>${listing.price * 5}</span>
              </div>
              <div className="flex justify-between py-2 text-neutral-600">
                <span className="underline">Airbnb service fee</span>
                <span>$45</span>
              </div>
              
              <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
                <span>Total before taxes</span>
                <span>${(listing.price * 5) + 45}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Booking Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 px-6 flex justify-between items-center z-50">
        <div>
          <p className="font-semibold text-lg">${listing.price} <span className="text-sm font-normal text-neutral-500">night</span></p>
          <p className="text-sm underline font-medium">Oct 23 - 28</p>
        </div>
        <button className="bg-[#E51D53] text-white px-8 py-3 rounded-lg font-semibold">
          Reserve
        </button>
      </div>
    </div>
  );
}
