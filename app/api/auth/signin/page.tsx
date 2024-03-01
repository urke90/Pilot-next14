'use client';

import { Button } from '@/components/ui/button';

const Login = () => {
  return (
    <div className="h-screen border-2 border-red-500">
      <div className="m-auto mt-40 flex w-[382px] flex-col  border-2">
        <h1 className="h1-bold text-center">GitNote</h1>
        <div>
          <div className="mb-5">
            <h2 className="h2-bold">Login</h2>
          </div>

          <form action="">
            <div className="mb-2 flex flex-col">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email address"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input type="password" placeholder="Enter your password" />
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
