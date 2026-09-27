import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Minus, Plus } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { SITE, WHATSAPP_URL } from "@/lib/site-data";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import {
  CLIENTS,
  FEATURED_PROJECT,
  HERO_STATS,
  INSTITUTIONS,
  INSTITUTION_LOGOS,
  LANDFILL_PHOTOS,
  LANDFILL_SERVICES,
  MISSION,
  PORTFOLIO_SECTIONS,
  SERVICE_LINES,
  SPECIALTIES,
  TEAM,
  WORK_PHOTOS,
  type Client,
  type Photo,
  type WorkPhoto,
} from "@/lib/portfolio-tecnico";
import ClientsFilter from "./ClientsFilter";

export const metadata: Metadata = {
  title: "Portfólio Técnico",
  description:
    "Aterros sanitários, saneamento, drenagem e urbanização: projetos da Omega CSA Engenharia para MRV, Alphaville, Águas do Brasil e prefeituras do RJ.",
};

const jsonLd = breadcrumbJsonLd([
  { name: "Início", path: "/" },
  { name: "Portfólio", path: "/portfolio" },
]);

/* ── Primitivas locais ─────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="pf-eyebrow">{children}</span>;
}

function SectionHead({ eyebrow, title, lead, as = "h2" }: { eyebrow: string; title: React.ReactNode; lead?: string; as?: "h1" | "h2" }) {
  const Heading = as;
  return (
    <AnimatedSection className="pf-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading className="display-heading pf-h2">{title}</Heading>
      {lead && <p className="pf-lead">{lead}</p>}
    </AnimatedSection>
  );
}

function Watermark() {
  return (
    <div aria-hidden className="pf-watermark">
      <Image src="/logo max.png" alt="" width={611} height={224} />
    </div>
  );
}

function Chips({ items, tone = "blue" }: { items: readonly string[]; tone?: "blue" | "green" | "plain" }) {
  return (
    <ul className="pf-chips">
      {items.map((item) => (
        <li key={item} className={`pf-chip pf-chip--${tone}`}>
          {item}
        </li>
      ))}
    </ul>
  );
}

function PhotoCard({ photo, sizes, badge, className }: { photo: Photo; sizes: string; badge?: WorkPhoto["stage"]; className?: string }) {
  return (
    <figure className={`pf-photo ${className ?? ""}`}>
      <div className="pf-photo-media">
        <Image src={photo.src} alt={`${photo.title} — ${photo.caption}`} fill sizes={sizes} />
        {badge && (
          <span className="pf-badge" data-stage={badge.toLowerCase()}>
            {badge}
          </span>
        )}
      </div>
      <figcaption>
        <strong>{photo.title}</strong>
        <span>{photo.caption}</span>
      </figcaption>
    </figure>
  );
}

function ClientCard({ client }: { client: Client }) {
  const tone = client.kind === "public" ? "green" : "blue";
  return (
    <article className={`pf-card pf-client ${client.wide ? "pf-client--wide" : ""}`}>
      <span className={`pf-tag pf-tag--${tone}`}>{client.tag}</span>
      <h3 className="pf-client-name">{client.name}</h3>
      <p className="pf-client-loc">{client.location}</p>

      {client.developments && (
        <dl className="pf-devs">
          {client.developments.map((d) => (
            <div key={d.name}>
              <dt>{d.name}</dt>
              {d.size && <dd>{d.size}</dd>}
            </div>
          ))}
        </dl>
      )}

      {client.interventions.length > 0 && (
        <>
          {client.developments && <p className="pf-micro">Intervenções</p>}
          <Chips items={client.interventions} tone={tone} />
        </>
      )}

      {client.subgroups?.map((g, i) => (
        <div key={g.heading ?? i} className={`pf-subgroup ${g.heading ? "pf-subgroup--head" : ""}`}>
          {g.heading && <h4>{g.heading}</h4>}
          <dl className="pf-devs">
            {g.developments.map((d) => (
              <div key={d.name} className={d.name === "Total" ? "pf-devs-total" : undefined}>
                <dt>{d.name}</dt>
                {d.size && <dd>{d.size}</dd>}
              </div>
            ))}
          </dl>
          {g.label && <p className="pf-micro">{g.label}</p>}
          <Chips items={g.projects} />
        </div>
      ))}

      {client.approvedIn && (
        <div className="pf-subgroup pf-subgroup--head">
          <h4>Projetos para o empreendedor aprovados nos municípios</h4>
          <Chips items={client.approvedIn} />
        </div>
      )}

      {client.note && <p className="pf-callout">{client.note}</p>}
    </article>
  );
}

function ClientGroup({ label, clients }: { label: string; clients: Client[] }) {
  return (
    <section className="pf-client-group" aria-label={label}>
      <h3 className="pf-group-label">{label}</h3>
      <div className="pf-grid-2">
        {clients.map((c) => (
          <ClientCard key={c.name} client={c} />
        ))}
      </div>
    </section>
  );
}

/* ── Página ────────────────────────────────────────── */

export default function PortfolioPage() {
  const privateClients = CLIENTS.filter((c) => c.kind === "private");
  const publicClients = CLIENTS.filter((c) => c.kind === "public");

  return (
    <div className="pf">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── HERO ── */}
      <section className="pf-section pf-hero">
        <Watermark />
        <div className="pf-container">
          <div className="pf-hero-grid">
            <AnimatedSection>
              <Eyebrow>Portfólio técnico</Eyebrow>
              <h1 className="display-heading pf-h1">
                Engenharia multidisciplinar para{" "}
                <span className="pf-h1-accent">saneamento, infraestrutura e meio ambiente</span>
              </h1>
              <p className="pf-lead">
                A Omega Engenharia CSA Ltda., sediada em Campos dos Goytacazes/RJ, elabora projetos, planejamento,
                gerenciamento, fiscalização de serviços e perícias nas áreas de engenharia civil, sanitária, ambiental,
                segurança do trabalho, geotecnia, cartografia e avaliações. A mesma equipe acompanha o empreendimento
                desde o estudo de concepção até a aprovação nos órgãos, o licenciamento e a obra.
              </p>
              <nav aria-label="Seções do portfólio" className="pf-jump">
                {PORTFOLIO_SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`}>
                    {s.label}
                  </a>
                ))}
              </nav>
            </AnimatedSection>

            <AnimatedSection delay={0.12} className="pf-hero-brand">
              <Image src="/logo max.png" alt="Omega CSA Engenharia" width={611} height={224} priority />
              <p>Registro no CREA-RJ · Atuação no RJ e projetos aprovados em GO, MG e SP</p>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.2}>
            <dl className="pf-stats">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ESPECIALIDADES ── */}
      <section id="especialidades" className="pf-section pf-surface">
        <div className="pf-container">
          <SectionHead
            eyebrow="Áreas de atuação"
            title="11 especialidades integradas"
            lead="Um loteamento, por exemplo, exige topografia, terraplenagem, drenagem, redes de água e esgoto, pavimentação, estruturas e licenciamento. Essas disciplinas são desenvolvidas internamente e entregues como um conjunto compatibilizado."
          />
          <AnimatedSection delay={0.1}>
            <ul className="pf-spec">
              {SPECIALTIES.map((s) => (
                <li key={s.n}>
                  <Link href={`/areas-de-atuacao/${s.slug}`} className="pf-spec-cell">
                    <span className="pf-num">{s.n}</span>
                    <strong>{s.title}</strong>
                    <span>{s.desc}</span>
                    <ArrowUpRight size={14} aria-hidden className="pf-spec-arrow" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contato" className="pf-spec-cell pf-spec-cta">
                  <span className="pf-num">→</span>
                  <strong>Escopo específico?</strong>
                  <span>Envie a demanda para definição da equipe e do escopo.</span>
                </Link>
              </li>
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* ── LINHAS DE SERVIÇO ── */}
      <section id="linhas-de-servico" className="pf-section">
        <div className="pf-container">
          <SectionHead
            eyebrow="Linhas de serviço"
            title="O que a Omega executa"
            lead="Projetos básicos e executivos, com dimensionamento, orçamento e acompanhamento do licenciamento ambiental quando aplicável."
          />
          <AnimatedSection delay={0.1} className="pf-grid-2 pf-grid-2--top">
            {SERVICE_LINES.map((column, ci) => (
              <div key={ci} className="pf-accordion">
                {column.map((line, li) => (
                  <details key={line.title} name="linhas-de-servico" open={ci === 0 && li === 0}>
                    <summary>
                      <span>
                        <strong>{line.title}</strong>
                        <span>{line.summary}</span>
                      </span>
                      <Plus size={16} aria-hidden className="pf-acc-plus" />
                      <Minus size={16} aria-hidden className="pf-acc-minus" />
                    </summary>
                    <ul className="pf-bullets">
                      {line.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── ATERROS SANITÁRIOS ── */}
      <section id="aterros-sanitarios" className="pf-section pf-surface">
        <div className="pf-container">
          <SectionHead
            eyebrow="Resíduos sólidos · Estado do Rio de Janeiro"
            title="Consultoria em aterros sanitários controlados"
            lead="Suporte técnico em todas as fases do aterro: viabilidade, licenciamento, implantação, operação, monitoramento e encerramento. Atendimento em todo o Estado do Rio de Janeiro, com engenheiros civis, sanitaristas, ambientais, químicos, cartógrafos e mecânicos, além de geólogos e especialistas em geotecnia e hidrogeologia."
          />
          <div className="pf-grid-3">
            {LANDFILL_SERVICES.map((s, i) => (
              <AnimatedSection key={s.title} delay={(i % 3) * 0.06}>
                <article className={`pf-card pf-service ${s.standard ? "pf-service--standard" : ""}`}>
                  <span className="pf-micro pf-micro--accent">{s.eyebrow}</span>
                  <h3>{s.title}</h3>
                  <ul className="pf-bullets">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={0.1} className="pf-grid-4 pf-gap-top">
            {LANDFILL_PHOTOS.map((p) => (
              <PhotoCard key={p.src} photo={p} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 285px" />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── OBRAS ── */}
      <section id="obras" className="pf-section">
        <div className="pf-container">
          <SectionHead
            eyebrow="Registro fotográfico"
            title="Obras e intervenções acompanhadas"
            lead="Urbanização, unidades escolares, saneamento, estradas rurais, pavimentação e drenagem contra alagamentos e cheias."
          />
          <div className="pf-gallery">
            {WORK_PHOTOS.map((p, i) => (
              <AnimatedSection key={p.src} delay={(i % 3) * 0.06} className={p.span ? `pf-span-${p.span}` : undefined}>
                <PhotoCard
                  photo={p}
                  badge={p.stage}
                  sizes={p.span === "wide" ? "(max-width: 640px) 100vw, 792px" : "(max-width: 640px) 100vw, 390px"}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJETO EM DESTAQUE ── */}
      <section className="pf-section pf-surface">
        <div className="pf-container pf-grid-2 pf-grid-2--feature">
          <AnimatedSection>
            <Eyebrow>Projeto em destaque</Eyebrow>
            <h2 className="display-heading pf-h2">{FEATURED_PROJECT.title}</h2>
            <p className="pf-lead">{FEATURED_PROJECT.lead}</p>
            <dl className="pf-sheet">
              {FEATURED_PROJECT.sheet.map((row) => (
                <div key={row.key}>
                  <dt>{row.key}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </AnimatedSection>
          <AnimatedSection delay={0.12} className="pf-stack">
            {FEATURED_PROJECT.images.map((p) => (
              <PhotoCard key={p.src} photo={p} sizes="(max-width: 900px) 100vw, 575px" className="pf-photo--render" />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── EQUIPE ── */}
      <section id="equipe-tecnica" className="pf-section pf-deep">
        <Watermark />
        <div className="pf-container">
          <SectionHead
            eyebrow="Equipe técnica"
            title="Equipe dimensionada conforme o serviço"
            lead="A empresa mobiliza mais de 10 profissionais diretos e indiretos. A composição é definida pelo escopo: projetos de saneamento envolvem engenharia sanitária, civil e hidrossanitária; aterros sanitários incluem geologia, geotecnia e hidrogeologia; perícias reúnem as especialidades relacionadas ao objeto do laudo."
          />
          <div className="pf-team">
            <AnimatedSection className="pf-card pf-card--pad">
              <span className="pf-tag pf-tag--blue">{TEAM.lead.role}</span>
              <h3 className="pf-person">{TEAM.lead.name}</h3>
              <p className="pf-registry">{TEAM.lead.registry}</p>
              <Chips items={TEAM.lead.titles} />
              <Chips items={TEAM.lead.academic} tone="green" />
              <hr className="pf-rule" />
              <h3 className="pf-person pf-person--sm">{TEAM.director.name}</h3>
              <p className="pf-role">{TEAM.director.role}</p>
            </AnimatedSection>
            <div className="pf-stack">
              <AnimatedSection delay={0.08} className="pf-card pf-card--pad">
                <p className="pf-headcount">{TEAM.headcount}</p>
                <p className="pf-role">profissionais diretos e indiretos</p>
                <p className="pf-micro pf-gap-top-sm">Formações mobilizadas</p>
                <Chips items={TEAM.disciplines} />
              </AnimatedSection>
              <AnimatedSection delay={0.14} className="pf-card pf-card--pad">
                <p className="pf-micro">Sede</p>
                <p className="pf-hq">{TEAM.headquarters}</p>
                <p className="pf-micro pf-gap-top-sm">Escritórios de apoio</p>
                <Chips items={TEAM.supportOffices} tone="plain" />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÓRGÃOS E INSTITUIÇÕES (seção clara) ── */}
      <section id="instituicoes" className="pf-section pf-light">
        <div className="pf-container">
          <SectionHead
            eyebrow="Órgãos e instituições"
            title="Órgãos públicos, concessionárias e empresas privadas"
            lead="Instituições junto às quais a Omega obteve aprovações e licenças ou para as quais prestou serviços."
          />
          <AnimatedSection delay={0.08}>
            <ul className="pf-logos">
              {INSTITUTION_LOGOS.map((l) => (
                <li key={l.name}>
                  <div className="pf-logo-img">
                    <Image src={l.src} alt={l.name} width={l.width} height={l.height} />
                  </div>
                  <p>
                    <strong>{l.name}</strong> — {l.note}
                  </p>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <ul className="pf-inst">
              {INSTITUTIONS.map((i) => (
                <li key={i.name} data-kind={i.kind}>
                  <strong>{i.name}</strong>
                  <span>{i.note}</span>
                </li>
              ))}
            </ul>
            <p className="pf-fineprint">
              As marcas exibidas pertencem aos respectivos titulares e indicam instituições com as quais houve aprovação,
              licenciamento ou prestação de serviço.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CLIENTES ── */}
      <section id="clientes" className="pf-section">
        <div className="pf-container">
          <SectionHead
            eyebrow="Experiência comprovada"
            title="Clientes e empreendimentos atendidos"
            lead="Projetos de infraestrutura urbana, saneamento, terraplenagem, pavimentação e estudos hidrológicos desenvolvidos para incorporadoras, concessionárias e prefeituras, com aprovação em órgãos municipais, concessionárias e na Caixa Econômica Federal."
          />
          <AnimatedSection delay={0.08}>
            <ClientsFilter
              privateGroup={<ClientGroup label="Iniciativa privada" clients={privateClients} />}
              publicGroup={<ClientGroup label="Órgãos públicos" clients={publicClients} />}
            />
            <p className="pf-muted-note">Entre outros órgãos e municípios atendidos.</p>
            <p className="pf-fineprint pf-fineprint--dark">
              Perfis atendidos: órgãos municipais, estaduais e federais, construtoras e incorporadoras, concessionárias,
              condomínios, indústrias, escritórios de advocacia e seguradoras. Atestados de capacidade técnica e CAT
              disponíveis mediante solicitação.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── INSTITUCIONAL ── */}
      <section className="pf-section pf-surface">
        <div className="pf-container">
          <SectionHead eyebrow="Institucional" title="Missão, gestão e diferenciais" />
          <div className="pf-grid-3">
            <AnimatedSection className="pf-card pf-card--pad">
              <p className="pf-micro">Missão</p>
              <p className="pf-body">{MISSION.mission}</p>
            </AnimatedSection>
            <AnimatedSection delay={0.06} className="pf-card pf-card--pad">
              <p className="pf-micro">Sistema de gestão</p>
              <ul className="pf-bullets pf-body">
                {MISSION.management.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.12} className="pf-card pf-card--pad">
              <p className="pf-micro">Valores</p>
              <p className="pf-body">{MISSION.values}</p>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.1}>
            <ul className="pf-diff">
              {MISSION.differentiators.map((d) => (
                <li key={d.title}>
                  <strong>{d.title}</strong>
                  <span>{d.desc}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTATO ── */}
      <section className="pf-section pf-deep">
        <Watermark />
        <div className="pf-container pf-grid-2 pf-grid-2--contact">
          <AnimatedSection>
            <Eyebrow>Contato</Eyebrow>
            <h2 className="display-heading pf-h2">Envie o escopo do seu empreendimento</h2>
            <p className="pf-lead">
              Com a descrição da demanda, a área, a localização e o órgão de aprovação, a Omega define a equipe e
              apresenta a proposta técnica.
            </p>
            <div className="pf-actions">
              <Link href="/contato" className="pf-btn pf-btn--primary">
                Solicitar orçamento <ArrowRight size={16} aria-hidden />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pf-btn pf-btn--ghost"
              >
                WhatsApp
              </a>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <dl className="pf-sheet pf-sheet--contact">
              <div>
                <dt>Endereço</dt>
                <dd>
                  {SITE.address.street.replace("Edifício", "Ed.")} — {SITE.address.neighborhood},{" "}
                  {SITE.address.city}/{SITE.address.state} — CEP {SITE.address.cep}
                </dd>
              </div>
              <div>
                <dt>Telefones</dt>
                <dd>
                  <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a> ·{" "}
                  <a href={`tel:${SITE.phoneAltTel}`}>{SITE.phoneAlt}</a>
                </dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  <br />
                  <a href={`mailto:${SITE.emailAlt}`}>{SITE.emailAlt}</a>
                </dd>
              </div>
              <div>
                <dt>Apoio</dt>
                <dd>{SITE.supportOffices.join(" · ")}</dd>
              </div>
            </dl>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
