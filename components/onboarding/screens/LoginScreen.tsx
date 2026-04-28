'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, X, Facebook, Apple } from "lucide-react";
import FloatingInput from "@/components/ui/floating-input";
import clsx from "clsx";

import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface LoginScreenProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export function LoginScreen({ onClose, onSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn, error: authError } = useAuth();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (!email || !password) return;
    
    login({ email, password }, {
      onSuccess: () => {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        if (onSuccess) {
          onSuccess();
        }
      },
    });
  };


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute left-4 top-4 text-neutral-600 hover:text-black transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <p className="text-sm text-black font-bold p-4 text-center border-b">
          Log in
        </p>

        <div className="p-8 pt-6">
          <h1 className="text-xl font-bold text-neutral-900 mb-6">
            Welcome to Airbnb
          </h1>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div className="space-y-4 mb-6">
              <FloatingInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <div className="relative">
                <FloatingInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold underline text-neutral-900"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-destructive text-sm mb-4">{authError instanceof Error ? authError.message : "Login failed"}</p>
            )}

            <Button
              type="submit"
              disabled={isLoggingIn || !email || !password}
              className={clsx(
                "w-full h-12 mb-6 text-base font-semibold rounded-lg",
                isLoggingIn || !email || !password
                  ? "bg-neutral-400 text-white cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              )}
            >
              {isLoggingIn ? (

                <div className="flex items-center justify-center gap-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                </div>
              ) : (
                "Log in"
              )}
            </Button>
          </form>


          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-600">or</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full h-12 border border-neutral-800 rounded-lg flex items-center px-4 hover:bg-neutral-50 transition">
              <Facebook className="w-5 h-5 text-[#1877f2]" />
              <span className="flex-1 text-sm font-semibold">Continue with Facebook</span>
            </button>
            <button className="w-full h-12 border border-neutral-800 rounded-lg flex items-center px-4 hover:bg-neutral-50 transition">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#ffc107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917" />
                  <path fill="#ff3d00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691" />
                  <path fill="#4caf50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.9 11.9 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44" />
                  <path fill="#1976d2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917" />
                </svg>
              </div>
              <span className="flex-1 text-sm font-semibold">Continue with Google</span>
            </button>
            <button className="w-full h-12 border border-neutral-800 rounded-lg flex items-center px-4 hover:bg-neutral-50 transition">
              <Apple className="w-5 h-5 fill-black" />
              <span className="flex-1 text-sm font-semibold">Continue with Apple</span>
            </button>
            <button className="w-full h-12 border border-neutral-800 rounded-lg flex items-center px-4 hover:bg-neutral-50 transition">
              <Mail className="w-5 h-5" />
              <span className="flex-1 text-sm font-semibold">Continue with Phone</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
