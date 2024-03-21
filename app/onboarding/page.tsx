import { auth } from '@/auth';
import OnboardingContainer from '@/components/onboarding/OnboardingContainer';

// ----------------------------------------------------------------

const Onboarding = async () => {
  const session = await auth();

  if (!session?.user) return;

  return <OnboardingContainer user={session.user} />;
};

export default Onboarding;
