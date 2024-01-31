import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function Logo(): ReactElement {
  return (
    <Link to={'/'}>
      <div className="bg-logo w-[165px] h-[60px]"></div>
    </Link>
  );
}
