
import React, { useState } from 'react';
import { View, CommunityCircle, RoadBook, RoadSegment, POI, Stay, InterestCategory, RoadEvent } from './types';
import { COMMUNITIES } from './constants';
import HubScreen from './components/HubScreen';
import CommunityScreen from './components/CommunityScreen';
import CommunityListScreen from './components/CommunityListScreen';
import MapScreen from './components/MapScreen';
import CalendarScreen from './components/CalendarScreen';
import DiscoverScreen from './components/DiscoverScreen';
import RoadBookDetailScreen from './components/RoadBookDetailScreen';
import RoadSegmentDetailScreen from './components/RoadSegmentDetailScreen';
import StationListScreen from './components/StationListScreen';
import StationDetailScreen from './components/StationDetailScreen';
import StayListScreen from './components/StayListScreen';
import StayDetailScreen from './components/StayDetailScreen';
import InterestDetailScreen from './components/InterestDetailScreen';
import EventDetailScreen from './components/EventDetailScreen';
import POIDetailScreen from './components/POIDetailScreen';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.EXPLORE);
  const [activeCommunity, setActiveCommunity] = useState<CommunityCircle | null>(null);
  const [selectedRoadBook, setSelectedRoadBook] = useState<RoadBook | null>(null);
  const [selectedRoadSegment, setSelectedRoadSegment] = useState<RoadSegment | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<InterestCategory | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<RoadEvent | null>(null);
  const [prevViewBeforeSub, setPrevViewBeforeSub] = useState<View>(View.DISCOVER);

  const handleCommunityClick = (comm: CommunityCircle) => {
    if (comm.id === 'main-hub') {
      setCurrentView(View.COMMUNITY_LIST);
    } else {
      setActiveCommunity(comm);
      setCurrentView(View.COMMUNITY);
    }
  };

  const handleRoadBookClick = (book: RoadBook) => {
    setSelectedRoadBook(book);
    setCurrentView(View.ROAD_BOOK);
  };

  const handleRoadSegmentClick = (segment: RoadSegment) => {
    setSelectedRoadSegment(segment);
    setCurrentView(View.ROAD_SEGMENT_DETAIL);
  };

  const handleInterestClick = (interest: InterestCategory) => {
    setSelectedInterest(interest);
    setCurrentView(View.INTEREST_DETAIL);
  };

  const handlePOIDetailClick = (poi: POI) => {
    setPrevViewBeforeSub(currentView);
    setSelectedPOI(poi);
    
    if (poi.category === 'service') {
        setCurrentView(View.STATION_DETAIL);
    } else if (poi.category === 'stay') {
        setCurrentView(View.STAY_DETAIL);
    } else {
        setCurrentView(View.POI_DETAIL);
    }
  };

  const handleStationListClick = () => {
    setCurrentView(View.STATION_LIST);
  };

  const handleStayListClick = () => {
    setCurrentView(View.STAY_LIST);
  };

  const handleStayDetailClick = (stay: Stay) => {
    setPrevViewBeforeSub(currentView);
    setSelectedStay(stay);
    setCurrentView(View.STAY_DETAIL);
  };

  const handleEventClick = (event: RoadEvent) => {
    setPrevViewBeforeSub(currentView);
    setSelectedEvent(event);
    setCurrentView(View.EVENT_DETAIL);
  };

  const goBack = () => {
    if (currentView === View.COMMUNITY) {
        setCurrentView(View.COMMUNITY_LIST);
        setActiveCommunity(null);
    } else if (currentView === View.COMMUNITY_LIST) {
        setCurrentView(View.HUB);
    } else if (currentView === View.ROAD_BOOK) {
        setCurrentView(View.DISCOVER);
        setSelectedRoadBook(null);
    } else if (currentView === View.ROAD_SEGMENT_DETAIL) {
        setCurrentView(View.DISCOVER);
        setSelectedRoadSegment(null);
    } else if (currentView === View.STATION_LIST) {
        setCurrentView(View.DISCOVER);
    } else if (currentView === View.STATION_DETAIL) {
        setCurrentView(View.STATION_LIST);
    } else if (currentView === View.STAY_LIST) {
        setCurrentView(View.DISCOVER);
    } else if (currentView === View.STAY_DETAIL) {
        setCurrentView(prevViewBeforeSub);
        setSelectedStay(null);
    } else if (currentView === View.INTEREST_DETAIL) {
        setCurrentView(View.DISCOVER);
        setSelectedInterest(null);
    } else if (currentView === View.EVENT_DETAIL) {
        setCurrentView(prevViewBeforeSub);
        setSelectedEvent(null);
    } else if (currentView === View.POI_DETAIL) {
        setCurrentView(prevViewBeforeSub);
        setSelectedPOI(null);
    }
  };

  const hideGlobalHeader = currentView === View.STATION_LIST ||
                           currentView === View.STATION_DETAIL ||
                           currentView === View.STAY_LIST ||
                           currentView === View.STAY_DETAIL ||
                           currentView === View.COMMUNITY ||
                           currentView === View.COMMUNITY_LIST ||
                           currentView === View.ROAD_BOOK ||
                           currentView === View.INTEREST_DETAIL ||
                           currentView === View.EVENT_DETAIL ||
                           currentView === View.POI_DETAIL ||
                           currentView === View.ROAD_SEGMENT_DETAIL;
  const showBottomNav = [
    View.HUB,
    View.EXPLORE,
    View.DISCOVER,
    View.TRIP,
    View.ME
  ].includes(currentView);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background-dark text-slate-900 font-display relative transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-yellow-400/10 blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-[140px]"></div>
      </div>

      {!hideGlobalHeader && (
        <Header location="" onSearch={() => {}} onNotify={() => {}} />
      )}

      <main className={`flex-1 relative overflow-hidden ${hideGlobalHeader ? 'pt-0' : ''}`}>
        {currentView === View.HUB && (
          <HubScreen 
            communities={COMMUNITIES} 
            onCircleClick={handleCommunityClick} 
          />
        )}

        {currentView === View.EXPLORE && (
          <MapScreen onPOISelect={handlePOIDetailClick} />
        )}

        {currentView === View.DISCOVER && (
          <DiscoverScreen 
            onRoadBookClick={handleRoadBookClick} 
            onRoadSegmentClick={handleRoadSegmentClick}
            onStationClick={handleStationListClick}
            onStayAllClick={handleStayListClick}
            onStayClick={handleStayDetailClick}
            onInterestClick={handleInterestClick}
          />
        )}
        
        {currentView === View.COMMUNITY_LIST && (
          <CommunityListScreen 
            communities={COMMUNITIES.filter(c => c.type !== 'main')} 
            onBack={goBack} 
            onCommunityClick={handleCommunityClick}
          />
        )}

        {currentView === View.COMMUNITY && activeCommunity && (
          <CommunityScreen 
            community={activeCommunity} 
            onBack={goBack} 
            onEventClick={handleEventClick}
          />
        )}

        {currentView === View.ROAD_BOOK && selectedRoadBook && (
          <RoadBookDetailScreen 
            book={selectedRoadBook} 
            onBack={goBack} 
          />
        )}

        {currentView === View.INTEREST_DETAIL && selectedInterest && (
          <InterestDetailScreen 
            category={selectedInterest}
            onBack={goBack}
          />
        )}

        {currentView === View.ROAD_SEGMENT_DETAIL && selectedRoadSegment && (
          <RoadSegmentDetailScreen 
            segment={selectedRoadSegment} 
            onBack={goBack} 
            onPOIClick={handlePOIDetailClick}
          />
        )}

        {currentView === View.STATION_LIST && (
          <StationListScreen 
            onBack={goBack} 
            onStationClick={handlePOIDetailClick}
          />
        )}

        {currentView === View.STATION_DETAIL && selectedPOI && (
          <StationDetailScreen 
            station={selectedPOI} 
            onBack={goBack} 
          />
        )}

        {currentView === View.POI_DETAIL && selectedPOI && (
          <POIDetailScreen 
            poi={selectedPOI} 
            onBack={goBack} 
          />
        )}

        {currentView === View.STAY_LIST && (
          <StayListScreen 
            onBack={goBack}
            onStayClick={handleStayDetailClick}
          />
        )}

        {currentView === View.STAY_DETAIL && selectedStay && (
          <StayDetailScreen 
            stay={selectedStay}
            onBack={goBack}
          />
        )}

        {currentView === View.TRIP && (
          <CalendarScreen onEventClick={handleEventClick} />
        )}

        {currentView === View.EVENT_DETAIL && selectedEvent && (
          <EventDetailScreen event={selectedEvent} onBack={goBack} />
        )}

        {currentView === View.ME && (
          <div className="flex flex-col items-center justify-center h-full px-8 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 rounded-full bg-white border-2 border-primary mb-4 flex items-center justify-center overflow-hidden shadow-xl">
                <span className="material-symbols-outlined text-4xl text-slate-300">person</span>
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900 italic tracking-tighter">我的足迹</h3>
            <p className="text-slate-500 text-xs">漫游〇号公路，留下你的专属记忆。</p>
          </div>
        )}
      </main>

      {showBottomNav && (
        <BottomNav 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
      )}
    </div>
  );
};

export default App;
