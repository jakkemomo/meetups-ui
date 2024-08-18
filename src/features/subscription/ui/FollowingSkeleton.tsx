import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react";

function FollowingItemSkeleton(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={500}
      height={100}
      viewBox="0 0 500 100"
    >
      <rect x="0" y="0" rx="5" ry="5" width="60" height="60" />
      <rect x="70" y="10" rx="5" ry="5" width="150" height="20" />
      <rect x="70" y="40" rx="5" ry="5" width="100" height="15" />
    </SkeletonLoader>
  );
}

export default FollowingItemSkeleton;
