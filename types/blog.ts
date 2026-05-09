export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description: string;
  cover: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
  readingTime?: string;
}
