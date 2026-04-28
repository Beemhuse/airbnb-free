import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import FloatingInput from "@/components/ui/floating-input";
import clsx from "clsx";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

interface ProfileSetupScreenProps {
   
  onContinue: (_data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
  }) => Promise<void>;



  onBack: () => void;
  initialData?: {
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    email?: string;
  };
}

export function ProfileSetupScreen({
  onContinue,
  onBack,
  initialData,
}: ProfileSetupScreenProps) {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [birthDate, setBirthDate] = useState(initialData?.birthDate || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const rules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "Contains a number or symbol",
      valid: /[0-9!@#$%^&*]/.test(password),
    },
  ];

  const handleContinue = async () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!birthDate) newErrors.birthDate = "Birthdate is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Password is too short";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await onContinue({
        firstName,
        lastName,
        birthDate,
        email,
        password,
      });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm">
        <div className="w-full p-4 border-b">
          <div className="flex justify-between w-2/3 items-center gap-4">
            <button
              onClick={onBack}
              className="text-neutral-600 hover:text-neutral-900"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <h2 className="text-md font-bold text-neutral-900">
              Finish signing up
            </h2>
          </div>
        </div>
        <div className=" p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div className="space-y-6 mb-6">
              <div className="block gap-4">
                <div className="border border-neutral-300 rounded-lg overflow-hidden">
                  <FloatingInput
                    label="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    containerClassName="border-0 border-b rounded-none"
                    errorMessage={errors.firstName}
                  />
                  <FloatingInput
                    label="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    containerClassName="border-0 rounded-none"
                    errorMessage={errors.lastName}
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-2">
                  Make sure it matches the name on your government ID.
                </p>
              </div>

              <div>
                <FloatingInput
                  label="Birthdate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  errorMessage={errors.birthDate}
                />
                <p className="text-xs text-neutral-500 mt-2">
                  To sign up, you need to be at least 18. Your birthday won't be shared with other people who use Airbnb.
                </p>
              </div>

              <div>
                <FloatingInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  errorMessage={errors.email}
                />
                <p className="text-xs text-neutral-500 mt-2">
                  We'll email you trip confirmations and receipts.
                </p>
              </div>

              <div>
                <div className="space-y-2">
                  <div className="relative">
                    <FloatingInput
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      inputClassName="pr-12"
                      errorMessage={errors.password}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-neutral-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {password && (
                    <div className="space-y-1 mt-2">
                      {rules.map((rule, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "flex items-center gap-2 text-xs",
                            rule.valid ? "text-green-600" : "text-red-500",
                          )}
                        >
                          <span
                            className={clsx(
                              "w-2 h-2 rounded-full",
                              rule.valid ? "bg-green-600" : "bg-red-500",
                            )}
                          />
                          <span>{rule.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <label
                  htmlFor="terms"
                  className="text-xs text-neutral-600 text-justify leading-relaxed"
                >
                  By selecting <strong> Agree and continue</strong>, I agree to
                  Airbnb's{" "}
                  <Link href={"#"} className="text-blue-800 font-bold underline">
                    {" "}
                    Terms of service, Payments Terms of Service
                  </Link>{" "}
                  , and{" "}
                  <Link href={"#"} className="text-blue-800 font-bold underline">
                    {" "}
                    Nondiscrimination Policy
                  </Link>{" "}
                  and acknowledge the{" "}
                  <Link href={"#"} className="text-blue-800 font-bold underline">
                    Privacy Policy{" "}
                  </Link>
                  {errors.terms && (
                    <span className="block text-destructive mt-1 font-medium">
                      {errors.terms}
                    </span>
                  )}
                </label>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold rounded-lg disabled:bg-neutral-400 disabled:opacity-100 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                </div>
              ) : (
                "Agree and continue"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


