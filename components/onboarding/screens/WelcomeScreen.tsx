'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Modal from '../Modal'
import Image from 'next/image'

interface WelcomeScreenProps {
  onContinue: () => void
  onClose: () => void
  isOpen: boolean
}

export function WelcomeScreen({
  onContinue,
  onClose,
  isOpen,
}: WelcomeScreenProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      showBackButton={false} 
      showCloseButton={true} 
      title="Create your profile"
      className="max-w-xl"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 mt-4">
         
          <Image 
            src="/airbnb-logo.png" 
            alt="Welcome" 
            width={80} 
            height={80} 
            loading="eager"
            className="rounded-xl shadow-sm"
            style={{ width: 80, height: 80 }}
            onError={(e) => {
              // Fallback if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        <h2 className="text-3xl font-bold text-neutral-900 mb-4">
          Welcome to Airbnb
        </h2>
        
        <p className="text-neutral-600 mb-6 leading-relaxed">
          Discover places to stay, local restaurants and unique experiences around the world.
        </p>

        <Button
          onClick={onContinue}
          className="w-full h-12 bg-black hover:bg-primary/90 text-primary-foreground text-base font-semibold rounded-lg"
        >
          Continue
        </Button>
      </div>
    </Modal>
  )
}
