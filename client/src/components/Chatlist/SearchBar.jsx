import { reducerCases } from "@/context/constants";
import { useStateProvider } from "@/context/StateContext";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

function SearchBar() {
  const[{contactSearch},dispatch] = useStateProvider();
  return (
    <div className="bg-search-input-container-background h-14 flex items-center px-4 gap-3">
      {/* Search Input Container */}
      <div className="flex items-center bg-panel-header-background rounded-lg px-3 py-2 flex-grow gap-2">
        <BiSearchAlt2 className="text-panel-header-icon text-xl cursor-pointer" />
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="bg-transparent text-sm text-white w-full focus:outline-none"
          value ={contactSearch}
          onChange={e=>dispatch({type:reducerCases.SET_CONTACT_SEARCH,contactSearch:e.target.value})}
        />
      </div>

      {/* Filter Icon */}
      <BsFilter className="text-panel-header-icon text-xl cursor-pointer" />
    </div>
  );
}

export default SearchBar;
