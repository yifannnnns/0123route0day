
import React from 'react';
import { POI } from '../types';

interface POIDetailScreenProps {
  poi: POI;
  onBack: () => void;
}

const POIDetailScreen: React.FC<POIDetailScreenProps> = ({ poi, onBack }) => {
  const isFood = poi.category === 'food';
  const themeColor = isFood ? '#FFA000' : '#00E0EF';
  const themeBg = isFood ? 'bg-orange-50' : 'bg-primary/5';
  const themeText = isFood ? 'text-orange-600' : 'text-primary';

  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      {/* Hero Header */}
      <div className="relative h-[50vh] flex-shrink-0">
        <img 
          src={poi.image || 'https://images.unsplash.com/photo-1506466010722-395ee2bef877?auto=format&w=800'} 
          className="w-full h-full object-cover" 
          alt={poi.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/20"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 z-50 shadow-xl active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>

        <div className="absolute bottom-10 left-6 right-6">
          <div className="flex flex-wrap gap-2 mb-3">
             {poi.tags.map(tag => (
               <span key={tag} className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-sm">
                 {tag}
               </span>
             ))}
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl leading-tight">{poi.name}</h2>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-20 space-y-10">
        {/* Info Card */}
        <section className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-4">
           <div className="flex items-start gap-4">
             <div className={`w-10 h-10 rounded-2xl ${themeBg} flex items-center justify-center ${themeText}`}>
               <span className="material-symbols-outlined">info</span>
             </div>
             <div className="flex-1">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">简介介绍</p>
               <p className="text-sm font-medium text-slate-600 leading-relaxed">{poi.description}</p>
             </div>
           </div>

           <div className="h-[1px] bg-slate-50 w-full"></div>

           <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-2xl ${themeBg} flex items-center justify-center ${themeText}`}>
                   <span className="material-symbols-outlined">schedule</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">营业时间</p>
                    <p className="text-sm font-black text-slate-800">{poi.openHours || '全天开放'}</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <div className={`w-10 h-10 rounded-2xl ${themeBg} flex items-center justify-center ${themeText}`}>
                   <span className="material-symbols-outlined">location_on</span>
                 </div>
                 <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">详细地址</p>
                    <p className="text-sm font-black text-slate-800 line-clamp-1">{poi.address || '象山县〇号公路斑斓海岸段'}</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Highlight Section (Recommendation / Menu) */}
        {poi.recommendations && poi.recommendations.length > 0 && (
          <section>
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
              <span className="material-symbols-outlined text-base" style={{ color: themeColor }}>
                {isFood ? 'restaurant_menu' : 'stars'}
              </span>
              {isFood ? '必点清单 • MUST ORDER' : '核心亮点 • HIGHLIGHTS'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {poi.recommendations.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm flex items-center gap-3 group hover:border-primary/20 transition-all">
                  <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: themeColor }}></div>
                  <span className="text-xs font-bold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Atmosphere Gallery */}
        <section>
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-base" style={{ color: themeColor }}>photo_library</span>
            实拍氛围 • GALLERY
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
             {[1,2,3].map(i => (
               <div key={i} className="flex-shrink-0 w-64 h-40 rounded-[28px] overflow-hidden shadow-lg border-2 border-white">
                 <img src={`https://picsum.photos/seed/${poi.id}${i}/400/300`} className="w-full h-full object-cover" alt="Gallery" />
               </div>
             ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="pt-6 pb-12 flex flex-col items-center">
           <button 
             className="w-full text-white py-5 rounded-[28px] font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
             style={{ 
               background: isFood ? 'linear-gradient(135deg, #FFA000 0%, #FF5722 100%)' : 'linear-gradient(135deg, #00E0EF 0%, #3B82F6 100%)',
               boxShadow: `0 10px 30px ${isFood ? 'rgba(255, 160, 0, 0.3)' : 'rgba(0, 224, 239, 0.3)'}` 
             }}
           >
             <span className="material-symbols-outlined font-bold">navigation</span>
             一键导航 • START NAVIGATION
           </button>
           <div className="mt-8 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">
               Sustainable Tourism • Enjoy The Loop
             </p>
             <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default POIDetailScreen;
