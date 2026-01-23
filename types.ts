
export enum View {
  HUB = 'hub',
  EXPLORE = 'explore',
  DISCOVER = 'discover',
  COMMUNITY = 'community',
  TRIP = 'trip',
  ME = 'me',
  ROAD_BOOK = 'road_book',
  ROAD_SEGMENT_DETAIL = 'road_segment_detail',
  STATION_LIST = 'station_list',
  STATION_DETAIL = 'station_detail',
  STAY_LIST = 'stay_list',
  STAY_DETAIL = 'stay_detail',
  INTEREST_DETAIL = 'interest_detail',
  EVENT_DETAIL = 'event_detail',
  POI_DETAIL = 'poi_detail',
  COMMUNITY_LIST = 'community_list'
}

export interface Topic {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  time: string;
}

export interface CommunityCircle {
  id: string;
  name: string;
  subtitle?: string;
  icon: string;
  image: string;
  type: 'main' | 'satellite' | 'action';
  position?: { top?: string, bottom?: string, left?: string, right?: string };
  size: string;
  description?: string;
  memberCount?: string;
  topics?: Topic[];
  eventIds?: string[]; // IDs of events from the global constants
}

export interface Insight {
  title: string;
  content: string;
  category: string;
}

export interface POI {
  id: string;
  name: string;
  category: 'scenery' | 'food' | 'stay' | 'transit' | 'service';
  lat: number;
  lng: number;
  description: string;
  tags: string[];
  image?: string;
  address?: string;
  phone?: string;
  openHours?: string;
  gallery?: string[];
  recommendations?: string[];
}

export interface RoadEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'market' | 'music' | 'sport' | 'culture' | 'community';
  image: string;
  price: string;
  isHot?: boolean;
  slotsLeft?: number;
  participants: number;
  description?: string;
}

export interface RoadSegment {
  id: string;
  name: string;
  image: string;
  description: string;
  fullIntro?: string;
  length?: string;
  duration?: string;
  highlights?: string[];
  gallery?: string[];
  pathData?: string;
  mustEat?: string[];
  diverseSports?: string[];
  isLocked?: boolean;
}

export interface RoutePoint {
  id: string;
  name: string;
  description: string;
  image: string;
  coordinate: { x: number, y: number };
}

export interface RoadBook {
  id: string;
  title: string;
  author: string;
  type: 'official' | 'niche';
  image: string;
  intro: string;
  points: RoutePoint[];
}

export interface Stay {
  id: string;
  name: string;
  type: 'camping' | 'hotel' | 'bnb' | 'hostel';
  image: string;
  price: string;
  rating: string;
  tags: string[];
  description?: string;
  amenities?: string[];
  locationDesc?: string;
  gallery?: string[];
}

export interface InterestCategory {
  id: string;
  name: string;
  tag: string;
  icon: string;
  image: string;
  description: string;
  items: { name: string, icon: string, tag?: string }[];
}
