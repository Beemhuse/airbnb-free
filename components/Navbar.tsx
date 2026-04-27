'use client'

import Link from 'next/link'
import { Globe, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:inline">airbnb</span>
        </Link>

        {/* Center - Become a Host */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <Button
            variant="ghost"
            className="text-sm font-medium text-foreground hover:bg-neutral-50"
          >
            Become a Host
          </Button>
        </div>

        {/* Right - Language, Menu, Profile */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:bg-neutral-50"
          >
            <Globe className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:bg-neutral-50"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:bg-neutral-50"
          >
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
