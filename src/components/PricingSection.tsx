import { Check } from 'lucide-react'

const servicios = [
  {
    nombre: 'Lavado y Peinado',
    precio: 'desde 24€',
    descripcion: 'Lavado con champú y crema, masaje capilar, peinado y producto de acabado.',
  },
  {
    nombre: 'Corte, lavado y peinado',
    precio: 'desde 59€',
    descripcion: 'Lavado con champú y crema, masaje capilar, peinado y producto de acabado.',
  },
  {
    nombre: 'Tinte raíz y Lavado',
    precio: 'desde 51€',
    descripcion: 'Tinte, lavado, masaje capilar y secado. No incluye ni matiz ni peinado.',
  },
  {
    nombre: 'Mechas balayage y lavado',
    precio: 'desde 62€',
    descripcion: 'Tinte, lavado, masaje capilar y secado. No incluye ni matiz ni peinado.',
  },
  {
    nombre: 'Alisado Keratina',
    precio: 'desde 152€',
    descripcion: 'Tratamiento de alisado con keratina.',
  },
  {
    nombre: 'Alisado Keratin',
    precio: 'desde 152€',
    descripcion: 'Tratamiento de alisado con keratina.',
  },
]

export default function PricingSection() {
  return (
    <section id="precios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Precios para Mujer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div key={servicio.nombre} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Check className="text-green-500 mr-2" size={24} />
                {servicio.nombre}
              </h3>
              <p className="text-3xl font-bold text-blackmb-6">{servicio.precio}</p>
              <p className="text-gray-600 mb-8">{servicio.descripcion}</p>
      
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
