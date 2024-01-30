import React, { type ReactNode } from 'react';

interface IButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  type: 'primary' | 'secondary';
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
  return (
    (type === 'primary') ? (
      <button
        type={HTMLType}
        disabled={disabled}
        onClick={onClick}
        className={`w-80 h-50 flex bg-main-purple text-white text-lg font-bold rounded-full items-center p-3.5 ${iconType ? 'justify-between' : 'justify-center'} ${extraClass}`}
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
        disabled={disabled}
        onClick={onClick}
        className={`bg-transparent text-neutral-500 text-lg font-normal ${extraClass}`}
      >
        <p className='text-left'>{children}</p>
      </button>
    )
  )
}
