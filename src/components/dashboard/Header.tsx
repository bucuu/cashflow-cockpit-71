import { useState } from "react";
import { Activity, ChevronDown, RefreshCw } from "lucide-react";

const ranges = ["7D", "30D", "60D", "90D"];
const currencies = ["TRY", "USD", "EUR"];
const sources = ["All", "ERP", "Bank", "Manual", "Forecast"];

function Pill({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${
        active
          ? "text-foreground"
          : "text-muted-finance hover:text-foreground"
      }`}
      style={
        active
          ? { backgroundColor: "rgba(53,133,142,0.20)", borderColor: "rgba(53,133,142,0.55)", boxShadow: "0 0 0 1px rgba(53,133,142,0.25) inset" }
          : { backgroundColor: "rgba(230,238,201,0.03)", borderColor: "rgba(230,238,201,0.10)" }
      }
    >
      {children}
    </button>
  );
}

function Select({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-[rgba(230,238,201,0.03)] hairline border rounded-full pl-3 pr-8 py-1.5 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#35858E]/40"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0B1628] text-foreground">{o}</option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none text-muted-finance" />
    </label>
  );
}

export function DashboardHeader() {
  const [range, setRange] = useState("30D");
  const [currency, setCurrency] = useState("TRY");
  const [company, setCompany] = useState("Atlas Manufacturing A.Ş.");
  const [source, setSource] = useState("All");

  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-[rgba(7,17,31,0.78)] border-b hairline">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #35858E, #7DA78C)" }}>
              <Activity className="w-5 h-5 text-[#07111F]" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold tracking-wide text-foreground/90">CashFlow Cockpit</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-finance">v2.4</span>
              </div>
              <h1 className="text-[22px] md:text-[26px] font-bold tracking-tight text-foreground leading-tight">
                Executive Cash Flow Dashboard
              </h1>
              <p className="text-[12px] text-muted-finance mt-0.5">30-day cash position, obligations and forecast overview</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-full hairline border" style={{ backgroundColor: "rgba(230,238,201,0.03)" }}>
              {ranges.map((r) => (
                <Pill key={r} active={range === r} onClick={() => setRange(r)}>{r}</Pill>
              ))}
            </div>
            <Select label="Currency" options={currencies} value={currency} onChange={setCurrency} />
            <Select label="Company" options={["Consolidated", "Atlas Manufacturing A.Ş.", "Atlas Logistics", "Atlas Energy"]} value={company} onChange={setCompany} />
            <Select label="Source" options={sources} value={source} onChange={setSource} />
            <div className="flex items-center gap-2 ml-1 pl-3 border-l hairline">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              <span className="text-[11px] text-muted-finance flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3" /> Last sync: 5 min ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
