import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Award, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const LiveStats = ({ summary, partyResults }) => {
  const { t } = useTranslation();

  const stats = [
    { 
      label: t('total_seats'), 
      value: summary.totalSeats, 
      icon: <Users className="text-blue-500" />,
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      label: 'Counted', 
      value: summary.countedSeats, 
      icon: <TrendingUp className="text-green-500" />,
      color: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      label: 'Leading Party', 
      value: partyResults[0]?.party || 'N/A', 
      icon: <Award className="text-election-red" />,
      color: 'bg-red-50 dark:bg-red-900/20'
    },
    { 
      label: 'Last Update', 
      value: 'Live', 
      icon: <Clock className="text-purple-500 animate-pulse" />,
      color: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="card overflow-hidden group"
        >
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.color} transition-transform group-hover:scale-110 shadow-sm`}>
              {stat.icon}
            </div>
            <div>
              <p className="stat-label">{stat.label}</p>
              <h4 className="text-2xl font-bold text-slate-800 dark:text-white mt-0.5">
                {stat.value}
              </h4>
            </div>
          </div>
          <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-transparent via-election-blue to-transparent transition-all duration-700 mt-4 opacity-30"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default LiveStats;
