import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';

export const metadata = {
  title: 'Airbnb Onboarding',
  description: 'Complete your Airbnb account setup',
};

export default function Home() {
  return <OnboardingFlow />;
}
