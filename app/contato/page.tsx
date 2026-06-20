import type { Metadata } from "next";
import { MapPin, Phone, Mail, MessageSquare, Building2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a Omega CSA Engenharia. Estamos em Campos dos Goytacazes, RJ. Solicite seu orçamento.",
};

const contactInfo = [
  {
    icon: <Phone size={18} />,
    label: "Celular",
    value: SITE.phone,
    href: `tel:${SITE.phoneTel}`,
  },
  {
    icon: <Phone size={18} />,
    label: "Celular",
    value: SITE.phoneAlt,
    href: `tel:${SITE.phoneAltTel}`,
  },
  {
    icon: <Mail size={18} />,
    label: "E-mail",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: <Mail size={18} />,
    label: "E-mail",
    value: SITE.emailAlt,
    href: `mailto:${SITE.emailAlt}`,
  },
  {
    icon: <MessageSquare size={18} />,
    label: "WhatsApp",
    value: SITE.phone,
    href: `https://wa.me/${SITE.social.whatsapp}`,
  },
  {
    icon: <MapPin size={18} />,
    label: "Endereço",
    value: SITE.address.full,
    href: `https://maps.google.com?q=${encodeURIComponent(SITE.address.full)}`,
  },
];

export default function ContatoPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: "clamp(100px, 18vh, 140px)",
          paddingBottom: "64px",
          paddingLeft: "clamp(16px, 4vw, 24px)",
          paddingRight: "clamp(16px, 4vw, 24px)",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <AnimatedSection>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#1a7fc1",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            Fale conosco
          </p>
          <h1
            style={{
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "#e8edf5",
              letterSpacing: "-0.04em",
              lineHeight: "1.1",
              marginBottom: "24px",
            }}
          >
            Vamos conversar sobre o seu projeto.
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#6b7d96",
              lineHeight: "1.7",
              maxWidth: "60ch",
            }}
          >
            Preencha o formulário ou use um dos canais abaixo. Respondemos em até 24h.
          </p>
        </AnimatedSection>
      </section>

      {/* Content */}
      <section
        style={{
          padding: "0 clamp(16px, 4vw, 24px) clamp(56px, 8vw, 80px)",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
          gap: "clamp(24px, 5vw, 40px)",
          alignItems: "start",
        }}
      >
        {/* Contact info */}
        <AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {contactInfo.map((item) => (
              <a
                key={`${item.label}-${item.value}`}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="contact-card-hover"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#0d1526",
                  border: "1px solid #1a2d4a",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(26, 127, 193, 0.1)",
                    border: "1px solid rgba(26, 127, 193, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1a7fc1",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: "11px", color: "#3d5070", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: "14px", color: "#8a9ab0", lineHeight: "1.5" }}>{item.value}</p>
                </div>
              </a>
            ))}

            {/* Hours */}
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "#0d1526",
                border: "1px solid #1a2d4a",
              }}
            >
              <p style={{ fontFamily: "var(--font-code)", fontSize: "10px", color: "#3d5070", fontWeight: "500", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                Horário de atendimento
              </p>
              <p style={{ fontSize: "14px", color: "#8a9ab0" }}>Segunda a Sexta: 08h às 18h</p>
              <p style={{ fontSize: "14px", color: "#8a9ab0" }}>Sábado: 08h às 12h</p>
            </div>

            {/* Escritórios de apoio */}
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "#0d1526",
                border: "1px solid #1a2d4a",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                <Building2 size={13} style={{ color: "#1a7fc1" }} />
                <p style={{ fontFamily: "var(--font-code)", fontSize: "10px", color: "#3d5070", fontWeight: "500", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Escritórios de apoio
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {SITE.supportOffices.map((office) => (
                  <p key={office} style={{ fontSize: "13px", color: "#6b7d96" }}>
                    {office} — RJ
                  </p>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Form */}
        <AnimatedSection delay={0.15}>
          <div
            style={{
              padding: "clamp(20px, 4vw, 36px)",
              borderRadius: "16px",
              background: "#0d1526",
              border: "1px solid #1a2d4a",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#e8edf5",
                letterSpacing: "-0.4px",
                marginBottom: "24px",
              }}
            >
              Enviar mensagem
            </h2>
            <ContactForm />
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
