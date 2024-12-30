"use client"

import { useState } from 'react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    title: "Corte y Peinado",
  },
  {
    url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
    title: "Coloración",
  },
  {
    url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
    title: "Tratamientos",
  },
  {
    url: "https://images.unsplash.com/photo-1562322140-8baeececf3df",
    title: "Peinados de Novia",
  },
  {
    url: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3",
    title: "Extensiones",
  },
  {
    url: "/pexels-andersonguerra-1115128.jpg",
    title: "Maquillaje",
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
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
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