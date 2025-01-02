import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export const metadata = {
  title: "Post individual",
  description: "Lee la entrada completa del blog",
};

// Define los tipos de Params y SearchParams como promesas
type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  // Desestructura params y searchParams con await
  const params = await props.params;
  const { slug } = params;

  const postsDirectory = path.join(process.cwd(), "posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);

  console.log("File Path:", filePath); // Verifica la ruta del archivo

  // Verifica si el archivo existe
  if (!fs.existsSync(filePath)) {
    return (
      <div>
        Post no encontrado en: {filePath}
      </div>
    );
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Convierte el contenido Markdown a HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div>
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-gray-500">{data.date}</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </div>
  );
}
