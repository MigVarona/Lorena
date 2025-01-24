import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, date, time, service } = body || {};

    // Validación de campos
    if (!name || !email || !message || !date || !time || !service) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios y deben ser válidos" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El correo electrónico no es válido" },
        { status: 400 }
      );
    }

    // Configuración del transporte de correo usando nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.dondominio.com", // Asegúrate de tener esta variable configurada
      port: 587, // Puerto TLS
      secure: false, // Desactivado para TLS
      auth: {
        user: process.env.EMAIL_USER, // Usuario del SMTP
        pass: process.env.EMAIL_PASS, // Contraseña del SMTP
      },
    });

    const mailOptions = {
      from: `"Lorena Varona" <${process.env.EMAIL_USER}>`, 
      to: email, 
      subject: `Gracias por realizar tu reserva`,
      text: `Hola ${name},\n\nGracias por realizar tu reserva. Aquí tienes los detalles:\n- Servicio: ${service}\n- Fecha: ${date}\n- Hora: ${time}\n\n¡Esperamos verte pronto!\nEl equipo de Lorena Varona.`,
      html: `
        <p>Hola ${name},</p>
        <p>Gracias por realizar tu reserva. Aquí tienes los detalles:</p>
        <ul>
          <li><strong>Servicio:</strong> ${service}</li>
          <li><strong>Fecha:</strong> ${date}</li>
          <li><strong>Hora:</strong> ${time}</li>
        </ul>
        <p>¡Esperamos verte pronto!</p>
        <p>El equipo de Lorena Varona</p>
      `,
    };
    
    

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Correo enviado correctamente" });
  } catch (error: any) {
    console.error("Error enviando el correo:", error);
    return NextResponse.json(
      { error: `Hubo un problema al enviar el correo: ${error.message}` },
      { status: 500 }
    );
  }
}
