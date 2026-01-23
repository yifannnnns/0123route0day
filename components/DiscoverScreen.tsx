
import React from 'react';
import { ROAD_SEGMENTS, ROAD_BOOKS, ROAD_STAYS } from '../constants';
import { RoadBook, RoadSegment, Stay, InterestCategory } from '../types';

const RouteZeroIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg 
    viewBox="0 0 607.73 607.7" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M40.77,150.44c27.18-46.42,64.05-83.09,110.67-110.01C198.06,13.47,249.2,0,304.86,0s106.04,13.47,152.43,40.42c46.39,26.92,83.06,63.59,110.01,110.01,26.92,46.36,40.42,97.2,40.42,152.4s-13.5,106.84-40.42,153.42c-26.95,46.62-63.62,83.49-110.01,110.67-46.39,27.17-97.22,40.76-152.43,40.76s-106.8-13.59-153.42-40.76c-46.62-27.18-83.49-64.05-110.67-110.67C13.59,409.68,0,358.5,0,302.84s13.59-106.04,40.77-152.4M413.54,488.07c31.81-17.88,56.66-42.95,74.57-75.22,17.88-32.24,26.84-68.91,26.84-110.02s-8.95-76.87-26.84-108.68c-17.91-31.81-42.76-56.66-74.57-74.54-31.81-17.91-68.03-26.86-108.68-26.86s-77.78,8.96-110.01,26.86c-32.27,17.88-57.31,42.73-75.22,74.54-17.88,31.81-26.84,68.03-26.84,108.68s8.96,77.78,26.84,110.02c17.91,32.26,42.95,57.33,75.22,75.22,32.24,17.91,68.94,26.83,110.01,26.83s76.87-8.93,108.68-26.83M510.96,194.16c1.76,3.09,4.75,5.74,8.95,7.96,4.18,2.21,8.5,3.29,12.91,3.29s8.39-1.08,11.94-3.29c3.1-1.77,5.74-4.76,7.96-8.96,2.19-4.2,3.3-8.5,3.3-12.9,0-4-1.11-7.73-3.3-11.28l-6.62-12.59c-2.22-3.99-5.43-7.05-9.61-9.28-4.21-2.21-8.53-3.32-12.93-3.32-6.62,0-12.17,2.56-16.57,7.62-4.41,5.08-6.62,10.94-6.62,17.57,0,3.98,1.11,7.73,3.33,11.28l7.28,13.9Z"/>
  </svg>
);

interface DiscoverScreenProps {
  onRoadBookClick: (book: RoadBook) => void;
  onRoadSegmentClick: (segment: RoadSegment) => void;
  onStationClick: () => void;
  onStayAllClick: () => void;
  onStayClick: (stay: Stay) => void;
  onInterestClick: (interest: InterestCategory) => void;
}

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({ 
  onRoadBookClick, 
  onRoadSegmentClick, 
  onStationClick,
  onStayAllClick,
  onStayClick,
  onInterestClick
}) => {
  const featuredSegment = ROAD_SEGMENTS.find(s => s.id === 'rs1');
  const otherSegments = ROAD_SEGMENTS.filter(s => s.id !== 'rs1');

  const homeStays = ROAD_STAYS.slice(0, 4);

  const convenienceServices = [
    { name: '驿站', icon: 'storefront', action: onStationClick },
    { name: '补给', icon: 'local_mall' },
    { name: '停车场', icon: 'local_parking' },
    { name: '充电', icon: 'ev_station' },
    { name: '医疗', icon: 'medical_services' },
  ];

  const interestDestinations: InterestCategory[] = [
    { 
      id: 'sports',
      name: '纵情运动', 
      tag: 'Sports',
      icon: 'fitness_center', 
      image: 'https://private-user-images.githubusercontent.com/124782344/539118345-7b626959-4380-4a98-b090-da472f4bc20c.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjkwODMyMzAsIm5iZiI6MTc2OTA4MjkzMCwicGF0aCI6Ii8xMjQ3ODIzNDQvNTM5MTE4MzQ1LTdiNjI2OTU5LTQzODAtNGE5OC1iMDkwLWRhNDcyZjRiYzIwYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDEyMlQxMTU1MzBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hYWRhOWI5Mzg2ODE0MDRmNzg1ZjU1Y2IzMDk2Nzk2ZmI0YmU3ZWViMmIzMmJhNDllMTQ3MDEwMjRiMjI5YWE3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.YcB-jCdLB0QwX0XV2PAwktQo0xbecY14l-A_CxN-lc4',
      description: '帆船、骑行、徒步',
      items: [
        { name: '霞光骑行', icon: 'directions_bike', tag: 'New' },
        { name: '海上篮球', icon: 'sports_basketball', tag: 'Hot' },
        { name: '帆船运动', icon: 'sailing', tag: 'Hot' },
        { name: '海边瑜伽', icon: 'self_improvement' },
        { name: '环岛骑行', icon: 'directions_bike' },
        { name: '崖壁徒步', icon: 'hiking' }
      ]
    },
    { 
      id: 'pets',
      name: '宠物友好', 
      tag: 'Pet Friendly',
      icon: 'pets', 
      image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400',
      description: '带上毛孩子去撒欢',
      items: [
        { name: '摇尾巴咖啡', icon: 'coffee', tag: 'Recommended' }
      ]
    },
    { 
      id: 'culture',
      name: '艺文空间', 
      tag: 'Cultural Space',
      icon: 'palette', 
      image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=400',
      description: '旧船厂里的艺术 dream',
      items: [
        { name: '斑斓海岸艺术中心', icon: 'museum', tag: 'New' }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-32 animate-in fade-in duration-700">
      <div className="px-6 pt-4 mb-8">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900">发现</h1>
        <p className="text-slate-500 text-sm font-medium italic">漫游〇号公路，发现不期而遇的惊喜</p>
      </div>

      {/* 1. 十大特色环线 */}
      <section className="mb-8">
        <div className="px-6 flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <RouteZeroIcon className="w-6 h-6 text-[#06ddec] drop-shadow-[0_2px_8px_rgba(6,221,236,0.3)]" />
            十大特色环线
          </h2>
        </div>
        
        {featuredSegment && (
          <div className="px-6 mb-6">
            <div 
              onClick={() => !featuredSegment.isLocked && onRoadSegmentClick(featuredSegment)}
              className={`rounded-[32px] overflow-hidden relative shadow-xl border border-white transition-all h-64 cursor-pointer active:scale-[0.98] ${
                featuredSegment.isLocked ? 'opacity-90' : 'shadow-primary/20 ring-2 ring-primary/20'
              }`}
            >
              <img src={featuredSegment.image} className="w-full h-full object-cover" alt={featuredSegment.name} />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12 opacity-40">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path 
                      d={featuredSegment.pathData || "M10 50 Q 50 10, 90 50 T 10 50"} 
                      fill="none" 
                      stroke="#06ddec" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      className="route-glow"
                    />
                 </svg>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              <div className="absolute bottom-5 left-6 right-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white font-black text-2xl mb-1 leading-tight">
                      {featuredSegment.name}
                    </p>
                    <p className="text-white/90 text-sm font-bold mb-3 italic drop-shadow-sm">
                      {featuredSegment.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#06ddec] text-sm">distance</span>
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">{featuredSegment.length}</p>
                      <span className="w-1 h-1 rounded-full bg-white/30 mx-1"></span>
                      <span className="material-symbols-outlined text-[#06ddec] text-sm">schedule</span>
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-wider">{featuredSegment.duration}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">{featuredSegment.isLocked ? 'lock' : 'arrow_forward'}</span>
                  </div>
                </div>
              </div>

              {featuredSegment.isLocked && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                   <span className="material-symbols-outlined text-4xl mb-2 opacity-80">lock</span>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-80">建设中 · 敬请期待</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="px-6 flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {otherSegments.map(s => (
            <div 
              key={s.id} 
              onClick={() => !s.isLocked && onRoadSegmentClick(s)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 cursor-pointer group active:scale-95 transition-transform ${s.isLocked ? 'opacity-50' : ''}`}
            >
              <div className="w-12 h-12 rounded-full border border-slate-200 bg-white shadow-sm flex items-center justify-center overflow-hidden relative transition-all group-hover:border-primary/50 group-hover:scale-105">
                 <img src={s.image} className="w-full h-full object-cover" alt={s.name} />
                 <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                    {s.isLocked ? (
                      <span className="material-symbols-outlined text-[14px] text-white">lock</span>
                    ) : (
                      <span className="material-symbols-outlined text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">visibility</span>
                    )}
                 </div>
              </div>
              <span className="text-[8px] font-black text-slate-400 whitespace-nowrap tracking-tight uppercase group-hover:text-primary transition-colors">{s.name.replace('段', '')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 玩法推荐 */}
      <section className="mb-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <span className="material-symbols-outlined text-[#06ddec]">auto_stories</span>
            玩法推荐
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {ROAD_BOOKS.map(book => (
            <div 
              key={book.id} 
              onClick={() => onRoadBookClick(book)}
              className="flex gap-4 p-3 rounded-2xl bg-white border border-slate-100 hover:border-primary/30 transition-all cursor-pointer group active:scale-[0.98] shadow-sm hover:shadow-xl"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                <img src={book.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-sm font-bold mb-1 text-slate-900 group-hover:text-primary transition-colors">{book.title}</h3>
                  <p className="text-[10px] text-slate-400">作者：{book.author}</p>
                </div>
                <span className={`self-start text-[9px] font-black uppercase tracking-widest ${book.type === 'official' ? 'text-[#06ddec]' : 'text-secondary'}`}>
                  {book.type === 'official' ? 'Official Guide' : 'Deep Niche'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 兴趣目的地 */}
      <section className="mb-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <span className="material-symbols-outlined text-[#06ddec]">explore_nearby</span>
            兴趣目的地
          </h2>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Find Your Interest</span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          {interestDestinations.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => onInterestClick(dest)}
              className="flex-shrink-0 w-64 h-80 rounded-[32px] overflow-hidden relative shadow-lg group cursor-pointer active:scale-95 transition-transform"
            >
              <img src={dest.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={dest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              
              <div className="absolute top-5 left-5">
                <div className="bg-[#06ddec]/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                   <span className="material-symbols-outlined text-[14px] text-white">{dest.icon}</span>
                   <span className="text-[8px] font-black text-white uppercase tracking-widest">{dest.tag}</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-black text-xl mb-1 tracking-tight">{dest.name}</h3>
                <p className="text-white/70 text-[10px] font-medium leading-tight">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 便民服务 */}
      <section className="mb-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <span className="material-symbols-outlined text-[#06ddec]">support_agent</span>
            便民服务
          </h2>
        </div>
        
        <div className="grid grid-cols-5 gap-3">
          {convenienceServices.map((service, idx) => (
            <div 
              key={idx} 
              onClick={service.action}
              className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 bg-white group-hover:border-primary/20 transition-all">
                <span className="material-symbols-outlined text-xl text-slate-600 group-hover:text-[#06ddec] transition-colors">{service.icon}</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 group-hover:text-[#06ddec] transition-colors">{service.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 特色住宿 */}
      <section className="mb-8 px-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900">
            <span className="material-symbols-outlined text-[#06ddec]">bed</span>
            特色住宿
          </h2>
          <button 
            onClick={onStayAllClick}
            className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#06ddec] transition-colors"
          >
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {homeStays.map(stay => (
            <div 
              key={stay.id} 
              onClick={() => onStayClick(stay)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 group cursor-pointer hover:border-primary/40 transition-all shadow-md hover:shadow-xl"
            >
              <div className="h-32 relative overflow-hidden">
                <img src={stay.image} className="w-full h-full object-cover" alt={stay.name} />
              </div>
              <div className="p-3">
                <h3 className="text-xs font-bold mb-1 line-clamp-1 text-slate-900">{stay.name}</h3>
                <span className="text-[#06ddec] text-[10px] font-black">{stay.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DiscoverScreen;
