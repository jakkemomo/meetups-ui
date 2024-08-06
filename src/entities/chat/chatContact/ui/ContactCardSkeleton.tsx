import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react";

function ContactCardSkeleton(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={500}
      height={200}
      viewBox="0 0 500 200"
    >
      <rect x="0" y="20" rx="5" ry="5" width="430" height="40" />
      <rect x="0" y="80" rx="50" ry="70" width="80" height="70" />
      <rect x="100" y="80" rx="5" ry="5" width="330" height="30" />
      <rect x="100" y="120" rx="5" ry="5" width="330" height="30" />

    </SkeletonLoader>
  );
}

export default ContactCardSkeleton;