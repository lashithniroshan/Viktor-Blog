import { API_BASE_URL } from "../utils/config";

export const getBlogs = async (page = 1, limit = 8, query = "") => {
const start = (page -1) * limit;
const response = await fetch(`${API_BASE_URL}/blogposts?_start=${start}&_limit=${limit}${query}`);
if (!response.ok) throw new Error('Failed to fetch blogs')
    return response.json();
}

export const getBlogCount = async (query = "") =>{
    const response = await fetch(`${API_BASE_URL}/blogposts/count${query}`);
    if (!response.ok) throw new Error('Failed to fetch blog count');
    return response.json();
}