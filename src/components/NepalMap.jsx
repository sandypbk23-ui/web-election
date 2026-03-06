import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import provincesData from '../data/nepal-provinces.json';

const NepalMap = ({ results }) => {
  const [hoveredProvince, setHoveredProvince] = useState(null);

  const getProvinceData = (id) => {
    return results?.find(p => p.id === id) || { name: 'Unknown', winner: 'None', seats: 0, color: '#CBD5E1' };
  };

  return (
    <div className="card relative group overflow-hidden bg-slate-900/50 backdrop-blur-xl border-slate-800 p-0 h-[450px]">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-xl font-black text-white uppercase tracking-tight">Province Distribution</h3>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Interactive Geographic View</p>
      </div>

      <div className="w-full h-full flex items-center justify-center p-8">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full max-h-[350px] drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))' }}
        >
          {provincesData.map((province) => {
            const data = getProvinceData(province.id);
            const isHovered = hoveredProvince === province.id;
            
            return (
              <motion.path
                key={province.id}
                d={province.path}
                fill={data.color}
                stroke="#0F172A"
                strokeWidth={isHovered ? 3 : 1.5}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: isHovered ? 1.05 : 1,
                  zIndex: isHovered ? 20 : 1
                }}
                whileHover={{ 
                  filter: 'brightness(1.2) contrast(1.1)',
                  transition: { duration: 0.2 }
                }}
                onHoverStart={() => setHoveredProvince(province.id)}
                onHoverEnd={() => setHoveredProvince(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ originX: 'center', originY: 'center' }}
              />
            );
          })}
        </svg>
      </div>

      <AnimatePresence>
        {hoveredProvince && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-6 right-6 bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-20 min-w-[180px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getProvinceData(hoveredProvince).color }}
              ></div>
              <h4 className="font-black text-white text-sm uppercase">{getProvinceData(hoveredProvince).name}</h4>
            </div>
            <div className="space-y-1">
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Leading Party</p>
              <p className="text-white font-bold text-base">{getProvinceData(hoveredProvince).winner}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between">
              <span className="text-slate-400 text-[10px] font-bold uppercase">Total Seats</span>
              <span className="text-white font-black text-xs">{getProvinceData(hoveredProvince).seats}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#1E40AF]"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">NC</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#DC2626]"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">UML</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#991B1B]"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Maoist</span>
         </div>
      </div>
    </div>
  );
};

export default NepalMap;
