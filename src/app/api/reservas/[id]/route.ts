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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // <-- Cambio clave aquí
) {
  try {
    // 1. Esperar explícitamente los parámetros
    const { id } = await params; // <-- Uso correcto con await
    
    if (!id) {
      return NextResponse.json(
        { error: "ID de reserva requerido" },
        { status: 400 }
      );
    }

    // 2. Procesar el cuerpo
    const body = await request.json();
    console.log("Datos recibidos:", body);

    // 3. Validación mejorada
    const updateData: Record<string, any> = {};
    if (body.status) {
      const validStatuses = ["pendiente", "confirmada", "cancelada"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: "Estado no válido" },
          { status: 400 }
        );
      }
      updateData.status = body.status;
    }
    
    if (body.date) updateData.date = body.date;
    if (body.time) updateData.time = body.time;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Sin campos para actualizar" },
        { status: 400 }
      );
    }

    // 4. Ejecutar actualización
    const { data, error } = await supabase
      .from("reservas")
      .update(updateData)
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

