import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-data";

// Crawlers de IA (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) liberados
// explicitamente: bloqueá-los impediria o site de ser citado em respostas de IA.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
