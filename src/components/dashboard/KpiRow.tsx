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
  success: { c: "#16A34A", bg: "rgba(22,163,74,0.10)" },
  danger: { c: "#DC2626", bg: "rgba(220,38,38,0.10)" },
  warning: { c: "#D97706", bg: "rgba(217,119,6,0.10)" },
  forecast: { c: "#6D28D9", bg: "rgba(109,40,217,0.10)" },
  critical: { c: "#B91C1C", bg: "rgba(185,28,28,0.10)" },
};

const kpis: Kpi[] = [
  {
    label: "Kullanılabilir Nakit",
    value: "₺42,8M",
    subtext: "6 banka hesabında toplam",
    trend: { dir: "up", text: "Son 7 güne göre +₺3,2M" },
    status: "Sağlıklı",
    statusTone: "success",
    accent: "#0F6E78",
    icon: <Wallet className="w-4 h-4" />,
  },
  {
    label: "30 Günlük Net Nakit Etkisi",
    value: "-₺5,7M",
    subtext: "Beklenen giriş eksi çıkış",
    status: "Çıkış baskısı var",
    statusTone: "danger",
    accent: "#DC2626",
    icon: <TrendingDown className="w-4 h-4" />,
    meta: "Giriş ₺68,4M · Çıkış ₺74,1M",
  },
  {
    label: "Tahmini Kapanış Bakiyesi",
    value: "₺37,1M",
    subtext: "Planlanan yükümlülükler sonrası",
    status: "₺30M güvenli eşiğin üzerinde",
    statusTone: "forecast",
    accent: "#6D28D9",
    icon: <Target className="w-4 h-4" />,
  },
  {
    label: "En Büyük Ödeme",
    value: "₺12,0M",
    subtext: "Maaş Ödemesi",
    status: "Yüksek etki",
    statusTone: "warning",
    accent: "#D97706",
    icon: <CalendarClock className="w-4 h-4" />,
    meta: "Vade: 15 Haz",
  },
  {
    label: "Riskli Günler",
    value: "4 Gün",
    subtext: "Güvenli eşiğe yakın veya altında",
    status: "Dikkat gerekiyor",
    statusTone: "critical",
    accent: "#B91C1C",
    icon: <AlertTriangle className="w-4 h-4" />,
    meta: "En kritik: 22 Haz",
  },
];

export function KpiRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((k) => {
        const tone = toneStyle[k.statusTone];
        return (
          <Card key={k.label} className="relative overflow-hidden group transition-all hover:-translate-y-0.5 hover:shadow-md">
            <div
              className="absolute inset-x-0 top-0 h-[3px]"
              style={{ background: k.accent }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${k.accent}14`, color: k.accent }}>
                  {k.icon}
                </div>
                <span className="text-[11px] font-semibold text-muted-finance tracking-wider uppercase">{k.label}</span>
              </div>
              {k.trend && (
                <span className={`inline-flex items-center text-[11px] font-medium ${k.trend.dir === "up" ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
                  {k.trend.dir === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                </span>
              )}
            </div>
            <div className="mt-4">
              <div className="text-[28px] md:text-[32px] font-bold tracking-tight leading-none text-foreground">
                {k.value}
              </div>
              <p className="text-[12px] text-muted-finance mt-2">{k.subtext}</p>
              {k.trend && <p className="text-[11px] mt-1 text-[#16A34A] font-medium">{k.trend.text}</p>}
              {k.meta && <p className="text-[11px] mt-1 text-muted-finance">{k.meta}</p>}
            </div>
            <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
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
