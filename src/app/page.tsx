'use client'

import { useState, useEffect } from 'react';
import { Home, Users, BarChart3, Settings, LogOut, Menu, X, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase-client';

export default function EzlyDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contractorCount, setContractorCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      // Get real data from Supabase
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'contractor');
      
      setContractorCount(count || 0);
      setLoading(false);
    }
    fetchData();
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: Home },
    { name: 'Contractors', icon: Users },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-purple-900">Ezly Desk</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <a key={item.name} href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-purple-50 hover:text-purple-900">
              <item.icon size={20} />
              <span className="font-medium text-sm">{item.name}</span>
            </a>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-600">
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Nav (Mobile & Desktop) */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
           <h2 className="text-lg font-bold md:hidden">Ezly Desk</h2>
           <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X /> : <Menu />}
           </button>
           <div className="hidden md:flex items-center gap-4 ml-auto">
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700">
                <Plus size={16} /> New Operations Activity
              </button>
           </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a key={item.name} href="#" className="flex items-center gap-3 px-2 py-3 rounded-lg text-gray-600">{item.name}</a>
            ))}
          </div>
        )}

        <main className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg mb-4">Operations Summary</h3>
                     <p className="text-gray-500 text-sm">Welcome back, Brian. Your contractor network is active across 4 regions.</p>
                </div>
                <div className="bg-purple-900 text-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-lg mb-2">Total Contractors</h3>
                    <p className="text-3xl font-black">{loading ? '...' : contractorCount}</p>
                    <p className="text-purple-300 text-xs mt-2">Active in system</p>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}