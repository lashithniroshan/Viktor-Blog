import { useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";
import { Pagination } from "../components/Pagination";

const LIMIT = 8;

export const BlogGrid = () => {
  const [page, setPage] = useState(1);
  const { blogsQuery, countQuery } = useBlogs(page, LIMIT);

  if (blogsQuery.isLoading || countQuery.isLoading)
    return <p className="text-center mt-10">Loading...</p>;

  if (blogsQuery.isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load blogs...</p>
    );

  const blogs = blogsQuery.data || [];
  const total = countQuery.data || 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="tewxt-3xl font-bold mb-6">Viktor Blog</h1>
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
