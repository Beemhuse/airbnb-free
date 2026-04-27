import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';

interface PhoneConfirmationScreenProps {
  phoneNumber: string;
  onContinue: (code: string) => void;
  onBack: () => void;
}

export function PhoneConfirmationScreen({
  phoneNumber,
  onContinue,
  onBack,
}: PhoneConfirmationScreenProps) {
  const [code, setCode] = useState('');

  const handleContinue = () => {
    if (code.length !== 4) {
      alert('Please enter the 4-digit code');
      return;
    }
    onContinue(code);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
        <button
          onClick={onBack}
          className="mb-6 text-neutral-600 hover:text-neutral-900"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="mb-8">
          <p className="text-xs font-semibold text-neutral-500 tracking-widest mb-4">
            STEP 1 OF 2
          </p>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Confirm your phone number
          </h2>
          <p className="text-neutral-700">
            Enter the 4-digit code Airbnb just sent to {phoneNumber}:
          </p>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            maxLength={4}
            placeholder="- - - -"
            value={code}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, '');
              setCode(val.slice(0, 4));
            }}
            className="h-12 text-center text-2xl font-semibold tracking-widest border-neutral-300"
          />
        </div>

        <Button
          onClick={handleContinue}
          className="w-full h-12 mb-6 bg-neutral-900 hover:bg-neutral-800 text-white text-base font-semibold rounded-lg"
        >
          Continue
        </Button>

        <div className="space-y-4 text-center">
          <button className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">
            Didn&apos;t get a text? Send again
          </button>
          <button className="block w-full text-neutral-600 hover:text-neutral-900 text-sm font-medium">
            Call me instead
          </button>
          <button className="block w-full text-neutral-600 hover:text-neutral-900 text-sm font-medium">
            I&apos;ll do this later
          </button>
        </div>
      </div>
    </div>
  );
}
