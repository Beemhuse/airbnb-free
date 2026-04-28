'use client';

import { LoginScreen } from '@/components/onboarding/screens/LoginScreen';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] py-12">
        <LoginScreen />
      </div>
    </main>
  );
}

