import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import type { BlogPost, BlogPostWithContent } from "@/types/blog";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

function extractPost(page: Record<string, unknown>): BlogPost {
  const props = page.properties as Record<string, unknown>;
  type TextItem = { plain_text: string };
  type SelectItem = { name: string };
  type FileItem = { file?: { url: string }; external?: { url: string } };

  const title =
    (props.Title as { title: TextItem[] })?.title?.[0]?.plain_text ?? "";
  const slug =
    (props.Slug as { rich_text: TextItem[] })?.rich_text?.[0]?.plain_text ?? "";
  const date =
    (props.Date as { date: { start: string } })?.date?.start ?? "";
  const category =
    (props.Category as { select: SelectItem })?.select?.name ?? "";
  const tags =
    (props.Tags as { multi_select: SelectItem[] })?.multi_select?.map(
      (t) => t.name
    ) ?? [];
  const description =
    (props.Description as { rich_text: TextItem[] })?.rich_text?.[0]
      ?.plain_text ?? "";
  const coverFiles = (props.Cover as { files: FileItem[] })?.files ?? [];
  const cover =
    coverFiles[0]?.file?.url ??
    coverFiles[0]?.external?.url ??
    (page.cover as { external?: { url: string } })?.external?.url ??
    "";

  return { id: page.id as string, title, slug, date, category, tags, description, cover };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Date", direction: "descending" }],
  });
  return response.results.map((p) => extractPost(p as Record<string, unknown>));
}

export async function getBlogPost(slug: string): Promise<BlogPostWithContent> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Slug", rich_text: { equals: slug } },
      ],
    },
  });

  if (response.results.length === 0) throw new Error("Post not found");

  const page = response.results[0] as Record<string, unknown>;
  const mdBlocks = await n2m.pageToMarkdown(page.id as string);
  const content = n2m.toMarkdownString(mdBlocks).parent;

  return { ...extractPost(page), content };
}

export async function getBlogPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        { property: "Published", checkbox: { equals: true } },
        { property: "Category", select: { equals: category } },
      ],
    },
    sorts: [{ property: "Date", direction: "descending" }],
  });
  return response.results.map((p) => extractPost(p as Record<string, unknown>));
}
