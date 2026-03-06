import React from 'react';
import { useTranslation } from 'react-i18next';
import { Newspaper, ChevronRight } from 'lucide-react';

const NewsTicker = ({ news }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-election-red py-2.5 overflow-hidden border-y border-red-700 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white font-bold text-xs uppercase tracking-widest whitespace-nowrap shadow-sm backdrop-blur-sm">
          <Newspaper className="w-3.5 h-3.5" />
          {t('breaking_news')}
        </div>
        <div className="relative flex-1 group">
          <div className="flex animate-scroll whitespace-nowrap gap-12 group-hover:pause">
            {[...news, ...news].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-white/95 font-medium hover:text-white cursor-pointer transition-colors">
                <span className="text-white/50">•</span>
                <span>{item.title}</span>
                <span className="text-[10px] bg-red-800/50 px-2 py-0.5 rounded text-red-100 border border-red-600">
                  {item.source}
                </span>
              </div>
            ))}
          </div>
        </div>
        <button className="hidden sm:flex text-white hover:text-red-100 font-bold text-xs items-center gap-1 bg-red-800/40 px-3 py-1.5 rounded-lg border border-red-700/50 transition-all hover:bg-red-800/60">
          ALL NEWS <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: fit-content;
          animation: scroll 40s linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default NewsTicker;
