import { ReactElement } from "react";

function SearchInput(): ReactElement {
  return (
    <div className='w-390 border-b-2'>
      <div className="relative flex items-center w-full h-11 bg-transparent overflow-hidden pb-3.5">
        <div className="grid justify-start items-center h-full w-14 text-gray-300 pl-px">
          <svg width="30" height="31" viewBox="0 0 30 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M18.485 5.79543C22.0381 9.46092 22.0381 15.4039 18.485 19.0693C14.9318 22.7348 9.17099 22.7348 5.61783 19.0693C2.06467 15.4039 2.06467 9.46092 5.61783 5.79543C9.17099 2.12994 14.9318 2.12994 18.485 5.79543ZM21.1551 20.5796C25.2706 15.6956 25.0766 8.28735 20.573 3.64136C15.8667 -1.21379 8.23613 -1.21379 3.52977 3.64136C-1.17659 8.49651 -1.17659 16.3683 3.52977 21.2234C7.96281 25.7966 14.9902 26.0622 19.7246 22.0202C19.703 22.4368 19.8464 22.8609 20.1549 23.1791L26.5885 29.8161C27.1651 30.4109 28.1 30.4109 28.6766 29.8161C29.2532 29.2213 29.2532 28.2568 28.6766 27.662L22.243 21.0251C21.9435 20.7161 21.5474 20.5676 21.1551 20.5796Z" fill="white"/>
          </svg>
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
