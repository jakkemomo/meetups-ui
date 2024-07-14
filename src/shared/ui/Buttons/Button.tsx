import { ReactElement, ReactNode } from "react";
import cx from 'classnames';

export interface IButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  size?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  importance?: 'none' | 'primary' | 'secondary' | 'primary-opposite';
  extraClass?: string;
  disabled?: boolean;
}

export function Button({
  onClick,
  children,
  type = 'button',
  size = 'none',
  importance = 'none',
  extraClass = '',
  disabled = false
}: IButtonProps): ReactElement {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      className={
        cx(
          'relative inline-flex items-center justify-center select-none outline-none overflow-hidden duration-150 text-[18px] leading-def',
          {
            'p-0': size === 'none',
            'px-5 py-2.5': size === 'sm',
            'px-[30px] py-2.5': size === 'md',
            'px-[45px] py-2.5': size === 'lg',
            'w-full py-3.5': size === 'xl',
            'bg-transparent text-black': importance === 'none',
            'bg-but-primary hoverscreen:hover:bg-but-primary-hover active:bg-but-primary-active text-white font-semibold rounded-def': importance === 'primary',
            'bg-but-second hoverscreen:hover:bg-but-second-hover active:bg-but-second-active text-main-violet font-semibold rounded-def': importance === 'secondary',
            'bg-but-orange hoverscreen:hover:opacity-70': importance === 'primary-opposite',
            'cursor-default !bg-but-disable !text-white pointer-events-none': disabled
          },
          extraClass
        )
      }
    >{children}</button>
  )
}
