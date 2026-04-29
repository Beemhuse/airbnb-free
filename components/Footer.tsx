"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const showStandardFooter = isLoggedIn || isHomePage;

  if (!showStandardFooter) {
    return (
      <footer className="w-full bg-[#222222] text-white">
        <div className="max-w-[2520px] mx-auto px-4 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF385C] p-1.5 rounded-lg">
              <Image
                src="/airbnb-logo.png"
                alt="Airbnb"
                width={20}
                height={20}
                loading="eager"
                className="brightness-0 invert"
                style={{ width: 20, height: 20 }}
              />
            </div>
            <span className="font-semibold text-xl md:text-2xl">Airbnb</span>
          </div>
          <div className="flex items-center gap-2 text-xl md:text-3xl text-white">
            <span className="text-sm md:text-xl text-neutral-400">curated by</span>
            <div className="relative w-[80px] h-[40px] md:w-[100px] md:h-[50px]">
              <Image src="/mobbin.png" alt="Mobbin" fill className="object-contain" />
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-[1600px] flex flex-col lg:flex-row justify-between items-center mx-auto px-6 py-4 gap-4">
        {/* LEFT SIDE */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-neutral-600">
          <span>© 2022 Airbnb, Inc.</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Sitemap</span>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-neutral-700">
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2s.06-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.92 7.92 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8 8 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.7 15.7 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
              />
            </svg>{" "}
            <span>English (US)</span>
          </div>
          <div className="cursor-pointer flex items-center gap-1 hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8 15.5H6c0 2.59 2.43 4.12 5 4.44V22h2v-2.07c2.25-.3 5-1.59 5-4.43s-2.75-4.13-5-4.43V6.1c1.33.24 3 .94 3 2.4h2c0-2.84-2.75-4.13-5-4.43V2h-2v2.07c-2.25.3-5 1.59-5 4.43s2.67 4.11 5 4.43v4.97c-1.45-.25-3-1.02-3-2.4m8 0c0 1.46-1.67 2.16-3 2.4v-4.8c1.33.24 3 .94 3 2.4m-8-7c0-1.46 1.67-2.16 3-2.4v4.8c-1.37-.25-3-1-3-2.4"
              />
            </svg>{" "}
            USD
          </div>
          <div className="cursor-pointer flex items-center gap-2 hover:underline">
            <span className="flex items-center gap-1">Support & resources</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m17 14l-5-5l-5 5"
              />
            </svg>
          </div>
        </div>
      </div>
       <div className="max-w-[2520px] bg-[#222222] text-white mx-auto px-4 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF385C] p-1.5 rounded-lg">
              <Image
                src="/airbnb-logo.png"
                alt="Airbnb"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
            <span className="font-semibold text-xl md:text-2xl">Airbnb</span>
          </div>
          <div className="flex items-center gap-2 text-xl md:text-3xl text-white">
            <span className="text-sm md:text-xl text-neutral-400">curated by</span>
            <div className="relative w-[80px] h-[40px] md:w-[100px] md:h-[50px]">
              <Image src="/mobbin.png" alt="Mobbin" fill className="object-contain" />
            </div>
          </div>
        </div>
    </footer>
  );
}

