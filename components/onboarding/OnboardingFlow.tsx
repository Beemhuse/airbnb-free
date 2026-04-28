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
  const { login, register } = useAuth();
  const { toast } = useToast();
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
    
    // Default to profile setup as checkUser is disabled
    goToStep('profile-setup');
  };


  const handleLoginPassword = async (password: string) => {
    const identifier = formData.phone || formData.email;
    const isEmail = identifier.includes('@');
    
    login({
      [isEmail ? 'email' : 'phone']: identifier,
      password,
    }, {
      onSuccess: () => {
        toast({
          title: "Welcome back!",
          description: "Login successful.",
        });
      },
      onError: (error: unknown) => {
        toast({
          title: "Login failed",
          description: error instanceof Error ? error.message : "Please check your credentials.",
          variant: "destructive",
        });
      }
    });
  };


  const handlePhoneConfirmation = async (code: string) => {
    try {
      await verifyOtp(formData.email, code);
      toast({
        title: "Verified",
        description: "Your phone number has been confirmed.",
      });
      goToStep('profile-photo');
    } catch (error: unknown) {
      toast({
        title: "Verification failed",
        description: error instanceof Error ? error.message : "Invalid code.",
        variant: "destructive",
      });
    }
  };


  const handleProfileSetup = async (data: {
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
  }) => {
    updateFormData(data);
    register(data, {
      onSuccess: () => {
        toast({
          title: "Account created",
          description: "Welcome to Airbnb!",
        });
        setShowCommunityModal(true);
      },
      onError: (error: unknown) => {
        toast({
          title: "Registration failed",
          description: error instanceof Error ? error.message : "Something went wrong.",
          variant: "destructive",
        });
      }
    });
  };


  const handlePhoneEntry = async (phone: string, country: string) => {
    try {
      updateFormData({ phone, country });
      await sendOtp(formData.email);
      toast({
        title: "OTP Sent",
        description: "Please check your messages for the code.",
      });
      goToStep('phone-confirmation');
    } catch (error: unknown) {
      toast({
        title: "Failed to send OTP",
        description: error instanceof Error ? error.message : "Try again later.",
        variant: "destructive",
      });
    }
  };

  const handleCommunityAgree = () => {
    updateFormData({ agreedToCommunity: true });
    setShowCommunityModal(false);
    toast({
      title: "Agreement signed",
      description: "Thank you for joining our community.",
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



  const handleProfilePhotoComplete = async (photo?: File | null) => {
    if (photo) {
      try {
        await uploadAvatar(photo, formData.email);
        updateFormData({ profilePhoto: photo });
        
        toast({
          title: "Photo uploaded",
          description: "Your profile photo has been updated.",
        });

        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem('userAvatar', reader.result as string);
          window.dispatchEvent(new Event('storage'));
        };
        reader.readAsDataURL(photo);
      } catch (error: unknown) {
        toast({
          title: "Upload failed",
          description: error instanceof Error ? error.message : "Could not upload profile photo.",
          variant: "destructive",
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

      {currentStep === 'login-password' && (
        <LoginPasswordScreen
          identifier={formData.phone || formData.email}
          onContinue={handleLoginPassword}
          onBack={() => goToStep('login')}
          onClose={onClose}
          isOpen={currentStep === 'login-password'}
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


