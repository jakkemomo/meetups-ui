import SearchInput from "./SearchInput";
import FilterComponent from "./FilterComponent";
import { ReactElement } from "react";
import { ReactComponent as AddIcon } from "../../images/search-icon.svg";

function SearchMenu(): ReactElement {
  return (
    <div className='flex gap-12 w-610'>
      <SearchInput />
      <FilterComponent />
      <div className='pl-5 cursor-pointer'>
        <AddIcon />
      </div>
    </div>
  )
}

export default SearchMenu;
