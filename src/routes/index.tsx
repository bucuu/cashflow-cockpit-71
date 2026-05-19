import { createFileRoute } from "@tanstack/react-router";
import { DashboardHeader } from "@/components/dashboard/Header";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { HeroCashFlowChart } from "@/components/dashboard/HeroChart";
import { BankMovementsCard, CheckCalendarCard, WaterfallCard } from "@/components/dashboard/AnalyticalRow";
import { BankBalancesCard, LoansCard, NotesCard, RecurringCard } from "@/components/dashboard/ModuleCards";
import { Footer, ObligationsList } from "@/components/dashboard/Obligations";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(53,133,142,0.10), transparent 60%), radial-gradient(900px 500px at 100% 0%, rgba(167,139,250,0.07), transparent 60%), radial-gradient(800px 400px at 50% 100%, rgba(125,167,140,0.06), transparent 60%)",
        }}
      />
      <DashboardHeader />
      <main className="mx-auto max-w-[1480px] px-6 lg:px-10 py-6 space-y-6">
        <KpiRow />
        <HeroCashFlowChart />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <BankMovementsCard />
          <CheckCalendarCard />
          <WaterfallCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <LoansCard />
          <NotesCard />
          <RecurringCard />
          <BankBalancesCard />
        </div>
        <ObligationsList />
        <Footer />
      </main>
    </div>
  );
}
