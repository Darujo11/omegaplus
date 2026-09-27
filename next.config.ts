import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  // Arquivos de public/ saem com `max-age=0` por padrão: o visitante baixava o
  // vídeo e as imagens do hero de novo a cada visita. Quando duas regras casam,
  // a última vence — a específica fica depois da genérica.
  async headers() {
    return [
      {
        // Mídia estática com nome estável (fotos, logos, ícones): 1 dia fresca,
        // revalidada em segundo plano por mais 7. Trocar o arquivo aparece em até 1 dia.
        source: "/:path*.:ext(png|jpg|jpeg|webp|avif|svg|ico|mp4|webm)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        // Mídia do hero tem hash de conteúdo no nome: cache imutável de 1 ano.
        // Ao trocar, gere um arquivo novo — nunca sobrescreva o mesmo nome.
        source: "/video_hero/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
