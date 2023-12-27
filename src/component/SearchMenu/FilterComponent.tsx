import { ReactElement } from "react";
import { ReactComponent as FilterIcon } from "../../images/filter-icon.svg";

function FilterComponent(): ReactElement {
  return (
      <div className='cursor-pointer'>
        <FilterIcon />
      </div>
  )
}

export default FilterComponent;
