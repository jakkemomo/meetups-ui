import { ReactNode, SVGProps } from 'react';

export interface SvgProps extends Partial<SVGProps<SVGSVGElement>> {
  id: string;
  extraUseClass?: string;
}

const Svg = (({ id, extraUseClass, ...rest }: SvgProps): ReactNode => {
  return (
    <svg {...rest}>
      <use className={`fill-none ${extraUseClass ?? ''}`} href={`/images/svg.svg#${id}`} />
    </svg>
  );
});

export default Svg;
