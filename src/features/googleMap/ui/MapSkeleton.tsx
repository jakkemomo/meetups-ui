import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react";

function MapSkeleton(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={1215}
      height={365}
      viewBox="0 0 1215 365"
    >
      <rect x="0" y="0" rx="12" ry="12" width="1200" height="365" />
    </SkeletonLoader>
  )
}

export default MapSkeleton;
