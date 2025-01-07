import { supabase } from "../../../../lib/supabaseClient";

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

// Actualizar fecha y hora de una reserva existente
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { date, time } = body;

    // Obtener `params` de manera asincrónica
    const params = await context.params;

    if (!date || !time || !params?.id) {
      return new Response(
        JSON.stringify({ error: "ID de reserva o datos faltantes" }),
        { status: 400 }
      );
    }

    // Actualizar en la base de datos usando el ID de la reserva
    const { data, error } = await supabase
      .from("reservas")
      .update({ date, time })
      .eq("id", params.id); // Usamos el ID en los parámetros

    if (error) {
      console.error("Error al actualizar en Supabase:", error.message);
      return new Response(
        JSON.stringify({ error: "Error al actualizar la reserva" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar la actualización" }),
      { status: 500 }
    );
  }
}
