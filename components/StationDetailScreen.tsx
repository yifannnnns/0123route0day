
import React from 'react';
import { POI } from '../types';

interface StationDetailScreenProps {
  station: POI;
  onBack: () => void;
}

const VendingIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 110 135" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.6,72c-2.8.1-5,2.4-5,5.2s2.2,5.1,5,5.2h25.8c1.4,0,2.8-.5,3.8-1.4,1-1,1.6-2.3,1.6-3.7s-.6-2.8-1.6-3.7c-1-1-2.4-1.5-3.8-1.4h-25.8ZM65.7,77.2c0,1.8-1.5,3.2-3.2,3.2h-25.8c-1.7,0-3.1-1.5-3.1-3.2s1.3-3.1,3.1-3.2h25.8c1.8,0,3.2,1.5,3.2,3.2h0ZM71.7,47.5c0-1.2.7-2.3,1.9-2.8,1.1-.5,2.4-.2,3.3.6.9.9,1.1,2.1.6,3.3-.5,1.1-1.6,1.9-2.8,1.9-.8,0-1.6-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1h0ZM71.7,59.8c0-1.2.7-2.3,1.9-2.8,1.1-.5,2.4-.2,3.3.7.9.9,1.1,2.1.6,3.3s-1.6,1.9-2.8,1.9c-.8,0-1.6-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1h0ZM71.7,35.3c0-1.2.7-2.3,1.9-2.8,1.1-.5,2.4-.2,3.3.7.9.9,1.1,2.1.6,3.3-.5,1.1-1.6,1.9-2.8,1.9-.8,0-1.6-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1h0ZM76.6,18.3h-36c-.6,0-1,.4-1,1s.4,1,1,1h36c3.9,0,7.1,3.2,7.1,7.1v59.9c0,3.9-3.2,7.1-7.1,7.1h-43.3c-3.9,0-7.1-3.2-7.1-7.1v-20.1h35c3.5,0,6.3-2.8,6.3-6.3v-26.6c0-3.5-2.8-6.3-6.3-6.3H26.3v-.5c0-3.9,3.2-7.1,7.1-7.1h3.4c.6,0,1-.4,1-1s-.4-1-1-1h-3.4c-5,0-9,4-9,9v60c0,4.6,3.5,8.5,8.1,9v1.7c0,2,1.6,3.6,3.6,3.7h9.1c2,0,3.7-1.6,3.7-3.7v-1.7h12.5v1.7c0,2,1.6,3.7,3.7,3.7h9.1c2,0,3.6-1.7,3.6-3.7v-1.8c4.6-.5,8-4.4,8-9V27.4c0-2.4-.9-4.7-2.6-6.4-1.7-1.7-4-2.6-6.4-2.7h0ZM61.3,29.9c2.4,0,4.4,2,4.4,4.4v6.4h-29.1c-.6,0-1,.4-1,1s.4,1,1,1h29.1v9.9h-16.9c-.3,0-.6,0-.8.2-.2.2-.4.5-.4.8s.1.6.4.8c.2.2.6.3.8.2h16.9v6.5c0,2.4-2,4.4-4.4,4.4H26.3v-10.9h18.6c.3,0,.6,0,.8-.2.2-.2.4-.5.4-.8s-.1-.6-.4-.8c-.2-.2-.5-.3-.8-.2h-18.6v-9.9h6.4c.6,0,1-.4,1-1s-.4-1-1-1h-6.4v-10.7h35ZM46.8,98c0,.9-.8,1.7-1.7,1.7h-9.1c-.9,0-1.7-.8-1.7-1.7v-1.7h12.5v1.7ZM74,99.7h-9.1c-.9,0-1.7-.8-1.7-1.7v-1.7h12.5v1.7c0,.9-.7,1.7-1.7,1.7h0Z"/>
  </svg>
);

const LEVEL_FEATURES = {
  '一级驿站': [
    { icon: 'directions_bus', label: '客运中转' },
    { icon: 'local_parking', label: '机动车停车场' },
    { icon: 'directions_bike', label: '自行车租赁' },
    { icon: 'departure_board', label: '公交站' },
    { icon: 'ev_station', label: '机动车能源补给/充电桩' },
    { icon: 'wc', label: '基础卫生间' },
    { icon: 'family_restroom', label: '第三卫生间/母婴室' },
    { icon: 'restaurant', label: '餐饮设施' },
    { icon: 'vending_machine_custom', label: '零食/饮料售货机' },
    { icon: 'umbrella', label: '便民工具租赁' },
    { icon: 'info', label: '游客服务咨询中心' },
    { icon: 'medical_services', label: '医疗点' },
  ],
  '二级驿站': [
    { icon: 'local_parking', label: '机动车停车场' },
    { icon: 'directions_bike', label: '自行车租赁' },
    { icon: 'wc', label: '基础卫生间' },
    { icon: 'delete', label: '垃圾桶' },
    { icon: 'chair', label: '休息设施' },
    { icon: 'park', label: '景观小品' },
    { icon: 'fire_extinguisher', label: '消防设施' },
  ],
  '三级驿站': [
    { icon: 'delete', label: '垃圾桶' },
    { icon: 'park', label: '景观小品' },
  ]
};

const LEVEL_THEMES: Record<string, string> = {
  '一级驿站': '#172a88',
  '二级驿站': '#076fb8',
  '三级驿站': '#2ea8e1',
};

const StationDetailScreen: React.FC<StationDetailScreenProps> = ({ station, onBack }) => {
  const levelTag = station.tags.find(t => t.includes('级驿站')) || '三级驿站';
  const features = LEVEL_FEATURES[levelTag as keyof typeof LEVEL_FEATURES] || LEVEL_FEATURES['三级驿站'];
  const themeColor = LEVEL_THEMES[levelTag] || LEVEL_THEMES['三级驿站'];
  
  // Clean station name for display
  const cleanName = station.name.replace(/·[一二三]级驿站/g, '');

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      {/* Hero Section */}
      <div className="relative h-[45vh] flex-shrink-0">
        <img 
          src={station.image || 'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&w=800'} 
          className="w-full h-full object-cover" 
          alt={station.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 z-50 shadow-xl active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>

        <div className="absolute bottom-10 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg text-white"
              style={{ backgroundColor: themeColor }}
            >
              {levelTag}
            </div>
            <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white border border-white/30">
               〇号公路 · 驿站网格
            </div>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl">{cleanName}</h2>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-20 space-y-8">
        {/* Features / Functions Section */}
        <section className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm" style={{ color: themeColor }}>settings_suggest</span>
            功能配置 • CONFIGURATION
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm" style={{ color: themeColor }}>
                  {feature.icon === 'vending_machine_custom' ? (
                    <VendingIcon className="w-5 h-5" />
                  ) : (
                    <span className="material-symbols-outlined text-base">{feature.icon}</span>
                  )}
                </div>
                <span className="text-[10px] font-black text-slate-700 leading-tight">{feature.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Description Section */}
        <section className="px-2">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">详情介绍</h3>
          <p className="text-base text-slate-600 leading-relaxed font-medium">
            {station.description} 作为{levelTag}，这里配备了完善的便民服务设施，是您公路漫游过程中的理想补给点。
          </p>
        </section>

        {/* Location Section */}
        <section className="bg-slate-900 rounded-[32px] p-6 text-white overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h3 className="text-[11px] font-black text-primary uppercase tracking-widest mb-4">地理位置 • LOCATION</h3>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">location_on</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white/90">象山县〇号公路 · 驿站节点</p>
                <p className="text-[10px] text-white/50 font-medium mt-1 uppercase tracking-widest">
                  Lat: {station.lat.toFixed(4)} / Lng: {station.lng.toFixed(4)}
                </p>
              </div>
            </div>
            <button className="w-full bg-primary text-slate-900 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all">
              <span className="material-symbols-outlined">near_me</span>
              一键开启导航
            </button>
          </div>
        </section>

        {/* Standard Info */}
        <div className="pt-4 pb-12 text-center">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em]">
             Xiangshan Route Zero • Standardized Grid Service
          </p>
        </div>
      </div>
    </div>
  );
};

export default StationDetailScreen;
