export interface Image {
url: string;
alternativeText?: string;
formats?: {
small?:{ url: string}
medium?:{ url: string}
large?:{ url: string}
thumbnail?:{ url: string}
}
}

export interface Author {
    id:number;
    name:string;
}

export interface BlogCategory {
    id: number;
    name: string;
}

export interface BlogPost{
    id: number;
    title: string;
    slug: string;
    publication_date: string;
    banner_image: {url: string};
    author?: Author;
    cover?:Image;
    blogpost_categories: BlogCategory[];
}