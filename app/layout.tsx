import "./globals.css";

export const metadata = {
  title: "AI SEO Dashboard",
  description: "Next.js SEO Audit Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}