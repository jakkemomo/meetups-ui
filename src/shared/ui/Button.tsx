import React, {type ReactNode} from 'react';
import {useMediaQuery} from "@uidotdev/usehooks";

interface IButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  type: 'primary' | 'secondary' | 'back';
  HTMLType: 'submit' | 'button' | 'reset';
  extraClass?: string;
  iconType?: 'next';
  disabled?: boolean
}

export function Button({
  onClick,
  children,
  type,
  extraClass,
  disabled,
  HTMLType,
  iconType
}: IButtonProps) {

  const isMobileDevice = useMediaQuery("only screen and (max-width : 768px)");

  return (
    (type === 'primary') ? (
      <button
        type={HTMLType}
        disabled={disabled}
        onClick={onClick}
        className={`h-50 flex bg-main-purple hover:bg-hover-pink disabled:bg-neutral-500 text-white text-lg font-bold rounded-full items-center p-3.5 ${isMobileDevice ? 'w-[316px]' : 'w-80'} ${iconType ? 'justify-between' : 'justify-center'} ${extraClass}`}
      >
        {iconType && <div className='w-6 h-6 invisible' />}
        <p>{children}</p>
        {iconType &&
          <div
            className='w-6 h-6 bg-center bg-no-repeat'
            style={{ backgroundImage: `url("/images/${iconType}.svg")` }}
          />}
      </button>
      ) : (
      <button
        type={HTMLType}
        onClick={onClick}
        className={`bg-transparent text-neutral-500 text-lg font-normal hover:text-neutral-950 ${extraClass}`}
      >
        <p>{children}</p>
      </button>
    )
  )
}
