import { useState } from "react";
import { Bar, ComposedChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine, CartesianGrid, Legend } from "recharts";
import { cashFlowSeries, fmtTRY } from "@/lib/mock-data";
import { Card, Chip, SectionTitle } from "./primitives";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border hairline px-3 py-2.5 text-[12px]" style={{ backgroundColor: "rgba(11,22,40,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
      <div className="font-semibold mb-1.5 text-foreground">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-muted-finance capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-foreground">{fmtTRY(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function HeroCashFlowChart() {
  const [mode, setMode] = useState<"actual" | "forecast">("actual");
  const [period, setPeriod] = useState<"daily" | "weekly">("daily");

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-[0.12]" style={{ background: "radial-gradient(circle, #35858E, transparent 70%)" }} />
      <SectionTitle
        title="30-Day Cash Flow Projection"
        subtitle="Daily inflow, outflow, end-of-day balance and forecast against the ₺30M safe threshold"
        right={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-full hairline border" style={{ backgroundColor: "rgba(230,238,201,0.03)" }}>
              {["daily", "weekly"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p as any)}
                  className={`px-2.5 py-1 rounded-full text-[11px] capitalize ${period === p ? "text-foreground" : "text-muted-finance"}`}
                  style={period === p ? { backgroundColor: "rgba(53,133,142,0.20)" } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1 p-1 rounded-full hairline border" style={{ backgroundColor: "rgba(230,238,201,0.03)" }}>
              {["actual", "forecast"].map((p) => (
                <button
                  key={p}
                  onClick={() => setMode(p as any)}
                  className={`px-2.5 py-1 rounded-full text-[11px] capitalize ${mode === p ? "text-foreground" : "text-muted-finance"}`}
                  style={mode === p ? { backgroundColor: "rgba(167,139,250,0.18)", color: "#A78BFA" } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="flex flex-wrap gap-2 mb-5">
        <Chip tone="success">Total inflow ₺68.4M</Chip>
        <Chip tone="danger">Total outflow ₺74.1M</Chip>
        <Chip tone="warning">Net impact -₺5.7M</Chip>
        <Chip tone="critical">Lowest ₺28.4M on Jun 22</Chip>
        <Chip tone="teal">Safe threshold ₺30M</Chip>
      </div>

      <div className="h-[360px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={cashFlowSeries} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0.55} />
              </linearGradient>
              <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.95} />
                <stop offset="100%" stopColor="#EF4444" stopOpacity={0.55} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(230,238,201,0.06)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} interval={2} />
            <YAxis yAxisId="left" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₺${v}M`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: "#94A3B8", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₺${v}M`} domain={[20, 55]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(53,133,142,0.07)" }} />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
              iconType="circle"
              formatter={(v) => <span style={{ color: "#94A3B8" }}>{v}</span>}
            />
            <Bar yAxisId="left" dataKey="inflow" name="Inflow" fill="url(#inflowGrad)" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar yAxisId="left" dataKey="outflow" name="Outflow" fill="url(#outflowGrad)" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <ReferenceLine yAxisId="right" y={30} stroke="#F59E0B" strokeDasharray="6 4" label={{ value: "Safe ₺30M", fill: "#F59E0B", fontSize: 10, position: "insideTopRight" }} />
            <Line yAxisId="right" type="monotone" dataKey="balance" name="End-of-day balance" stroke="#35858E" strokeWidth={2.5} dot={false} activeDot={{ r: 4, fill: "#35858E" }} />
            <Line yAxisId="right" type="monotone" dataKey="forecast" name="Forecast" stroke="#A78BFA" strokeWidth={2} strokeDasharray="3 3" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
