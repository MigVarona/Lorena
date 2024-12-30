const blogPosts = [
    {
      title: "Tendencias de Color 2024",
      excerpt: "Descubre los tonos que marcarán tendencia esta temporada...",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388",
      date: "15 Mar 2024",
    },
    {
      title: "Cuidados para el Cabello en Verano",
      excerpt: "Tips esenciales para mantener tu cabello saludable...",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e",
      date: "10 Mar 2024",
    },
    {
      title: "Peinados para Eventos Especiales",
      excerpt: "Ideas elegantes para lucir espectacular en cualquier ocasión...",
      image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11",
      date: "5 Mar 2024",
    },
  ];
  
  const BlogSection = () => {
    return (
      <section id="blog" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">
            Últimas Tendencias
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-primary text-sm font-semibold">
                    {post.date}
                  </span>
                  <h3 className="text-xl font-bold mb-2 mt-1 text-text-primary">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a
                    href="#"
                    className="text-primary font-semibold hover:underline"
                  >
                    Leer más →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default BlogSection;