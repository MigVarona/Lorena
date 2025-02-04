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
      host: process.env.SMTP_HOST || "smtp.dondominio.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"Lorena Varona" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Gracias por realizar tu reserva`,
      text: `Hola ${name},\n\nGracias por realizar tu reserva. Aquí tienes los detalles:\n- Servicio: ${service}\n- Fecha: ${date}\n- Hora: ${time}\n\n¡Esperamos verte pronto!\nEl equipo de Lorena Varona.`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Reserva</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0;">
                  <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header with Logo -->
                    <tr>
                      <td style="background-color: #9b87f5; padding: 20px; text-align: center;">
                        <img src="https://res.cloudinary.com/dyji6w7iu/image/upload/v1738698251/g6dnjm6eyapxaatokabc.png" alt="Lorena Varona Logo" style="max-width: 200px; height: auto;">
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <h1 style="color: #1A1F2C; margin: 0 0 20px; font-size: 24px;">¡Hola ${name}!</h1>
                        <p style="color: #1A1F2C; margin: 0 0 20px; font-size: 16px; line-height: 1.5;">
                          Gracias por realizar tu reserva. Aquí tienes los detalles:
                        </p>
                        <table style="width: 100%; background-color: #f8f9fa; border-radius: 4px; margin: 20px 0; padding: 20px;">
                          <tr>
                            <td style="padding: 10px;">
                              <strong style="color: #7E69AB;">Servicio:</strong>
                              <span style="color: #1A1F2C;">${service}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px;">
                              <strong style="color: #7E69AB;">Fecha:</strong>
                              <span style="color: #1A1F2C;">${date}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 10px;">
                              <strong style="color: #7E69AB;">Hora:</strong>
                              <span style="color: #1A1F2C;">${time}</span>
                            </td>
                          </tr>
                        </table>
                        <p style="color: #1A1F2C; margin: 20px 0; font-size: 16px; line-height: 1.5;">
                          ¡Esperamos verte pronto!
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <!-- Footer with Instagram Link -->
                    <tr>
                      <td style="background-color: #7E69AB; color: #ffffff; padding: 20px; text-align: center;">
                        <p style="margin: 0; font-size: 14px;">El equipo de Lorena Varona</p>
                        <p style="margin: 10px 0 0; font-size: 12px;">Síguenos en nuestras redes sociales:</p>
                        <a href="https://www.instagram.com/lorena_varona" target="_blank" style="display: inline-block; margin-top: 10px;">
                          <img src="https://res.cloudinary.com/dyji6w7iu/image/upload/v1738699353/instagram_knwnm6.png" 
                               alt="Instagram" 
                               style="width: 30px; height: 30px;">
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
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