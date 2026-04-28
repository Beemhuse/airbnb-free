"use client";

import Link from "next/link";
import { Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Initial load
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedAvatar = localStorage.getItem('userAvatar');
      setAvatar(updatedAvatar);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 ml-10 shrink-0">
          <Image
            src={"/airbnb-logo.png"}
            alt="airbnb logo"
            width={20}
            height={20}
          />
          <span className="text-xl font-bold text-primary hidden sm:inline">
            airbnb
          </span>
        </Link>

        <div className="flex">
          {/* Right - Language, Menu, Profile */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-sm font-medium text-foreground"
            >
              Become a Host
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground">
              <Globe className="w-5 h-5" />
            </Button>
            <div className="border flex p-2 items-center rounded-full">
              <Button variant="ghost" size="sm" className="text-foreground ">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="relative ">
                <Image 
                  src={avatar || '/avatar.png'}  
                  alt="User profile" 
                  width={30} 
                  height={30}
                  className="cursor-pointer rounded-full object-cover aspect-square" 
                />
                <div className="bg-primary absolute top-1 -right-1 rounded-full w-2 h-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

