import React from 'react';
import { Menu } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-sm border-b border-purple-100 shadow-sm">
        <div className="max-w-[90rem] mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-800">Sumo Tips</h1>
          <button className="p-2 hover:bg-purple-100 rounded-full">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-[90rem] mx-auto px-4 py-6">
        <div className="lg:grid lg:grid-cols-[1fr,400px] lg:gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}