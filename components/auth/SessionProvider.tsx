'use client';

import {
  SessionProvider as NextSessionProvider,
  SessionProviderProps,
} from 'next-auth/react';

interface IProviderProps extends SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<IProviderProps> = ({ children, session }) => {
  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
};

export default SessionProvider;
