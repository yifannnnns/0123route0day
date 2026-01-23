
import React, { useState, useEffect, useRef } from 'react';
import { POIS } from '../constants';
import { POI } from '../types';

interface StationListScreenProps {
  onBack: () => void;
  onStationClick: (station: POI) => void;
}

const VendingIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 110 135" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.6,72c-2.8.1-5,2.4-5,5.2s2.2,5.1,5,5.2h25.8c1.4,0,2.8-.5,3.8-1.4,1-1,1.6-2.3,1.6-3.7s-.6-2.8-1.6-3.7c-1-1-2.4-1.5-3.8-1.4h-25.8ZM65.7,77.2c0,1.8-1.5,3.2-3.2,3.2h-25.8c-1.7,0-3.1-1.5-3.1-3.2s1.3-3.1,3.1-3.2h25.8c1.8,0,3.2,1.5,3.2,3.2h0ZM71.7,47.5c0-1.2.7-2.3,1.9-2.8,1.1-.5,2.4-.2,3.3.6.9.9,1.1,2.1.6,3.3-.5,1.1-1.6,1.9-2.8,1.9-.8,0-1.6-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1h0ZM71.7,59.8c0-1.2.7-2.3,1.9-2.8,1.1-.5,2.4-.2,3.3.7.9.9,1.1,2.1.6,3.3s-1.6,1.9-2.8,1.9c-.8,0-1.6-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1h0ZM71.7,35.3c0-1.2.7-2.3,1.9-2.8,1.1-.5,2.4-.2,3.3.7.9.9,1.1,2.1.6,3.3-.5,1.1-1.6,1.9-2.8,1.9-.8,0-1.6-.3-2.1-.9-.6-.6-.9-1.3-.9-2.1h0ZM76.6,18.3h-36c-.6,0-1,.4-1,1s.4,1,1,1h36c3.9,0,7.1,3.2,7.1,7.1v59.9c0,3.9-3.2,7.1-7.1,7.1h-43.3c-3.9,0-7.1-3.2-7.1-7.1v-20.1h35c3.5,0,6.3-2.8,6.3-6.3v-26.6c0-3.5-2.8-6.3-6.3-6.3H26.3v-.5c0-3.9,3.2-7.1,7.1-7.1h3.4c.6,0,1-.4,1-1s-.4-1-1-1h-3.4c-5,0-9,4-9,9v60c0,4.6,3.5,8.5,8.1,9v1.7c0,2,1.6,3.6,3.6,3.7h9.1c2,0,3.7-1.6,3.7-3.7v-1.7h12.5v1.7c0,2,1.6,3.7,3.7,3.7h9.1c2,0,3.6-1.7,3.6-3.7v-1.8c4.6-.5,8-4.4,8-9V27.4c0-2.4-.9-4.7-2.6-6.4-1.7-1.7-4-2.6-6.4-2.7h0ZM61.3,29.9c2.4,0,4.4,2,4.4,4.4v6.4h-29.1c-.6,0-1,.4-1,1s.4,1,1,1h29.1v9.9h-16.9c-.3,0-.6,0-.8.2-.2.2-.4.5-.4.8s.1.6.4.8c.2.2.6.3.8.2h16.9v6.5c0,2.4-2,4.4-4.4,4.4H26.3v-10.9h18.6c.3,0,.6,0,.8-.2.2-.2.4-.5.4-.8s-.1-.6-.4-.8c-.2-.2-.5-.3-.8-.2h-18.6v-9.9h6.4c.6,0,1-.4,1-1s-.4-1-1-1h-6.4v-10.7h35ZM46.8,98c0,.9-.8,1.7-1.7,1.7h-9.1c-.9,0-1.7-.8-1.7-1.7v-1.7h12.5v1.7ZM74,99.7h-9.1c-.9,0-1.7-.8-1.7-1.7v-1.7h12.5v1.7c0,.9-.7,1.7-1.7,1.7h0Z"/>
  </svg>
);

// 12项功能筛选选项
const FEATURE_OPTIONS = [
  { id: 'transit', label: '客运中转', icon: 'directions_bus' },
  { id: 'parking', label: '机动车停车场', icon: 'local_parking' },
  { id: 'bike', label: '自行车租赁', icon: 'directions_bike' },
  { id: 'bus_stop', label: '公交站', icon: 'departure_board' },
  { id: 'charging', label: '机动车能源补给/充电桩', icon: 'ev_station' },
  { id: 'wc', label: '基础卫生间', icon: 'wc' },
  { id: 'nursery', label: '第三卫生间/母婴室', icon: 'family_restroom' },
  { id: 'food', label: '餐饮设施', icon: 'restaurant' },
  { id: 'retail', label: '零食/饮料售货机', icon: 'vending_machine_custom' },
  { id: 'rental', label: '便民工具租赁', icon: 'umbrella' },
  { id: 'info', label: '游客服务咨询中心', icon: 'info' },
  { id: 'medical', label: '医疗点', icon: 'medical_services' },
];

// 分级别主题色配置
const LEVEL_THEMES: Record<string, string> = {
  '一级驿站': '#172a88',
  '二级驿站': '#076fb8',
  '三级驿站': '#2ea8e1',
};

const StationListScreen: React.FC<StationListScreenProps> = ({ onBack, onStationClick }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeTab, setActiveTab] = useState<'distance' | 'features'>('distance');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  // 过滤逻辑
  const stations = POIS.filter(poi => poi.category === 'service');

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const getLevelTheme = (tags: string[]) => {
    const levelTag = tags.find(t => t.includes('级驿站')) || '三级驿站';
    return {
      label: levelTag,
      color: LEVEL_THEMES[levelTag] || LEVEL_THEMES['三级驿站']
    };
  };

  useEffect(() => {
    let map: any = null;
    if (viewMode === 'map' && mapContainerRef.current) {
      const TMap = (window as any).TMap;
      if (TMap) {
        const center = new TMap.LatLng(29.5350, 121.8100);
        map = new TMap.Map(mapContainerRef.current, {
          center: center,
          zoom: 13,
          mapStyleId: 'style1', 
          control: { scale: false, zoom: false }
        });
        mapInstanceRef.current = map;
        new TMap.MultiMarker({
          id: 'station-markers',
          map: map,
          styles: {
            'station-style': new TMap.MarkerStyle({
              width: 34, height: 42, anchor: { x: 17, y: 42 },
              src: 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker_blue.png'
            })
          },
          geometries: stations.map(station => ({
            id: station.id,
            styleId: 'station-style',
            position: new TMap.LatLng(station.lat, station.lng),
            properties: { title: station.name }
          }))
        });
      }
    }
    return () => {
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.destroy(); } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, [viewMode]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden animate-in slide-in-from-right-10 duration-500">
      {/* 顶部标题栏 & 一级筛选 */}
      <div className="px-6 pt-12 pb-4 bg-white z-50 shadow-sm border-b border-slate-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-primary active:scale-90 transition-transform">
              <span className="material-symbols-outlined font-bold">arrow_back</span>
            </button>
            <div>
              <h2 className="text-xl font-black tracking-tighter text-slate-900">驿站服务</h2>
              <p className="text-[8px] font-black uppercase text-slate-300 tracking-[0.2em] mt-0.5">Service Stations</p>
            </div>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}>列表</button>
            <button onClick={() => setViewMode('map')} className={`px-4 py-1.5 rounded-xl text-[10px] font-black transition-all ${viewMode === 'map' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}>地图</button>
          </div>
        </div>

        {/* 核心筛选页签 */}
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('distance')}
            className={`flex-1 py-3 rounded-2xl text-[11px] font-black tracking-widest transition-all border flex items-center justify-center gap-2 ${activeTab === 'distance' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
          >
            <span className="material-symbols-outlined text-base">near_me</span>
            距离优先
          </button>
          <button 
            onClick={() => setActiveTab('features')}
            className={`flex-1 py-3 rounded-2xl text-[11px] font-black tracking-widest transition-all border flex items-center justify-center gap-2 ${activeTab === 'features' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-slate-50 border-slate-100 text-slate-400'}`}
          >
            <span className="material-symbols-outlined text-base">tune</span>
            功能筛选 {selectedFeatures.length > 0 && `(${selectedFeatures.length})`}
          </button>
        </div>
      </div>

      {/* 二级功能滑块 */}
      {activeTab === 'features' && viewMode === 'list' && (
        <div className="bg-white px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-100 animate-in fade-in slide-in-from-top-2">
          {FEATURE_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => toggleFeature(opt.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-black border transition-all ${
                selectedFeatures.includes(opt.id) 
                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              {opt.icon === 'vending_machine_custom' ? (
                <VendingIcon className="w-3.5 h-3.5" />
              ) : (
                <span className="material-symbols-outlined text-[14px]">{opt.icon}</span>
              )}
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* 列表/地图显示区域 */}
      <div className="flex-1 relative overflow-hidden">
        {viewMode === 'list' ? (
          <div className="absolute inset-0 overflow-y-auto no-scrollbar pb-32 px-6 pt-6 space-y-4">
            {stations.map((station) => {
              // 简化名称：彻底去除 ·二级驿站 等后缀
              const cleanName = station.name.replace(/·[一二三]级驿站/g, '');
              const theme = getLevelTheme(station.tags);

              return (
                <div 
                  key={station.id} 
                  onClick={() => onStationClick(station)}
                  className="p-5 rounded-[32px] bg-white border border-white shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer group active:scale-[0.97]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* 图标背景根据等级色变化 */}
                      <div 
                        className="w-14 h-14 rounded-[22px] flex items-center justify-center transition-all group-hover:rotate-6 shadow-sm"
                        style={{ backgroundColor: `${theme.color}15`, color: theme.color }}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {theme.label.includes('一级') ? 'hub' : theme.label.includes('二级') ? 'location_city' : 'garage'}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight">
                          {cleanName}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {/* 级别标签：主题色填充 */}
                          <span 
                            className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider text-white"
                            style={{ backgroundColor: theme.color }}
                          >
                            {theme.label}
                          </span>
                          <span className="text-[10px] font-bold text-slate-300 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">near_me</span>
                            1.2km
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-100 group-hover:text-primary transition-all">chevron_right</span>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <p className="text-[11px] text-slate-400 font-medium line-clamp-1 flex-1 pr-6 italic">
                      {station.description}
                    </p>
                    <div className="flex gap-2">
                       <span className="material-symbols-outlined text-base text-slate-200">ev_station</span>
                       <span className="material-symbols-outlined text-base text-slate-200">wc</span>
                       <span className="material-symbols-outlined text-base text-slate-200">local_parking</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div className="py-10 text-center">
               <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">End of Services</p>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0">
            <div ref={mapContainerRef} className="w-full h-full" />
            <div className="absolute bottom-32 left-6 right-6 z-10">
              <div className="bg-slate-900/95 backdrop-blur-2xl rounded-[32px] p-6 border border-white/10 flex items-center gap-4 shadow-2xl">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">explore</span>
                </div>
                <div>
                   <p className="text-white text-sm font-black tracking-tight">发现最近的驿站</p>
                   <p className="text-white/40 text-[9px] font-medium mt-0.5 uppercase tracking-[0.2em]">Nearby Service Grid</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StationListScreen;
