import { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';
import cx from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';

export type NativeInputPropsWithoutSize = Omit<ComponentPropsWithRef<'input'>, 'size'>

export interface IInputProps extends NativeInputPropsWithoutSize {
  head?: ReactNode;
  tail?: ReactNode;
  before?: ReactNode;
  after?: ReactNode;
  extraInputClass?: string;
  size?: 'none' | 'sm' | 'md' | 'lg';
  isError?: boolean;
  locator?: string;
  hookFormRegister?: UseFormRegisterReturn<string>;
}

export function Input({
  head,
  tail,
  before,
  after,
  className = '',
  extraInputClass = '',
  size = 'none',
  isError = false,
  locator,
  disabled,
  hookFormRegister,
  ...inputProps
}: IInputProps): ReactElement {
  return (
    <label
      className={
        cx(
          'flex rounded-def bg-custom-gray cursor-text outline-none',
          {
            'bg-select-disable cursor-default': disabled,
            'p-0': size === 'none',
            'p-2.5': size === 'sm',
            'p-[13px]': size === 'md',
            'px-[22px] py-2.5': size === 'lg',
            'border-1 border-input-error border-solid': isError,
          },
          className,
        )
      }
    >
      {
        head && (
          <div className="flex-none flex justify-center items-center">
            { head }
          </div>
        )
      }
      <div className="flex-1 flex relative">
        { before }
        <input
          className={
            cx(
              'w-full flex-1 outline-none bg-transparent placeholder:text-text-light-gray',
              extraInputClass,
            )
          }
          data-locator={locator}
          disabled={disabled}
          {...inputProps}
          {...hookFormRegister}
        />
        { after }
      </div>
      {
        tail && (
          <div className="flex-none flex justify-center items-center">
            { tail }
          </div>
        )
      }
    </label>
  );
}
