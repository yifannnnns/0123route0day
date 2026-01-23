
import React from 'react';
import { RoadEvent } from '../types';

interface EventDetailScreenProps {
  event: RoadEvent;
  onBack: () => void;
}

const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ event, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-background-dark overflow-y-auto no-scrollbar pb-32 animate-in slide-in-from-right-10 duration-500">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex-shrink-0">
        <img 
          src={event.image} 
          className="w-full h-full object-cover" 
          alt={event.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-black/20"></div>
        
        {/* Top Controls */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 shadow-xl active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full glass-circle flex items-center justify-center text-slate-900 shadow-xl active:scale-90">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
            <button className="w-10 h-10 rounded-full glass-circle flex items-center justify-center text-pink-500 shadow-xl active:scale-90">
              <span className="material-symbols-outlined text-xl">favorite</span>
            </button>
          </div>
        </div>

        {/* Content Heading Overlay */}
        <div className="absolute bottom-10 left-6 right-6">
          <div className="flex items-center gap-2 mb-3">
            <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg text-white ${
              event.type === 'music' ? 'bg-primary' : event.type === 'sport' ? 'bg-blue-500' : 'bg-pink-500'
            }`}>
              {event.type}
            </div>
            {event.isHot && (
              <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                热门推荐
              </div>
            )}
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl leading-tight">{event.title}</h2>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-20 space-y-8">
        {/* Quick Info Section */}
        <section className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100 grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">日期</p>
              <p className="text-sm font-black text-slate-800">{event.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">时间</p>
              <p className="text-sm font-black text-slate-800">{event.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">地点</p>
              <p className="text-sm font-black text-slate-800 truncate max-w-[100px]">{event.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">价格</p>
              <p className="text-sm font-black text-slate-800">{event.price}</p>
            </div>
          </div>
        </section>

        {/* Participants Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">已参与人数 • ATTENDEES</h3>
             <span className="text-[11px] font-black text-primary">{event.participants} 人参与</span>
          </div>
          <div className="flex -space-x-3">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="w-12 h-12 rounded-full border-4 border-background-dark bg-slate-100 overflow-hidden shadow-sm">
                 <img src={`https://i.pravatar.cc/100?u=${event.id}${i}`} className="w-full h-full object-cover" />
               </div>
             ))}
             <div className="w-12 h-12 rounded-full border-4 border-background-dark bg-white flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
               +
             </div>
          </div>
        </section>

        {/* Description Section */}
        <section>
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">详情介绍</h3>
          <p className="text-base text-slate-600 leading-relaxed font-medium">
            {event.description || `在象山〇号公路的 ${event.location}，我们将举办一场精彩的 ${event.type} 活动。诚邀所有公路漫游者参与，共同感受这片土地的无限活力。`}
          </p>
        </section>

        {/* Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-2xl border-t border-slate-100 z-[110]">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">剩余名额</span>
               <p className="text-lg font-black text-slate-900">{event.slotsLeft || '50+'} Slots</p>
            </div>
            <button className="bg-cyan-blue-gradient text-white px-10 py-4 rounded-[24px] font-black text-sm shadow-xl shadow-primary/20 active:scale-95 transition-all">
               立即报名 • REGISTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailScreen;
