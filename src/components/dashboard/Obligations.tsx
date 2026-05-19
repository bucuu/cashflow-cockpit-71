import { obligations, fmtTRY } from "@/lib/mock-data";
import { Card, RiskBadge, SectionTitle, SourceBadge } from "./primitives";
import { Banknote, Building2, CreditCard, FileCheck2, Receipt, Users } from "lucide-react";

const typeIcon: Record<string, React.ReactNode> = {
  Rent: <Building2 className="w-3.5 h-3.5" />,
  Check: <FileCheck2 className="w-3.5 h-3.5" />,
  Loan: <CreditCard className="w-3.5 h-3.5" />,
  Salary: <Users className="w-3.5 h-3.5" />,
  VAT: <Receipt className="w-3.5 h-3.5" />,
};

const typeTint: Record<string, string> = {
  Rent: "#7DA78C",
  Check: "#F59E0B",
  Loan: "#35858E",
  Salary: "#F59E0B",
  VAT: "#EF4444",
};

export function ObligationsList() {
  return (
    <Card>
      <SectionTitle
        title="Upcoming Obligations"
        subtitle="Action area · prioritized by date and impact"
        right={
          <div className="flex items-center gap-2 text-[11px] text-muted-finance">
            <span>Total: <span className="text-foreground font-semibold">₺34.07M</span></span>
          </div>
        }
      />
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-[13px] min-w-[800px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-finance">
              <th className="font-medium text-left px-2 py-2">Date</th>
              <th className="font-medium text-left px-2 py-2">Type</th>
              <th className="font-medium text-left px-2 py-2">Description</th>
              <th className="font-medium text-right px-2 py-2">Amount</th>
              <th className="font-medium text-left px-2 py-2">Status</th>
              <th className="font-medium text-left px-2 py-2">Risk</th>
              <th className="font-medium text-left px-2 py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {obligations.map((o, i) => {
              const tint = typeTint[o.type];
              return (
                <tr
                  key={i}
                  className="group transition-colors hover:bg-[rgba(53,133,142,0.06)] cursor-pointer border-t hairline"
                >
                  <td className="px-2 py-3">
                    <div className="text-foreground font-medium">{o.date}</div>
                    <div className="text-[10px] text-muted-finance">{o.day}</div>
                  </td>
                  <td className="px-2 py-3">
                    <span className="inline-flex items-center gap-1.5 text-foreground/90">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${tint}1f`, color: tint }}>
                        {typeIcon[o.type]}
                      </span>
                      {o.type}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-foreground/85">{o.description}</td>
                  <td className="px-2 py-3 text-right font-semibold text-foreground">{fmtTRY(o.amount * 1_000_000)}</td>
                  <td className="px-2 py-3 text-muted-finance">{o.status}</td>
                  <td className="px-2 py-3"><RiskBadge risk={o.risk} /></td>
                  <td className="px-2 py-3">
                    <div className="flex flex-wrap gap-1">
                      {o.sources.map((s) => <SourceBadge key={s} source={s} />)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 pt-6 border-t hairline">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-muted-finance">
        <div className="flex items-center gap-2">
          <Banknote className="w-3.5 h-3.5" />
          <span>
            Data sources: <span className="text-foreground/80">ERP, Bank APIs, Manual entries, Forecast engine, Recurring schedules</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Last sync: <span className="text-foreground/80">5 min ago</span></span>
          <span>· Atlas Manufacturing A.Ş. · Consolidated TRY</span>
        </div>
      </div>
      <p className="mt-2 text-[10.5px] text-muted-finance/70 max-w-3xl">
        All figures shown are mock data for demonstration. Forecasted values are based on scheduled obligations and historical receivable patterns; they do not represent actual financial advice.
      </p>
    </footer>
  );
}
