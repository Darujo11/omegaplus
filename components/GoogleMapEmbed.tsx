import { SITE } from "@/lib/site-data";

type GoogleMapEmbedProps = {
  query?: string;
  title?: string;
  height?: number;
};

export default function GoogleMapEmbed({
  query = SITE.address.mapsQuery,
  title = `Localização — ${SITE.name}`,
  height = 360,
}: GoogleMapEmbedProps) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed&hl=pt-BR&z=16`;

  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #1a2d4a",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
      }}
    >
      <iframe
        title={title}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
