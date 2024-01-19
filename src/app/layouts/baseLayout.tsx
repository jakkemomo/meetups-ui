// import Header from "@/widgets/header/Header.tsx";
import {Outlet} from "react-router-dom";
import Header from "@/widgets/header/Header";

/**
 * ✅ FSD Best practice
 *
 * (1) Devide layout in two modules: dumb layout grid (shared)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export default function BaseLayout() {
  return (
    <>
      <Header/>
      <Outlet />
    </>
  )
}
