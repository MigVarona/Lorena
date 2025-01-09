import { supabase } from "../../../lib/supabaseClient";

// Función auxiliar para formatear la fecha
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Obtener todas las fechas bloqueadas
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blocked_dates")
      .select("*")
      .order('date', { ascending: true });

    if (error) {
      console.error("Error al obtener datos de Supabase:", error.message);
      return new Response(
        JSON.stringify({ error: "Error al obtener las fechas bloqueadas" }),
        { status: 500 }
      );
    }

    // Formatea las fechas como YYYY-MM-DD
    const formattedData = data.map((item) => ({
      ...item,
      date: item.date ? formatDate(new Date(item.date)) : null,
    }));

    return new Response(JSON.stringify({ data: formattedData }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener las fechas bloqueadas" }),
      { status: 500 }
    );
  }
}

// Crear una nueva fecha bloqueada
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { date } = body;

    if (!date) {
      return new Response(
        JSON.stringify({ error: "La fecha es inválida o no está presente" }),
        { status: 400 }
      );
    }

    // Asegurarse de que la fecha esté en formato YYYY-MM-DD
    const formattedDate = formatDate(new Date(date));

    const { data, error } = await supabase
      .from("blocked_dates")
      .insert([{ date: formattedDate }]);

    if (error) {
      console.error("Error al insertar en Supabase:", error.message);
      return new Response(
        JSON.stringify({ error: "Error al insertar la fecha bloqueada" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error al procesar la fecha bloqueada" }),
      { status: 500 }
    );
  }
}

// Eliminar una fecha bloqueada
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    let { date } = body;

    if (!date) {
      return new Response(
        JSON.stringify({ error: "La fecha es inválida o no está presente" }),
        { status: 400 }
      );
    }

    // Asegurarse de que la fecha esté en formato YYYY-MM-DD
    const formattedDate = formatDate(new Date(date));

    const { data, error } = await supabase
      .from("blocked_dates")
      .delete()
      .eq("date", formattedDate);

    if (error) {
      console.error("Error al eliminar en Supabase:", error.message);
      return new Response(
        JSON.stringify({ error: "Error al eliminar la fecha bloqueada" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true, deletedDate: formattedDate }), { status: 200 });
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return new Response(
      JSON.stringify({ error: "Error al eliminar la fecha bloqueada" }),
      { status: 500 }
    );
  }
}
