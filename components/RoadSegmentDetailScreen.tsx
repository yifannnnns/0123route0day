
import React from 'react';
import { RoadSegment, POI } from '../types';
import { POIS } from '../constants';

interface RoadSegmentDetailScreenProps {
  segment: RoadSegment;
  onBack: () => void;
  onPOIClick: (poi: POI) => void;
}

const RoadSegmentDetailScreen: React.FC<RoadSegmentDetailScreenProps> = ({ segment, onBack, onPOIClick }) => {
  const themeColor = '#00E0EF';
  const themeRgb = '0, 224, 239';
  const gradient = 'linear-gradient(135deg, #00E0EF 0%, #3B82F6 100%)';

  // 辅助函数：通过名称查找 POI 对象
  const findPOIByName = (name: string) => {
    return POIS.find(p => p.name === name);
  };

  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      {/* Hero Atmosphere Area */}
      <div className="relative h-[60vh] flex-shrink-0">
        <img 
          src={segment.image} 
          className="w-full h-full object-cover" 
          alt={segment.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 z-50 shadow-xl active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>

        <div className="absolute bottom-12 left-6 right-6">
          <div className="flex items-center gap-2 mb-3">
             <span className="w-8 h-[2.5px]" style={{ backgroundColor: themeColor }}></span>
             <span className="text-xs font-black uppercase tracking-[0.3em] drop-shadow-sm" style={{ color: themeColor }}>Route Zero</span>
          </div>
          <h2 className="text-5xl font-black mb-2 leading-tight tracking-tighter text-white drop-shadow-2xl">{segment.name}</h2>
          <p className="text-xl font-bold text-white/90 italic mb-6 drop-shadow-lg">{segment.description}</p>
          
          <div className="flex gap-3">
             <div className="bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-sm font-bold" style={{ color: themeColor }}>distance</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{segment.length || '---'}</span>
             </div>
             <div className="bg-white/20 backdrop-blur-xl border border-white/30 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-sm font-bold" style={{ color: themeColor }}>schedule</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{segment.duration || '---'}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-20 space-y-12">
        {/* 1. Intro Content */}
        <section className="px-2">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2" style={{ color: themeColor }}>
             <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></span>
             特色介绍 • INTRODUCTION
          </h3>
          <p className="text-base text-slate-700 leading-relaxed font-medium">
            {segment.fullIntro || segment.description}
          </p>
        </section>

        {/* 2. Highlights List (点位配置跳转) */}
        {segment.highlights && (
          <section className="px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2" style={{ color: themeColor }}>
               <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></span>
               主要景点配置 • SPOTS GUIDE
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {segment.highlights.map((h, i) => {
                const poi = findPOIByName(h);
                return (
                  <div 
                    key={i} 
                    onClick={() => poi && onPOIClick(poi)}
                    className="flex items-center justify-between bg-white border border-slate-100 p-5 rounded-[28px] shadow-sm hover:border-primary/40 transition-all group active:scale-[0.98] cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                        <span className="font-black text-xs leading-none">{i + 1}</span>
                      </div>
                      <div>
                        <span className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors">{h}</span>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Explore Spot Configuration</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors">arrow_forward_ios</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 多元运动 Section (带跳转逻辑) */}
        {segment.diverseSports && (
          <section className="px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2" style={{ color: themeColor }}>
               <span className="material-symbols-outlined text-base">fitness_center</span>
               多元运动体验 • DIVERSE SPORTS
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {segment.diverseSports.map((sport, idx) => {
                // 将运动项目关联到特定的 POI（如：艇好玩帆船营地）
                const relatedPOI = findPOIByName('艇好玩帆船营地');
                return (
                  <div 
                    key={idx} 
                    onClick={() => relatedPOI && onPOIClick(relatedPOI)}
                    className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm flex items-center gap-3 active:scale-95 transition-all cursor-pointer hover:border-primary/20"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-base">
                        {sport.includes('骑行') ? 'directions_bike' : sport.includes('篮球') ? 'sports_basketball' : sport.includes('瑜伽') ? 'self_improvement' : 'surfing'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-slate-800">{sport}</span>
                      <span className="text-[7px] text-slate-400 font-bold uppercase">Discover</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 一定要吃 Section */}
        {segment.mustEat && (
          <section className="px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-5 flex items-center gap-2 text-orange-500">
               <span className="material-symbols-outlined text-base">restaurant</span>
               一定要吃 • MUST EAT
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {segment.mustEat.map((food, idx) => {
                const foodPOI = findPOIByName('西夏王和文饭店'); // 默认关联到地道餐馆
                return (
                  <div 
                    key={idx} 
                    onClick={() => foodPOI && onPOIClick(foodPOI)}
                    className="bg-orange-50/50 border border-orange-100 p-4 rounded-3xl flex items-center gap-3 cursor-pointer active:scale-95 transition-transform"
                  >
                    <span className="text-lg">🦐</span>
                    <div>
                      <span className="text-[11px] font-black text-orange-700 tracking-tight">{food}</span>
                      <p className="text-[7px] text-orange-400 font-bold uppercase">Local Flavor</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Action CTA */}
        <div className="pt-4 pb-12">
           <button 
             className="w-full text-white py-5 rounded-[28px] font-black text-sm shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3"
             style={{ 
               background: gradient,
               boxShadow: `0 10px 25px rgba(${themeRgb}, 0.3)` 
             }}
           >
             <span className="material-symbols-outlined font-bold">navigation</span>
             开启路段漫游 • START ROAMING
           </button>
           <p className="text-center mt-6 text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">
             Sustainable Tourism • Enjoy Balan Coast
           </p>
        </div>
      </div>
    </div>
  );
};

export default RoadSegmentDetailScreen;
