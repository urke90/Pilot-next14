import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user-actions';
import OnboardingContainer from '@/components/onboarding/OnboardingContainer';
import { Suspense } from 'react';
import type { IUser } from '@/models/User';

// ----------------------------------------------------------------

const Onboarding = async () => {
  const session = await auth();
  if (!session?.user.id) return null;

  let user: IUser | null = null;

  try {
    user = await getUserById(session.user.id);
  } catch (error) {
    console.log('Error fetching ', error);
  }

  if (!user) {
    return null;
  }

  return (
    <Suspense fallback="Loading...">
      <OnboardingContainer user={user} />
    </Suspense>
  );
};

export default Onboarding;
