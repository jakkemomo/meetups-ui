import { ReactElement } from "react";
// @ts-ignore
import { ReactComponent as FilterIcon } from "../../../public/filter-icon.svg";

function FilterComponent(): ReactElement {
  return (
      <div className='cursor-pointer'>
        <FilterIcon />
      </div>
  )
}

export default FilterComponent;
