import {Outlet} from "react-router-dom";
import {ReactElement} from "react";

export function Layout(): ReactElement {
  return (
    <main className='flex justify-center items-center'>
      <Outlet />
    </main>
  )
}
