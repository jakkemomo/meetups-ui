import cx from 'classnames';
import Svg from '../Svg';
import { Button, IButtonProps } from './Button';
import { ReactElement } from 'react';

export interface IIconButtonProps extends Omit<IButtonProps, 'children' | 'size'> {
  iconId: string;
  size?: 'sm' | 'md' | 'lg';
  extraSvgClass?: string;
}

export function IconButton({
  iconId,
  extraClass,
  extraSvgClass,
  size = 'md',
  ...rest
}: IIconButtonProps): ReactElement {
  return (
    <Button
      extraClass={
        cx(
          'flex items-center justify-center',
          {
            'w-10 h-10 !p-2 rounded-def': size === 'lg',
          },
          extraClass,
        )
      }
      size='md'
      {...rest}
    >
      <Svg className={`fill-current w-6 h-6 ${extraSvgClass ?? ''}`} id={iconId} />
    </Button>
  );
}
