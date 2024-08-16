import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react";

function ContactCardSkeleton(): ReactElement {
  return (
    <div className="flex flex-col">
      <SkeletonLoader
        speed={2}
        width={700}
        height={300}
        viewBox="0 0 700 300"
      >
        <rect x="40" y="5" rx="100" ry="100" width="70" height="70" />
        <rect x="130" y="5" rx="5" ry="5" width="530" height="30" />
        <rect x="130" y="45" rx="5" ry="5" width="530" height="30" />

      </SkeletonLoader>
    </div>
  );
}

export default ContactCardSkeleton;
