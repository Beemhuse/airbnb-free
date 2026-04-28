import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FloatingCountrySelector } from "../CountrySelector";
import { Mail, X } from "lucide-react";
import FloatingInput from "@/components/ui/floating-input";
import Link from "next/link";
import clsx from "clsx";

interface InitialLoginScreenProps {
   
  onContinue: (_email: string, _country: string, _phone?: string) => Promise<void>;
  onClose?: () => void;


  initialData?: {
    email?: string;
    country?: string;
    phone?: string;
  };
}

export function InitialLoginScreen({
  onContinue,
  onClose,
  initialData,
}: InitialLoginScreenProps) {

  const [usePhone, setUsePhone] = useState(false);
  const [email, setEmail] = useState(initialData?.email || "");
  const [country, setCountry] = useState(
    initialData?.country || "Nigeria (+234)",
  );
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = loading || (usePhone ? !phone.trim() : !email.trim());


  const handleContinue = async () => {
    setError(null);
    if (usePhone && !phone.trim()) {
      setError("Please enter a phone number");
      return;
    }
    if (!usePhone && !email.trim()) {
      setError("Please enter an email");
      return;
    }

    setLoading(true);
    try {
      await onContinue(usePhone ? phone : email, country, phone);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm relative">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 text-neutral-600 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <p className="text-sm text-black font-bold p-4 text-center border-b mb-4">
          Log in or sign up
        </p>

        <div className="p-8 pt-2">
          <h1 className="text-xl font-bold text-neutral-900 mb-6">
            Welcome to Airbnb
          </h1>

          {!usePhone ? (
            <>
              <div className="mb-6">
                <FloatingInput
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={!usePhone ? error || undefined : undefined}
                />
              </div>

              <Button
                onClick={handleContinue}
                disabled={isButtonDisabled}
                className={clsx(
                  "w-full h-12 mb-4 text-base font-semibold rounded-lg flex items-center justify-center transition-colors",
                  isButtonDisabled
                    ? "bg-neutral-400 text-white cursor-not-allowed opacity-100"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground",
                )}
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                  </div>
                ) : (
                  "Continue"
                )}
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
              <div className="mb-4 border border-neutral-300 rounded-lg">
                <FloatingCountrySelector
                  value={country}
                  onChange={setCountry}
                />
                <FloatingInput
                  label="Phone number"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setPhone(val);
                  }}
                  containerClassName=" border-0  rounded-none"
                  errorMessage={usePhone ? error || undefined : undefined}
                />

              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We'll call or text you message to confirm your number. Standard
                message and data rates apply. <br />
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>

              <Button
                onClick={handleContinue}
                disabled={loading}
                className={clsx(
                  "w-full h-12 mb-4 text-base font-semibold rounded-lg flex items-center justify-center transition-colors",
                  loading
                    ? "bg-neutral-400 text-white cursor-not-allowed opacity-100"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground",
                )}
              >
                {loading ? (
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                  </div>
                ) : (
                  "Continue"
                )}
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
            <button className="w-full p-3 h-12 border border-neutral-300 rounded-lg flex items-center justify-between gap-3 hover:bg-neutral-50 transition">
              <div className="w-3/4 flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#1877f2"
                    d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                  />
                  <path
                    fill="#fff"
                    d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                  />
                </svg>{" "}
                <span className="text-neutral-700 font-medium">
                  Continue with Facebook
                </span>
              </div>
            </button>

            <button className="w-full h-12 border border-neutral-300 rounded-lg  p-3  hover:bg-neutral-50 transition">
              <div className="w-3/4 flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#ffc107"
                    d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                  />
                  <path
                    fill="#ff3d00"
                    d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                  />
                  <path
                    fill="#4caf50"
                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                  />
                  <path
                    fill="#1976d2"
                    d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                  />
                </svg>
                <span className="text-neutral-700 font-medium">
                  Continue with Google
                </span>
              </div>
            </button>

            <button className="w-full h-12 border border-neutral-300  p-3 rounded-lg gap-3 hover:bg-neutral-50 transition">
              <div className="w-3/4 flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 128 128"
                >
                  <path d="M97.905 67.885c.174 18.8 16.494 25.057 16.674 25.137c-.138.44-2.607 8.916-8.597 17.669c-5.178 7.568-10.553 15.108-19.018 15.266c-8.318.152-10.993-4.934-20.504-4.934c-9.508 0-12.479 4.776-20.354 5.086c-8.172.31-14.395-8.185-19.616-15.724C15.822 94.961 7.669 66.8 18.616 47.791c5.438-9.44 15.158-15.417 25.707-15.571c8.024-.153 15.598 5.398 20.503 5.398c4.902 0 14.106-6.676 23.782-5.696c4.051.169 15.421 1.636 22.722 12.324c-.587.365-13.566 7.921-13.425 23.639M82.272 21.719c4.338-5.251 7.258-12.563 6.462-19.836c-6.254.251-13.816 4.167-18.301 9.416c-4.02 4.647-7.54 12.087-6.591 19.216c6.971.54 14.091-3.542 18.43-8.796" />
                </svg>
                <span className="text-neutral-700 font-medium">
                  Continue with Apple
                </span>
              </div>
            </button>

            {!usePhone && (
              <button
                onClick={() => setUsePhone(true)}
                className="w-full h-12 p-3 border border-neutral-300 rounded-lg gap-3 hover:bg-neutral-50 transition"
              >
                <div className="w-3/4 flex items-center justify-between">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 64 64"
                  >
                    <path
                      fill="currentColor"
                      d="M44.97 2H19.03C17.015 2 15 3.936 15.001 5.871L15 58.129C15 60.064 17.015 62 19.03 62h25.94c2.016 0 4.03-1.936 4.03-3.871V5.871C49 3.936 46.985 2 44.97 2m-2.11 3.281c.521 0 .945.419.945.938c0 .517-.424.938-.945.938s-.943-.421-.943-.938a.94.94 0 0 1 .943-.938m-13.411.502h5.102c.157 0 .282.208.282.467c0 .26-.125.471-.282.471h-5.102c-.155 0-.282-.211-.282-.471c0-.258.127-.467.282-.467m6.093 52.701a.705.705 0 0 1-.709.703h-5.666a.705.705 0 0 1-.709-.703v-1.406c0-.389.317-.703.709-.703h5.666c.392 0 .709.314.709.703zM46.167 54.5H17.833v-45h28.333v45z"
                    />
                    <path
                      fill="currentColor"
                      d="M20.593 16.531h3.125a.78.78 0 0 0 .782-.78v-3.125a.78.78 0 0 0-.782-.782h-3.125a.78.78 0 0 0-.78.782v3.125c0 .431.349.78.78.78m6.562 0h3.125a.78.78 0 0 0 .782-.78v-3.125a.78.78 0 0 0-.782-.782h-3.125a.78.78 0 0 0-.78.782v3.125c0 .431.35.78.78.78m6.563 0h3.125a.78.78 0 0 0 .782-.78v-3.125a.78.78 0 0 0-.782-.782h-3.125a.78.78 0 0 0-.78.782v3.125c0 .431.349.78.78.78m6.562 0h3.125a.78.78 0 0 0 .782-.78v-3.125a.78.78 0 0 0-.782-.782H40.28a.78.78 0 0 0-.78.782v3.125c0 .431.35.78.78.78M20.593 52.625h3.125a.78.78 0 0 0 .782-.78v-3.126a.78.78 0 0 0-.782-.781h-3.125a.78.78 0 0 0-.78.781v3.126c0 .43.349.78.78.78m6.562 0h3.125a.78.78 0 0 0 .782-.78v-3.126a.78.78 0 0 0-.782-.781h-3.125a.78.78 0 0 0-.78.781v3.126c0 .43.35.78.78.78m6.563 0h3.125a.78.78 0 0 0 .782-.78v-3.126a.78.78 0 0 0-.782-.781h-3.125a.78.78 0 0 0-.78.781v3.126c0 .43.349.78.78.78m6.562 0h3.125a.78.78 0 0 0 .782-.78v-3.126a.78.78 0 0 0-.782-.781H40.28a.78.78 0 0 0-.78.781v3.126c0 .43.35.78.78.78M20.593 34.578h3.125a.78.78 0 0 0 .782-.78v-3.126a.78.78 0 0 0-.782-.781h-3.125a.78.78 0 0 0-.78.781v3.126c0 .431.349.78.78.78m6.562 0h3.125a.78.78 0 0 0 .782-.78v-3.126a.78.78 0 0 0-.782-.781h-3.125a.78.78 0 0 0-.78.781v3.126c0 .431.35.78.78.78m6.563 0h3.125a.78.78 0 0 0 .782-.78v-3.126a.78.78 0 0 0-.782-.781h-3.125a.78.78 0 0 0-.78.781v3.126c0 .431.349.78.78.78m-13.125-6.015h3.125c.433 0 .782-.35.782-.781v-3.124a.78.78 0 0 0-.782-.782h-3.125a.78.78 0 0 0-.78.782v3.124a.78.78 0 0 0 .78.781m6.562 0h3.125c.433 0 .782-.35.782-.781v-3.124a.78.78 0 0 0-.782-.782h-3.125a.78.78 0 0 0-.78.782v3.124c0 .431.35.781.78.781m6.563 0h3.125c.433 0 .782-.35.782-.781v-3.124a.78.78 0 0 0-.782-.782h-3.125a.78.78 0 0 0-.78.782v3.124a.78.78 0 0 0 .78.781m6.562 0h3.125c.433 0 .782-.35.782-.781v-3.124a.78.78 0 0 0-.782-.782H40.28a.78.78 0 0 0-.78.782v3.124c0 .431.35.781.78.781m-19.687-6.015h3.125c.433 0 .782-.35.782-.782v-3.125c0-.43-.35-.78-.782-.78h-3.125a.78.78 0 0 0-.78.78v3.125a.78.78 0 0 0 .78.782m6.562 0h3.125c.433 0 .782-.35.782-.782v-3.125c0-.43-.35-.78-.782-.78h-3.125a.78.78 0 0 0-.78.78v3.125c0 .432.35.782.78.782m6.563 0h3.125c.433 0 .782-.35.782-.782v-3.125c0-.43-.35-.78-.782-.78h-3.125a.78.78 0 0 0-.78.78v3.125a.78.78 0 0 0 .78.782m6.562 0h3.125c.433 0 .782-.35.782-.782v-3.125c0-.43-.35-.78-.782-.78H40.28a.78.78 0 0 0-.78.78v3.125c0 .432.35.782.78.782"
                    />
                  </svg>{" "}
                  <span className="text-neutral-700 font-medium">
                    Continue with Phone
                  </span>
                </div>
              </button>
            )}
            {usePhone && (
              <button
                onClick={() => setUsePhone(false)}
                className="w-full h-12 border border-neutral-300 rounded-lg p-3 gap-3 hover:bg-neutral-50 transition"
              >
                <div className="flex items-center w-3/4 justify-between">
                  <Mail className="w-5 h-5 text-neutral-600" />
                  <span className="text-neutral-700 font-medium">
                    Continue with Email
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
