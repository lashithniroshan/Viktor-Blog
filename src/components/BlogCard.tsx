import type { BlogPost } from "../types/blog";
import { getImageUrl } from "../utils/config";

export const BlogCard = ({ blog }: { blog: BlogPost }) => {
  const small = getImageUrl(blog.cover?.formats?.small?.url);
  const medium = getImageUrl(blog.cover?.formats?.medium?.url);
  const large = getImageUrl(blog.cover?.formats?.large?.url);
  const authorAvatar = getImageUrl(
    blog.author?.avatar?.formats?.thumbnail?.url
  );

  return (
    <div>
      <img
        src={medium}
        srcSet={
          small && medium && large
            ? `${small} 500w, ${medium} 750w, ${large} 1000w`
            : undefined
        }
        sizes="(max-width: 640px) 500px, (max-width:1024px) 750px, 1000px"
        alt="blog.title"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="text-sm text-gray-700">
          {new Date(blog.publication_date).toLocaleDateString()}
        </p>
        {blog.author && (
          <div className="flex items-center mb-2">
            <img
              src={authorAvatar}
              alt={blog.author.full_name}
              className="w-6 h-6 rounded-full mr-2 object-cover"
            />
            <span className="text-sm text-gray-700">
              by {blog.author.full_name}
            </span>
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-600 mt-auto">{blog.excerpt}</p>
      </div>
    </div>
  );
};
