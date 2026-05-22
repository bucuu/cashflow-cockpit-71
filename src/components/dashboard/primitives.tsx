import { cn } from "@/lib/utils";
import type { Source } from "@/lib/mock-data";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("surface-card p-5 md:p-6", className)}>{children}</div>;
}

export function SectionTitle({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-[17px] md:text-[19px] font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-[12px] text-muted-finance mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

const sourceColors: Record<Source, string> = {
  "Banka Verisi": "#0F6E78",
  ERP: "#4F8A6E",
  Manuel: "#64748B",
  Tahmin: "#6D28D9",
  Periyodik: "#D97706",
};

export function SourceBadge({ source }: { source: Source }) {
  const c = sourceColors[source];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ color: c, backgroundColor: `${c}14`, border: `1px solid ${c}33` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
      {source}
    </span>
  );
}

export function RiskBadge({ risk }: { risk: "Düşük" | "Orta" | "Yüksek" | "Kritik" }) {
  const map = {
    "Düşük": "#16A34A",
    "Orta": "#D97706",
    "Yüksek": "#DC2626",
    "Kritik": "#B91C1C",
  } as const;
  const c = map[risk];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ color: c, backgroundColor: `${c}14`, border: `1px solid ${c}40` }}
    >
      {risk}
    </span>
  );
}

export function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "teal" | "warning" | "danger" | "forecast" | "success" | "critical" }) {
  const tones = {
    neutral: { c: "#475569", bg: "#F1F5F9" },
    teal: { c: "#0F6E78", bg: "rgba(15,110,120,0.10)" },
    warning: { c: "#D97706", bg: "rgba(217,119,6,0.10)" },
    danger: { c: "#DC2626", bg: "rgba(220,38,38,0.10)" },
    forecast: { c: "#6D28D9", bg: "rgba(109,40,217,0.10)" },
    success: { c: "#16A34A", bg: "rgba(22,163,74,0.10)" },
    critical: { c: "#B91C1C", bg: "rgba(185,28,28,0.10)" },
  } as const;
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
      style={{ color: t.c, backgroundColor: t.bg, border: `1px solid ${t.c}33` }}
    >
      {children}
    </span>
  );
}
