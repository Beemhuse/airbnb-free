'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { fetchListings } from '@/lib/api';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

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
  const { data: listings = [], isLoading, error } = useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: fetchListings,
  });


  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-2xl font-semibold mb-8">Airbnb Listings</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 aspect-square rounded-xl mb-3"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-red-600">Error loading listings</h2>
            <p className="text-neutral-500">{(error as Error).message}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {listings.map((listing: Listing) => (
              <div key={listing._id} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
                  <Image
                    src={listing.images[0] || '/placeholder.jpg'}
                    alt={listing.title}
                    fill
                    className="object-cover transition group-hover:scale-105"
                  />
                  <button className="absolute top-3 right-3 text-white/70 hover:text-white">
                    <svg className="w-6 h-6 fill-black/50 stroke-white stroke-2" viewBox="0 0 32 32">
                      <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-neutral-900 truncate pr-2">{listing.location}</h3>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3 fill-black" viewBox="0 0 32 32">
                      <path d="M15.09 3.58l3.86 7.82 8.63 1.25c1.54.23 2.15 2.1 1.04 3.19l-6.25 6.1 1.48 8.59c.27 1.54-1.34 2.71-2.73 1.98l-7.72-4.06-7.72 4.06c-1.39.73-3-.44-2.73-1.98l1.48-8.59-6.25-6.1c-1.11-1.09-.5-2.96 1.04-3.19l8.63-1.25 3.86-7.82a1.72 1.72 0 0 1 3.06 0z" />
                    </svg>
                    <span className="text-sm font-light text-neutral-600">{listing.rating}</span>
                  </div>
                </div>
                
                <p className="text-neutral-500 font-light truncate">{listing.title}</p>
                <p className="text-neutral-500 font-light mb-1">{listing.category}</p>
                
                <p className="text-neutral-900 font-semibold">
                  ${listing.price} <span className="font-light">night</span>
                </p>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && listings.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-neutral-600">No listings found.</h2>
            <p className="text-neutral-500">Make sure the server is running and database is seeded.</p>
          </div>
        )}
      </div>
    </main>
  );
}
