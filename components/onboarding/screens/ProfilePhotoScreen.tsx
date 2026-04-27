import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Upload } from 'lucide-react';

interface ProfilePhotoScreenProps {
  onContinue: (photo?: File | null) => void;
  onBack: () => void;
}

export function ProfilePhotoScreen({
  onContinue,
  onBack,
}: ProfilePhotoScreenProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onContinue(file);
    }
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
            STEP 2 OF 2
          </p>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Add a profile photo
          </h2>
          <p className="text-neutral-700">
            Pick an image that shows your face. Hosts won&apos;t be able to see your profile photo until your reservation is confirmed.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center border-2 border-neutral-200">
            <svg
              className="w-16 h-16 text-neutral-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-12 mb-3 bg-neutral-900 hover:bg-neutral-800 text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload a photo
        </Button>

        <button className="w-full h-12 mb-6 border border-neutral-300 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-50 transition">
          <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="text-neutral-700 font-medium">Use Facebook photo</span>
        </button>

        <button
          onClick={() => onContinue()}
          className="w-full text-center text-neutral-600 hover:text-neutral-900 text-sm font-medium"
        >
          I&apos;ll do this later
        </button>
      </div>
    </div>
  );
}
