import { ComponentPropsWithoutRef } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

import Loader from '../Loader/Loader';

const buttonStyle = tv({
  base: 'flex items-center justify-center',
  variants: {
    intent: {
      primary: 'bg-[#83CB3D] text-white border border-transparent hover:bg-[#498F01] disabled:bg-[#83cb3d61]',
      secondary:
        'bg-transparent rounded-sm text-[#7f807f] hover:bg-gray-100 disabled:text-neutral-400 disabled:hover:bg-transparent',
      secondaryAlt: 'bg-gray-100 disabled:text-neutral-400 disabled:hover:bg-transparent',
      tertiary: 'bg-[#0072EC] text-white border border-transparent hover:bg-[#4890E3] disabled:bg-neutral-400',
      quaternary:
        'bg-[white] text-black border border-[#E6E7EB] hover:bg-[#F3F4F6] disabled:bg-transparent disabled:text-neutral-400',
    },
    size: {
      xs: 'px-4 h-8 text-xs font-medium',
      sm: 'px-6 h-10 text-xs font-medium',
      md: 'px-8 h-12 text-sm font-medium',
      lg: 'px-9 h-14 text-base font-medium',
    },
  },
  compoundVariants: [
    {
      intent: ['primary', 'secondaryAlt', 'tertiary', 'quaternary'],
      size: 'xs',
      className: 'rounded-2xl',
    },
    {
      intent: ['primary', 'secondaryAlt', 'tertiary', 'quaternary'],
      size: 'sm',
      className: 'rounded-3xl',
    },
    {
      intent: ['primary', 'secondaryAlt', 'tertiary', 'quaternary'],
      size: 'md',
      className: 'rounded-3xl',
    },
    {
      intent: ['primary', 'secondaryAlt', 'tertiary', 'quaternary'],
      size: 'lg',
      className: 'rounded-[30px]',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'md',
  },
});

interface ButtonProps extends ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonStyle> {
  isLoading?: boolean;
}

const Button = ({ className, isLoading = false, intent, size, ...props }: ButtonProps) => (
  <button {...props} className={buttonStyle({ intent, size, className })}>
    {isLoading ? <Loader size={28} className="stroke-white" /> : props.children}
  </button>
);

export default Button;
