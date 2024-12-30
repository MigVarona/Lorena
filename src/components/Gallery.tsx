import { useState } from 'react';
import Image from 'next/image';

const images = [
  {
    url: "/photo-1582095133179-bfd08e2fc6b3.jpg",
    title: "Corte y Peinado",
    link: "/some-link-1",  // You can replace with actual URLs
  },
  {
    url: "/photo-1522337660859-02fbefca4702.jpg",
    title: "Coloración",
    link: "/some-link-2",
  },
  {
    url: "/photo-1595476108010-b4d1f102b1b1.jpg",
    title: "Tratamientos",
    link: "/some-link-3",
  },
  {
    url: "/photo-1562322140-8baeececf3df.jpg",
    title: "Peinados de Novia",
    link: "/some-link-4",
  },
  {
    url: "/photo-1595476108010-b4d1f102b1b1.jpg",
    title: "Extensiones",
    link: "/some-link-5",
  },
  {
    url: "/pexels-andersonguerra-1115128.jpg",
    title: "Maquillaje",
    link: "/some-link-6",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="galeria" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">
          Nuestra Galería
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <a href={image.link} target="_blank" rel="noopener noreferrer">
                <Image
                  width={1200}
                  height={400}
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </a>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
