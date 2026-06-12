import { ImageResponse } from "next/og";

export const alt = "Omega CSA Engenharia — Campos dos Goytacazes, RJ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#080e1a",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(26,127,193,0.18), transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.3em",
            color: "#3d9fd8",
            textTransform: "uppercase",
          }}
        >
          Engenharia multidisciplinar
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#e8edf5",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Omega CSA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#5a9e2f",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Engenharia
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: "#6b7d96",
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Projetos, fiscalização, laudos e consultoria para obras públicas,
            privadas, industriais e ambientais.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1a2d4a",
            paddingTop: 32,
            fontSize: 24,
            color: "#6b7d96",
          }}
        >
          <div style={{ display: "flex" }}>Campos dos Goytacazes — RJ</div>
          <div style={{ display: "flex", color: "#3d9fd8" }}>omegacsa.com.br</div>
        </div>
      </div>
    ),
    size,
  );
}
