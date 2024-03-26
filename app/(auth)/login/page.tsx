'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
// components shadcn
import RHFInput from '@/components/RHFInputs/RHFInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { signIn, signInGithub, signInGoogle } from '@/lib/actions/auth';
import { loginFormSchema, type ILoginFormData } from '@/lib/zod/user-schema';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------

const Login = () => {
  const loginForm = useForm<ILoginFormData>({
    mode: 'onChange',
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: ILoginFormData) => {
    const { email, password } = data;
    // console.log('datatata', data);
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Invalid email or password!', {
          // bodyClassName: 'bg-red-500',
        });
      }

      console.log('Error LOGIN PAGE', error);
    }
  };

  const { isSubmitting, isValid } = loginForm.formState;

  const disabledSubmitBtn = isSubmitting || !isValid;

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
              <RHFInput
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-6   max-w-sm items-center gap-1.5">
              <RHFInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-6">
              <Button type="submit" disabled={disabledSubmitBtn}>
                Login
              </Button>
            </div>
          </form>
        </Form>
        <Link
          href="/register"
          className="mb-6 text-center text-sm text-white-300 underline"
        >
          I don&apos;t have an account
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

export default Login;
