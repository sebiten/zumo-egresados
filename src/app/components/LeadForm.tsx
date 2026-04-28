"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

type FormStatus = "idle" | "sending" | "sent" | "error";

type LeadData = {
  name: string;
  contact: string;
  product: string;
  idea: string;
};

const initialLeadData: LeadData = {
  name: "",
  contact: "",
  product: "Camperas y buzos",
  idea: "",
};

export function LeadForm() {
  const [leadData, setLeadData] = useState<LeadData>(initialLeadData);
  const [status, setStatus] = useState<FormStatus>("idle");

  const message = buildMessage(leadData);
  const encodedMessage = encodeURIComponent(message);
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setLeadData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        body: JSON.stringify(leadData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el email");
      }

      setLeadData(initialLeadData);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nombre o promo
          <input
            name="name"
            value={leadData.name}
            onChange={handleChange}
            placeholder="Ej: Promo 2026 - 5to A"
            autoComplete="name"
          />
        </label>

        <label>
          Telefono o mail
          <input
            name="contact"
            type="text"
            value={leadData.contact}
            onChange={handleChange}
            placeholder="Ej: 11 5555-5555 o mail@correo.com"
            autoComplete="email"
            required
          />
        </label>
      </div>

      <label>
        Prenda de interes
        <select name="product" value={leadData.product} onChange={handleChange}>
          <option>Camperas y buzos</option>
          <option>Camperas</option>
          <option>Buzos</option>
          <option>Chombas</option>
          <option>Gorras</option>
          <option>Kit completo</option>
          <option>Otra idea</option>
        </select>
      </label>

      <label>
        Contanos la idea para la ropa de egresados
        <textarea
          name="idea"
          value={leadData.idea}
          onChange={handleChange}
          placeholder="Colores, cantidad aproximada, colegio, estilo, frase, logo o cualquier detalle que tengan pensado."
          rows={5}
          required
        />
      </label>

      <div className="form-actions">
        <button
          className="button button--primary"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Enviando..." : "Enviar consulta por email"}
        </button>
        <a
          className="button button--ghost-light"
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
        >
          Envio rapido por WhatsApp
        </a>
      </div>

      <p className={`form-message form-message--${status}`} aria-live="polite">
        {status === "sent" &&
          "Consulta enviada. Zummo ya puede responder desde el email del negocio."}
        {status === "error" &&
          "No pudimos enviar el email. Mientras tanto, podés usar el botón de WhatsApp."}
      </p>
    </form>
  );
}

function buildMessage({ name, contact, product, idea }: LeadData) {
  return [
    "Hola Zummo, quiero pedir presupuesto para ropa de egresados.",
    "",
    `Nombre / promo: ${name.trim() || "No indicado"}`,
    `Contacto: ${contact.trim()}`,
    `Prenda de interes: ${product}`,
    "",
    "Idea:",
    idea.trim(),
  ].join("\n");
}
