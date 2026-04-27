import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

interface ProfileSetupScreenProps {
  onContinue: (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
  }) => void;
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
  const [firstName, setFirstName] = useState(initialData?.firstName || '');
  const [lastName, setLastName] = useState(initialData?.lastName || '');
  const [birthDate, setBirthDate] = useState(initialData?.birthDate || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return 'weak';
    if (pwd.length < 8) return 'weak';
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return 'medium';
    return 'strong';
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleContinue = () => {
    if (!firstName.trim() || !lastName.trim() || !birthDate || !email.trim() || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (!agreedToTerms) {
      alert('Please agree to the terms');
      return;
    }
    onContinue({
      firstName,
      lastName,
      birthDate,
      email,
      password,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
        <button
          onClick={onBack}
          className="mb-6 text-neutral-600 hover:text-neutral-900"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-neutral-900 mb-8">Finish signing up</h2>

        <div className="space-y-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm text-neutral-600 block mb-2">First name</label>
              <Input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-neutral-600 block mb-2">Last name</label>
              <Input
                type="text"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-12 text-base"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-600 block mb-2">Make sure it matches the name on your government ID.</label>
          </div>

          <div>
            <label className="text-sm text-neutral-600 block mb-2">Birthdate</label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="h-12 text-base"
            />
            <p className="text-xs text-neutral-500 mt-2">
              To sign up, you need to be at least 18. Your birthday won&apos;t be shared with other people who use Airbnb.
            </p>
          </div>

          <div>
            <label className="text-sm text-neutral-600 block mb-2">Email</label>
            <Input
              type="email"
              placeholder="jsmith.mobbin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 text-base"
            />
            <p className="text-xs text-neutral-500 mt-2">
              We&apos;ll email you trip confirmations and receipts.
            </p>
          </div>

          <div>
            <label className="text-sm text-neutral-600 block mb-2">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {password && (
              <p className="text-xs text-neutral-500 mt-2 flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    passwordStrength === 'strong'
                      ? 'bg-green-600'
                      : passwordStrength === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                Password strength: {passwordStrength}
              </p>
            )}
          </div>

          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-xs text-neutral-600 leading-relaxed">
              By selecting{' '}
              <span className="font-semibold">Agree and continue</span>, I agree to Airbnb&apos;s{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              , <a href="#" className="text-blue-600 hover:underline">
                Payments Terms of Service
              </a>
              , and <a href="#" className="text-blue-600 hover:underline">
                Nondiscrimination Policy
              </a>{' '}
              and acknowledge the <a href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-base font-semibold rounded-lg"
        >
          Agree and continue
        </Button>
      </div>
    </div>
  );
}
