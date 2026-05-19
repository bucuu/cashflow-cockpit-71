import { cn } from "@/lib/utils";
import type { Source } from "@/lib/mock-data";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("surface-card p-5 md:p-6", className)}>{children}</div>;
}

export function SectionTitle({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-[18px] md:text-[20px] font-semibold tracking-tight text-foreground">{title}</h2>
        {subtitle && <p className="text-[12px] text-muted-finance mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

const sourceColors: Record<Source, string> = {
  "Bank Data": "#35858E",
  ERP: "#7DA78C",
  Manual: "#C2D099",
  Forecast: "#A78BFA",
  Recurring: "#F59E0B",
};

export function SourceBadge({ source }: { source: Source }) {
  const c = sourceColors[source];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ color: c, backgroundColor: `${c}1f`, border: `1px solid ${c}33` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c }} />
      {source}
    </span>
  );
}

export function RiskBadge({ risk }: { risk: "Low" | "Medium" | "High" | "Critical" }) {
  const map = {
    Low: "#7DA78C",
    Medium: "#F59E0B",
    High: "#EF4444",
    Critical: "#DC2626",
  } as const;
  const c = map[risk];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide"
      style={{ color: c, backgroundColor: `${c}1a`, border: `1px solid ${c}40` }}
    >
      {risk}
    </span>
  );
}

export function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "teal" | "warning" | "danger" | "forecast" | "success" | "critical" }) {
  const tones = {
    neutral: { c: "#E6EEC9", bg: "rgba(230,238,201,0.06)" },
    teal: { c: "#35858E", bg: "rgba(53,133,142,0.14)" },
    warning: { c: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
    danger: { c: "#EF4444", bg: "rgba(239,68,68,0.12)" },
    forecast: { c: "#A78BFA", bg: "rgba(167,139,250,0.14)" },
    success: { c: "#22C55E", bg: "rgba(34,197,94,0.12)" },
    critical: { c: "#DC2626", bg: "rgba(220,38,38,0.16)" },
  } as const;
  const t = tones[tone];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium hairline"
      style={{ color: t.c, backgroundColor: t.bg, border: `1px solid ${t.c}33` }}
    >
      {children}
    </span>
  );
}
