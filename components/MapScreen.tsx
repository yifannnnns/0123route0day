import React, { useState, useEffect, useRef } from 'react';
import { POIS } from '../constants';
import { POI } from '../types';

interface MapScreenProps {
  onPOISelect?: (poi: POI) => void;
}

const MODALITY_COLORS = {
  driving: '#00E0EF', // 青色
  transit: '#3B82F6', // 蓝色
  cycling: '#10B981', // 绿色
  walking: '#F97316'  // 橙色
};

const createThemedMarker = (color: string, iconPath: string) => {
  const svg = `
    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle cx="20" cy="20" r="14" fill="${color}" fill-opacity="0.1" stroke="${color}" stroke-width="1" filter="url(#glow)"/>
      <circle cx="20" cy="20" r="10" fill="${color}" stroke="white" stroke-width="1.5"/>
      <path d="${iconPath}" fill="white" transform="translate(11, 11) scale(0.7)"/>
    </svg>
  `.trim();
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const ICON_PATHS = {
  scenery: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0 M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z",
  food: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z",
  transit: "M12 2c-4.42 0-8 .5-8 4v10.5c0 .83.67 1.5 1.5 1.5h1v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2h4v2c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-2h1c.83 0 1.5-.67 1.5-1.5V6c0-3.5-3.58-4-8-4z",
  service: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
  stay: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm11-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"
};

// 模拟环岛全线坐标，其中一部分为斑斓海岸段
const GLOBAL_LOOP = [
  [29.580, 121.785], [29.540, 121.785], [29.500, 121.835], [29.450, 121.900],
  [29.350, 121.950], [29.250, 121.960], [29.150, 121.920], [29.250, 121.850],
  [29.400, 121.780], [29.580, 121.785]
];

const MODALITY_ROUTES = {
  driving: [
    [29.580, 121.785], [29.570, 121.782], [29.560, 121.780], [29.540, 121.785],
    [29.530, 121.790], [29.520, 121.800], [29.510, 121.815], [29.500, 121.835]
  ],
  transit: [[29.580, 121.785], [29.540, 121.785], [29.500, 121.835]],
  cycling: [[29.580, 121.785], [29.560, 121.780], [29.540, 121.785], [29.530, 121.790], [29.500, 121.835]],
  walking: [[29.535, 121.788], [29.530, 121.790], [29.528, 121.795], [29.510, 121.815]]
};

const MapScreen: React.FC<MapScreenProps> = ({ onPOISelect }) => {
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [activeTheme, setActiveTheme] = useState<string>('all');
  const [activeModality, setActiveModality] = useState<'driving' | 'transit' | 'cycling' | 'walking'>('driving');
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersRef = useRef<{ markers: any, polyline: any, globalLine: any } | null>(null);

  // 驿站服务分类置前
  const themes = [
    { id: 'all', label: '全部', icon: 'apps' },
    { id: 'service', label: '驿站服务', icon: 'storefront' },
    { id: 'scenery', label: '特色景点', icon: 'photo_camera' },
    { id: 'food', label: '海味餐饮', icon: 'restaurant' },
    { id: 'stay', label: '精品住宿', icon: 'bed' },
    { id: 'transit', label: '交通接驳', icon: 'subway' }
  ];

  const modalities = [
    { id: 'transit', label: '公交', icon: 'directions_bus', color: MODALITY_COLORS.transit },
    { id: 'driving', label: '车行', icon: 'directions_car', color: MODALITY_COLORS.driving },
    { id: 'cycling', label: '骑行', icon: 'directions_bike', color: MODALITY_COLORS.cycling },
    { id: 'walking', label: '步行', icon: 'directions_walk', color: MODALITY_COLORS.walking }
  ];

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const TMap = (window as any).TMap;
      if (!TMap) return;

      const center = new TMap.LatLng(29.5350, 121.7880);
      
      mapInstanceRef.current = new TMap.Map(mapContainerRef.current, {
        center: center,
        zoom: 14,
        mapStyleId: 'style2', 
        control: { scale: false, zoom: false }
      });

      const markerLayer = new TMap.MultiMarker({
        id: 'marker-layer',
        map: mapInstanceRef.current,
        styles: {
          'scenery': new TMap.MarkerStyle({ width: 32, height: 32, src: createThemedMarker('#00E0EF', ICON_PATHS.scenery) }),
          'food': new TMap.MarkerStyle({ width: 32, height: 32, src: createThemedMarker('#FFA000', ICON_PATHS.food) }),
          'transit': new TMap.MarkerStyle({ width: 32, height: 32, src: createThemedMarker('#3B82F6', ICON_PATHS.transit) }),
          'service': new TMap.MarkerStyle({ width: 32, height: 32, src: createThemedMarker('#10B981', ICON_PATHS.service) }),
          'stay': new TMap.MarkerStyle({ width: 32, height: 32, src: createThemedMarker('#8B5CF6', ICON_PATHS.stay) })
        },
        geometries: []
      });

      markerLayer.on('click', (evt: any) => {
        const poi = POIS.find(p => p.id === evt.geometry.id);
        if (poi) setSelectedPOI(poi);
      });

      // 环岛全线（底色）
      const globalLineLayer = new TMap.MultiPolyline({
        id: 'global-circuit',
        map: mapInstanceRef.current,
        styles: {
          'loop-path': new TMap.PolylineStyle({ color: 'rgba(255,255,255,0.15)', width: 4, lineCap: 'round' })
        },
        geometries: [{
          id: 'global-loop',
          styleId: 'loop-path',
          paths: GLOBAL_LOOP.map(p => new TMap.LatLng(p[0], p[1]))
        }]
      });

      // 斑斓海岸高亮路段（动态颜色）
      const polylineLayer = new TMap.MultiPolyline({
        id: 'highlight-circuit',
        map: mapInstanceRef.current,
        styles: {
          'modality-path': new TMap.PolylineStyle({ color: MODALITY_COLORS[activeModality], width: 8, lineCap: 'round', showArrow: true })
        },
        geometries: []
      });

      layersRef.current = { markers: markerLayer, polyline: polylineLayer, globalLine: globalLineLayer };
    }
  }, []);

  useEffect(() => {
    if (layersRef.current?.markers) {
      const filteredPOIs = activeTheme === 'all' ? POIS : POIS.filter(poi => poi.category === activeTheme);
      layersRef.current.markers.setGeometries(filteredPOIs.map(poi => ({
        id: poi.id,
        styleId: poi.category,
        position: new (window as any).TMap.LatLng(poi.lat, poi.lng)
      })));
    }
  }, [activeTheme]);

  useEffect(() => {
    if (layersRef.current?.polyline) {
      const TMap = (window as any).TMap;
      // 使用 setStyles 替换 updateStyle
      layersRef.current.polyline.setStyles({
        'modality-path': new TMap.PolylineStyle({ 
          color: MODALITY_COLORS[activeModality], 
          width: 8, 
          lineCap: 'round', 
          showArrow: true 
        })
      });
      // 更新轨迹
      layersRef.current.polyline.setGeometries([{
        id: 'balan-highlight',
        styleId: 'modality-path',
        paths: MODALITY_ROUTES[activeModality].map(p => new TMap.LatLng(p[0], p[1]))
      }]);
    }
  }, [activeModality]);

  return (
    <div className="flex flex-col h-full bg-[#040810] relative animate-in fade-in duration-700 overflow-hidden">
      <div ref={mapContainerRef} className="absolute inset-0 z-0 brightness-[0.6]" />
      
      {/* 顶部悬浮分类 - 驿站服务优先 */}
      <div className="absolute inset-x-0 top-6 z-[60] px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all border backdrop-blur-3xl ${
                activeTheme === theme.id ? 'bg-primary border-primary text-slate-900 shadow-[0_0_15px_rgba(0,224,239,0.4)]' : 'bg-slate-900/60 border-white/10 text-slate-400'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{theme.icon}</span>
              <span className="text-[10px] font-black">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 右侧多层级出行切换 */}
      <div className="absolute right-6 top-24 z-50 flex flex-col gap-3">
        {modalities.map(m => (
          <button
            key={m.id}
            onClick={() => setActiveModality(m.id as any)}
            className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center transition-all border backdrop-blur-md relative ${
              activeModality === m.id 
              ? 'bg-slate-900 border-2 shadow-lg' 
              : 'bg-slate-900/60 border-white/10 text-white/60'
            }`}
            style={{ borderColor: activeModality === m.id ? m.color : 'transparent' }}
          >
            <span className={`material-symbols-outlined text-xl`} style={{ color: activeModality === m.id ? m.color : undefined }}>{m.icon}</span>
            <span className="text-[7px] font-black uppercase tracking-tighter mt-0.5">{m.label}</span>
            {activeModality === m.id && (
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-4 rounded-full" style={{ backgroundColor: m.color }}></div>
            )}
          </button>
        ))}
      </div>

      {/* 底部详情卡片 */}
      <div className="absolute inset-x-0 bottom-32 z-50 px-6">
        {selectedPOI ? (
          <div 
            onClick={() => onPOISelect?.(selectedPOI)}
            className="bg-white rounded-[40px] p-6 shadow-2xl animate-in slide-in-from-bottom-10 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    {selectedPOI.category === 'food' ? 'restaurant' : 
                     selectedPOI.category === 'stay' ? 'bed' : 
                     selectedPOI.category === 'service' ? 'storefront' : 'location_on'}
                  </span>
                </div>
                <div>
                  <h3 className="font-black text-xl tracking-tight text-slate-900">{selectedPOI.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {selectedPOI.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded"># {tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setSelectedPOI(null); }} className="text-slate-300"><span className="material-symbols-outlined">close</span></button>
            </div>
            <p className="text-sm text-slate-500 mb-6 line-clamp-2">{selectedPOI.description}</p>
            <div className="flex items-center justify-center py-1 border-t border-slate-50">
               <p className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
                 查看详细导览 <span className="material-symbols-outlined text-sm">arrow_forward</span>
               </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-[40px] p-4 border border-white/10 flex items-center justify-between text-white">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">layers</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest">斑斓海岸多模态导览</p>
                  <p className="text-white/40 text-[8px] font-medium uppercase tracking-[0.2em]">Balan Coast Multi-layer Navigation</p>
                </div>
             </div>
             <div className="flex gap-2">
                <span className="text-[10px] font-bold text-slate-400">切换右侧图层发现线路</span>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapScreen;