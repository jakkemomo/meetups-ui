import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react"

function HeaderLoader(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={1215}
      height={50}
      viewBox="0 0 1215 50"
    >
      <rect x="0" y="0" rx="10" ry="10" width="165" height="50" />
      <rect x="400" y="3" rx="10" ry="10" width="375" height="44" />
      <circle cx="803" cy="25" r="12" />
      <rect x="990" y="3" rx="10" ry="10" width="115" height="44" />
      <circle cx="1133" cy="25" r="12" />
      <circle cx="1190" cy="25" r="25" />
    </SkeletonLoader>
  )
}

export default HeaderLoader;
