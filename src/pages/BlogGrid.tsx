import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { getAuthors, getCategories } from "../api/blogApi";
import { Pagination } from "../components/Pagination";
import type { BlogPost, Author, Category } from "../types/blog";
import { SearchBar } from "../components/SearchBar";
import { FiltersPanel } from "../components/FiltersPanel";

const LIMIT = 8;

export const BlogGrid = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState<number | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [sort, setSort] = useState<
    "publication_date:ASC" | "publication_date:DESC"
  >("publication_date:DESC");

  const { blogsQuery, countQuery } = useBlogs({
    page,
    limit: LIMIT,
    search,
    authorId,
    categoryId,
    sort,
  });

  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAuthors().then(setAuthors);
    getCategories().then(setCategories);
  }, []);

  if (blogsQuery.isLoading || countQuery.isLoading)
    return <p className="text-center mt-10">Loading...</p>;

  if (blogsQuery.isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load blogs...</p>
    );

  const blogs: BlogPost[] = blogsQuery.data ?? [];
  const total: number = countQuery.data ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="tewxt-3xl font-bold mb-6">Viktor Blog</h1>
      <h5>
        Get the latest updates on news and announcements,
        <br /> technical solutions and background articles.
      </h5>

      {/* Filters */}
      <SearchBar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Filters on left side */}
        <FiltersPanel
          authors={authors}
          categories={categories}
          authorId={authorId}
          categoryId={categoryId}
          sort={sort}
          onAuthorChange={(id) => {
            setAuthorId(id);
            setPage(1);
          }}
          onCategoryChange={(id) => {
            setCategoryId(id);
            setPage(1);
          }}
          onSortChange={(s) => {
            setSort(s);
            setPage(1);
          }}
        />

        {/* Blog grid */}
        <div className="flex-1">
          {blogs.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                total={total}
                limit={LIMIT}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
