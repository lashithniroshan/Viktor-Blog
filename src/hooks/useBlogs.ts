import {useQuery } from "@tanstack/react-query";
import { getBlogs, getBlogCount } from "../api/blogApi";

export const useBlogs = (page: number, limit = 8, query = '') => {
    const blogsQuery = useQuery({
queryKey: ['blogs', page, limit, query] as const,
queryFn: ()=> getBlogs(page, limit, query),
staleTime:5000,      
    });

    const countQuery = useQuery({
      queryKey: ['blogCount', query] as const,
queryFn: ()=> getBlogCount(query),
    })

    return {blogsQuery, countQuery}
};