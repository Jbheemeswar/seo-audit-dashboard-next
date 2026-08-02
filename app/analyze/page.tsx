import Layout from "@/components/Layout";

export default function AnalyzePage() {
  return (
    <Layout>
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Analyze
        </h1>

        <p className="text-slate-700">
          Analyze a website URL and generate an SEO report.
        </p>
      </div>
    </Layout>
  );
}