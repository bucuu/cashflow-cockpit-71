import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine, Cell } from "recharts";
import { bankMovements, checkCalendar, waterfall, fmtTRY } from "@/lib/mock-data";
import { Card, SectionTitle, SourceBadge, Chip } from "./primitives";

function MiniStat({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "success" | "danger" | "neutral" | "warning" | "forecast" }) {
  const colors: Record<string, string> = { success: "#22C55E", danger: "#EF4444", neutral: "#E6EEC9", warning: "#F59E0B", forecast: "#A78BFA" };
  return (
    <div className="flex flex-col">
      <span className="text-[10.5px] uppercase tracking-wider text-muted-finance">{label}</span>
      <span className="text-[15px] font-semibold mt-0.5" style={{ color: colors[tone] }}>{value}</span>
    </div>
  );
}

// 1) Bank movements diverging chart
function BankTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg px-2.5 py-1.5 text-[11px] border hairline" style={{ backgroundColor: "rgba(11,22,40,0.95)" }}>
      <div className="font-semibold text-foreground mb-1">{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex justify-between gap-3">
          <span className="text-muted-finance capitalize">{p.dataKey}</span>
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
        title="Bank Movements"
        subtitle="Last 30 days · daily incoming vs outgoing"
        right={<SourceBadge source="Bank Data" />}
      />
      <div className="grid grid-cols-3 gap-2 mb-4">
        <MiniStat label="Total Inflow" value="₺58.2M" tone="success" />
        <MiniStat label="Total Outflow" value="-₺61.7M" tone="danger" />
        <MiniStat label="Net Movement" value="-₺3.5M" tone="warning" />
      </div>
      <div className="h-[180px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bankMovements} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} stackOffset="sign">
            <XAxis dataKey="day" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
            <Tooltip content={<BankTooltip />} cursor={{ fill: "rgba(53,133,142,0.06)" }} />
            <ReferenceLine y={0} stroke="rgba(230,238,201,0.25)" />
            <Bar dataKey="inflow" fill="#22C55E" radius={[2, 2, 0, 0]} maxBarSize={10} stackId="stack" />
            <Bar dataKey="outflow" fill="#EF4444" radius={[0, 0, 2, 2]} maxBarSize={10} stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 pt-3 border-t hairline space-y-1 text-[11.5px] text-muted-finance">
        <div>• Highest inflow day: <span className="text-foreground">Jun 08 — ₺9.4M</span></div>
        <div>• Highest outflow day: <span className="text-foreground">Jun 15 — ₺12.1M</span></div>
      </div>
    </Card>
  );
}

// 2) Check Maturity Heatmap
function colorForAmount(amount: number): string {
  if (amount === 0) return "rgba(230,238,201,0.04)";
  if (amount < 2) return "#C2D099";
  if (amount < 5) return "#F59E0B";
  if (amount < 10) return "#EF4444";
  return "#DC2626";
}

export function CheckCalendarCard() {
  return (
    <Card>
      <SectionTitle
        title="Check Maturity Calendar"
        subtitle="Next 30 days · daily check payment pressure"
        right={<SourceBadge source="ERP" />}
      />
      <div className="grid grid-cols-3 gap-2 mb-4">
        <MiniStat label="Total Due" value="₺34.8M" />
        <MiniStat label="Overdue" value="₺2.1M" tone="danger" />
        <MiniStat label="Peak Day" value="Jun 22" tone="warning" />
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {checkCalendar.map((d) => {
          const c = colorForAmount(d.amount);
          const intense = d.amount >= 5;
          return (
            <div
              key={d.day}
              className="aspect-square rounded-md flex flex-col items-center justify-center text-[10px] transition-transform hover:scale-110 cursor-pointer relative group"
              style={{
                backgroundColor: d.amount === 0 ? c : `${c}22`,
                border: `1px solid ${d.amount === 0 ? "rgba(230,238,201,0.06)" : `${c}66`}`,
              }}
              title={d.amount > 0 ? `Jun ${d.day}: ₺${d.amount.toFixed(1)}M` : `Jun ${d.day}: none`}
            >
              <span className="text-muted-finance text-[9px] leading-none">{d.day}</span>
              {d.amount > 0 && (
                <span className="font-semibold leading-none mt-0.5" style={{ color: intense ? c : "#E6EEC9" }}>
                  {d.amount >= 10 ? `${d.amount.toFixed(0)}M` : `${d.amount.toFixed(1)}`}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t hairline flex flex-wrap gap-1.5 items-center text-[10px]">
        <span className="text-muted-finance mr-1">Intensity:</span>
        <Chip tone="success">Low</Chip>
        <Chip tone="warning">Medium</Chip>
        <Chip tone="danger">High</Chip>
        <Chip tone="critical">Critical</Chip>
      </div>
    </Card>
  );
}

// 3) Waterfall chart
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
      cum += d.value; // d.value negative
      const base = cum;
      return { ...d, base, bar: -d.value, cumulative: cum };
    }
  });
}

function colorForType(t: "start" | "pos" | "neg" | "end") {
  switch (t) {
    case "start": return "#35858E";
    case "pos": return "#22C55E";
    case "neg": return "#EF4444";
    case "end": return "#A78BFA";
  }
}

function WaterfallTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as WF;
  return (
    <div className="rounded-lg px-3 py-2 text-[11px] border hairline" style={{ backgroundColor: "rgba(11,22,40,0.95)" }}>
      <div className="font-semibold text-foreground">{d.name}</div>
      <div className="text-muted-finance mt-0.5">Amount: <span style={{ color: colorForType(d.type) }}>{fmtTRY(d.value)}M</span></div>
      <div className="text-muted-finance">Cumulative: <span className="text-foreground">{fmtTRY(d.cumulative)}M</span></div>
    </div>
  );
}

export function WaterfallCard() {
  const data = buildWaterfall();
  return (
    <Card>
      <SectionTitle
        title="Forecasted Income vs Expenses"
        subtitle="Opening cash → forecasted closing cash"
        right={
          <div className="flex gap-1">
            <SourceBadge source="ERP" />
            <SourceBadge source="Forecast" />
          </div>
        }
      />
      <div className="grid grid-cols-3 gap-2 mb-3">
        <MiniStat label="Opening" value="₺42.8M" />
        <MiniStat label="Net Change" value="-₺5.7M" tone="danger" />
        <MiniStat label="Closing" value="₺37.1M" tone="forecast" />
      </div>
      <div className="h-[220px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 38 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#94A3B8", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              angle={-25}
              textAnchor="end"
              height={50}
              interval={0}
            />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
            <Tooltip content={<WaterfallTooltip />} cursor={{ fill: "rgba(53,133,142,0.06)" }} />
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
