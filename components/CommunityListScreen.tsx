
import React from 'react';
import { CommunityCircle } from '../types';

interface CommunityListScreenProps {
  communities: CommunityCircle[];
  onBack: () => void;
  onCommunityClick: (comm: CommunityCircle) => void;
}

const CommunityListScreen: React.FC<CommunityListScreenProps> = ({ communities, onBack, onCommunityClick }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 sticky top-0 bg-background-dark/80 backdrop-blur-xl z-50">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-bold text-primary">arrow_back</span>
        </button>
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-slate-900">全部圈子</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-0.5">Explore All Interest Circles</p>
        </div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-4 pt-4">
        {communities.map(comm => (
          <div 
            key={comm.id} 
            onClick={() => onCommunityClick(comm)}
            className="bg-white rounded-[32px] overflow-hidden border border-slate-100 group cursor-pointer hover:border-primary/40 transition-all shadow-md hover:shadow-xl relative h-52"
          >
            <img src={comm.image} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" alt={comm.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full w-8 h-8 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">{comm.icon}</span>
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-white font-black text-lg tracking-tight mb-0.5">{comm.name}</h3>
              <p className="text-white/60 text-[10px] font-bold italic line-clamp-1">{comm.subtitle}</p>
              <div className="flex items-center gap-2 mt-2">
                 <div className="flex -space-x-1.5">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-4 h-4 rounded-full border border-white/30 bg-slate-300"></div>
                    ))}
                 </div>
                 <span className="text-[8px] text-white/50 font-black uppercase tracking-widest">{comm.memberCount || '---'} Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="py-12 text-center px-8">
        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">
          Route Zero • Join Your Community
        </p>
      </div>
    </div>
  );
};

export default CommunityListScreen;
