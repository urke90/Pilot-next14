import type { Metadata } from 'next';
// fonts
import { inter } from './ui/fonts';
import SessionProvider from '@/components/auth/SessionProvider';
import { getServerSession } from 'next-auth';

import './globals.css';

// ----------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession();

  console.log('session', session);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
