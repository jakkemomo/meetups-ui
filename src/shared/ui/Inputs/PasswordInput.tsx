import { useState } from 'react';
import { IInputProps, Input } from './Input';
import Svg from '../Svg';
import cx from 'classnames';

export interface IPasswordInputProps extends Omit<IInputProps, 'tail'> {
  extraBoxClass?: string;
  errorMessage?: string;
  extraErrorClass?: string;
}

export function PasswordInput({
  extraBoxClass,
  errorMessage,
  extraErrorClass,
  ...rest
}: IPasswordInputProps) {
  const [showPwd, setShowPwd] = useState(false);
  const onEyeClick = () => setShowPwd(!showPwd);

  return (
    <div className={
      cx(
        'flex flex-col items-start',
        extraBoxClass
      )
    }>
      <Input
        tail={
          <Svg
            id={showPwd ? 'eye-on' : 'eye-off'}
            className='w-6 h-6 cursor-pointer'
            onClick={onEyeClick}
          />
        }
        {...rest}
        type={showPwd ? 'text' : 'password'}
      />
      {
        rest?.isError && (
          <p className={`text-system-500 leading-[20px] mt-[7px] ${extraErrorClass}`}>{errorMessage}</p>
        )
      }
    </div>
  )
}
