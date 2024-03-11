'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// components
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createNewUser } from '@/lib/actions/user-actions';
import { ISignUpFormData, signUpFormSchema } from '@/lib/zod/user-schema';
// models
import { signInGoogle, signInGithub, signIn } from '@/lib/actions/auth';

// ----------------------------------------------------------------

const SignUp = () => {
  const router = useRouter();

  const signUpForm = useForm<ISignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: ISignUpFormData) => {
    console.log('data', data);
    // * delete after auth is fixed
    // const { email, fullName, password } = data;
    // create new User if not existing
    // throw error or redirect to login
    // afet create redirect to /login
    // poslati SS logike

    try {
      const result = await createNewUser(data);
      if (!result.ok) {
        if (result.status === 409) console.log('Email vec postoji');

        return;
      }

      await signIn('credentials', {
        email: data.email,
        password: data.password,
      });

      router.push('/');
    } catch (error) {
      console.log('Error sign up page, create new user', error);
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
        <h2 className="h2-bold mb-5 text-white-100">Create an account</h2>
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
              <FormField
                name="fullName"
                control={signUpForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
              <FormField
                name="email"
                control={signUpForm.control}
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
                control={signUpForm.control}
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
              <Button type="submit">Create an account</Button>
            </div>
          </form>
        </Form>
        <Link
          href="/login"
          className="mb-6 text-center text-sm text-white-300 underline"
        >
          Already have an acount
        </Link>
        <p className="p4-regular mb-6 text-center">or</p>
        <Button
          variant="secondary"
          className="mb-4 text-white-300"
          onClick={() => signInGoogle()}
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
          onClick={() => signInGithub()}
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

export default SignUp;
