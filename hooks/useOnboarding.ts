import { useState } from 'react';

export interface OnboardingFormData {
  email: string;
  country: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  password: string;
  agreedToCommunity: boolean;
  profilePhoto?: File | null;
}

export type OnboardingStep = 
  | 'login' 
  | 'phone-confirmation' 
  | 'profile-setup' 
  | 'community-commitment' 
  | 'profile-photo' 
  | 'complete';

export function useOnboarding() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('login');
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const [formData, setFormData] = useState<OnboardingFormData>({
    email: '',
    country: 'United States (+1)',
    phone: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    password: '',
    agreedToCommunity: false,
    profilePhoto: null,
  });

  const updateFormData = (updates: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    const steps: OnboardingStep[] = [
      'login',
      'phone-confirmation',
      'profile-setup',
      'community-commitment',
      'profile-photo',
      'complete',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const steps: OnboardingStep[] = [
      'login',
      'phone-confirmation',
      'profile-setup',
      'community-commitment',
      'profile-photo',
      'complete',
    ];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  return {
    currentStep,
    formData,
    showCommunityModal,
    setShowCommunityModal,
    updateFormData,
    goToStep,
    nextStep,
    previousStep,
  };
}
