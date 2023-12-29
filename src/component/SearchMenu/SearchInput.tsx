import { ReactElement } from "react";
import { ReactComponent as SearchIcon } from "../../images/search-icon.svg";

function SearchInput(): ReactElement {
  return (
    <div className='w-390 border-b-2'>
      <div className="relative flex items-center w-full h-11 bg-transparent overflow-hidden pb-3.5">
        <div className="grid justify-start items-center h-full w-14 text-gray-300 pl-px">
          <SearchIcon />
        </div>
      <input
        className="h-full w-full outline-none text-white pr-2 bg-transparent text-22 font-medium"
        type="text"
        id="search"
      />
      </div>
    </div>
  )
}

export default SearchInput;
