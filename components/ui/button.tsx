import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md px-3.5 py-2.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'rounded bg-primary-500 font-bold text-black-900 shadow-tw-primary-shadow disabled:cursor-not-allowed disabled:bg-slate-400',
        secondary:
          'font-inter shadow-tw-secondary-shadow rounded-[4px] bg-black-600 font-medium text-white-100 disabled:cursor-not-allowed disabled:bg-slate-400',
        file: 'bg-black-700 px-3.5 py-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
