import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from 'react';
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'outlined' | 'contained'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'outlined', ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const classes = variant === 'outlined' ?
      "bg-black text-white px-4 py-2" : "text-black";

    return (
      <Comp
        className={`
          inline-flex 
          items-center
          justify-center
          rounded-md
          text-sm
          font-medium
          transition-colors
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-ring
          focus-visible:ring-offset-2
          disabled:opacity-50
          border 
          border-input
          disabled:pointer-events-none
          ring-offset-background
          hover:bg-accent 
          hover:text-accent-foreground
          ${classes}
          ${className}`
        }
        ref={ref}
        {...props}
      />
    )
  }
)

export default Button;