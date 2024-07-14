import SkeletonLoader from "@/shared/ui/SkeletonLoader";
import { ReactElement } from "react"

function FormLoader(): ReactElement {
  return (
    <SkeletonLoader
      speed={2}
      width={1005}
      height={700}
      viewBox="0 0 1005 700"
    >
      <rect x="525" y="50" rx="10" ry="10" width="270" height="170" />
      <rect x="0" y="50" rx="10" ry="10" width="210" height="25" />
      <rect x="0" y="82" rx="10" ry="10" width="480" height="44" />
      <rect x="0" y="144" rx="10" ry="10" width="210" height="25" />
      <rect x="0" y="176" rx="10" ry="10" width="480" height="44" />
      <rect x="0" y="238" rx="10" ry="10" width="210" height="25" />
      <rect x="0" y="270" rx="10" ry="10" width="1005" height="150" />
      <rect x="0" y="438" rx="10" ry="10" width="210" height="25" />
      <rect x="0" y="470" rx="10" ry="10" width="480" height="44" />
      <rect x="494" y="492" rx="10" ry="10" width="17" height="3" />
      <rect x="525" y="470" rx="10" ry="10" width="480" height="44" />
      <rect x="0" y="534" rx="10" ry="10" width="210" height="25" />
      <rect x="0" y="566" rx="10" ry="10" width="480" height="44" />
      <rect x="494" y="588" rx="10" ry="10" width="17" height="3" />
      <rect x="525" y="566" rx="10" ry="10" width="480" height="44" />
      <rect x="0" y="640" rx="10" ry="10" width="450" height="25" />
      <rect x="0" y="672" rx="10" ry="10" width="1005" height="44" />
    </SkeletonLoader>
  )
}

export default FormLoader;
