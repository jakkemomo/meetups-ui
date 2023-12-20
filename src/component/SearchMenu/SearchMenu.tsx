import SearchInput from "./SearchInput";
import FilterComponent from "./FilterComponent";
import { ReactElement } from "react";

function SearchMenu(): ReactElement {
  return (
    <div className='flex gap-12 w-610'>
      <SearchInput />
      <FilterComponent />
      <div className='pl-5 cursor-pointer'>
        <svg width="37" height="33" viewBox="0 0 37 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18.3911" y1="1.5" x2="18.3911" y2="30.5547" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          <line x1="1.5" y1="15.921" x2="35.5" y2="15.921" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

export default SearchMenu;
