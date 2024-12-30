import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { createElement } from "react";
import rehypeSanitize from "rehype-sanitize";

export const metadata = {
  title: "Blog",
  description: "Lee nuestras últimas entradas del blog",
};

export default function BlogPage() {
  const postsDirectory = path.join(process.cwd(), "posts");

  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(postsDirectory);
  } catch (error) {
    console.error("Error leyendo la carpeta de posts:", error);
  }

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      ...data,
      slug: filename.replace(/\.md$/, ""),
      content,
    };
  });

  const ImageWrapper = ({ node, ...props }: any) => {
    if (node.tagName === "img") {
      return createElement(
        "div",
        { className: "flex justify-center my-6" },
        createElement("img", {
          ...props,
          className: "max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl", // Imágenes más grandes
        })
      );
    }
    return createElement(node.tagName, props);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
      <ul className="space-y-12">
        {posts.map((post: any) => {
          const imageRegex = /!\[.*\]\((.*)\)/; // Regex para detectar imágenes en el contenido
          const imageMatch = post.content.match(imageRegex);
          const imageUrl = imageMatch ? imageMatch[1] : null;

          return (
            <li key={post.slug} className="bg-white overflow-hidden">
              <div className="p-6">
                <Link href={`/blog/${post.slug}`} className="text-2xl font-semibold text-primary hover:underline block mb-4 text-center">
                  {post.title}
                </Link>

                {/* Solo mostrar la imagen si se encuentra en el contenido */}
                {imageUrl && (
                  <div className="flex justify-center my-6">
                    <img src={imageUrl} className="max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl" alt={post.title} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
