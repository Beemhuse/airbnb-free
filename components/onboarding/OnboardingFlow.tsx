'use client';

import { useOnboarding } from '@/hooks/useOnboarding';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { sendOtp, verifyOtp, uploadAvatar } from '@/lib/api';

import { InitialLoginScreen } from './screens/InitialLoginScreen';
import { LoginPasswordScreen } from './screens/LoginPasswordScreen';
import { PhoneConfirmationScreen } from './screens/PhoneConfirmationScreen';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen';
import { CommunityCommitmentModal } from './screens/CommunityCommitmentModal';
import { ProfilePhotoScreen } from './screens/ProfilePhotoScreen';
import { PhoneEntryScreen } from './screens/PhoneEntryScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';

interface OnboardingFlowProps {
  onClose?: () => void;
}

export function OnboardingFlow({ onClose }: OnboardingFlowProps) {
  const { loginAsync, registerAsync } = useAuth();
  const { toast } = useToast();
  const {
    currentStep,
    formData,
    showCommunityModal,
    setShowCommunityModal,
    updateFormData,
    goToStep,
  } = useOnboarding();

  // Step 1: Email/phone entry — just store data and move on
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
    goToStep('profile-setup');
  };

  // Login flow (existing user)
  const handleLoginPassword = async (password: string) => {
    const identifier = formData.phone || formData.email;
    const isEmail = identifier.includes('@');

    try {
      await loginAsync({
        [isEmail ? 'email' : 'phone']: identifier,
        password,
      });
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
      window.location.href = '/';
    } catch (err: unknown) {
      toast({
        title: 'Login failed',
        description: err instanceof Error ? err.message : 'Please check your credentials.',
        variant: 'destructive',
      });
    }
  };

  // OTP verification
  const handlePhoneConfirmation = async (code: string) => {
    try {
      await verifyOtp(formData.email, code);
      toast({
        title: 'Verified!',
        description: 'Your phone number has been confirmed.',
      });
      goToStep('profile-photo');
    } catch (err: unknown) {
      toast({
        title: 'Verification failed',
        description: err instanceof Error ? err.message : 'Invalid OTP code. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Registration (new user profile)
  const handleProfileSetup = async (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
  }) => {
    updateFormData(data);
    try {
      await registerAsync(data);
      toast({
        title: 'Account created!',
        description: 'Welcome to Airbnb.',
      });
      setShowCommunityModal(true);
    } catch (err: unknown) {
      toast({
        title: 'Registration failed',
        description: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // OTP send
  const handlePhoneEntry = async (phone: string, country: string) => {
    try {
      updateFormData({ phone, country });
      await sendOtp(formData.email);
      toast({
        title: 'OTP Sent',
        description: 'Please check your messages for the verification code.',
      });
      goToStep('phone-confirmation');
    } catch (err: unknown) {
      toast({
        title: 'Failed to send OTP',
        description: err instanceof Error ? err.message : 'Try again later.',
        variant: 'destructive',
      });
    }
  };

  const handleCommunityAgree = () => {
    updateFormData({ agreedToCommunity: true });
    setShowCommunityModal(false);
    toast({
      title: 'Community commitment accepted',
      description: 'Thank you for joining our community.',
    });
    goToStep('welcome');
  };

  const handleCommunityDecline = () => {
    setShowCommunityModal(false);
    goToStep('profile-setup');
  };

  const handleWelcomeContinue = () => {
    goToStep('phone-entry');
  };

  // Profile photo upload (optional)
  const handleProfilePhotoComplete = async (photo?: File | null) => {
    if (photo) {
      try {
        await uploadAvatar(photo, formData.email);
        updateFormData({ profilePhoto: photo });
        toast({
          title: 'Photo uploaded',
          description: 'Your profile photo has been saved.',
        });
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem('userAvatar', reader.result as string);
          window.dispatchEvent(new Event('storage'));
        };
        reader.readAsDataURL(photo);
      } catch (err: unknown) {
        toast({
          title: 'Upload failed',
          description: err instanceof Error ? err.message : 'Could not upload profile photo.',
          variant: 'destructive',
        });
      }
    }
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center p-4">
      {currentStep === 'login' && (
        <InitialLoginScreen
          onContinue={handleInitialLoginContinue}
          onClose={onClose}
          initialData={{
            email: formData.email,
            country: formData.country,
            phone: formData.phone,
          }}
        />
      )}

      {currentStep === 'login-password' && (
        <LoginPasswordScreen
          identifier={formData.phone || formData.email}
          onContinue={handleLoginPassword}
          onBack={() => goToStep('login')}
          onClose={onClose}
          isOpen={currentStep === 'login-password'}
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
          onBack={() => goToStep('welcome')}
          isOpen={currentStep === 'phone-entry'}
          initialData={{
            phone: formData.phone,
            country: formData.country,
          }}
        />
      )}

      {currentStep === 'phone-confirmation' && (
        <PhoneConfirmationScreen
          phoneNumber={formData.phone}
          onContinue={handlePhoneConfirmation}
          onBack={() => goToStep('phone-entry')}
          isOpen={currentStep === 'phone-confirmation'}
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
