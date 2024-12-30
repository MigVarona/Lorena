import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validación de datos
    const { name, email, date, message, service, status, time, phone } = body;
    if (!name || !email || !date || !service) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos obligatorios' }),
        { status: 400 }
      );
    }

    // Inserción en la base de datos
    const { data, error } = await supabase
      .from('reservas')
      .insert([{ name, email, date, message, service, status, time, phone }]);

    if (error) {
      console.error('Error al insertar en Supabase:', error.message);
      return new Response(
        JSON.stringify({ error: 'Error al insertar la reserva' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(
      JSON.stringify({ error: 'Error al procesar la reserva' }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase.from('reservas').select('*');

    if (error) {
      console.error('Error al obtener datos de Supabase:', error.message);
      return new Response(
        JSON.stringify({ error: 'Error al obtener las reservas' }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return new Response(
      JSON.stringify({ error: 'Error al obtener las reservas' }),
      { status: 500 }
    );
  }
}
