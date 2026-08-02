import Layout from "@/components/Layout";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Dashboard
        </h1>

        <p className="text-slate-700">
          View your SEO dashboard overview and performance summary.
        </p>
      </div>
    </Layout>
  );
}