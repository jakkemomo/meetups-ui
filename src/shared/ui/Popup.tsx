import { ReactElement, ReactNode, useEffect } from "react";

interface IPopupProps {
  children: ReactNode;
}

export function Popup({ children }: IPopupProps): ReactElement {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-popup-bg z-40">
      {children}
    </div>
  )
}
