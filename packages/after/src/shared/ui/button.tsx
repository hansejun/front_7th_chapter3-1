import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  'inline-block font-["Arial", sans-serif] leading-normal font-normal rounded-sm cursor-pointer border whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-[#1976d2] text-white border-color-[#1565c0] hover:not(:disabled):bg-[#1565c0]',
        secondary: 'bg-[#f5f5f5] text-[#333] border-color-[#ddd] hover:not(:disabled):bg-[#e0e0e0]',
        danger: 'bg-[#d32f2f] text-white border-color-[#c62828] hover:not(:disabled):bg-[#c62828]',
        success: 'bg-[#388e3c] text-white border-color-[#2e7d32] hover:not(:disabled):bg-[#2e7d32]',
      },
      size: {
        sm: 'px-[6px] py-[12px] text-[13px]',
        md: 'px-[10px] py-[20px] text-[14px]',
        lg: 'px-[12px] py-[24px] text-[15px]',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
