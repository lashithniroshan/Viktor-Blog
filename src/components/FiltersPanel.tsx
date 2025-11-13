import type { Author, Category } from "../types/blog";

export interface FiltersPanelProps {
  authors: Author[];
  categories: Category[];
  authorId?: number;
  categoryId?: number;
  sort?: "publication_date:ASC" | "publication_date:DESC";
  onAuthorChange: (id?: number) => void;
  onCategoryChange: (id?: number) => void;
  onSortChange: (
    sort: "publication_date:ASC" | "publication_date:DESC"
  ) => void;
}

export const FiltersPanel = ({
  authors,
  categories,
  authorId,
  categoryId,
  sort,
  onAuthorChange,
  onCategoryChange,
  onSortChange,
}: FiltersPanelProps) => {
  return (
    <div className="flex flex-col gap-4 w-full sm:w-64 mb-6 sm:mb-0">
       <div className="relative w-full">
        <select
        value={authorId || ""}
        onChange={(e) => {
          onAuthorChange(e.target.value ? Number(e.target.value) : undefined);
        }}
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
    dark:focus:border-blue-400"
      >
        <option value="">All Authors</option>
        {authors.map((a) => (
          <option key={a.id} value={a.id}>
            {a.full_name}
          </option>
        ))}
      </select>
       <svg
    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
       </div>
      
       <div className="relative w-full">
        <select
        value={categoryId || ""}
        onChange={(e) => {
          onCategoryChange(e.target.value ? Number(e.target.value) : undefined);
        }}
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
    dark:focus:border-blue-400"
      >
        <option value="">All Categories</option>
        {categories.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
       <svg
    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
       </div>
      
      <div className="relative w-full">
         <select
        value={sort}
        onChange={(e) =>
          onSortChange(
            e.target.value as "publication_date:ASC" | "publication_date:DESC"
          )
        }
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
    dark:focus:border-blue-400"
      >
        <option value="publication_date:DESC">Newest first</option>
        <option value="publication_date:ASC">Oldest first</option>
      </select>
      <svg
    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
      </div>
     
    </div>
  );
};
