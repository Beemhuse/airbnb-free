"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";


interface ProfilePhotoScreenProps {
  // eslint-disable-next-line no-unused-vars
  onContinue: (_photo?: File | null) => void;


  onBack: () => void;
}

export function ProfilePhotoScreen({
  onContinue,
  onBack,
}: ProfilePhotoScreenProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-center relative h-14 border-b">
          <button
            onClick={onBack}
            className="absolute left-4 text-neutral-700 hover:text-black"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <h3 className="text-sm font-semibold text-neutral-900">
            Create your profile
          </h3>
        </div>

        {/* BODY */}
        <div className="px-6 py-8 text-center">

          {/* STEP */}
          <p className="text-[11px] font-semibold text-neutral-400 tracking-widest mb-3">
            STEP 2 OF 2
          </p>

          {/* TITLE */}
          <h2 className="text-[22px] font-semibold text-neutral-900 mb-2">
            Add a profile photo
          </h2>

          {/* DESCRIPTION */}
          <p className="text-sm text-neutral-600 leading-relaxed mb-8">
            Pick an image that shows your face. Hosts won’t be able to see your
            profile photo until your reservation is confirmed.
          </p>

          {/* AVATAR */}
          <div className="flex justify-center mb-8">
            <div className="w-44 h-44 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center overflow-hidden relative">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <svg
                  className="w-20 h-20 text-neutral-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* BUTTONS */}
          {!previewUrl ? (
            <>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 mb-3 bg-neutral-900 hover:bg-neutral-800 text-white text-base font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload a photo
              </Button>

              <button className="w-full h-12 mb-5 border border-neutral-300 rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-50 transition">
                <span className="w-5 h-5 flex items-center justify-center text-blue-600">
                  f
                </span>
                <span className="text-neutral-800 font-medium">
                  Use Facebook photo
                </span>
              </button>

              <button
                onClick={() => onContinue()}
                className="text-sm text-neutral-700 underline"
              >
                I’ll do this later
              </button>
            </>
          ) : (
            <>
              <Button
                onClick={() => onContinue(file)}
                className="w-full h-12 mb-3 bg-neutral-900 text-white font-semibold"
              >
                Done
              </Button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-12 border border-neutral-300 rounded-lg hover:bg-neutral-50"
              >
                Change photo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}