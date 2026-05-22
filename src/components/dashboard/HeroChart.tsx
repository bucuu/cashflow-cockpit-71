import { useState } from "react";
import { Bar, ComposedChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, CartesianGrid, Legend } from "recharts";
import { cashFlowSeries, fmtTRY } from "@/lib/mock-data";
import { Card, Chip, SectionTitle } from "./primitives";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-[12px] shadow-lg">
      <div className="font-semibold mb-1.5 text-foreground">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-finance">{p.name}:</span>
          <span className="font-semibold text-foreground">{fmtTRY(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function HeroCashFlowChart() {
  const [mode, setMode] = useState<"actual" | "forecast">("actual");
  const [period, setPeriod] = useState<"daily" | "weekly">("daily");

  const periodLabels: Record<string, string> = { daily: "Günlük", weekly: "Haftalık" };
  const modeLabels: Record<string, string> = { actual: "Gerçekleşen", forecast: "Tahmin" };

  return (
    <Card className="relative overflow-hidden">
      <SectionTitle
        title="30 Günlük Nakit Akışı Projeksiyonu"
        subtitle="Günlük giriş, çıkış, gün sonu bakiye ve ₺30M güvenli eşiğe karşı tahmin"
        right={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-full border border-[#E2E8F0] bg-white">
              {(["daily", "weekly"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium ${period === p ? "bg-[#0F6E78] text-white" : "text-muted-finance"}`}
                >
                  {periodLabels[p]}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 p-1 rounded-full border border-[#E2E8F0] bg-white">
              {(["actual", "forecast"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setMode(p)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium ${mode === p ? "bg-[#6D28D9] text-white" : "text-muted-finance"}`}
                >
                  {modeLabels[p]}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2 mb-5">
        <Chip tone="success">Toplam giriş ₺68,4M</Chip>
        <Chip tone="danger">Toplam çıkış ₺74,1M</Chip>
        <Chip tone="warning">Net etki -₺5,7M</Chip>
        <Chip tone="critical">En düşük ₺28,4M · 22 Haz</Chip>
        <Chip tone="teal">Güvenli eşik ₺30M</Chip>
      </div>

      <div className="h-[360px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={cashFlowSeries} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#EEF2F7" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
            <YAxis yAxisId="left" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₺${v}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₺${v}M`} domain={[20, 55]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(15,110,120,0.06)" }} />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              iconType="circle"
              formatter={(v) => <span style={{ color: "#475569" }}>{v}</span>}
            />
            <Bar yAxisId="left" dataKey="inflow" name="Nakit Girişi" fill="#16A34A" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar yAxisId="left" dataKey="outflow" name="Nakit Çıkışı" fill="#DC2626" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <ReferenceLine yAxisId="right" y={30} stroke="#D97706" strokeDasharray="6 4" label={{ value: "Güvenli ₺30M", fill: "#D97706", fontSize: 10, position: "insideTopRight" }} />
            <Line yAxisId="right" type="monotone" dataKey="balance" name="Gün Sonu Bakiye" stroke="#0F6E78" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#0F6E78" }} />
            <Line yAxisId="right" type="monotone" dataKey="forecast" name="Tahmin" stroke="#6D28D9" strokeWidth={2} strokeDasharray="3 3" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
