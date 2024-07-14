import { ReactElement, ReactNode, SVGProps } from "react";
import ContentLoader from "react-content-loader";

export interface SvgProps extends Partial<SVGProps<SVGSVGElement>> {
  id: string;
  extraUseClass?: string;
}

interface ISkeletonLoader extends Omit<Partial<SVGProps<SVGSVGElement>>, 'speed'> {
  children: ReactNode;
  speed?: number;
}

function SkeletonLoader({ children, speed, ...rest }: ISkeletonLoader): ReactElement {
  return (
    <ContentLoader
      speed={speed}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...rest}
    >
      {children}
    </ContentLoader>
  )
}

export default SkeletonLoader;
