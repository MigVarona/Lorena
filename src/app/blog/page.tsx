import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "../../components/ui/pagination"; // Asegúrate de importar el componente de paginación correctamente.

export const metadata = {
  title: "Blog",
  description: "Lee nuestras últimas entradas del blog",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Esperamos a que searchParams esté resuelto
  const { page = "1" } = await searchParams;
  const currentPage = Number(page);
  const postsPerPage = 6;

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
      slug: data.slug || filename.replace(/\.md$/, ""),
      content,
    };
  });

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-12">
        <h1 className="text-5xl font-bold mb-20 text-center">Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post: any) => {
            const imageRegex = /!\[.*\]\((.*)\)/;
            const imageMatch = post.content.match(imageRegex);
            const imageUrl = imageMatch ? imageMatch[1] : "/placeholder.svg";

            const excerpt =
              post.content.replace(imageRegex, "").slice(0, 150).trim() + "...";

            return (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <article className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {excerpt}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-rose-500 text-sm font-medium">
                        Leer más →
                      </span>
                      {post.date && (
                        <span className="text-gray-400 text-sm">
                          {new Date(post.date).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Paginación */}
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `/blog?page=${currentPage - 1}` : "#"}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href={`/blog?page=${i + 1}`}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `/blog?page=${currentPage + 1}`
                    : "#"
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
