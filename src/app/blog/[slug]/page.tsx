import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head"; // Import the Head component

// Cambié los tipos de `params` y `searchParams` a promesas
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Definimos las funciones como `async`
export async function generateMetadata(props: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;

  return {
    title: `${slug}`, // Puedes personalizar la metadata aquí
    description: `Descripción para el post: ${slug}`,
  };
}

export default async function Page(props: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const params = await props.params; // Asegúrate de resolver la promesa
  const searchParams = await props.searchParams; // Asegúrate de resolver la promesa
  const { slug } = params;

  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);

  console.log("File Path:", filePath);

  if (!fs.existsSync(filePath)) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-semibold text-red-600">Post no encontrado</h1>
            <p className="text-gray-600 mt-2">No se pudo encontrar el post en: {filePath}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  // Modificar el título dinámicamente
  const pageTitle = data.title || slug.replace(/-/g, " ").toUpperCase();

  return (
    <>
      {/* Use the Next.js Head component to modify the title */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={`Lee la entrada completa del blog: ${pageTitle}`} />
      </Head>

      <div className=" mx-auto px-4 py-8 max-w-4xl">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {pageTitle}
              </h1>
              <time className="text-muted-foreground text-sm sm:text-base">
                {new Date(data.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>

            {/* Content Section */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert text-left" 
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
