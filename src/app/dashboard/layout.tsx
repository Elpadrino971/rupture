'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Coach IA', icon: '💬' },
    { href: '/dashboard/journal', label: 'Journal', icon: '📔' },
    { href: '/dashboard/plan', label: 'Plan', icon: '📅' },
    { href: '/dashboard/analysis', label: 'Analyse', icon: '🧠' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18 py-4">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-md group-hover:shadow-glow transition-all duration-300 flex items-center justify-center transform group-hover:scale-105">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <span className="font-bold text-neutral-900 text-lg">Coach Rupture</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-neutral-500">En ligne</span>
                </div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-soft'
                      : 'text-neutral-600 hover:bg-white/50 hover:shadow-soft'
                  }`}
                >
                  <span className="mr-2 text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-white/50 transition-all active:scale-95"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-4 space-y-2 animate-slide-down">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-soft'
                      : 'text-neutral-600 hover:bg-white/50'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Emergency anti-relapse button (sticky bottom) */}
      <div className="fixed bottom-6 right-6 z-40 animate-scale-in" style={{ animationDelay: '0.5s' }}>
        <button
          onClick={() => {
            // This will be handled by the chat component
            window.dispatchEvent(new CustomEvent('trigger-anti-relapse'));
          }}
          className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-6 py-4 rounded-2xl shadow-soft-lg hover:shadow-glow transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-xl animate-pulse-slow">🛑</span>
          <span className="hidden sm:inline">J'ai envie de craquer</span>
          <span className="sm:hidden">SOS</span>
        </button>
      </div>
    </div>
  );
}
