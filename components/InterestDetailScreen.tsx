
import React from 'react';
import { InterestCategory } from '../types';

interface InterestDetailScreenProps {
  category: InterestCategory;
  onBack: () => void;
}

const InterestDetailScreen: React.FC<InterestDetailScreenProps> = ({ category, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar animate-in slide-in-from-right-10 duration-500 pb-32">
      {/* Hero Section */}
      <div className="relative h-64 flex-shrink-0">
        <img 
          src={category.image} 
          className="w-full h-full object-cover" 
          alt={category.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 z-50 shadow-lg active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-2xl">{category.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
              {category.tag}
            </span>
          </div>
          <h2 className="text-3xl font-black mb-1 leading-tight tracking-tighter">{category.name}</h2>
          <p className="text-slate-400 text-sm font-bold italic">{category.description}</p>
        </div>
      </div>

      <div className="px-6 py-8 space-y-6">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          目的地列表 • PLACES & ACTIVITIES
        </h3>

        <div className="space-y-4">
          {category.items.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-between p-5 rounded-[28px] bg-white border border-slate-100 shadow-sm hover:border-primary/30 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-black text-slate-900 tracking-tight">{item.name}</h4>
                  {item.tag && (
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest mt-0.5 inline-block">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                <span className="material-symbols-outlined text-base">navigation</span>
              </button>
            </div>
          ))}

          {category.items.length === 0 && (
            <p className="text-center text-slate-400 py-10 font-bold italic">敬请期待更多精彩内容...</p>
          )}
        </div>

        {/* Brand Banner */}
        <div className="mt-12 p-8 rounded-[40px] bg-slate-900 relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
           <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2">Sustainable Journey</p>
           <p className="text-white text-lg font-black tracking-tight leading-tight">在〇号公路，<br/>找回消失的感官。</p>
        </div>
      </div>
    </div>
  );
};

export default InterestDetailScreen;
