import { ReactElement } from "react";

export function Preloader(): ReactElement {
  return (
    <div className="w-[48px] h-[48px] border-4 border-solid border-white border-b-transparent rounded-circle animate-spin"></div>
  )
}