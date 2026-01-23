
import React, { useEffect, useState, useMemo } from 'react';
import { CommunityCircle, Insight, RoadEvent } from '../types';
import { getCommunityInsights } from '../geminiService';
import { EVENTS } from '../constants';

interface CommunityScreenProps {
  community: CommunityCircle;
  onBack: () => void;
  onEventClick: (event: RoadEvent) => void;
}

const CommunityScreen: React.FC<CommunityScreenProps> = ({ community, onBack, onEventClick }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'intro' | 'topics' | 'events'>('intro');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getCommunityInsights(community.name);
      setInsights(data);
      setLoading(false);
    };
    fetch();
  }, [community]);

  const communityEvents = useMemo(() => {
    return EVENTS.filter(e => community.eventIds?.includes(e.id));
  }, [community]);

  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      {/* Hero Header */}
      <div className="relative h-64 flex-shrink-0">
        <img 
          src={community.image || 'https://picsum.photos/800/600'} 
          className="w-full h-full object-cover" 
          alt={community.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-black/20 to-transparent"></div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 shadow-xl active:scale-90 z-50"
        >
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-primary text-3xl drop-shadow-lg">{community.icon}</span>
            <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl">{community.name}</h2>
          </div>
          <div className="flex items-center gap-3">
             <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-black text-white/90 border border-white/20">
               {community.memberCount || '---'} 位同好已加入
             </span>
             <button className="bg-primary text-slate-900 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                加入圈子
             </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-0 bg-background-dark/80 backdrop-blur-xl z-40 border-b border-slate-100 flex px-6">
        {[
          { id: 'intro', label: '简介' },
          { id: 'topics', label: '话题' },
          { id: 'events', label: '活动' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] relative transition-all ${
              activeTab === tab.id ? 'text-primary' : 'text-slate-400'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-8 animate-in fade-in duration-300" key={activeTab}>
        
        {/* Intro Tab */}
        {activeTab === 'intro' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">社群定位</h3>
              <p className="text-base text-slate-600 leading-relaxed font-medium">
                {community.description || '暂无描述'}
              </p>
            </section>

            <section>
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
                AI 深度漫游指南
              </h3>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-28 bg-white rounded-3xl border border-slate-100 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.map((insight, idx) => (
                    <div key={idx} className="p-5 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-primary/20 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] font-black uppercase text-primary tracking-widest bg-primary/5 px-2.5 py-1 rounded-lg">
                          {insight.category}
                        </span>
                      </div>
                      <h4 className="font-black text-lg mb-2 text-slate-900 tracking-tight">{insight.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{insight.content}</p>
                    </div>
                  ))}
                  {insights.length === 0 && (
                    <p className="text-center text-slate-300 py-10 italic">灵感加载失败，请稍后重试。</p>
                  )}
                </div>
              )}
            </section>
          </div>
        )}

        {/* Topics Tab */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
               <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                  <span className="material-symbols-outlined text-slate-300 text-2xl flex items-center justify-center h-full">person</span>
               </div>
               <input 
                 type="text" 
                 placeholder="分享你的公路感官..." 
                 className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
               />
               <button className="text-primary material-symbols-outlined">add_circle</button>
            </div>

            {community.topics?.map(topic => (
              <div key={topic.id} className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={topic.avatar} className="w-10 h-10 rounded-full border border-slate-100" />
                    <div>
                       <p className="text-sm font-black text-slate-900">{topic.author}</p>
                       <p className="text-[10px] text-slate-400 font-bold">{topic.time}</p>
                    </div>
                  </div>
                  <button className="material-symbols-outlined text-slate-300">more_horiz</button>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium mb-4">{topic.content}</p>
                {topic.image && (
                  <div className="rounded-2xl overflow-hidden mb-4 aspect-video border border-slate-50">
                    <img src={topic.image} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-6 pt-2 border-t border-slate-50">
                   <button className="flex items-center gap-1.5 text-slate-400 hover:text-pink-500 transition-colors">
                      <span className="material-symbols-outlined text-lg">favorite</span>
                      <span className="text-[10px] font-black">{topic.likes}</span>
                   </button>
                   <button className="flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">chat_bubble</span>
                      <span className="text-[10px] font-black">{topic.comments}</span>
                   </button>
                </div>
              </div>
            ))}

            {(!community.topics || community.topics.length === 0) && (
              <div className="text-center py-20">
                 <span className="material-symbols-outlined text-5xl text-slate-100 mb-4">forum</span>
                 <p className="text-sm font-black text-slate-300 uppercase tracking-widest">暂无讨论话题</p>
                 <button className="mt-4 text-primary text-xs font-black border border-primary/20 px-6 py-2 rounded-full active:scale-95 transition-all">
                    发布第一个动态
                 </button>
              </div>
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">圈子专属活动</h3>
            {communityEvents.length > 0 ? (
              <div className="space-y-4">
                {communityEvents.map(event => (
                  <div 
                    key={event.id} 
                    onClick={() => onEventClick(event)}
                    className="flex gap-4 p-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <img src={event.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h4 className="text-sm font-black text-slate-900 line-clamp-1">{event.title}</h4>
                        <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                           <span className="material-symbols-outlined text-sm">schedule</span>
                           <span className="text-[10px] font-bold">{event.date} · {event.time}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                         <span className="text-primary font-black text-xs">{event.price}</span>
                         <span className="text-[10px] font-bold text-slate-300">{event.participants}人参与</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200">
                 <span className="material-symbols-outlined text-5xl text-slate-200 mb-4">event_available</span>
                 <p className="text-sm font-black text-slate-300 uppercase tracking-widest">近期暂无官方活动</p>
                 <p className="text-[10px] text-slate-400 mt-2">去广场看看其他有趣的内容吧</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CommunityScreen;
