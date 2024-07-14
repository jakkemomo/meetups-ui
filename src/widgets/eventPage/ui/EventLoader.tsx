import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react"

function EventLoader(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={1215}
      height={830}
      viewBox="0 0 1215 830"
    >
      <rect x="0" y="60" rx="10" ry="10" width="1215" height="460" />
      <rect x="0" y="540" rx="10" ry="10" width="800" height="34" />
      <rect x="0" y="586" rx="10" ry="10" width="500" height="34" />
      <rect x="0" y="710" rx="10" ry="10" width="150" height="35" />
      <rect x="0" y="773" rx="10" ry="10" width="850" height="80" />
    </SkeletonLoader>
  )
}

export default EventLoader;
