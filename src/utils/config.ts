export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://cms.viktor.ai";
export const getImageUrl = (url?: string) =>{
    if(!url) return "/placeholder.jpg";
    return url.startsWith("http")? url : API_BASE_URL + url;
}