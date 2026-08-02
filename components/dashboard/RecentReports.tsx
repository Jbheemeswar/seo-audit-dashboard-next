const reports = [
  { website: "example.com", score: 91 },
  { website: "flyrank.ai", score: 87 },
  { website: "github.com", score: 95 },
];

export default function RecentReports() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Recent Reports
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Website</th>
            <th>SEO Score</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item) => (
            <tr key={item.website} className="border-b">
              <td className="py-3">{item.website}</td>
              <td className="font-bold text-green-600">
                {item.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}