import debounce from "lodash.debounce";
import { useState, useMemo } from "react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const SearchBar = ({ search, onSearchChange }: SearchBarProps) => {
  const [localSearch, setLocalSearch] = useState(search);

  const debouncedSearch = useMemo(
    () =>
      debounce((values: string) => {
        onSearchChange(values);
      }, 400),
    [onSearchChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <div className="relative w-full mb-6">
      <input
        type="text"
        placeholder="Search by title..."
        value={localSearch}
        onChange={handleChange}
        className="w-full
    appearance-none
    px-4
    py-2.5
    text-sm
    font-medium
    text-gray-700
    bg-white
    border border-gray-300
    rounded-lg
    shadow-sm
    focus:outline-none
    focus:ring-1
    focus:ring-blue-500
    focus:border-blue-500
    hover:border-blue-400
    transition-all
    duration-150
    dark:bg-gray-800
    dark:border-gray-600
    dark:text-gray-100
    dark:focus:ring-blue-400
    dark:focus:border-blue-400 w-full"
      />
      {localSearch && (
        <button
          onClick={() => {
            setLocalSearch("");
            onSearchChange("");
          }}
          className="absolute right-2 top-1/2  py-1.5 pr-0 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          &#10005;
        </button>
      )}
    </div>
  );
};
