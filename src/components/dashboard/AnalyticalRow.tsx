import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Cell } from "recharts";
import { bankMovements, checkCalendar, waterfall, fmtTRY } from "@/lib/mock-data";
import { Card, SectionTitle, SourceBadge, Chip } from "./primitives";

function MiniStat({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "success" | "danger" | "neutral" | "warning" | "forecast" }) {
  const colors: Record<string, string> = { success: "#16A34A", danger: "#DC2626", neutral: "#0F172A", warning: "#D97706", forecast: "#6D28D9" };
  return (
    <div className="flex flex-col">
      <span className="text-[10.5px] uppercase tracking-wider text-muted-finance font-medium">{label}</span>
      <span className="text-[15px] font-semibold mt-0.5" style={{ color: colors[tone] }}>{value}</span>
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-[11px] shadow-lg">
      <div className="font-semibold text-foreground mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-3">
          <span className="text-muted-finance">{p.name}</span>
          <span style={{ color: p.color }}>{fmtTRY(p.value)}M</span>
        </div>
      ))}
    </div>
  );
}

export function BankMovementsCard() {
  return (
    <Card>
      <SectionTitle
        title="Banka Hareketleri"
        subtitle="Son 30 gün · günlük giren ve çıkan"
        right={<SourceBadge source="Banka Verisi" />}
      />
      <div className="grid grid-cols-3 gap-2 mb-4">
        <MiniStat label="Toplam Giriş" value="₺58,2M" tone="success" />
        <MiniStat label="Toplam Çıkış" value="-₺61,7M" tone="danger" />
        <MiniStat label="Net Hareket" value="-₺3,5M" tone="warning" />
      </div>
      <div className="h-[180px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bankMovements} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} stackOffset="sign">
            <XAxis dataKey="day" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
            <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(15,110,120,0.05)" }} />
            <ReferenceLine y={0} stroke="#CBD5E1" />
            <Bar dataKey="inflow" name="Giriş" fill="#16A34A" radius={[2, 2, 0, 0]} maxBarSize={10} stackId="stack" />
            <Bar dataKey="outflow" name="Çıkış" fill="#DC2626" radius={[0, 0, 2, 2]} maxBarSize={10} stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 pt-3 border-t border-[#E2E8F0] space-y-1 text-[11.5px] text-muted-finance">
        <div>• En yüksek giriş: <span className="text-foreground font-medium">08 Haz — ₺9,4M</span></div>
        <div>• En yüksek çıkış: <span className="text-foreground font-medium">15 Haz — ₺12,1M</span></div>
      </div>
    </Card>
  );
}

function colorForAmount(amount: number): string {
  if (amount === 0) return "#F8FAFC";
  if (amount < 2) return "#16A34A";
  if (amount < 5) return "#D97706";
  if (amount < 10) return "#DC2626";
  return "#B91C1C";
}

export function CheckCalendarCard() {
  return (
    <Card>
      <SectionTitle
        title="Çek Vade Takvimi"
        subtitle="Önümüzdeki 30 gün · günlük çek ödeme baskısı"
        right={<SourceBadge source="ERP" />}
      />
      <div className="grid grid-cols-3 gap-2 mb-4">
        <MiniStat label="Toplam Vade" value="₺34,8M" />
        <MiniStat label="Vadesi Geçmiş" value="₺2,1M" tone="danger" />
        <MiniStat label="Tepe Gün" value="22 Haz" tone="warning" />
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {checkCalendar.map((d) => {
          const c = colorForAmount(d.amount);
          const hasAmount = d.amount > 0;
          return (
            <div
              key={d.day}
              className="aspect-square rounded-md flex flex-col items-center justify-center text-[10px] transition-transform hover:scale-110 cursor-pointer"
              style={{
                backgroundColor: hasAmount ? `${c}1f` : "#F8FAFC",
                border: `1px solid ${hasAmount ? `${c}55` : "#E2E8F0"}`,
              }}
              title={hasAmount ? `${d.day} Haz: ₺${d.amount.toFixed(1)}M` : `${d.day} Haz: yok`}
            >
              <span className="text-muted-finance text-[9px] leading-none">{d.day}</span>
              {hasAmount && (
                <span className="font-semibold leading-none mt-0.5" style={{ color: c }}>
                  {d.amount >= 10 ? `${d.amount.toFixed(0)}M` : `${d.amount.toFixed(1)}`}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex flex-wrap gap-1.5 items-center text-[10px]">
        <span className="text-muted-finance mr-1">Yoğunluk:</span>
        <Chip tone="success">Düşük</Chip>
        <Chip tone="warning">Orta</Chip>
        <Chip tone="danger">Yüksek</Chip>
        <Chip tone="critical">Kritik</Chip>
      </div>
    </Card>
  );
}

type WF = typeof waterfall[number] & { base: number; bar: number; cumulative: number };

function buildWaterfall(): WF[] {
  let cum = 0;
  return waterfall.map((d) => {
    if (d.type === "start") {
      cum = d.value;
      return { ...d, base: 0, bar: d.value, cumulative: cum };
    }
    if (d.type === "end") {
      return { ...d, base: 0, bar: d.value, cumulative: d.value };
    }
    if (d.value >= 0) {
      const base = cum;
      cum += d.value;
      return { ...d, base, bar: d.value, cumulative: cum };
    } else {
      cum += d.value;
      const base = cum;
      return { ...d, base, bar: -d.value, cumulative: cum };
    }
  });
}

function colorForType(t: "start" | "pos" | "neg" | "end") {
  switch (t) {
    case "start": return "#0F6E78";
    case "pos": return "#16A34A";
    case "neg": return "#DC2626";
    case "end": return "#6D28D9";
  }
}

function WaterfallTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as WF;
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-[11px] shadow-lg">
      <div className="font-semibold text-foreground">{d.name}</div>
      <div className="text-muted-finance mt-0.5">Tutar: <span style={{ color: colorForType(d.type) }}>{fmtTRY(d.value)}M</span></div>
      <div className="text-muted-finance">Kümülatif: <span className="text-foreground">{fmtTRY(d.cumulative)}M</span></div>
    </div>
  );
}

export function WaterfallCard() {
  const data = buildWaterfall();
  return (
    <Card>
      <SectionTitle
        title="Tahmini Gelir & Gider"
        subtitle="Açılış nakdi → tahmini kapanış nakdi"
        right={
          <div className="flex gap-1">
            <SourceBadge source="ERP" />
            <SourceBadge source="Tahmin" />
          </div>
        }
      />
      <div className="grid grid-cols-3 gap-2 mb-3">
        <MiniStat label="Açılış" value="₺42,8M" />
        <MiniStat label="Net Değişim" value="-₺5,7M" tone="danger" />
        <MiniStat label="Kapanış" value="₺37,1M" tone="forecast" />
      </div>
      <div className="h-[220px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 38 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748B", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              angle={-25}
              textAnchor="end"
              height={50}
              interval={0}
            />
            <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
            <Tooltip content={<WaterfallTooltip />} cursor={{ fill: "rgba(15,110,120,0.05)" }} />
            <Bar dataKey="base" stackId="wf" fill="transparent" />
            <Bar dataKey="bar" stackId="wf" radius={[3, 3, 3, 3]} maxBarSize={32}>
              {data.map((d, i) => (
                <Cell key={i} fill={colorForType(d.type)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
