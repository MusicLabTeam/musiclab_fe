import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  return (
    <div className="flex h-[1.8rem] w-[13rem] font-medium text-[.75rem] items-center px-[1rem] button rounded-full cursor-pointer shadow-sm z-[100]">
      <FaSearch className="text-lightText dark:text-darkText text-[.75rem]" />
      <input
        className="bg-transparent border-none outline-none  ml-2"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
