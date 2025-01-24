import { supabase } from "../../../../lib/supabaseClient";
import { NextResponse } from "next/server";

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

// PUT: Actualizar estado de reserva
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  // Aseguramos que `params` se espere correctamente
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Falta el ID de la reserva" },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Falta el estado de la reserva" },
        { status: 400 }
      );
    }

    // Validación simple para el estado
    const validStatuses = ["pendiente", "confirmada", "cancelada"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Estado no válido" },
        { status: 400 }
      );
    }

    // Actualización del estado de la reserva en la base de datos
    const { data, error } = await supabase
      .from("reservas")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar el estado de la reserva:", error.message);
      return NextResponse.json(
        { error: "Error al actualizar el estado de la reserva" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
