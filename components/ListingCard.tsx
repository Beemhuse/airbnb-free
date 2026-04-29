'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

import Link from 'next/link';

interface ListingCardProps {
  listing: {
    _id: string;
    location: string;
    rating: number;
    title: string;
    category: string;
    price: number;
    images: string[];
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = listing.images.length > 0 ? listing.images : ['/placeholder.jpg'];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link 
      href={`/rooms/${listing._id}`}
      className="group cursor-pointer flex flex-col gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={images[currentImageIndex]}
          alt={listing.title}
          fill
          priority={true}
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 z-10 p-2"
        >
          <Heart 
            className={clsx(
              "w-6 h-6 transition",
              isFavorite ? "fill-primary stroke-primary" : "fill-black/30 stroke-white stroke-2"
            )} 
          />
        </button>

        {/* Navigation Arrows */}
        {isHovered && images.length > 1 && (
          <>
            {currentImageIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {currentImageIndex < images.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </>
        )}

        {/* Pagination Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div 
                key={i}
                className={clsx(
                  "w-1.5 h-1.5 rounded-full transition-all shadow-sm",
                  i === currentImageIndex ? "bg-white scale-110" : "bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-sm text-neutral-900 truncate">
            {listing.location}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-black" />
            <span className="text-sm font-light text-neutral-900">
              {listing.rating?.toFixed(2) || 'New'}
            </span>
          </div>
        </div>

        <p className="text-neutral-500 text-sm font-light truncate">
          {listing.title}
        </p>
        <p className="text-neutral-500 text-sm font-light">
          Oct 23 - 28
        </p>
        
        <p className="mt-1">
          <span className="font-semibold text-sm text-neutral-900">${listing.price}</span>
          <span className="font-light text-sm text-neutral-900"> night</span>
        </p>
      </div>
    </Link>
  );
}
