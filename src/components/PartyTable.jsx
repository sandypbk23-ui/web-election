import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock } from 'lucide-react';

const PartyTable = ({ parties }) => {
  const { t } = useTranslation();

  return (
    <div className="card flex-1 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2 h-6 bg-election-blue rounded-full"></span>
          {t('provincial')}
        </h3>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
          <Clock className="w-3.5 h-3.5" />
          Real-time
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-2">Party</th>
              <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest text-center">Seats</th>
              <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest text-center">Votes</th>
              <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest text-right px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {parties.map((party, idx) => (
              <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2.5 h-8 rounded-full shadow-sm"
                      style={{ backgroundColor: party.color }}
                    ></div>
                    <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-election-blue transition-colors">
                      {party.party}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <span className="stat-value text-xl">{party.seats}</span>
                </td>
                <td className="py-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{party.votes}</span>
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                       <div className="h-full bg-slate-300 dark:bg-slate-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right px-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-800 uppercase tracking-tighter shadow-sm">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartyTable;
