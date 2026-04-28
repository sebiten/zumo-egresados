import { NextResponse } from "next/server";
import { getResend } from "@/lib/resend";

type ContactPayload = {
  name?: string;
  contact?: string;
  product?: string;
  idea?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;
  const lead = normalizePayload(payload);

  if (!lead.contact || !lead.idea) {
    return NextResponse.json(
      { message: "El contacto y la idea son obligatorios." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL || "Zummo Egresados <onboarding@resend.dev>";

  if (!process.env.RESEND_API_KEY || !to) {
    return NextResponse.json(
      { message: "Faltan configurar RESEND_API_KEY o CONTACT_EMAIL." },
      { status: 500 },
    );
  }

  const { error } = await getResend().emails.send({
    from,
    to,
    subject: `Nueva consulta web: ${lead.name || "Ropa de egresados"}`,
    replyTo: looksLikeEmail(lead.contact) ? lead.contact : undefined,
    text: buildPlainText(lead),
    html: buildEmailHtml(lead),
  });

  if (error) {
    return NextResponse.json(
      { message: "No se pudo enviar la consulta." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function normalizePayload(payload: ContactPayload) {
  return {
    name: payload.name?.trim() || "",
    contact: payload.contact?.trim() || "",
    product: payload.product?.trim() || "Sin preferencia",
    idea: payload.idea?.trim() || "",
  };
}

function buildPlainText(lead: ReturnType<typeof normalizePayload>) {
  return [
    "Nueva consulta desde la web de Zummo Egresados",
    "",
    `Nombre / promo: ${lead.name || "No indicado"}`,
    `Contacto: ${lead.contact}`,
    `Prenda de interes: ${lead.product}`,
    "",
    "Idea:",
    lead.idea,
  ].join("\n");
}

function buildEmailHtml(lead: ReturnType<typeof normalizePayload>) {
  return `
    <div style="font-family: Arial, sans-serif; background:#f6f9fb; padding:28px;">
      <div style="max-width:620px; margin:0 auto; background:#ffffff; border-radius:22px; overflow:hidden; border:1px solid #dbe7ee;">
        <div style="background:#075f86; color:#ffffff; padding:26px 28px;">
          <p style="margin:0 0 8px; color:#ffffff; font-size:13px; font-weight:700; letter-spacing:.12em; text-transform:uppercase;">Nueva consulta web</p>
          <h1 style="margin:0; font-size:28px; line-height:1.1;">Zummo Egresados</h1>
        </div>
        <div style="padding:28px;">
          <p style="margin:0 0 18px; color:#334; font-size:16px;">Un interesado dejo sus datos para que se comuniquen por ropa de egresados.</p>
          ${emailRow("Nombre / promo", lead.name || "No indicado")}
          ${emailRow("Contacto", lead.contact)}
          ${emailRow("Prenda de interes", lead.product)}
          <div style="margin-top:22px;">
            <p style="margin:0 0 8px; color:#d9102f; font-size:13px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;">Idea</p>
            <div style="white-space:pre-line; color:#123; background:#f2f7fa; border-radius:16px; padding:18px; line-height:1.6;">${escapeHtml(lead.idea)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function emailRow(label: string, value: string) {
  return `
    <div style="border-top:1px solid #e4edf2; padding:14px 0;">
      <p style="margin:0 0 4px; color:#d9102f; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase;">${escapeHtml(label)}</p>
      <p style="margin:0; color:#123; font-size:17px; font-weight:700;">${escapeHtml(value)}</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
