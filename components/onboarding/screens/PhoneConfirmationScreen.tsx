"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "../Modal";

interface PhoneConfirmationScreenProps {
  phoneNumber: string;
  // eslint-disable-next-line no-unused-vars
  onContinue: (_code: string) => Promise<void>;



  onBack: () => void;
  isOpen: boolean;
}

export function PhoneConfirmationScreen({
  phoneNumber,
  onContinue,
  onBack,
  isOpen,
}: PhoneConfirmationScreenProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setError(null);
    if (code.length !== 4) {
      setError("Please enter the 4-digit code");
      return;
    }
    setLoading(true);
    try {
      await onContinue(code);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid code");
      }
    } finally {

      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onBack}
      showBackButton={true}
      title="Create your profile"
    >
      <div className="mb-8 text-center">
        <p className="text-xs font-bold text-black tracking-widest mb-4">
          STEP 1 OF 2
        </p>
        <h2 className="text-xl font-bold text-neutral-900 mb-4">
          Confirm your phone number
        </h2>
        <p className="text-neutral-700">
          Enter the 4-digit code Airbnb just sent to {phoneNumber}:
        </p>
      </div>

      <div className="mb-6 flex flex-col justify-center items-center gap-4">
        {loading ? (
          <div className="flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
          </div>
        ) : (
          <>
            <Input
              type="text"
              maxLength={4}
              placeholder="- - - -"
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setCode(val.slice(0, 4));
              }}
              className={`h-12 text-center text-2xl w-[100px] m-auto font-semibold tracking-widest border-neutral-300 ${error ? "border-destructive ring-destructive/20" : ""}`}
            />
            {error && (
              <p className="mt-2 text-xs text-destructive text-center">
                {error}
              </p>
            )}
          </>
        )}
        <Button
          onClick={handleContinue}
          disabled={loading || code.length !== 4}
          className={`w-fit h-12 mb-6 text-white text-base font-semibold rounded-lg transition-colors ${
            loading || code.length !== 4
              ? "bg-neutral-400 cursor-not-allowed opacity-100"
              : "bg-neutral-900 hover:bg-neutral-800"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
            </div>
          ) : (
            "Continue"
          )}
        </Button>
      </div>

      <div className="space-y-4 text-center">
        <button className="text-neutral-600 hover:text-neutral-900 text-sm font-medium">
          Didn&apos;t get a text?{" "}
          <span className="underline font-bold">Send again</span>
        </button>
        <button className="block w-full text-black underline  hover:text-neutral-900 text-sm font-bold">
          Call me instead
        </button>
        <button className="block w-full text-black hover:text-neutral-900 text-sm font-bold underline">
          I&apos;ll do this later
        </button>
      </div>
    </Modal>
  );
}
