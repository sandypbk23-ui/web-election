import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import LiveStats from './components/LiveStats';
import ResultsChart from './components/ResultsChart';
import PartyTable from './components/PartyTable';
import NepalMap from './components/NepalMap';
import { useElectionData } from './hooks/useElectionData';
import { Search, Map as MapIcon, Table as TableIcon, LayoutDashboard, Share2, Download, CheckCircle, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { t } = useTranslation();
  const { data, loading, error: dataError } = useElectionData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  if (loading || !data) return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-election-blue/20 border-t-election-blue rounded-full animate-spin"></div>
      <p className="text-slate-500 dark:text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">{t('loading')}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] transition-colors duration-500">
      <NewsTicker news={data.breakingNews || []} />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-election-red text-[10px] font-bold rounded uppercase tracking-widest border border-red-200 dark:border-red-800">
                Live updates active
              </span>
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
            </div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">
              {t('dashboard')} <span className="text-election-blue">Overview</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
              Real-time visualization of Nepal's 2026 General Election results.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-election-blue transition-colors" />
              <input 
                type="text" 
                placeholder={t('search_placeholder')}
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-election-blue/20 focus:border-election-blue transition-all w-full lg:w-72 outline-none text-sm font-medium shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              <Share2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
              <Download className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8 bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl w-fit border border-slate-200 dark:border-slate-800 shadow-inner">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Results' },
            { id: 'map', icon: MapIcon, label: 'Map View' },
            { id: 'tables', icon: TableIcon, label: 'Detailed Data' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-white dark:bg-slate-800 text-election-blue shadow-md border border-slate-100 dark:border-slate-700' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <LiveStats summary={data.summary || {}} partyResults={data.partyResults || []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <ResultsChart data={data.partyResults || []} />
             <div className="mt-8 p-6 bg-gradient-to-br from-election-blue to-blue-800 rounded-2xl text-white shadow-lg relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-black text-xl mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-300" />
                    How we verify data
                  </h4>
                  <p className="text-blue-100 text-sm leading-relaxed font-medium">
                    Our data is cross-referenced between the Election Commission and major independent news hubs to ensure accuracy.
                  </p>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-10">
                  <MapIcon size={180} />
                </div>
             </div>
          </div>
          
          <div className="lg:col-span-2 space-y-8">
             <PartyTable parties={data.partyResults || []} />
             <NepalMap results={data.provinceResults} />
          </div>
        </div>
      </main>
      
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter">Nepal Election Results</h4>
             <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">&copy; 2026 Election Analytics Nepal</p>
          </div>
          <div className="flex items-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-election-blue">Privacy</a>
            <a href="#" className="hover:text-election-blue">Terms</a>
            <a href="#" className="hover:text-election-blue">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
