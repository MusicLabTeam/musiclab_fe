import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex h-[1.8rem] font-medium text-[.75rem] items-center px-[1rem] button rounded-full cursor-pointer shadow-sm z-[100]">
      <FaSearch className="text-lightText dark:text-darkText text-[.75rem]" />
      <input
        className="bg-transparent border-none outline-none text-white dark:text-darkText ml-2"
        placeholder="Search"
      />
    </div>
  );
}
