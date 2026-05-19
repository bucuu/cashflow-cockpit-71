import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Building2, Calendar, CreditCard, Repeat } from "lucide-react";
import { loans, notesAging, recurring, bankAccounts, fmtTRY } from "@/lib/mock-data";
import { Card, SectionTitle, SourceBadge } from "./primitives";

function ModuleHeader({ title, icon, sources, onView }: { title: string; icon: React.ReactNode; sources: React.ReactNode; onView?: () => void }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center brand-tint text-[#35858E]">{icon}</div>
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
          <div className="flex gap-1 mt-1">{sources}</div>
        </div>
      </div>
      <button
        onClick={onView}
        className="text-[11px] text-[#7DA78C] hover:text-[#C2D099] inline-flex items-center gap-1 group"
      >
        View Details <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

// ---- Loans
export function LoansCard() {
  return (
    <Card>
      <ModuleHeader
        title="Loans"
        icon={<CreditCard className="w-4 h-4" />}
        sources={<><SourceBadge source="Bank Data" /></>}
      />
      <div className="space-y-3">
        {loans.map((l) => {
          const total = l.principal + l.interest;
          const pPct = (l.principal / total) * 100;
          return (
            <div key={l.bank}>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-foreground/90 font-medium">{l.bank}</span>
                <span className="text-muted-finance">{fmtTRY(total)}M</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden hairline border" style={{ backgroundColor: "rgba(230,238,201,0.04)" }}>
                <div style={{ width: `${pPct}%`, backgroundColor: "#35858E" }} />
                <div style={{ width: `${100 - pPct}%`, backgroundColor: "#C2D099" }} />
              </div>
              <div className="flex gap-3 mt-1 text-[10.5px] text-muted-finance">
                <span><span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#35858E" }} />Principal {fmtTRY(l.principal)}M</span>
                <span><span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#C2D099" }} />Interest {fmtTRY(l.interest)}M</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t hairline grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase">30-day Total</div><div className="font-semibold text-foreground">₺10.95M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Principal</div><div className="font-semibold text-[#35858E]">₺9.8M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Interest</div><div className="font-semibold text-[#C2D099]">₺1.15M</div></div>
      </div>
      <div className="text-[11px] text-muted-finance mt-2">Next payment: <span className="text-foreground">Jun 12 — ₺2.72M</span></div>
    </Card>
  );
}

// ---- Promissory Notes
export function NotesCard() {
  const data = notesAging.map((n) => ({
    ...n,
    color: n.kind === "overdue" ? "#EF4444" : n.kind === "low" ? "#7DA78C" : "#F59E0B",
  }));
  return (
    <Card>
      <ModuleHeader
        title="Promissory Notes"
        icon={<Calendar className="w-4 h-4" />}
        sources={<><SourceBadge source="ERP" /><SourceBadge source="Manual" /></>}
      />
      <div className="h-[170px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="bucket" tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#94A3B8", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
            <Tooltip
              cursor={{ fill: "rgba(53,133,142,0.06)" }}
              contentStyle={{ backgroundColor: "rgba(11,22,40,0.95)", border: "1px solid rgba(230,238,201,0.14)", borderRadius: 8, fontSize: 11 }}
              formatter={(v: any) => [`₺${v}M`, "Amount"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={42}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 pt-3 border-t hairline grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase">Total Due</div><div className="font-semibold text-foreground">₺8.1M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Overdue</div><div className="font-semibold text-[#EF4444]">₺950K</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Peak</div><div className="font-semibold text-[#F59E0B]">16–30D</div></div>
      </div>
    </Card>
  );
}

// ---- Recurring Payments
export function RecurringCard() {
  return (
    <Card>
      <ModuleHeader
        title="Recurring Payments"
        icon={<Repeat className="w-4 h-4" />}
        sources={<><SourceBadge source="Manual" /><SourceBadge source="Recurring" /></>}
      />
      <div className="relative pt-4 pb-2">
        <div className="absolute left-0 right-0 top-9 h-px hairline border-t" />
        <div className="flex justify-between text-[10px] text-muted-finance px-1">
          {[1, 8, 15, 23, 30].map((d) => <span key={d}>{d}</span>)}
        </div>
        <div className="relative h-24 mt-2">
          {recurring.map((r) => {
            const left = ((r.day - 1) / 29) * 100;
            const h = Math.min(100, (r.amount / 12) * 100);
            return (
              <div
                key={r.name}
                className="absolute bottom-0 group"
                style={{ left: `${left}%`, transform: "translateX(-50%)" }}
              >
                <div className="absolute bottom-full mb-1 -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap text-[10px] rounded px-1.5 py-0.5 border hairline" style={{ backgroundColor: "rgba(11,22,40,0.95)" }}>
                  <span className="text-foreground font-semibold">{r.name}</span> · <span className="text-muted-finance">Jun {r.day}</span> · <span style={{ color: r.color }}>{fmtTRY(r.amount)}M</span>
                </div>
                <div
                  className="w-2.5 rounded-t hover:opacity-100 opacity-90 transition-all"
                  style={{ height: `${h}%`, minHeight: 8, backgroundColor: r.color, boxShadow: `0 0 12px ${r.color}55` }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px]">
          {recurring.map((r) => (
            <span key={r.name} className="text-muted-finance inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: r.color }} />
              {r.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 pt-3 border-t hairline grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase">Monthly Total</div><div className="font-semibold text-foreground">₺20.47M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Largest</div><div className="font-semibold text-[#F59E0B]">Salaries</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Next</div><div className="font-semibold text-foreground">Rent · Jun 5</div></div>
      </div>
    </Card>
  );
}

// ---- Bank Account Balances
export function BankBalancesCard() {
  const max = Math.max(...bankAccounts.map((a) => a.balance));
  return (
    <Card>
      <ModuleHeader
        title="Bank Account Balances"
        icon={<Building2 className="w-4 h-4" />}
        sources={<SourceBadge source="Bank Data" />}
      />
      <div className="space-y-3.5">
        {bankAccounts.map((a, i) => {
          const pct = (a.balance / max) * 100;
          const low = a.balance < 3;
          const color = low ? "#F59E0B" : i === 0 ? "#35858E" : "#7DA78C";
          return (
            <div key={a.bank}>
              <div className="flex justify-between items-center text-[12px] mb-1">
                <span className="text-foreground/90 font-medium">{a.bank}</span>
                <span className="font-semibold" style={{ color }}>{fmtTRY(a.balance)}M</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(230,238,201,0.05)" }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)`, boxShadow: `0 0 8px ${color}66` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t hairline grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase">Total</div><div className="font-semibold text-foreground">₺42.8M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Top Bank</div><div className="font-semibold text-[#35858E]">Garanti</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase">Accounts</div><div className="font-semibold text-foreground">6</div></div>
      </div>
    </Card>
  );
}
