import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body as {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      message: string;
    };

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "E-mail inválido" }, { status: 400 });
    }

    const to = process.env.CONTACT_EMAIL ?? "omega@omegacsa.com.br";

    await resend.emails.send({
      from: "Site Omega CSA <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `[Contato] ${subject} — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 8px;">
          <h2 style="color: #1a7fc1; margin-bottom: 24px;">Novo contato via site</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">Nome</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">E-mail</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Telefone</td><td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${phone}</td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Assunto</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #fff; border-radius: 6px; border: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Mensagem</p>
            <p style="color: #0f172a; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contato]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
