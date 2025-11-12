import { API_BASE_URL } from "../utils/config";
import type { BlogPost } from "../types/blog";

interface FetchBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  authorId?: number;
  categoryId?: number;
  sort?: "publication_date:ASC" | "publication_date:DESC";
}

export const getBlogs = async ({
  page = 1,
  limit = 8,
  search,
  authorId,
  categoryId,
  sort = "publication_date:DESC",
}: FetchBlogsParams): Promise<BlogPost[]> => {
  const start = (page - 1) * limit;
  const params = new URLSearchParams();
  params.append("_start", start.toString());
  params.append("_limit", limit.toString());
  params.append("_sort", sort);

  if (search) params.append("title_contains", search);
  if (authorId) params.append("author.id", authorId.toString());
  if (categoryId)
    params.append("blogpost_categories.id", categoryId.toString());

  const response = await fetch(
    `${API_BASE_URL}/blogposts?${params.toString()}`
  );
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
};

export const getBlogCount = async (params?: {
  search?: string;
  authorId?: number;
  categoryId?: number;
}): Promise<number> => {
  const query = new URLSearchParams();
  if (params?.search) query.append("title_contains", params.search);
  if (params?.authorId) query.append("author.id", params.authorId.toString());
  if (params?.categoryId)
    query.append("blogpost_categories.id", params.categoryId.toString());

  const response = await fetch(
    `${API_BASE_URL}/blogposts/count?${query.toString()}`
  );
  if (!response.ok) throw new Error("Failed to fetch blog count");
  return response.json();
};

export const getAuthors = async () => {
  const response = await fetch(`${API_BASE_URL}/authors`);
  if (!response.ok) throw new Error("Failed to fetch authors");
  return response.json();
};
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/blogpost-categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};
