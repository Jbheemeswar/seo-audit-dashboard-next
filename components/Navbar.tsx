import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div>
        <h1 className="text-2xl font-bold">
          AI SEO Dashboard
        </h1>
      </div>

      <nav className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/reports">Reports</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </header>
  );
}