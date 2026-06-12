import type { MetadataRoute } from "next";
import { AREAS, SITE } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1.0 },
    { path: "/sobre", priority: 0.8 },
    { path: "/areas-de-atuacao", priority: 0.9 },
    { path: "/servicos", priority: 0.9 },
    { path: "/portfolio", priority: 0.7 },
    { path: "/clientes", priority: 0.7 },
    { path: "/contato", priority: 0.8 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${SITE.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...AREAS.map((area) => ({
      url: `${SITE.url}/areas-de-atuacao/${area.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
