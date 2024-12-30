import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Básico',
    price: '29.99',
    features: ['Corte de pelo', 'Lavado', 'Peinado básico'],
  },
  {
    name: 'Premium',
    price: '59.99',
    features: ['Corte de pelo', 'Lavado', 'Peinado avanzado', 'Tratamiento capilar'],
  },
  {
    name: 'VIP',
    price: '99.99',
    features: ['Corte de pelo', 'Lavado', 'Peinado de lujo', 'Tratamiento capilar', 'Manicura'],
  },
]

export default function PricingSection() {
  return (
    <section id="precios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestros Precios</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">${plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

