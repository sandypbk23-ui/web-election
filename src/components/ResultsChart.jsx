import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useTranslation } from 'react-i18next';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultsChart = ({ data }) => {
  const { t } = useTranslation();

  const chartData = {
    labels: data.map(item => item.party),
    datasets: [
      {
        data: data.map(item => item.seats),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1,
        hoverOffset: 15,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
            weight: '600',
          },
          color: document.documentElement.classList.contains('dark') ? '#94a3b8' : '#475569',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: true,
      }
    },
    maintainAspectRatio: false,
    cutout: '70%',
  };

  return (
    <div className="card h-[400px] flex flex-col">
      <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <span className="w-2 h-6 bg-election-red rounded-full"></span>
        {t('seats_won')}
      </h3>
      <div className="relative flex-1">
        <Pie data={chartData} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-black text-election-blue dark:text-blue-400">
            {data.reduce((acc, curr) => acc + curr.seats, 0)}
          </span>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
            Total Won
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResultsChart;
