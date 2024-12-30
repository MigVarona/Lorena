import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Belleza Única</h3>
            <p className="text-gray-400">
              Tu destino de belleza donde cada visita es una experiencia única y
              transformadora.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p className="text-gray-400 mb-2"> Calle Principal 123</p>
            <p className="text-gray-400 mb-2"> +34 123 456 789</p>
            <p className="text-gray-400"> info@bellezaunica.com</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Horario</h3>
            <p className="text-gray-400 mb-2">Lunes a Viernes: 9:00 - 20:00</p>
            <p className="text-gray-400 mb-2">Sábados: 9:00 - 18:00</p>
            <p className="text-gray-400">Domingos: Cerrado</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#" className="hover:text-primary transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
        <div className="text-center text-gray-400 text-sm">
          <p>© 2024 Belleza Única. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;