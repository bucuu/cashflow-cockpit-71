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
