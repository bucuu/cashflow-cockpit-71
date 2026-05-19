import { ArrowUpRight, ArrowDownRight, Wallet, TrendingDown, Target, AlertTriangle, CalendarClock } from "lucide-react";
import { Card } from "./primitives";

type Kpi = {
  label: string;
  value: string;
  subtext: string;
  trend?: { dir: "up" | "down"; text: string };
  status: string;
  statusTone: "success" | "danger" | "warning" | "forecast" | "critical";
  accent: string;
  icon: React.ReactNode;
  meta?: string;
};

const toneStyle: Record<Kpi["statusTone"], { c: string; bg: string }> = {
  success: { c: "#22C55E", bg: "rgba(34,197,94,0.12)" },
  danger: { c: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  warning: { c: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  forecast: { c: "#A78BFA", bg: "rgba(167,139,250,0.14)" },
  critical: { c: "#DC2626", bg: "rgba(220,38,38,0.16)" },
};

const kpis: Kpi[] = [
  {
    label: "Available Cash",
    value: "₺42.8M",
    subtext: "Across 6 bank accounts",
    trend: { dir: "up", text: "+₺3.2M vs last 7 days" },
    status: "Healthy",
    statusTone: "success",
    accent: "#35858E",
    icon: <Wallet className="w-4 h-4" />,
  },
  {
    label: "30-Day Net Cash Impact",
    value: "-₺5.7M",
    subtext: "Expected inflow minus outflow",
    status: "Outflow pressure ahead",
    statusTone: "danger",
    accent: "#EF4444",
    icon: <TrendingDown className="w-4 h-4" />,
    meta: "Inflow ₺68.4M · Outflow ₺74.1M",
  },
  {
    label: "Forecasted Closing Balance",
    value: "₺37.1M",
    subtext: "After planned obligations",
    status: "Above ₺30M safe threshold",
    statusTone: "forecast",
    accent: "#A78BFA",
    icon: <Target className="w-4 h-4" />,
  },
  {
    label: "Largest Upcoming Payment",
    value: "₺12.0M",
    subtext: "Salary Payment",
    status: "High impact",
    statusTone: "warning",
    accent: "#F59E0B",
    icon: <CalendarClock className="w-4 h-4" />,
    meta: "Due Jun 15",
  },
  {
    label: "Risky Days",
    value: "4 Days",
    subtext: "Near or below safe threshold",
    status: "Attention needed",
    statusTone: "critical",
    accent: "#DC2626",
    icon: <AlertTriangle className="w-4 h-4" />,
    meta: "Most critical: Jun 22",
  },
];

export function KpiRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((k) => {
        const tone = toneStyle[k.statusTone];
        return (
          <Card key={k.label} className="relative overflow-hidden group transition-all hover:-translate-y-0.5 hover:border-[rgba(230,238,201,0.22)]">
            <div
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: `linear-gradient(90deg, ${k.accent}, transparent)` }}
            />
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-[0.08] blur-2xl" style={{ background: k.accent }} />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.accent}1f`, color: k.accent }}>
                  {k.icon}
                </div>
                <span className="text-[12px] font-medium text-muted-finance tracking-wide uppercase">{k.label}</span>
              </div>
              {k.trend && (
                <span className={`inline-flex items-center text-[11px] font-medium ${k.trend.dir === "up" ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                  {k.trend.dir === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="text-[30px] md:text-[34px] font-bold tracking-tight leading-none" style={{ color: k.accent === "#35858E" ? "#E6EEC9" : k.accent }}>
                {k.value}
              </div>
              <p className="text-[12px] text-muted-finance mt-2">{k.subtext}</p>
              {k.trend && <p className="text-[11px] mt-1 text-[#7DA78C]">{k.trend.text}</p>}
              {k.meta && <p className="text-[11px] mt-1 text-muted-finance/80">{k.meta}</p>}
            </div>
            <div className="mt-4 pt-3 border-t hairline flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ color: tone.c, backgroundColor: tone.bg }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tone.c }} />
                {k.status}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
