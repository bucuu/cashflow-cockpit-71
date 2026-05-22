import { useState } from "react";
import { Activity, ChevronDown, RefreshCw } from "lucide-react";

const ranges = ["7G", "30G", "60G", "90G"];
const currencies = ["TRY", "USD", "EUR"];
const sources = ["Tümü", "ERP", "Banka", "Manuel", "Tahmin"];

function Pill({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all border ${
        active
          ? "text-white border-transparent"
          : "text-muted-finance hover:text-foreground border-transparent"
      }`}
      style={
        active
          ? { backgroundColor: "#0F6E78" }
          : { backgroundColor: "transparent" }
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
        className="appearance-none bg-white border border-[#E2E8F0] rounded-full pl-3 pr-8 py-1.5 text-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-[#0F6E78]/30"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 pointer-events-none text-muted-finance" />
    </label>
  );
}

export function DashboardHeader() {
  const [range, setRange] = useState("30G");
  const [currency, setCurrency] = useState("TRY");
  const [company, setCompany] = useState("Atlas Manufacturing A.Ş.");
  const [source, setSource] = useState("Tümü");

  return (
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0]">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-sm" style={{ background: "linear-gradient(135deg, #0F6E78, #4F8A6E)" }}>
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold tracking-wide text-[#0F6E78] uppercase">Nakit Akışı Kokpiti</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-finance">v2.4</span>
              </div>
              <h1 className="text-[22px] md:text-[26px] font-bold tracking-tight text-foreground leading-tight">
                Yönetici Nakit Akışı Paneli
              </h1>
              <p className="text-[12px] text-muted-finance mt-0.5">30 günlük nakit pozisyonu, yükümlülükler ve tahmin özeti</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 rounded-full border border-[#E2E8F0] bg-white">
              {ranges.map((r) => (
                <Pill key={r} active={range === r} onClick={() => setRange(r)}>{r}</Pill>
              ))}
            </div>
            <Select label="Para Birimi" options={currencies} value={currency} onChange={setCurrency} />
            <Select label="Şirket" options={["Konsolide", "Atlas Manufacturing A.Ş.", "Atlas Lojistik", "Atlas Enerji"]} value={company} onChange={setCompany} />
            <Select label="Kaynak" options={sources} value={source} onChange={setSource} />
            <div className="flex items-center gap-2 ml-1 pl-3 border-l border-[#E2E8F0]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16A34A]" />
              </span>
              <span className="text-[11px] text-muted-finance flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3" /> Son senkron: 5 dk önce
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
