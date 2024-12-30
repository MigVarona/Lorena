import Image from 'next/image'; // Si estás usando Next.js para optimización de imágenes

const SobreMi = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Texto */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Soy Lorena Varona</h2>
          <p className="text-lg text-gray-600 mb-4">
            He estado ligada al mundo de la peluquería, mi gran pasión, desde los 16 años. Me he formado con los más
            reconocidos especialistas del sector y en las mejores escuelas de Madrid, Barcelona, París y Londres, lo que
            me ha permitido convertirme en un referente tanto en el mundo de la peluquería como del maquillaje.
          </p>
          <p className="text-lg text-gray-600 mb-4">
            En 2018 decidí abrir mi propia Peluquería en Madrid, <strong>LV Lorena Varona</strong>.
          </p>
        </div>

        {/* Imagen */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/Lorena-Varona-Home.jpg" // Cambia esta ruta a la ruta de la foto de Lorena
            alt="Lorena Varona"
            width={400}
            height={400}
            className="rounded-full object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default SobreMi;
