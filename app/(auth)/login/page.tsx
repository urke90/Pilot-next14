'use client';

import { useRef } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
// components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// ----------------------------------------------------------------

const Login = () => {
  const email = useRef('');
  const password = useRef('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('signin', {
      email: email.current,
      password: password.current,
    });

    console.log('result u signinu', result);
  };

  return (
    <div className="h-screen">
      <div className="m-auto mt-20 flex w-[382px] flex-col">
        <div className="mb-40 flex justify-center">
          <Image
            src="/assets/images/Logo.svg"
            alt="Logo"
            width={164}
            height={41}
          />
        </div>
        <div>
          <div className="mb-5">
            <h2 className="h2-bold">Login</h2>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className="p3-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password" className="p3-medium">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="my-4">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
