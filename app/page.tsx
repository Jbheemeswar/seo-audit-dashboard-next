import Layout from "@/components/Layout";
import Hero from "@/components/dashboard/Hero";
import SeoForm from "@/components/dashboard/SeoForm";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentReports from "@/components/dashboard/RecentReports";
import { mockSeoReport } from "@/lib/mockData";
export default function Home() {
  return (
    <Layout>
      <Hero />

      <SeoForm />

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="SEO Score"
            value={mockSeoReport.score.toString()}
            color="text-green-600"
          />

          <StatsCard
            title="Issues"
            value={mockSeoReport.issues.toString()}
            color="text-red-600"
          />

          <StatsCard
            title="Recommendations"
            value={mockSeoReport.recommendations.toString()}
            color="text-blue-600"
          />
        </div>
      </section>

      <RecentReports />
    </Layout>
  );
}