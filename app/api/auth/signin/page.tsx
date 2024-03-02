'use client';

import { signIn } from 'next-auth/react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import result from 'postcss/lib/result';

// ----------------------------------------------------------------

const Login = () => {
  const email = useRef('');
  const password = useRef('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      email: email.current,
      password: password.current,
    });

    console.log('result u signinu', result);
  };

  return (
    <div className="h-screen border-2 border-red-500">
      <div className="m-auto mt-40 flex w-[382px] flex-col  border-2">
        <h1 className="h1-bold text-center">GitNote</h1>
        <div>
          <div className="mb-5">
            <h2 className="h2-bold">Login</h2>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="mb-2 flex flex-col">
              <label htmlFor="">Email</label>
              <input
                className="text-black-900"
                type="text"
                name="email"
                placeholder="Enter your email address"
                onChange={(e) => (email.current = e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                className="text-black-900"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => (password.current = e.target.value)}
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
