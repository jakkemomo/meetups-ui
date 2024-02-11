import { Outlet } from "react-router-dom";

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
    <div className="pl-[113px] pr-[112px] pt-10">
      <Outlet />
    </div>
  )
}
