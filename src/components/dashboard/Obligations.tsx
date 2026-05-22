import { obligations, fmtTRY } from "@/lib/mock-data";
import { Card, RiskBadge, SectionTitle, SourceBadge } from "./primitives";
import { Banknote, Building2, CreditCard, FileCheck2, Receipt, Users } from "lucide-react";

const typeIcon: Record<string, React.ReactNode> = {
  Kira: <Building2 className="w-3.5 h-3.5" />,
  Çek: <FileCheck2 className="w-3.5 h-3.5" />,
  Kredi: <CreditCard className="w-3.5 h-3.5" />,
  Maaş: <Users className="w-3.5 h-3.5" />,
  KDV: <Receipt className="w-3.5 h-3.5" />,
};

const typeTint: Record<string, string> = {
  Kira: "#4F8A6E",
  Çek: "#D97706",
  Kredi: "#0F6E78",
  Maaş: "#D97706",
  KDV: "#DC2626",
};

export function ObligationsList() {
  return (
    <Card>
      <SectionTitle
        title="Yaklaşan Yükümlülükler"
        subtitle="Aksiyon alanı · tarih ve etkiye göre önceliklendirilmiş"
        right={
          <div className="flex items-center gap-2 text-[11px] text-muted-finance">
            <span>Toplam: <span className="text-foreground font-semibold">₺34,07M</span></span>
          </div>
        }
      />
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-[13px] min-w-[800px]">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-muted-finance border-b border-[#E2E8F0]">
              <th className="font-semibold text-left px-2 py-2">Tarih</th>
              <th className="font-semibold text-left px-2 py-2">Tür</th>
              <th className="font-semibold text-left px-2 py-2">Açıklama</th>
              <th className="font-semibold text-right px-2 py-2">Tutar</th>
              <th className="font-semibold text-left px-2 py-2">Durum</th>
              <th className="font-semibold text-left px-2 py-2">Risk</th>
              <th className="font-semibold text-left px-2 py-2">Kaynak</th>
            </tr>
          </thead>
          <tbody>
            {obligations.map((o, i) => {
              const tint = typeTint[o.type];
              return (
                <tr
                  key={i}
                  className="transition-colors hover:bg-[#F8FAFC] cursor-pointer border-b border-[#E2E8F0] last:border-b-0"
                >
                  <td className="px-2 py-3">
                    <div className="text-foreground font-medium">{o.date}</div>
                    <div className="text-[10px] text-muted-finance">{o.day}</div>
                  </td>
                  <td className="px-2 py-3">
                    <span className="inline-flex items-center gap-1.5 text-foreground">
                      <span className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: `${tint}14`, color: tint }}>
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
    <footer className="mt-8 pt-6 border-t border-[#E2E8F0]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-muted-finance">
        <div className="flex items-center gap-2">
          <Banknote className="w-3.5 h-3.5" />
          <span>
            Veri kaynakları: <span className="text-foreground/80">ERP, Banka API'leri, Manuel girişler, Tahmin motoru, Periyodik planlar</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Son senkron: <span className="text-foreground/80">5 dk önce</span></span>
          <span>· Atlas Manufacturing A.Ş. · Konsolide TRY</span>
        </div>
      </div>
      <p className="mt-2 text-[10.5px] text-muted-finance max-w-3xl">
        Tüm rakamlar gösterim amaçlı mock verilerdir. Tahmini değerler planlanmış yükümlülükler ve tarihsel tahsilat örüntülerine dayanır; gerçek finansal tavsiye niteliği taşımaz.
      </p>
    </footer>
  );
}
