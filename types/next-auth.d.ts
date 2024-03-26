import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's unique identifier. */
      id: string;
      /** Current step of user onboarding process. If value is 5 then onboarding is finished */
      onboardingStep: number;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id?: string;
    /** OCurrent step of user onboarding process. If value is 5 then onboarding is finished */
    onboardingStep: number;
  }
}
