import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Blog",
  description: "Lee nuestras últimas entradas del blog",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-gray-900">
      <Navbar /> {/* Aquí se incluye el navbar */}
      <main className="mx-auto px-4 py-8 pt-20 max-w-7xl">
        {/* Aquí se establece un máximo ancho para evitar que el contenido se extienda demasiado */}
        {children}
      </main>
      <footer className="bg-black text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
