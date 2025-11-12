import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { getAuthors, getCategories } from "../api/blogApi";
import { Pagination } from "../components/Pagination";
import type { BlogPost, Author, Category} from "../types/blog";

const LIMIT = 8;

export const BlogGrid = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [authorId, setAuthorId] = useState<number | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [sort, setSort] = useState<"publication_date:ASC" | "publication_date:DESC">("publication_date:DESC");

  const {blogsQuery, countQuery } = useBlogs({page, limit:LIMIT, search, authorId, categoryId, sort});

  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories,setCategories] = useState<Category[]>([]);

  useEffect(()=>{
    getAuthors().then(setAuthors);
    getCategories().then(setCategories)
  }, [])

  if (blogsQuery.isLoading || countQuery.isLoading)
    return <p className="text-center mt-10">Loading...</p>;

  if (blogsQuery.isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load blogs...</p>
    );

  const blogs:BlogPost[] = blogsQuery.data || [];
  const total: number = countQuery.data || 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="tewxt-3xl font-bold mb-6">Viktor Blog</h1>
      <h5>Get the latest updates on news and announcements,<br /> technical solutions and background articles.</h5>

{/* Filters */ }
<div className="flex flex-col sm:flex-row gap-4 mb-6">
<input
type="text"
placeholder="Search by title..."
value={search}
onChange={(e) => {setPage(1); setSearch(e.target.value);}}
className="border rounded px-3 py-2 flex-1"
/>
<select
value={authorId || ""}
onChange={(e) => {setPage(1); setAuthorId(e.target.value ? Number(e.target.value): undefined);}}
className="border rounded px-3 py-2"
>
    <option value="">
        All Authors
    </option>
    {authors.map((a)=>(
        <option key={a.id} value={a.id}>{a.full_name}</option>
    ))}
</select>
<select
value={categoryId || ""}
onChange={(e) => {setPage(1); setCategoryId(e.target.value ? Number(e.target.value): undefined);}}
className="border rounded px-3 py-2"
>
    <option value="">
        All Categories
    </option>
    {categories.map((a)=>(
        <option key={a.id} value={a.id}>{a.name}</option>
    ))}
</select>
<select
value={sort}
onChange={(e) => {setPage(1); setSort(e.target.value as any);}}
className="border rounded px-3 py-2"
>
    <option value="publication_date:DESC">
        Newest first
    </option>
     <option value="publication_date:ASC">
        Oldest first
    </option>
</select>

</div>

     {blogs.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-6">
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
  );
};
