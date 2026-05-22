// Mock veri — Atlas Manufacturing A.Ş. Nakit Akışı Kokpiti
export const fmtTRY = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${n < 0 ? "-" : ""}₺${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${n < 0 ? "-" : ""}₺${(abs / 1_000).toFixed(0)}B`;
  return `${n < 0 ? "-" : ""}₺${abs.toFixed(0)}`;
};

// 30 günlük nakit akışı projeksiyonu (Haziran)
export const cashFlowDays = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const seed = (x: number) => Math.abs(Math.sin(x * 9.13 + 1.7));
  const inflowBase = 1.4 + seed(day) * 3.6;
  const outflowBase = 1.2 + seed(day + 7) * 3.4;
  const spikes: Record<number, { in?: number; out?: number }> = {
    5: { out: 0.85 },
    8: { in: 9.4 },
    10: { out: 2.4 },
    12: { out: 2.72 },
    15: { out: 12.1, in: 1.2 },
    22: { out: 11.3 },
    23: { out: 2.4 },
    26: { out: 4.8 },
    27: { out: 5.6 },
  };
  const inflow = spikes[day]?.in ?? inflowBase;
  const outflow = spikes[day]?.out ?? outflowBase;
  return { day, label: `${day} Haz`, inflow: +inflow.toFixed(2), outflow: +outflow.toFixed(2) };
});

let bal = 42.8;
export const cashFlowSeries = cashFlowDays.map((d) => {
  bal = bal + d.inflow - d.outflow;
  const forecast = bal + (Math.sin(d.day / 3) * 0.6 - 0.05 * d.day);
  return { ...d, balance: +bal.toFixed(2), forecast: +forecast.toFixed(2), safe: 30 };
});

export const bankMovements = cashFlowSeries.map((d) => ({
  day: d.label,
  inflow: +d.inflow.toFixed(2),
  outflow: -+d.outflow.toFixed(2),
}));

export const checkCalendar = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const amounts: Record<number, number> = {
    3: 0.6, 7: 1.2, 10: 2.4, 13: 0.9, 15: 8.7, 18: 1.4, 22: 11.3, 25: 0.8, 27: 5.6, 29: 1.9,
  };
  return { day, amount: amounts[day] ?? 0 };
});

export const waterfall = [
  { name: "Açılış Nakdi", value: 42.8, type: "start" as const },
  { name: "Müşteri Tahsilatları", value: 28.5, type: "pos" as const },
  { name: "ERP Alacakları", value: 18.2, type: "pos" as const },
  { name: "Periyodik Gelirler", value: 6.4, type: "pos" as const },
  { name: "Maaşlar", value: -12.0, type: "neg" as const },
  { name: "Kredi Ödemeleri", value: -9.8, type: "neg" as const },
  { name: "Çek Ödemeleri", value: -18.4, type: "neg" as const },
  { name: "Senet Ödemeleri", value: -6.2, type: "neg" as const },
  { name: "Tedarikçi Ödemeleri", value: -12.4, type: "neg" as const },
  { name: "Tahmini Kapanış", value: 37.1, type: "end" as const },
];

export const loans = [
  { bank: "Garanti Bankası", principal: 4.2, interest: 0.48 },
  { bank: "İş Bankası", principal: 3.1, interest: 0.36 },
  { bank: "Yapı Kredi", principal: 2.5, interest: 0.31 },
];

export const notesAging = [
  { bucket: "Bugün", value: 0.8, kind: "upcoming" as const },
  { bucket: "1–7 Gün", value: 2.4, kind: "upcoming" as const },
  { bucket: "8–15 Gün", value: 1.7, kind: "low" as const },
  { bucket: "16–30 Gün", value: 3.2, kind: "upcoming" as const },
  { bucket: "Vadesi Geçmiş", value: 0.95, kind: "overdue" as const },
];

export const recurring = [
  { name: "Abonelikler", day: 1, amount: 0.42, color: "#8FA85A" },
  { name: "Kira", day: 5, amount: 0.85, color: "#4F8A6E" },
  { name: "Maaşlar", day: 15, amount: 12.0, color: "#D97706" },
  { name: "SGK", day: 23, amount: 2.4, color: "#4F8A6E" },
  { name: "Vergi / KDV", day: 26, amount: 4.8, color: "#DC2626" },
];

export const bankAccounts = [
  { bank: "Garanti Bankası", balance: 18.4 },
  { bank: "İş Bankası", balance: 10.8 },
  { bank: "Yapı Kredi", balance: 7.6 },
  { bank: "Akbank", balance: 4.1 },
  { bank: "Ziraat Bankası", balance: 1.9 },
];

export type Risk = "Düşük" | "Orta" | "Yüksek" | "Kritik";
export type Source = "Banka Verisi" | "ERP" | "Manuel" | "Tahmin" | "Periyodik";

export const obligations: {
  date: string;
  day: string;
  type: string;
  description: string;
  amount: number;
  status: string;
  risk: Risk;
  sources: Source[];
}[] = [
  { date: "05 Haz", day: "Çar", type: "Kira", description: "Genel Müdürlük kirası — Levent", amount: 0.85, status: "Planlandı", risk: "Düşük", sources: ["Manuel", "Periyodik"] },
  { date: "10 Haz", day: "Pzt", type: "Çek", description: "Tedarikçi çeki — Demir A.Ş.", amount: 2.4, status: "Yaklaşıyor", risk: "Orta", sources: ["ERP"] },
  { date: "12 Haz", day: "Çar", type: "Kredi", description: "Garanti kredi taksiti", amount: 2.72, status: "Yaklaşıyor", risk: "Orta", sources: ["Banka Verisi"] },
  { date: "15 Haz", day: "Cmt", type: "Maaş", description: "Aylık bordro — 412 personel", amount: 12.0, status: "Planlandı", risk: "Yüksek", sources: ["Manuel", "Periyodik"] },
  { date: "22 Haz", day: "Cmt", type: "Çek", description: "Ekipman finansman çeki", amount: 11.3, status: "Yaklaşıyor", risk: "Kritik", sources: ["ERP"] },
  { date: "26 Haz", day: "Çar", type: "KDV", description: "Aylık KDV beyannamesi", amount: 4.8, status: "Planlandı", risk: "Yüksek", sources: ["Manuel"] },
];
