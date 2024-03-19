import { ReactElement, ReactNode, useEffect } from "react";

interface IPopupProps {
  children: ReactNode;
  isOpen: boolean;
}

export function Popup({ children, isOpen }: IPopupProps): ReactElement {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 bg-popup-bg z-40 duration-100 ${isOpen ? "opacity-1 visible" : "opacity-0 invisible"}`}>
      {children}
    </div>
  )
}
