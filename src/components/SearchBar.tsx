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
        className="border rounded px-3 py-2 w-full"
      />
      {localSearch && (
        <button
          onClick={() => {
            setLocalSearch("");
            onSearchChange("");
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          &#10005;
        </button>
      )}
    </div>
  );
};
