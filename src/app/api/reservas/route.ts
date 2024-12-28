import { supabase } from '../../../lib/supabaseClient'; // Asegúrate de que el path sea correcto

export async function POST(req: Request) {
  try {
    const { name, email, date, message, service, status } = await req.json();

    const { data, error } = await supabase
      .from('reservas')
      .insert([
        {
          name,
          email,
          date,
          message,
          service,
          status,
        },
      ]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al procesar la reserva' }), { status: 500 });
  }
}

// Manejador de GET para obtener todas las reservas
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*'); // Selecciona todas las columnas de la tabla "reservas"

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener las reservas' }), { status: 500 });
  }
}
