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
    full_name:string;
    avatar?: Image;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface BlogPost{
    id: number;
    title: string;
    slug: string;
    excerpt:string;
    intro: string;
    publication_date: string;
    author?: Author;
    cover?:Image;
    blogpost_categories?: Category[];
}