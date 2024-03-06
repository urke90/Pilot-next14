'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
// components shadcn
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// ----------------------------------------------------------------

// * outside of component since it will be recreated on every rerender
const loginFormSchema = z.object({
  email: z.string().email('Please eneter valid email address!'),
  password: z.string().min(6, 'Password must be at least 6 characters long!'),
});

const Login = () => {
  type TLoginFormData = z.infer<typeof loginFormSchema>;

  const loginForm = useForm<TLoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TLoginFormData) => {
    const { email, password } = data;
    try {
      const result = await signIn('signin', {
        email,
        password,
        // redirect: false,
      });
      console.log('Result SignIn LOGIN PAGE', result);
    } catch (error) {
      console.log('Error LOGIN PAGE', error);
    }
  };

  return (
    <div className="h-screen">
      <div className="m-auto mt-16 flex w-[382px] flex-col">
        <div className="mb-24 flex justify-center">
          <Image
            src="/assets/images/Logo.svg"
            alt="Logo"
            width={164}
            height={41}
          />
        </div>
        <div className="mb-5">
          <h2 className="h2-bold text-white-100">Login</h2>
        </div>
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)}>
            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
              <FormField
                name="email"
                control={loginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-6 grid w-full max-w-sm items-center gap-1.5">
              <FormField
                name="password"
                control={loginForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="p3-medium">Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-6">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Form>
        <Link
          href="/sign-up"
          className="mb-6 text-center text-sm text-white-300 underline"
        >
          I don&apos;t have an account
        </Link>
        <p className="p4-regular mb-6 text-center">or</p>
        <Button
          variant="secondary"
          className="mb-4 text-white-300"
          onClick={() => signIn('google')}
        >
          <Image
            src="/assets/images/google.png"
            alt="Google"
            width={16}
            height={16}
          />
          Continue with Google
        </Button>
        <Button
          variant="secondary"
          className="text-sm text-white-300"
          onClick={() => signIn('github')}
        >
          <Image
            src="/assets/images/github.png"
            alt="Google"
            width={16}
            height={16}
          />
          Continue with GitHub
        </Button>
      </div>
    </div>
  );
};

export default Login;
