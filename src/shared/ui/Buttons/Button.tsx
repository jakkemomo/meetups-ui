import { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import cx from 'classnames';

type NativeButtonProps = ComponentPropsWithRef<'button'>

export interface IButtonProps extends NativeButtonProps {
  children?: ReactNode;
  size?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  importance?: 'none' | 'primary' | 'secondary' | 'tetriary';
  extraClass?: string;
}

export function Button({
  children,
  size = 'none',
  importance = 'none',
  extraClass = '',
  disabled = false,
  ...other
}: IButtonProps): ReactElement {
  return (
    <button
      {...other}
      disabled={disabled}
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
            'bg-main-violet-600 hoverscreen:hover:bg-main-violet-700 active:bg-main-violet-800 text-white font-semibold rounded-def': importance === 'primary',
            'bg-main-violet-100 hoverscreen:hover:bg-main-violet-200 active:bg-main-violet-300 text-main-violet-600 font-semibold rounded-def': importance === 'secondary',
            'bg-white border-main-violet-300 border-1 border-solid hoverscreen:hover:bg-main-violet-100 active:bg-main-violet-200 text-main-violet-600 font-semibold rounded-def': importance === 'tetriary',
            'cursor-default !bg-secondary-300 !text-white pointer-events-none': disabled && importance !== 'tetriary',
            'cursor-default !bg-white !text-secondary-300 border-secondary-300 border-1 border-solid pointer-events-none': disabled && importance === 'tetriary',
          },
          extraClass
        )
      }
    >{children}</button>
  )
}
