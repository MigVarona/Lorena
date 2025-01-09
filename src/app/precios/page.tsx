"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface PriceItem {
  service: string;
  price: string;
  description?: string;
}

interface PriceSection {
  title: string;
  items: PriceItem[];
}

function Precios() {
  const priceSections: PriceSection[] = [
    {
      title: "Cortes",
      items: [
        { service: "Mujer", price: "39€" },
        { service: "Flequillo", price: "12€" },
        { service: "Infantil", price: "17€" },
        { service: "Caballero", price: "27€" },
        { service: "Corte + Barba", price: "35€" },
      ],
    },
    {
      title: "Peinados",
      items: [
        { service: "Cambio de estilo", price: "47€" },
        { service: "Pelo Largo", price: "32€" },
        { service: "Media Melena", price: "28€" },
        { service: "Pelo Corto", price: "24€" },
        { service: "Aireado", price: "14€" },
        { service: "Especial", price: "42€" },
        { service: "Infantil", price: "7€" },
        { service: "Domicilio", price: "122€" },
      ],
    },
    {
      title: "Mechas",
      items: [
        { service: "Pelo Corto variedad 1", price: "49€" },
        { service: "Pelo Corto variedad 2", price: "54€" },
        { service: "Pelo Corto variedad 3", price: "59€" },
        { service: "Medias Mechas Corto", price: "24€" },
        { service: "Pelo Medio variedad 1", price: "71€" },
        { service: "Pelo Medio variedad 2", price: "76€" },
        { service: "Pelo Medio variedad 3", price: "81€" },
        { service: "Medias Mechas Medio", price: "56€" },
        { service: "Pelo Largo variedad 1", price: "77€" },
        { service: "Pelo Largo variedad 2", price: "82€" },
        { service: "Pelo Largo variedad 3", price: "87€" },
        { service: "Medias Mechas Largo", price: "57€" },
      ],
    },
    {
      title: "Color",
      items: [
        { service: "Pelo Corto", price: "49€" },
        { service: "Pelo Medio", price: "54€" },
        { service: "Pelo Largo", price: "59€" },
        { service: "Pelo Súper Largo", price: "62€" },
        { service: "Suplemento Color", price: "12€" },
        { service: "Color Barba", price: "12€" },
        { service: "Golss Corto", price: "27€" },
        { service: "Golss Medio", price: "32€" },
        { service: "Golss Largo", price: "37€" },
        { service: "Cejas", price: "12€" },
        { service: "Decoloración", price: "62€" },
        { service: "Color Caballero", price: "37€" },
        { service: "Media Cabeza", price: "27€" },
        { service: "Glicólico", price: "47€" },
        { 
          service: "NAK Hair Liquid Gloss", 
          price: "32€",
          description: "La nueva colección NAK Hair Liquid Gloss es un exquisito sistema de brillo y matizado de color, innovado para abordar el desafío global de la rotura de la base. Formulado para trascender los productos de color tradicionales y diseñado para técnicas modernas de color y matizado, con una fórmula líquida avanzada que no contiene PPD."
        },
      ],
    },
    {
      title: "Recogidos",
      items: [
        { service: "Elaborado", price: "77€" },
        { service: "Medio", price: "52€" },
        { service: "Bajo", price: "37€" },
        { service: "Semi-elaborado", price: "62€" },
        { service: "Semi-sencillo", price: "47€" },
        { service: "Niña", price: "22€" },
      ],
    },
    {
      title: "Novias",
      items: [
        { service: "Prueba Peinado", price: "77€" },
        { service: "Prueba Maquillaje", price: "77€" },
        { service: "Peinado en Salón", price: "102€" },
        { service: "Maquillaje en Salón", price: "102€" },
        { service: "Peinado en Domicilio", price: "pedir presupuesto" },
        { service: "Maquillaje en Domicilio", price: "pedir presupuesto" },
      ],
    },
    {
      title: "Alisados",
      items: [
        { service: "Pelo Corto - Tratamiento Antiencrespamiento", price: "102€" },
        { service: "Pelo Corto - Tratamiento Ácido Hialurónico", price: "102€" },
        { service: "Pelo Medio - Tratamiento de Antiencrespamiento", price: "152€" },
        { service: "Pelo Medio - Tratamiento Ácido Hialurónico", price: "202€" },
        { service: "Pelo Largo - Tratamiento de Antiencrespamiento", price: "202€" },
        { service: "Pelo Largo - Tratamiento Ácido Hialurónico", price: "252€" },
        { service: "Tratamiento Alisado Extra-Largo Ácido Hialurónico", price: "302€" },
      ],
    },
    {
      title: "Moldeados",
      items: [
        { service: "Pelo Corto", price: "67€" },
        { service: "Pelo Medio", price: "77€" },
        { service: "Pelo Largo", price: "87€" },
        { service: "Por Zonas", price: "22€" },
        { service: "Media Cabeza", price: "52€" },
      ],
    },
    {
      title: "Tratamientos de Hidratación",
      items: [
        { service: "Aplicación Mascarilla", price: "12€" },
        { service: "Tratamiento Colágeno", price: "22€" },
        { service: "Tratamiento Shine", price: "27€" },
        { service: "Lavado Curly", price: "14€" },
        { 
          service: "Structure Complexion (Con productos químicos)", 
          price: "22€",
          description: "Sistema de hidratación en tres pasos para recuperar el cabello de los tratamientos químicos evitando la rotura."
        },
        { 
          service: "Structure Complexion (Tratamiento recuperación)", 
          price: "52€",
          description: "Sistema de hidratación en tres pasos para recuperar el cabello de los tratamientos químicos evitando la rotura."
        },
      ],
    },
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Servicios y Precios en LV Lorena Varona
          </h1>
          
          <div className="prose prose-lg mx-auto mb-12 text-center">
            <p className="text-muted-foreground">
              Te ofrecemos nuestra extensa experiencia para ayudarte a encontrar lo que necesitas,
              además de disfrutar de una agradable experiencia.
            </p>
            <p className="text-muted-foreground mt-4">
              Para nosotros cada persona es única ya que busca un estilo único para ella misma,
              por eso os ofrecemos tratamientos personalizados.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Los precios detallados son aproximados, para un presupuesto cerrado hay que acudir el salón,
              ya que los presupuestos son personalizados.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {priceSections.map((section) => (
              <Card key={section.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <h2 className="text-2xl font-semibold text-center">{section.title}</h2>
                  <p className="text-sm text-muted-foreground text-center">desde</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">{item.service}</span>
                          <span className="font-semibold">{item.price}</span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-4">⇒ Todos los tratamientos incluyen:</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Shampoo</li>
              <li>Acondicionador</li>
              <li>Productos de tocado</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
    <Footer />
    </>
  );
}

export default Precios;