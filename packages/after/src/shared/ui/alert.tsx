import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

interface AlertProps extends VariantProps<typeof alertVariants> {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
}

const alertVariants = cva('alert', {
  variants: {
    variant: {
      default: 'alert-default',
      info: 'alert-info',
      success: 'alert-success',
      warning: 'alert-warning' as const,
      error: 'alert-error' as const,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  onClose,
  showIcon = true,
  className,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✓';
      case 'warning':
        return '⚠️';
      case 'error':
        return '✕';
      default:
        return '•';
    }
  };

  return (
    <div className={cn(alertVariants({ variant }), className)}>
      {showIcon && <div className="alert-icon">{getIcon()}</div>}
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-body">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="alert-close">
          ×
        </button>
      )}
    </div>
  );
};
