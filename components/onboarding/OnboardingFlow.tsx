'use client';

import React, { useEffect, useState } from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { InitialLoginScreen } from './screens/InitialLoginScreen';
import { PhoneConfirmationScreen } from './screens/PhoneConfirmationScreen';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { CommunityCommitmentModal } from './screens/CommunityCommitmentModal';
import { ProfilePhotoScreen } from './screens/ProfilePhotoScreen';

export function OnboardingFlow() {
  const {
    currentStep,
    formData,
    showCommunityModal,
    setShowCommunityModal,
    updateFormData,
    goToStep,
    nextStep,
    previousStep,
  } = useOnboarding();

  const [usePhoneAuth, setUsePhoneAuth] = useState(false);

  const handleInitialLoginContinue = (
    emailOrPhone: string,
    country: string,
    phone?: string
  ) => {
    updateFormData({
      email: phone ? '' : emailOrPhone,
      phone: phone || emailOrPhone,
      country,
    });
    setUsePhoneAuth(!!phone);
    goToStep('phone-confirmation');
  };

  const handlePhoneConfirmation = (code: string) => {
    // In a real app, verify the code with a backend
    console.log('OTP Code:', code);
    goToStep('profile-setup');
  };

  const handleProfileSetup = (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
  }) => {
    updateFormData(data);
    setShowCommunityModal(true);
  };

  const handleCommunityAgree = () => {
    updateFormData({ agreedToCommunity: true });
    setShowCommunityModal(false);
    goToStep('profile-photo');
  };

  const handleCommunityDecline = () => {
    setShowCommunityModal(false);
    goToStep('profile-setup');
  };

  const handleProfilePhotoComplete = (photo?: File | null) => {
    updateFormData({ profilePhoto: photo || null });
    goToStep('complete');
  };

  useEffect(() => {
    if (currentStep === 'complete') {
      // Handle completion
      console.log('Onboarding completed with data:', formData);
      setTimeout(() => {
        alert('Welcome to Airbnb! Your account has been created.');
      }, 500);
    }
  }, [currentStep, formData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center p-4">
      {currentStep === 'login' && (
        <InitialLoginScreen
          onContinue={handleInitialLoginContinue}
          initialData={{
            email: formData.email,
            country: formData.country,
            phone: formData.phone,
          }}
        />
      )}

      {currentStep === 'phone-confirmation' && (
        <PhoneConfirmationScreen
          phoneNumber={formData.phone}
          onContinue={handlePhoneConfirmation}
          onBack={() => goToStep('login')}
        />
      )}

      {currentStep === 'profile-setup' && (
        <ProfileSetupScreen
          onContinue={handleProfileSetup}
          onBack={() => goToStep('phone-confirmation')}
          initialData={{
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            email: formData.email,
          }}
        />
      )}

      {showCommunityModal && (
        <CommunityCommitmentModal
          onAgree={handleCommunityAgree}
          onDecline={handleCommunityDecline}
        />
      )}

      {currentStep === 'profile-photo' && (
        <ProfilePhotoScreen
          onContinue={handleProfilePhotoComplete}
          onBack={() => goToStep('profile-setup')}
        />
      )}

      {currentStep === 'complete' && (
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8 text-center">
            <div className="mb-6 flex justify-center">
              <svg
                className="w-16 h-16 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Welcome to Airbnb!
            </h2>
            <p className="text-neutral-600">
              Your account has been created successfully.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
