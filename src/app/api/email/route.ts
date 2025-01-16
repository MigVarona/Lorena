import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json(); // Obtenemos los datos del formulario

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Faltan datos en el formulario' }, { status: 400 });
    }

    // Configuración del transporte de correo usando nodemailer (sin SSL)
    const transporter = nodemailer.createTransport({
      host: 'smtp.dondominio.com', // Usa el servidor SMTP que prefieras
      port: 587, // Usamos el puerto 587 para TLS
      secure: false, // Desactivamos SSL
      auth: {
        user: process.env.EMAIL_USER, // Utilizamos la variable de entorno
        pass: process.env.EMAIL_PASS, // Utilizamos la variable de entorno
      },
    });

    // Configuración del correo
    const mailOptions = {
      from: 'info@lorenavarona.com', // Dirección del remitente
      to: 'migvaronag@gmail.com', // Dirección del destinatario
      subject: `Nuevo mensaje de ${name}`,
      text: `De: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Correo enviado correctamente' });
  } catch (error: any) {
    console.error('Error enviando el correo:', error);
    return NextResponse.json({ error: `Hubo un problema al enviar el correo: ${error.message}` }, { status: 500 });
  }
}
