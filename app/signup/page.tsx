'use client';

import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <OnboardingFlow />
      </div>
    </main>
  );
}
