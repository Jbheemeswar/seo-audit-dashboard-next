import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-800 text-white p-6">
      <h2 className="text-xl font-bold mb-8">
        Navigation
      </h2>

      <ul className="space-y-5">
        <li>
          <Link href="/">🏠 Home</Link>
        </li>

        <li>
          <Link href="/dashboard">📊 Dashboard</Link>
        </li>

        <li>
          <Link href="/analyze">🔍 Analyze</Link>
        </li>

        <li>
          <Link href="/reports">📄 Reports</Link>
        </li>

        <li>
          <Link href="/settings">⚙️ Settings</Link>
        </li>

        <li>
          <Link href="/health">❤️ Health</Link>
        </li>
      </ul>
    </aside>
  );
}