'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Trees, 
  Home, 
  Flame, 
  Mountain, 
  Coffee, 
  Waves, 
  Palmtree, 
  Tent, 
  Container,
  Component,
  Wind,
  Warehouse,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

const categories = [
  { label: 'National parks', icon: Trees },
  { label: 'Cabins', icon: Home },
  { label: 'OMG!', icon: Flame },
  { label: 'Ski-in/out', icon: Mountain },
  { label: 'Bed & breakfasts', icon: Coffee },
  { label: 'Lakefront', icon: Waves },
  { label: 'Beach', icon: Palmtree },
  { label: 'Tiny homes', icon: Container },
  { label: 'Islands', icon: Wind },
  { label: 'Campers', icon: Tent },
  { label: 'A-frames', icon: Warehouse },
  { label: 'Design', icon: Component },
];

export default function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'National parks';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleCategoryClick = (label: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', label);
    router.push(`/?${params.toString()}`);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    const currentScrollRef = scrollRef.current;
    if (currentScrollRef) {
      currentScrollRef.addEventListener('scroll', handleScroll);
    }
    return () => currentScrollRef?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-[81px] z-40 bg-white border-b border-neutral-200">
      <div className="container mx-auto px-4 flex items-center gap-4 py-3">
        <div className="relative flex-1 overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {categories.map((item) => (
              <button
                key={item.label}
                onClick={() => handleCategoryClick(item.label)}
                className={clsx(
                  "flex flex-col items-center gap-2 min-w-fit pb-2 transition-all border-b-2 hover:border-neutral-300 hover:text-black",
                  selectedCategory === item.label 
                    ? "border-black text-black" 
                    : "border-transparent text-neutral-500"
                )}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>

          {showRightArrow && (
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 shadow-md border border-neutral-200 rounded-full p-1 hover:scale-105 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <button className="flex items-center gap-2 border border-neutral-300 rounded-xl px-4 py-3 text-xs font-medium hover:bg-neutral-50 transition shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
