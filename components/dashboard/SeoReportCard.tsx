type SeoReportCardProps = {
  score: number;
  issues: number;
  recommendations: number;
};

export default function SeoReportCard({
  score,
  issues,
  recommendations,
}: SeoReportCardProps) {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        SEO Report
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <h3 className="text-gray-500">SEO Score</h3>
          <p className="text-4xl font-bold text-green-600">{score}</p>
        </div>

        <div className="text-center">
          <h3 className="text-gray-500">Issues</h3>
          <p className="text-4xl font-bold text-red-600">{issues}</p>
        </div>

        <div className="text-center">
          <h3 className="text-gray-500">Recommendations</h3>
          <p className="text-4xl font-bold text-blue-600">
            {recommendations}
          </p>
        </div>
      </div>
    </div>
  );
}