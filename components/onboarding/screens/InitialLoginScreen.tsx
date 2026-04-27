import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CountrySelector } from '../CountrySelector';
import { Facebook, Mail } from 'lucide-react';

interface InitialLoginScreenProps {
  onContinue: (email: string, country: string, phone?: string) => void;
  initialData?: {
    email?: string;
    country?: string;
    phone?: string;
  };
}

export function InitialLoginScreen({
  onContinue,
  initialData,
}: InitialLoginScreenProps) {
  const [usePhone, setUsePhone] = useState(false);
  const [email, setEmail] = useState(initialData?.email || '');
  const [country, setCountry] = useState(initialData?.country || 'United States (+1)');
  const [phone, setPhone] = useState(initialData?.phone || '');

  const handleContinue = () => {
    if (usePhone && !phone.trim()) {
      alert('Please enter a phone number');
      return;
    }
    if (!usePhone && !email.trim()) {
      alert('Please enter an email');
      return;
    }
    onContinue(usePhone ? phone : email, country, phone);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
        <p className="text-sm text-neutral-500 mb-4">Log in or sign up</p>

        <h1 className="text-3xl font-bold text-neutral-900 mb-6">Welcome to Airbnb</h1>

        {!usePhone ? (
          <>
            <div className="mb-6">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <Button
              onClick={handleContinue}
              className="w-full h-12 mb-4 bg-red-600 hover:bg-red-700 text-white text-base font-semibold rounded-lg"
            >
              Continue
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-600">or</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="text-sm text-neutral-600 block mb-2">Country/Region</label>
              <CountrySelector value={country} onChange={setCountry} />
            </div>

            <div className="mb-6">
              <label className="text-sm text-neutral-600 block mb-2">Phone number</label>
              <Input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <Button
              onClick={handleContinue}
              className="w-full h-12 mb-4 bg-red-600 hover:bg-red-700 text-white text-base font-semibold rounded-lg"
            >
              Continue
            </Button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-600">or</span>
              </div>
            </div>
          </>
        )}

        <div className="space-y-3">
          <button className="w-full h-12 border border-neutral-300 rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-50 transition">
            <Facebook className="w-5 h-5 text-blue-600" />
            <span className="text-neutral-700 font-medium">Continue with Facebook</span>
          </button>

          <button className="w-full h-12 border border-neutral-300 rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-50 transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <text x="2" y="18" fontSize="16" fill="currentColor" className="text-neutral-700">
                G
              </text>
            </svg>
            <span className="text-neutral-700 font-medium">Continue with Google</span>
          </button>

          <button className="w-full h-12 border border-neutral-300 rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-50 transition">
            <svg className="w-5 h-5 fill-current text-neutral-700" viewBox="0 0 24 24">
              <path d="M17.05 13.5c-.91 0-1.75.35-2.36.92.84 1.18 1.34 2.65 1.34 4.23 0 .45-.03.89-.1 1.32 1.28-.78 2.14-2.14 2.14-3.67 0-2.42-1.97-4.4-4.4-4.4-1.06 0-2.03.38-2.8.99.72.54 1.32 1.25 1.75 2.08.56-.12 1.14-.19 1.73-.19 2.42 0 4.4 1.97 4.4 4.4 0 .45-.07.88-.2 1.31.51-.64.82-1.47.82-2.37 0-2.09-1.7-3.82-3.82-3.82zm-6.05 5.9c-1.33 0-2.55-.54-3.43-1.42C6.73 16.95 6.19 15.73 6.19 14.4c0-1.33.54-2.55 1.42-3.43 1.46-1.46 3.85-1.67 5.55-.63 1.7.95 2.66 2.75 2.66 4.64 0 .48-.04.96-.12 1.42-1.05 2.23-3.24 3.64-5.78 3.64z" />
            </svg>
            <span className="text-neutral-700 font-medium">Continue with Google</span>
          </button>

          <button className="w-full h-12 border border-neutral-300 rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-50 transition">
            <svg className="w-5 h-5 fill-current text-neutral-700" viewBox="0 0 24 24">
              <path d="M17.05 13.5c-.91 0-1.75.35-2.36.92.84 1.18 1.34 2.65 1.34 4.23 0 .45-.03.89-.1 1.32 1.28-.78 2.14-2.14 2.14-3.67 0-2.42-1.97-4.4-4.4-4.4-1.06 0-2.03.38-2.8.99.72.54 1.32 1.25 1.75 2.08.56-.12 1.14-.19 1.73-.19 2.42 0 4.4 1.97 4.4 4.4 0 .45-.07.88-.2 1.31.51-.64.82-1.47.82-2.37 0-2.09-1.7-3.82-3.82-3.82z" />
            </svg>
            <span className="text-neutral-700 font-medium">Continue with Apple</span>
          </button>

          {!usePhone && (
            <button
              onClick={() => setUsePhone(true)}
              className="w-full h-12 border border-neutral-300 rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-50 transition"
            >
              <Mail className="w-5 h-5 text-neutral-600" />
              <span className="text-neutral-700 font-medium">Continue with Phone</span>
            </button>
          )}
          {usePhone && (
            <button
              onClick={() => setUsePhone(false)}
              className="w-full h-12 border border-neutral-300 rounded-lg flex items-center justify-center gap-3 hover:bg-neutral-50 transition"
            >
              <Mail className="w-5 h-5 text-neutral-600" />
              <span className="text-neutral-700 font-medium">Continue with Email</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
