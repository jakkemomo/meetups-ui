import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react";

export function EventSkeleton(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={1215}
      height={300}
      viewBox="0 0 270 300"
    >
      <rect x="0" y="43" rx="10" ry="10" width="270" height="188" />
      <rect x="0" y="17" rx="10" ry="10" width="270" height="18" />
      <rect x="0" y="263" rx="10" ry="10" width="200" height="18" />
      <rect x="0" y="238" rx="10" ry="10" width="270" height="18" />
    </SkeletonLoader>
  )
}
