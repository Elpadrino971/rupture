import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coach Post-Rupture IA",
  description: "L'app qui t'aide à tourner la page, pas à rouvrir des plaies.",
  manifest: "/manifest.json",
  themeColor: "#0158a1",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Coach Rupture",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {children}
      </body>
    </html>
  );
}
