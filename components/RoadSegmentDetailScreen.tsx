
import React, { useState, useRef } from 'react';
import { RoadSegment, POI } from '../types';
import { POIS } from '../constants';

interface RoadSegmentDetailScreenProps {
  segment: RoadSegment;
  onBack: () => void;
  onPOIClick: (poi: POI) => void;
}

const RoadSegmentDetailScreen: React.FC<RoadSegmentDetailScreenProps> = ({ segment, onBack, onPOIClick }) => {
  const themeColor = '#00E0EF';
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 针对“斑斓海岸”段补充的氛围图片列表
  const atmosphereImages = [
    segment.image, // 用户提供的主图
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000", // 纯净海滩
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000", // 绝美日落
    "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=1000", // 艺术中心氛围
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1000"  // 海岸公路感
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const width = e.currentTarget.clientWidth;
    const newIdx = Math.round(scrollLeft / width);
    if (newIdx !== activeIdx) setActiveIdx(newIdx);
  };

  const findPOIByName = (name: string) => {
    return POIS.find(p => p.name === name);
  };

  const Section = ({ title, subtitle, icon, items, description }: { title: string, subtitle: string, icon: string, items?: string[], description?: string }) => {
    return (
      <section className="px-2">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2" style={{ color: themeColor }}>
            <span className="material-symbols-outlined text-base">{icon}</span>
            {title} • {subtitle}
          </h3>
        </div>
        <div className="space-y-3">
          {description && (
             <div className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-white mb-2">
                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">{description}</p>
             </div>
          )}
          {items && items.map((name, i) => {
            const poi = findPOIByName(name);
            return (
              <div 
                key={i} 
                onClick={() => poi && onPOIClick(poi)}
                className="flex items-center justify-between bg-white/60 backdrop-blur-md border border-white p-4 rounded-[24px] shadow-sm hover:border-primary/40 transition-all group active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-900 shadow-sm transition-all group-hover:scale-110" 
                    style={{ backgroundColor: themeColor }}
                  >
                    <span className="font-black text-[10px]">{i + 1}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{name}</span>
                </div>
                <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors text-lg">chevron_right</span>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto no-scrollbar pb-40 animate-in slide-in-from-right-10 duration-500">
      {/* 顶部悬浮返回 */}
      <div className="sticky top-0 z-[60] h-0 overflow-visible px-6 pt-6 pointer-events-none">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 shadow-xl active:scale-90 pointer-events-auto transition-transform"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
      </div>

      {/* Hero 区域：升级为画廊 */}
      <div className="relative h-[65vh] flex-shrink-0">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
        >
          {atmosphereImages.map((img, idx) => (
            <div key={idx} className="h-full w-full flex-shrink-0 snap-center">
              <img 
                src={img} 
                className="w-full h-full object-cover" 
                alt={`${segment.name} atmosphere ${idx}`}
              />
            </div>
          ))}
        </div>
        
        {/* 滑动指示器 */}
        <div className="absolute top-[60vh] left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
          {atmosphereImages.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIdx ? 'w-6 bg-white shadow-lg' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-black/20 pointer-events-none"></div>
        
        <div className="absolute bottom-12 left-6 right-6 pointer-events-none">
          <div className="flex items-center gap-2 mb-3">
             <span className="w-8 h-[2.5px]" style={{ backgroundColor: themeColor }}></span>
             <span className="text-xs font-black uppercase tracking-[0.3em] text-white drop-shadow-md">Route 〇</span>
          </div>
          <h2 className="text-5xl font-black mb-2 leading-tight tracking-tighter text-white drop-shadow-2xl">{segment.name}</h2>
          <p className="text-xl font-bold text-white italic mb-4 drop-shadow-lg">{segment.description}</p>
          
          <div className="flex items-center gap-3">
             <div className="bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-sm">location_on</span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">{segment.locationInfo}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-20 space-y-12">
        {/* 引言板块 */}
        <section className="px-2">
          <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <span className="material-symbols-outlined text-6xl">format_quote</span>
             </div>
             <p className="text-lg text-slate-800 leading-relaxed font-black italic">
               {segment.fullIntro}
             </p>
             <div className="mt-4 flex flex-wrap gap-2">
                {['山海', '田园', '日落', '慢生活'].map(tag => (
                  <span key={tag} className="text-[9px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase tracking-widest"># {tag}</span>
                ))}
             </div>
          </div>
        </section>

        {/* 一定要看 */}
        <Section 
          title="一定要看" 
          subtitle="MUST SEE" 
          icon="visibility" 
          items={segment.mustSee} 
          description="山海田园，一口气看遍！斑斓海岸艺术中心、山海剧场、海带晒场……每一处都是大片既视感！"
        />
        
        {/* 一定要玩 */}
        <Section 
          title="一定要玩" 
          subtitle="MUST PLAY" 
          icon="sports_esports" 
          items={segment.mustPlay} 
          description="趣玩推荐：滩涂抓螃蟹，海上吹海风，湖泊旁放空。"
        />

        {/* 咖啡观景 */}
        <Section 
          title="喝咖啡观海景" 
          subtitle="COFFEE & VIEW" 
          icon="coffee" 
          items={segment.coffeeView} 
        />

        {/* 一定要吃 */}
        <Section 
          title="一定要吃" 
          subtitle="LOCAL FLAVORS" 
          icon="restaurant" 
          items={segment.mustEat} 
          description="必吃推荐：顶配大黄鱼，“西沪三宝（海带、紫菜和苔条）”地方味。"
        />

        {/* 特色营地 */}
        <Section 
          title="特色营地" 
          subtitle="CAMPING" 
          icon="camping" 
          items={segment.campsites} 
        />

        {/* 结尾小贴士 */}
        <section className="px-2 pt-4">
           <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              <h4 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-3 italic">Travel Tips</h4>
              <p className="text-sm font-medium leading-relaxed opacity-80 mb-6">
                有山、有海、有故事，斑斓海岸已经为你准备好了！🚗💨 记得在退潮时前往滩涂，会有意想不到的收获哦。
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                 <span className="w-6 h-[1px] bg-primary"></span>
                 Sustainable Tourism
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default RoadSegmentDetailScreen;
