import { getAllBlogPosts, toBlogPostPreview } from "@/lib/blog";
import { CommandPalette } from "@/components/layout/command-palette";

export async function CommandPaletteLoader() {
  const posts = (await getAllBlogPosts()).map(toBlogPostPreview);
  return <CommandPalette blogPosts={posts} />;
}