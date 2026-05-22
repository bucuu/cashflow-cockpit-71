import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowRight, Building2, Calendar, CreditCard, Repeat } from "lucide-react";
import { loans, notesAging, recurring, bankAccounts, fmtTRY } from "@/lib/mock-data";
import { Card, SourceBadge } from "./primitives";

function ModuleHeader({ title, icon, sources }: { title: string; icon: React.ReactNode; sources: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center brand-tint text-[#0F6E78]">{icon}</div>
        <div>
          <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
          <div className="flex gap-1 mt-1">{sources}</div>
        </div>
      </div>
      <button className="text-[11px] text-[#0F6E78] hover:text-[#0a5057] inline-flex items-center gap-1 group font-medium">
        Detay <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

export function LoansCard() {
  return (
    <Card>
      <ModuleHeader
        title="Krediler"
        icon={<CreditCard className="w-4 h-4" />}
        sources={<SourceBadge source="Banka Verisi" />}
      />
      <div className="space-y-3">
        {loans.map((l) => {
          const total = l.principal + l.interest;
          const pPct = (l.principal / total) * 100;
          return (
            <div key={l.bank}>
              <div className="flex justify-between text-[12px] mb-1">
                <span className="text-foreground font-medium">{l.bank}</span>
                <span className="text-muted-finance">{fmtTRY(total)}M</span>
              </div>
              <div className="flex h-2 rounded-full overflow-hidden bg-[#F1F5F9]">
                <div style={{ width: `${pPct}%`, backgroundColor: "#0F6E78" }} />
                <div style={{ width: `${100 - pPct}%`, backgroundColor: "#8FA85A" }} />
              </div>
              <div className="flex gap-3 mt-1 text-[10.5px] text-muted-finance">
                <span><span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#0F6E78" }} />Anapara {fmtTRY(l.principal)}M</span>
                <span><span className="inline-block w-1.5 h-1.5 rounded-full mr-1" style={{ background: "#8FA85A" }} />Faiz {fmtTRY(l.interest)}M</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">30 Gün Top.</div><div className="font-semibold text-foreground">₺10,95M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Anapara</div><div className="font-semibold text-[#0F6E78]">₺9,8M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Faiz</div><div className="font-semibold text-[#8FA85A]">₺1,15M</div></div>
      </div>
      <div className="text-[11px] text-muted-finance mt-2">Sonraki ödeme: <span className="text-foreground font-medium">12 Haz — ₺2,72M</span></div>
    </Card>
  );
}

export function NotesCard() {
  const data = notesAging.map((n) => ({
    ...n,
    color: n.kind === "overdue" ? "#DC2626" : n.kind === "low" ? "#16A34A" : "#D97706",
  }));
  return (
    <Card>
      <ModuleHeader
        title="Senetler"
        icon={<Calendar className="w-4 h-4" />}
        sources={<><SourceBadge source="ERP" /><SourceBadge source="Manuel" /></>}
      />
      <div className="h-[170px] -ml-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="bucket" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}M`} />
            <Tooltip
              cursor={{ fill: "rgba(15,110,120,0.05)" }}
              contentStyle={{ backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8, fontSize: 11, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
              formatter={(v: any) => [`₺${v}M`, "Tutar"]}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={42}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 pt-3 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Toplam</div><div className="font-semibold text-foreground">₺8,1M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Geçmiş</div><div className="font-semibold text-[#DC2626]">₺950B</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Tepe</div><div className="font-semibold text-[#D97706]">16–30G</div></div>
      </div>
    </Card>
  );
}

export function RecurringCard() {
  return (
    <Card>
      <ModuleHeader
        title="Periyodik Ödemeler"
        icon={<Repeat className="w-4 h-4" />}
        sources={<><SourceBadge source="Manuel" /><SourceBadge source="Periyodik" /></>}
      />
      <div className="relative pt-4 pb-2">
        <div className="absolute left-0 right-0 top-9 h-px border-t border-[#E2E8F0]" />
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
                <div className="absolute bottom-full mb-1 -translate-x-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap text-[10px] rounded px-1.5 py-0.5 border border-[#E2E8F0] bg-white shadow">
                  <span className="text-foreground font-semibold">{r.name}</span> · <span className="text-muted-finance">{r.day} Haz</span> · <span style={{ color: r.color }}>{fmtTRY(r.amount)}M</span>
                </div>
                <div
                  className="w-2.5 rounded-t transition-all"
                  style={{ height: `${h}%`, minHeight: 8, backgroundColor: r.color }}
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
      <div className="mt-3 pt-3 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Aylık Top.</div><div className="font-semibold text-foreground">₺20,47M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">En Büyük</div><div className="font-semibold text-[#D97706]">Maaşlar</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Sonraki</div><div className="font-semibold text-foreground">Kira · 5 Haz</div></div>
      </div>
    </Card>
  );
}

export function BankBalancesCard() {
  const max = Math.max(...bankAccounts.map((a) => a.balance));
  return (
    <Card>
      <ModuleHeader
        title="Banka Hesap Bakiyeleri"
        icon={<Building2 className="w-4 h-4" />}
        sources={<SourceBadge source="Banka Verisi" />}
      />
      <div className="space-y-3.5">
        {bankAccounts.map((a, i) => {
          const pct = (a.balance / max) * 100;
          const low = a.balance < 3;
          const color = low ? "#D97706" : i === 0 ? "#0F6E78" : "#4F8A6E";
          return (
            <div key={a.bank}>
              <div className="flex justify-between items-center text-[12px] mb-1">
                <span className="text-foreground font-medium">{a.bank}</span>
                <span className="font-semibold" style={{ color }}>{fmtTRY(a.balance)}M</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-[#F1F5F9]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-[11px]">
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Toplam</div><div className="font-semibold text-foreground">₺42,8M</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Lider</div><div className="font-semibold text-[#0F6E78]">Garanti</div></div>
        <div><div className="text-muted-finance text-[10px] uppercase font-medium">Hesap</div><div className="font-semibold text-foreground">6</div></div>
      </div>
    </Card>
  );
}
