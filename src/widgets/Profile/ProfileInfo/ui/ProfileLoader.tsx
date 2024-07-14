import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react"

function ProfileLoader(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={414}
      height={1027}
      viewBox="0 0 414 1027"
    >
      <circle cx="135" cy="191" r="135" />
      <rect x="0" y="346" rx="10" ry="10" width="250" height="40" />
      <rect x="0" y="396" rx="10" ry="10" width="95" height="25" />
      <rect x="0" y="451" rx="10" ry="10" width="225" height="44" />
      <rect x="0" y="525" rx="10" ry="10" width="80" height="30" />
      <rect x="0" y="567" rx="10" ry="10" width="414" height="115" />
      <rect x="0" y="712" rx="10" ry="10" width="118" height="30" />
      <rect x="0" y="754" rx="10" ry="10" width="334" height="24" />
      <rect x="0" y="790" rx="10" ry="10" width="250" height="24" />
      <rect x="0" y="932" rx="10" ry="10" width="129" height="23" />
      <rect x="0" y="980" rx="10" ry="10" width="92" height="24" />
    </SkeletonLoader>
  )
}

export default ProfileLoader;
