import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

/**
 * Server-rendered MDX. Renders to plain HTML, no client JS for content.
 * Components passed in here are available to all .mdx files.
 */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              { behavior: "wrap", properties: { className: ["heading-anchor"] } },
            ],
          ],
        },
      }}
    />
  );
}
