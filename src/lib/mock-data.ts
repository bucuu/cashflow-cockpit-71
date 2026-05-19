// Mock data for CashFlow Cockpit — Atlas Manufacturing A.Ş.
export const fmtTRY = (n: number) => {
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${n < 0 ? "-" : ""}₺${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${n < 0 ? "-" : ""}₺${(abs / 1_000).toFixed(0)}K`;
  return `${n < 0 ? "-" : ""}₺${abs.toFixed(0)}`;
};

// 30-day cash flow projection (June)
export const cashFlowDays = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  // deterministic pseudo-random
  const seed = (x: number) => Math.abs(Math.sin(x * 9.13 + 1.7));
  const inflowBase = 1.4 + seed(day) * 3.6;
  const outflowBase = 1.2 + seed(day + 7) * 3.4;
  // spike days
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
  return { day, label: `Jun ${day}`, inflow: +inflow.toFixed(2), outflow: +outflow.toFixed(2) };
});

// build running balance starting from 42.8M
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

// Check maturity calendar (30 days)
export const checkCalendar = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const amounts: Record<number, number> = {
    3: 0.6, 7: 1.2, 10: 2.4, 13: 0.9, 15: 8.7, 18: 1.4, 22: 11.3, 25: 0.8, 27: 5.6, 29: 1.9,
  };
  return { day, amount: amounts[day] ?? 0 };
});

// Waterfall
export const waterfall = [
  { name: "Opening Cash", value: 42.8, type: "start" as const },
  { name: "Customer Collections", value: 28.5, type: "pos" as const },
  { name: "ERP Receivables", value: 18.2, type: "pos" as const },
  { name: "Recurring Income", value: 6.4, type: "pos" as const },
  { name: "Salaries", value: -12.0, type: "neg" as const },
  { name: "Loan Payments", value: -9.8, type: "neg" as const },
  { name: "Check Payments", value: -18.4, type: "neg" as const },
  { name: "Promissory Notes", value: -6.2, type: "neg" as const },
  { name: "Supplier Payments", value: -12.4, type: "neg" as const },
  { name: "Forecasted Closing", value: 37.1, type: "end" as const },
];

// Loans
export const loans = [
  { bank: "Garanti Bank", principal: 4.2, interest: 0.48 },
  { bank: "İş Bank", principal: 3.1, interest: 0.36 },
  { bank: "Yapı Kredi", principal: 2.5, interest: 0.31 },
];

// Promissory notes aging
export const notesAging = [
  { bucket: "Today", value: 0.8, kind: "upcoming" as const },
  { bucket: "1–7 Days", value: 2.4, kind: "upcoming" as const },
  { bucket: "8–15 Days", value: 1.7, kind: "low" as const },
  { bucket: "16–30 Days", value: 3.2, kind: "upcoming" as const },
  { bucket: "Overdue", value: 0.95, kind: "overdue" as const },
];

// Recurring payments
export const recurring = [
  { name: "Subscriptions", day: 1, amount: 0.42, color: "#C2D099" },
  { name: "Rent", day: 5, amount: 0.85, color: "#7DA78C" },
  { name: "Salaries", day: 15, amount: 12.0, color: "#F59E0B" },
  { name: "SGK", day: 23, amount: 2.4, color: "#7DA78C" },
  { name: "Tax / VAT", day: 26, amount: 4.8, color: "#EF4444" },
];

// Bank accounts
export const bankAccounts = [
  { bank: "Garanti Bank", balance: 18.4 },
  { bank: "İş Bank", balance: 10.8 },
  { bank: "Yapı Kredi", balance: 7.6 },
  { bank: "Akbank", balance: 4.1 },
  { bank: "Ziraat", balance: 1.9 },
];

// Upcoming obligations
export type Risk = "Low" | "Medium" | "High" | "Critical";
export type Source = "Bank Data" | "ERP" | "Manual" | "Forecast" | "Recurring";

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
  { date: "Jun 05", day: "Wed", type: "Rent", description: "Headquarters lease — Levent", amount: 0.85, status: "Scheduled", risk: "Low", sources: ["Manual", "Recurring"] },
  { date: "Jun 10", day: "Mon", type: "Check", description: "Supplier check — Demir A.Ş.", amount: 2.4, status: "Upcoming", risk: "Medium", sources: ["ERP"] },
  { date: "Jun 12", day: "Wed", type: "Loan", description: "Garanti loan installment", amount: 2.72, status: "Upcoming", risk: "Medium", sources: ["Bank Data"] },
  { date: "Jun 15", day: "Sat", type: "Salary", description: "Monthly payroll — 412 employees", amount: 12.0, status: "Scheduled", risk: "High", sources: ["Manual", "Recurring"] },
  { date: "Jun 22", day: "Sat", type: "Check", description: "Equipment financing check", amount: 11.3, status: "Upcoming", risk: "Critical", sources: ["ERP"] },
  { date: "Jun 26", day: "Wed", type: "VAT", description: "Monthly VAT declaration", amount: 4.8, status: "Scheduled", risk: "High", sources: ["Manual"] },
];
