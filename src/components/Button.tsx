'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

// Define button variants using class-variance-authority
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'backdrop-filter backdrop-blur-sm border',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary/90 text-white border-primary/30 hover:bg-primary',
          'focus:ring-primary/50 active:bg-primary/80 shadow-md hover:shadow-lg',
        ],
        secondary: [
          'bg-secondary/90 text-white border-secondary/30 hover:bg-secondary',
          'focus:ring-secondary/50 active:bg-secondary/80 shadow-md hover:shadow-lg',
        ],
        outline: [
          'bg-transparent border-primary text-primary hover:bg-primary/10',
          'focus:ring-primary/30 active:bg-primary/20',
        ],
        text: [
          'bg-transparent border-transparent text-primary hover:bg-primary/10',
          'focus:ring-primary/30 active:bg-primary/20',
        ],
      },
      size: {
        small: 'text-sm py-1 px-3 h-8',
        medium: 'text-base py-2 px-4 h-10',
        large: 'text-lg py-3 px-6 h-12',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
    },
  }
);

// Define button props interface
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: IconType;
  rightIcon?: IconType;
  isLoading?: boolean;
  loadingText?: string;
}

// Create the Button component
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant,
      size,
      fullWidth,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      isLoading = false,
      loadingText,
      className,
      ...props
    },
    ref
  ) => {
    // RTL-aware icon rendering
    const renderLeftIcon = () => {
      // In RTL, the "left" icon appears on the right side
      return RightIcon ? <RightIcon className="ml-1 rtl:ml-0 rtl:mr-1" aria-hidden="true" /> : null;
    };

    const renderRightIcon = () => {
      // In RTL, the "right" icon appears on the left side
      return LeftIcon ? <LeftIcon className="mr-1 rtl:mr-0 rtl:ml-1" aria-hidden="true" /> : null;
    };

    return (
      <motion.button
        id="button-component"
        ref={ref}
        className={buttonVariants({ variant, size, fullWidth, className })}
        whileTap={{ scale: 0.98 }}
        dir="rtl"
        disabled={isLoading || props.disabled}
        aria-disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -mr-1 ml-3 h-4 w-4 text-current rtl:ml-1 rtl:mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-right">{loadingText || children}</span>
          </>
        ) : (
          <>
            {renderLeftIcon()}
            <span className="text-right">{children}</span>
            {renderRightIcon()}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

// Usage example:
/*
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export const ButtonExample = () => {
  return (
    <div dir="rtl" className="space-y-4 p-6 bg-gray-100">
      <h2 className="text-right text-2xl font-bold mb-4">דוגמאות כפתורים</h2>
      
      <div className="flex flex-wrap gap-4 justify-end">
        <Button variant="primary" size="medium">
          כפתור ראשי
        </Button>
        
        <Button variant="secondary" size="medium">
          כפתור משני
        </Button>
        
        <Button variant="outline" size="medium">
          כפתור מתאר
        </Button>
        
        <Button variant="text" size="medium">
          כפתור טקסט
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-end">
        <Button variant="primary" size="small">
          קטן
        </Button>
        
        <Button variant="primary" size="medium">
          בינוני
        </Button>
        
        <Button variant="primary" size="large">
          גדול
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-end">
        <Button variant="primary" leftIcon={FiArrowLeft}>
          חזור
        </Button>
        
        <Button variant="primary" rightIcon={FiArrowRight}>
          המשך
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-end">
        <Button variant="primary" isLoading>
          טוען...
        </Button>
        
        <Button variant="primary" isLoading loadingText="מעבד...">
          שלח
        </Button>
      </div>
      
      <div className="w-full">
        <Button variant="primary" fullWidth>
          כפתור ברוחב מלא
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-end">
        <Button variant="primary" disabled>
          כפתור מושבת
        </Button>
      </div>
    </div>
  );
};
*/