"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  minHeight: "44px",
  borderRadius: "8px",
  background: "#080e1a",
  border: "1px solid #1a2d4a",
  color: "#e8edf5",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: "500",
  color: "#8a9ab0",
  marginBottom: "6px",
};

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Falha no envio");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <CheckCircle2 size={40} style={{ color: "#5a9e2f" }} />
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#e8edf5" }}>Mensagem enviada!</h3>
        <p style={{ fontSize: "14px", color: "#6b7d96" }}>
          Recebemos seu contato e responderemos em até 24 horas.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "8px",
            padding: "10px 20px",
            borderRadius: "8px",
            background: "rgba(26, 127, 193, 0.1)",
            border: "1px solid rgba(26, 127, 193, 0.25)",
            color: "#3d9fd8",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="form-grid-2">
        <div>
          <label htmlFor="name" style={labelStyle}>Nome *</label>
          <input
            id="name"
            type="text"
            required
            placeholder="Seu nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#1a7fc1")}
            onBlur={(e) => (e.target.style.borderColor = "#1a2d4a")}
          />
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>Telefone</label>
          <input
            id="phone"
            type="tel"
            placeholder="(22) 99999-9999"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#1a7fc1")}
            onBlur={(e) => (e.target.style.borderColor = "#1a2d4a")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>E-mail *</label>
        <input
          id="email"
          type="email"
          required
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#1a7fc1")}
          onBlur={(e) => (e.target.style.borderColor = "#1a2d4a")}
        />
      </div>

      <div>
        <label htmlFor="subject" style={labelStyle}>Assunto *</label>
        <select
          id="subject"
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          style={{ ...inputStyle, cursor: "pointer" }}
          onFocus={(e) => (e.target.style.borderColor = "#1a7fc1")}
          onBlur={(e) => (e.target.style.borderColor = "#1a2d4a")}
        >
          <option value="">Selecione o assunto</option>
          <option value="Engenharia Civil, Arquitetura e Urbanismo">Engenharia Civil, Arquitetura e Urbanismo</option>
          <option value="Projetos Estruturais">Projetos Estruturais</option>
          <option value="Engenharia Hidrossanitária">Engenharia Hidrossanitária</option>
          <option value="Engenharia Sanitária e Ambiental">Engenharia Sanitária e Ambiental</option>
          <option value="Segurança do Trabalho">Segurança do Trabalho</option>
          <option value="Geotecnia, Barragens e Segurança de Estruturas">Geotecnia, Barragens e Segurança de Estruturas</option>
          <option value="Engenharia Mecânica">Engenharia Mecânica</option>
          <option value="Cartografia, Topografia e Geoprocessamento">Cartografia, Topografia e Geoprocessamento</option>
          <option value="Avaliações, Perícias e Inspeções">Avaliações, Perícias e Inspeções</option>
          <option value="Engenharia Elétrica">Engenharia Elétrica</option>
          <option value="Engenharia de Modelagem e Tecnologia">Engenharia de Modelagem e Tecnologia</option>
          <option value="Serviços Técnicos (outros)">Serviços Técnicos (outros)</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>Mensagem *</label>
        <textarea
          id="message"
          required
          rows={5}
          placeholder="Descreva seu projeto ou necessidade..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
          onFocus={(e) => (e.target.style.borderColor = "#1a7fc1")}
          onBlur={(e) => (e.target.style.borderColor = "#1a2d4a")}
        />
      </div>

      {status === "error" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 16px",
            borderRadius: "8px",
            background: "rgba(220, 38, 38, 0.08)",
            border: "1px solid rgba(220, 38, 38, 0.2)",
            color: "#f87171",
            fontSize: "13px",
          }}
        >
          <AlertCircle size={16} />
          Erro ao enviar. Tente novamente ou nos contate pelo WhatsApp.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "14px",
          minHeight: "44px",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          background: status === "sending"
            ? "rgba(26, 127, 193, 0.4)"
            : "linear-gradient(135deg, #1a7fc1 0%, #0d5a8a 100%)",
          border: "none",
          color: "#fff",
          transition: "all 0.2s",
        }}
      >
        {status === "sending" ? (
          "Enviando..."
        ) : (
          <>
            Enviar mensagem <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
