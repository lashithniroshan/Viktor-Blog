import { useQuery } from "@tanstack/react-query";
import { getBlogs, getBlogCount } from "../api/blogApi";
import type { BlogPost } from "../types/blog";

interface UseBlogsParams {
  page: number;
  limit?: number;
  search?: string;
  authorId?: number;
  categoryId?: number;
  sort?: "publication_date:ASC" | "publication_date:DESC";
}

export const useBlogs = ({
  page,
  limit = 8,
  search,
  authorId,
  categoryId,
  sort,
}: UseBlogsParams) => {
  const blogsQuery = useQuery<BlogPost[], Error>({
    queryKey: ["blogs", { page, search, authorId, categoryId, sort }] as const,
    queryFn: () =>
      getBlogs({ page, limit, search, authorId, categoryId, sort }),
    staleTime: 5000,
  });

  const countQuery = useQuery<number, Error>({
    queryKey: ["blogCount", { search, authorId, categoryId }] as const,
    queryFn: () => getBlogCount({ search, authorId, categoryId }),
    staleTime: 5000,
  });

  return { blogsQuery, countQuery };
};
