'use client';
import { useOnboarding } from '@/hooks/useOnboarding';
import { register, sendOtp, verifyOtp, uploadAvatar } from '@/lib/api';

import { InitialLoginScreen } from './screens/InitialLoginScreen';
import { PhoneConfirmationScreen } from './screens/PhoneConfirmationScreen';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { CommunityCommitmentModal } from './screens/CommunityCommitmentModal';
import { ProfilePhotoScreen } from './screens/ProfilePhotoScreen';
import { PhoneEntryScreen } from './screens/PhoneEntryScreen';

import { WelcomeScreen } from './screens/WelcomeScreen';

export function OnboardingFlow() {
  const {
    currentStep,
    formData,
    showCommunityModal,
    setShowCommunityModal,
    updateFormData,
    goToStep,
  } = useOnboarding();


  const handleInitialLoginContinue = async (
    emailOrPhone: string,
    country: string,
    phone?: string
  ) => {
    const email = phone ? '' : emailOrPhone;
    updateFormData({
      email,
      phone: phone || emailOrPhone,
      country,
    });

    
    goToStep('profile-setup');
  };

  const handlePhoneConfirmation = async (code: string) => {
    await verifyOtp(formData.email, code);
    goToStep('profile-photo');
  };


  const handleProfileSetup = async (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
  }) => {
    updateFormData(data);
    // Register the user here
    try {
      await register(data);
      setShowCommunityModal(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Registration failed', { cause: error });
      }
      throw new Error('Registration failed', { cause: error });
    }



  };

  const handlePhoneEntry = async (phone: string, country: string) => {
    updateFormData({ phone, country });
    await sendOtp(formData.email);
    goToStep('phone-confirmation');
  };

  const handleCommunityAgree = () => {
    updateFormData({ agreedToCommunity: true });
    setShowCommunityModal(false);
    goToStep('welcome');
  };

  const handleCommunityDecline = () => {
    setShowCommunityModal(false);
    goToStep('profile-setup');
  };

  const handleWelcomeContinue = () => {
    goToStep('phone-entry');
  };



  const handleProfilePhotoComplete = async (photo?: File | null) => {
    if (photo) {
      try {
        await uploadAvatar(photo, formData.email);
        updateFormData({ profilePhoto: photo });
        
        // Save avatar URL to localStorage for the Navbar to pick up
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem('userAvatar', reader.result as string);
          window.dispatchEvent(new Event('storage')); // Trigger update in other components
        };
        reader.readAsDataURL(photo);
      } catch {
        // Error is handled by the caller or ignored if it's just an avatar upload
      }



    }
    
    // Redirect to home or sign-in as requested
    window.location.href = '/';
  };

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
          isOpen={currentStep === 'phone-confirmation'}
        />
      )}

      {currentStep === 'profile-setup' && (
        <ProfileSetupScreen
          onContinue={handleProfileSetup}
          onBack={() => goToStep('login')}
          initialData={{
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            email: formData.email,
          }}
        />
      )}

      {currentStep === 'phone-entry' && (
        <PhoneEntryScreen
          onContinue={handlePhoneEntry}
          onBack={() => goToStep('profile-setup')}
          isOpen={currentStep === 'phone-entry'}
          initialData={{
            phone: formData.phone,
            country: formData.country,
          }}
        />
      )}

      <CommunityCommitmentModal
        onAgree={handleCommunityAgree}
        onDecline={handleCommunityDecline}
        isOpen={showCommunityModal}
      />

      {currentStep === 'welcome' && (
        <WelcomeScreen
          onContinue={handleWelcomeContinue}
          onClose={() => goToStep('profile-setup')}
          isOpen={currentStep === 'welcome'}
        />
      )}

      {currentStep === 'profile-photo' && (
        <ProfilePhotoScreen
          onContinue={handleProfilePhotoComplete}
          onBack={() => goToStep('profile-setup')}
        />
      )}
    </div>
  );
}


