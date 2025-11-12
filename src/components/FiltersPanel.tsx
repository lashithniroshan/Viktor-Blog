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
      <select
        value={authorId || ""}
        onChange={(e) => {
          onAuthorChange(e.target.value ? Number(e.target.value) : undefined);
        }}
        className="border rounded px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">All Authors</option>
        {authors.map((a) => (
          <option key={a.id} value={a.id}>
            {a.full_name}
          </option>
        ))}
      </select>
      <select
        value={categoryId || ""}
        onChange={(e) => {
          onCategoryChange(e.target.value ? Number(e.target.value) : undefined);
        }}
        className="border rounded px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">All Categories</option>
        {categories.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) =>
          onSortChange(
            e.target.value as "publication_date:ASC" | "publication_date:DESC"
          )
        }
        className="border rounded px-3 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="publication_date:DESC">Newest first</option>
        <option value="publication_date:ASC">Oldest first</option>
      </select>
    </div>
  );
};
