"use client";

import Link from "next/link";
import { Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest(".relative")) {
        setIsOpen(false);
      }
    };


    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);



  return (
    <nav className="w-full bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-[2520px] mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-3 md:gap-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 shrink-0">
          <Image
            src={"/airbnb-logo.png"}
            alt="airbnb logo"
            width={32}
            height={32}
            loading="eager"
          />
          <span className="text-[#FF385C] text-xl font-bold tracking-tight hidden lg:inline">
            airbnb
          </span>
        </Link>

        {/* Search Bar - Only show when authenticated */}
        {isLoggedIn ? (
          <div className="hidden md:flex items-center border border-neutral-300 rounded-full py-2 px-2 shadow-sm hover:shadow-md transition cursor-pointer">
            <div className="flex items-center divide-x divide-neutral-300">
              <span className="px-4 text-sm font-semibold">Anywhere</span>
              <span className="px-4 text-sm font-semibold">Any week</span>
              <div className="px-4 flex items-center gap-3">
                <span className="text-sm text-neutral-500 font-normal">
                  Add guests
                </span>
                <div className="bg-primary p-2 rounded-full text-white">
                  <svg
                    className="w-3 h-3 stroke-[4px]"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M27.41 24.59L22.34 19.51A10.94 10.94 0 1019.51 22.34l5.08 5.07a2 2 0 002.82 0 2 2 0 000-2.82z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:block flex-1 max-w-[400px]"></div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            className="text-sm font-semibold text-neutral-800 rounded-full hover:bg-neutral-100 hidden lg:block"
          >
            Become a Host
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-neutral-100 p-3 hidden sm:block"
          >
            <Globe className="w-4 h-4 text-neutral-800" />
          </Button>

          <div className="relative">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 flex items-center border border-neutral-300 rounded-full p-1.5 pl-3 gap-3 hover:shadow-md transition cursor-pointer"
            >
              <Menu className="w-4 h-4 text-neutral-800" />
              <div className="relative">
                {isLoggedIn ? (
                  <>
                    <Image
                      src={user?.profilePhoto || "/avatar.png"}
                      alt="User"
                      width={30}
                      height={30}
                      className="rounded-full object-cover aspect-square"
                    />

                    <div className="absolute -top-1.5 -right-1.5 bg-[#FF385C] border-2 border-white text-[10px] text-white w-5 h-5 flex items-center justify-center rounded-full font-bold">
                      1
                    </div>
                  </>
                ) : (
                  <div className="bg-neutral-500 rounded-full p-1">
                    <svg
                      className="w-5 h-5 text-white"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      <path d="M16 8a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm10.6 15.11a1 1 0 0 1-1.2.75 14 14 0 0 0-18.8 0 1 1 0 0 1-1.2-.75 16 16 0 0 1 21.2 0z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 top-[52px] w-[240px] bg-white rounded-xl shadow-[0_2px_16px_rgba(0,0,0,0.12)] border border-neutral-200 py-2 z-[100]">
                <div className="flex flex-col">
                  {isLoggedIn ? (
                    <>
                      <button className="px-4 py-3 text-left text-sm font-semibold hover:bg-neutral-100 transition">
                        Messages
                      </button>
                      <button className="px-4 py-3 text-left text-sm font-semibold hover:bg-neutral-100 transition flex items-center justify-between">
                        <span>Notifications</span>
                        <span className="w-1.5 h-1.5 bg-[#FF385C] rounded-full"></span>
                      </button>
                      <button className="px-4 py-3 text-left text-sm font-semibold hover:bg-neutral-100 transition">
                        Trips
                      </button>
                      <button className="px-4 py-3 text-left text-sm font-semibold hover:bg-neutral-100 transition">
                        Wishlists
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/signup"
                        className="px-4 py-3 text-left text-sm font-semibold hover:bg-neutral-100 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign up
                      </Link>
                      <Link
                        href="/login"
                        className="px-4 py-3 text-left text-sm font-normal hover:bg-neutral-100 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Log in
                      </Link>
                    </>
                  )}

                  <div className="h-[1px] bg-neutral-200 my-2"></div>

                  <button className="px-4 py-3 text-left text-sm font-normal hover:bg-neutral-100 transition">
                    Host your home
                  </button>
                  <button className="px-4 py-3 text-left text-sm font-normal hover:bg-neutral-100 transition">
                    Host an experience
                  </button>
                  {isLoggedIn && (
                    <button className="px-4 py-3 text-left text-sm font-normal hover:bg-neutral-100 transition">
                      Account
                    </button>
                  )}

                  {!isLoggedIn && (
                    <button className="px-4 py-3 text-left text-sm font-normal hover:bg-neutral-100 transition">
                      Help
                    </button>
                  )}

                  {isLoggedIn && (
                    <>
                      <div className="h-[1px] bg-neutral-200 my-2"></div>
                      <button className="px-4 py-3 text-left text-sm font-normal hover:bg-neutral-100 transition">
                        Help
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="px-4 py-3 text-left text-sm font-normal hover:bg-neutral-100 transition"
                      >
                        Log out
                      </button>

                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
