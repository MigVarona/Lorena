import { supabase } from "../../../lib/supabaseClient";
import { NextResponse } from 'next/server';


// Crear una nueva reserva
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, date, message, service, status, time, phone } = body;
    if (!name || !email || !date || !service) {
      return new Response(
        JSON.stringify({ error: "Faltan datos obligatorios" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("reservas")
      .insert([{ name, email, date, message, service, status, time, phone }]);

    if (error) {
      console.error("Error al insertar en Supabase:", error.message);
      return new Response(
        JSON.stringify({ error: "Error al insertar la reserva" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar la reserva" }),
      { status: 500 }
    );
  }
}

// Obtener todas las reservas
export async function GET() {
  try {
    const { data, error } = await supabase.from("reservas").select("*");

    if (error) {
      console.error("Error al obtener datos de Supabase:", error.message);
      return new Response(
        JSON.stringify({ error: "Error al obtener las reservas" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener las reservas" }),
      { status: 500 }
    );
  }
}

// src/app/api/reservas/[id]/route.ts


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params; // Usamos params.id correctamente
  const body = await request.json(); // Esperamos a obtener los datos del cuerpo de la solicitud

  const { date, time } = body;

  // Validación de los datos necesarios
  if (!date || !time || !id) {
    return new NextResponse(
      JSON.stringify({ error: "ID de reserva o datos faltantes" }),
      { status: 400 }
    );
  }

  try {
    // Lógica para actualizar la reserva
    const { data, error } = await supabase
      .from("reservas")
      .update({ date, time })
      .eq("id", id); // Acceso correcto a params.id

    if (error) {
      console.error("Error al actualizar en Supabase:", error.message);
      return new NextResponse(
        JSON.stringify({ error: "Error al actualizar la reserva" }),
        { status: 400 }
      );
    }

    return new NextResponse(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Error inesperado:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error en el servidor" }),
      { status: 500 }
    );
  }
}


