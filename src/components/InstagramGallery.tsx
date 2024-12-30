import React, { useEffect, useState } from 'react';

const InstagramGallery: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  // Simulación de la lista de enlaces de Instagram
  const instagramLinks = [
    'https://www.instagram.com/p/CiAZg0iotak/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    'https://www.instagram.com/p/DBOdIeIoA_k/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    'https://www.instagram.com/p/C-2kL5bIjGR/?utm_source=ig_web_copy_link',
    "https://www.instagram.com/p/C8cXIGroU_w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
  ];

  // Este efecto asegura que solo ejecutamos el código en el cliente
  useEffect(() => {
    setIsClient(true); // Marca como cliente para renderizar el contenido
  }, []);

  return (
    <section id="galeria" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Galería de Instagram</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {instagramLinks.map((link, index) => (
            <div key={index} className="instagram-post">
              {isClient ? (
                <blockquote
                  className="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink={link}
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: '3px',
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                    margin: '1px',
                    maxWidth: '100%',
                    minWidth: '0',
                    padding: 0,
                    width: '100%', // Asegura que ocupe el 100% del espacio disponible
                    height: '300px', // Aumentamos la altura de las publicaciones
                    overflow: 'hidden', // Elimina las barras de desplazamiento
                  }}
                >
                  <script async src="https://www.instagram.com/embed.js"></script>
                </blockquote>
              ) : (
                <div>Loading...</div> // Aquí puedes poner un spinner o algún placeholder
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
