import ReservationForm from "../components/ReservationForm";
import Gallery from "../components/Gallery";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <nav className="bg-white text-black p-4 shadow-md fixed w-full z-50">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Belleza Única</h1>
          <ul className="flex gap-6">
            <li>
              <a href="#inicio" className="hover:text-primary transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="#galeria" className="hover:text-primary transition-colors">
                Galería
              </a>
            </li>
            <li>
              <a href="#reserva" className="hover:text-primary transition-colors">
                Reserva
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-primary transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section
        id="inicio"
        className="relative bg-black text-white h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0">
          <img
            src="/pexels-heyho-7195802.jpg"
            alt="Peluquería de mujeres"
            className="object-cover w-full h-full opacity-70"
          />
        </div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenida a Belleza Única
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            El estilo que siempre soñaste, ahora al alcance de tus manos.
            Descubre la mejor versión de ti misma.
          </p>
          <a
            href="#reserva"
            className="bg-primary text-white py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Reserva tu cita
          </a>
        </div>
      </section>

      <Gallery />
      
      <div id="reserva">
        <ReservationForm />
      </div>

      <BlogSection />
      
      <Footer />
    </div>
  );
};