import { Announcement, Layout } from '@/shared/ui'
import Header from "@/widgets/header/Header.tsx";

/**
 * ✅ FSD Best practice
 *
 * (1) Devide layout in two modules: dumb layout grid (shared)
 * and smart layout with widgets (this file)
 *
 * (2) Avoid cross-import using slot (render prop) pattern
 * Pass widgets as props to layout
 */
export const baseLayout = (
  <Layout
    announcementSlot={
      <Announcement>
        <span>
          An open source frontend application built with React ⚛️ and
          Feature-Sliced Design 🍰.
        </span>
      </Announcement>
    }
    headerSlot={<Header/>}
  />
)
