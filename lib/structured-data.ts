import { AREAS, SITE } from "./site-data";

// Schema.org JSON-LD — fonte única para os dados estruturados do site.
// ProfessionalService = LocalBusiness: habilita rich results locais no Google
// e dá contexto de entidade para motores de IA (ChatGPT, Perplexity, Gemini).

const ORGANIZATION_ID = `${SITE.url}/#organization`;

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ORGANIZATION_ID,
  name: SITE.name,
  alternateName: SITE.shortName,
  description: SITE.description,
  url: SITE.url,
  logo: `${SITE.url}/favicon/web-app-manifest-512x512.png`,
  image: `${SITE.url}/favicon/web-app-manifest-512x512.png`,
  telephone: SITE.phoneTel,
  email: [SITE.email, SITE.emailAlt],
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.state,
    postalCode: SITE.address.cep,
    addressCountry: "BR",
  },
  areaServed: [
    { "@type": "City", name: "Campos dos Goytacazes" },
    ...SITE.supportOffices.map((city) => ({ "@type": "City" as const, name: city })),
    { "@type": "State", name: "Rio de Janeiro" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: SITE.phoneTel,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
    {
      "@type": "ContactPoint",
      telephone: SITE.phoneAltTel,
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  ],
  founder: {
    "@type": "Person",
    name: SITE.team.engineer.name,
    jobTitle: SITE.team.engineer.role,
    description: SITE.team.engineer.titles.join("; "),
  },
  knowsAbout: AREAS.map((area) => area.title),
};

export function areaJsonLd(area: (typeof AREAS)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/areas-de-atuacao/${area.slug}/#service`,
    name: area.title,
    description: area.shortDesc,
    serviceType: area.title,
    url: `${SITE.url}/areas-de-atuacao/${area.slug}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "State", name: "Rio de Janeiro" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: area.title,
      itemListElement: area.services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
