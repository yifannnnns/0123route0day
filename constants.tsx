
import { CommunityCircle, POI, RoadEvent, RoadSegment, RoadBook, Stay, Topic } from './types';

const MOCK_TOPICS: Topic[] = [
  {
    id: 't1',
    author: '阿飞',
    avatar: 'https://i.pravatar.cc/100?u=afie',
    content: '今天在斑斓海岸偶遇了一群骑行大神，〇号公路的坡度真的很考验体力，但日落确实无敌！',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=400',
    likes: 128,
    comments: 24,
    time: '2小时前'
  },
  {
    id: 't2',
    author: '小象',
    avatar: 'https://i.pravatar.cc/100?u=xiaoxiang',
    content: '作为一名数字游民，〇号广场的共享空间真的非常赞，网速快且氛围感拉满。',
    likes: 86,
    comments: 12,
    time: '5小时前'
  }
];

export const COMMUNITIES: CommunityCircle[] = [
  {
    id: 'main-hub',
    name: '全部圈子',
    subtitle: '〇号广场',
    icon: 'apps',
    image: 'https://images.unsplash.com/photo-1506466010722-395ee2bef877?auto=format&fit=crop&q=80&w=1000',
    type: 'main',
    size: 'w-48 h-48',
    description: '探索象山〇号公路的所有兴趣社群'
  },
  {
    id: 'cycling',
    name: '海岸骑行',
    subtitle: '无限破风',
    icon: 'directions_bike',
    image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=400',
    type: 'satellite',
    position: { top: '10%', right: '12%' },
    size: 'w-32 h-32',
    description: '环岛骑行爱好者的聚集地，分享路线、组队破风。',
    memberCount: '2.4w',
    topics: MOCK_TOPICS,
    eventIds: ['e1']
  },
  {
    id: 'digital-nomad',
    name: '数字游民',
    subtitle: '远程办公',
    icon: 'laptop_mac',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&w=400',
    type: 'satellite',
    position: { bottom: '5%', right: '15%' },
    size: 'w-28 h-28',
    description: '在山海之间寻找灵感，享受地理位置无关的生活方式。',
    memberCount: '1.2w',
    topics: MOCK_TOPICS.slice(1)
  },
  {
    id: 'fishing',
    name: '海钓派对',
    subtitle: '满载而归',
    icon: 'phishing',
    image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&w=400',
    type: 'satellite',
    position: { top: '5%', left: '8%' },
    size: 'w-30 h-30',
    description: '象山开渔，来一场与深海的较量。',
    memberCount: '8k'
  },
  {
    id: 'foodie',
    name: '海鲜饕餮',
    subtitle: '味蕾狂欢',
    icon: 'restaurant',
    image: 'https://images.unsplash.com/photo-1559739511-e9404f553331?auto=format&w=400',
    type: 'satellite',
    position: { bottom: '10%', left: '5%' },
    size: 'w-32 h-32',
    description: '寻味象山，地道海鲜、秘境餐厅不私藏。',
    memberCount: '4.5w'
  },
  {
    id: 'photography',
    name: '日落摄影',
    subtitle: '光影瞬间',
    icon: 'photo_camera',
    image: 'https://images.unsplash.com/photo-1472120482482-d42104454e81?auto=format&fit=crop&q=80&w=400',
    type: 'satellite',
    position: { top: '45%', right: '2%' },
    size: 'w-24 h-24',
    description: '定格〇号公路最美瞬间，尤其是那些绝版晚霞。',
    memberCount: '3.1w'
  },
  {
    id: 'pets',
    name: '宠物友好',
    subtitle: '携宠漫游',
    icon: 'pets',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&w=400',
    type: 'satellite',
    position: { top: '35%', left: '2%' },
    size: 'w-24 h-24',
    description: '带上毛孩子一起看海，打卡宠物友好咖啡馆和民宿。',
    memberCount: '1.5w'
  },
  {
    id: 'sailing',
    name: '帆船极客',
    subtitle: '乘风破浪',
    icon: 'sailing',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&w=400',
    type: 'satellite',
    position: { top: '-5%', left: '35%' },
    size: 'w-26 h-26',
    description: '水上运动爱好者的俱乐部，体验帆船与桨板。',
    memberCount: '5k'
  },
  {
    id: 'driving',
    name: '自驾玩家',
    subtitle: '公路旅行',
    icon: 'directions_car',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&w=400',
    type: 'satellite',
    position: { bottom: '0%', left: '40%' },
    size: 'w-28 h-28',
    description: '专注于自驾装备、自驾路线与〇号公路路况交流。',
    memberCount: '5.2w'
  }
];

export const POIS: POI[] = [
  // --- 驿站体系 (Service) - 前置 ---
  { id: 'l1_1', name: '西沪港驿站', category: 'service', lat: 29.5420, lng: 121.7830, description: '一级驿站。综合服务中心，提供全方位公路旅行支持。', tags: ['一级驿站', '全功能'] },
  { id: 'l1_2', name: '茅洋乡驿站', category: 'service', lat: 29.4200, lng: 121.8500, description: '一级驿站。提供完善的自驾及户外活动支持服务。', tags: ['一级驿站', '户外'] },
  { id: 'l1_3', name: '象山影视城驿站', category: 'service', lat: 29.3500, lng: 121.8800, description: '一级驿站。结合影视文化特色的综合服务点。', tags: ['一级驿站', '影视文化'] },
  { id: 'l1_4', name: '渔港古城驿站', category: 'service', lat: 29.2100, lng: 121.9400, description: '一级驿站。位于石浦，连接渔文化与现代旅游。', tags: ['一级驿站', '渔港'] },
  { id: 'l1_5', name: '松兰山度假区驿站', category: 'service', lat: 29.4600, lng: 121.9200, description: '一级驿站。服务于度假区的综合服务节点。', tags: ['一级驿站', '度假区'] },
  { id: 'l2_1', name: '塔头旺驿站', category: 'service', lat: 29.5750, lng: 121.7820, description: '二级驿站。提供基本补给与休憩服务。', tags: ['二级驿站', '补给'] },
  { id: 'l2_2', name: '山海剧场驿站', category: 'service', lat: 29.5000, lng: 121.8000, description: '二级驿站。配套演艺与观光设施。', tags: ['二级驿站', '艺术'] },
  { id: 'l3_1', name: '沪港驿站', category: 'service', lat: 29.5300, lng: 121.7900, description: '三级驿站。小型便捷服务点。', tags: ['三级驿站', '便捷'] },

  // --- 斑斓海岸段：住宿 (Stay) ---
  { id: 'bl_stay_1', name: '沐光海太空舱露营地', category: 'stay', lat: 29.5480, lng: 121.7800, description: '象山超酷的海滨太空舱露营，尽赏西沪港日落。', tags: ['海景', '露营', '网红'], image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&w=800' },
  { id: 'bl_stay_2', name: '四季青藤度假酒店', category: 'stay', lat: 29.5310, lng: 121.7920, description: '优雅舒适的度假酒店，斑斓海岸段高品质住宿之选。', tags: ['高端', '度假'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&w=800' },
  { id: 'bl_stay_3', name: '海米木木亲子庄园', category: 'stay', lat: 29.5360, lng: 121.7840, description: '专为家庭打造的亲子度假庄园，丰富的户外游乐设施。', tags: ['亲子', '庄园'], image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&w=800' },
  { id: 'bl_stay_4', name: '南铂酒店', category: 'stay', lat: 29.5240, lng: 121.8000, description: '现代简约风格的精品酒店，视野开阔，远眺海平面。', tags: ['精品', '海景'], image: 'https://images.unsplash.com/photo-1551882319-8eb74825275b?auto=format&w=800' },

  // --- 斑斓海岸段：艺文空间 (Scenery) ---
  { id: 'bl_art_1', name: '斑斓海岸艺术中心', category: 'scenery', lat: 29.5350, lng: 121.7880, description: '由废旧船厂改造成的艺文美学空间。', tags: ['艺术', '人文', '旧船厂'], image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=1000' },

  // --- 斑斓海岸段：餐饮 (Food) ---
  { id: 'bl_food_1', name: '黄鱼咖啡', category: 'food', lat: 29.5270, lng: 121.7940, description: '象山特色的海味咖啡馆，伴随海风品味醇香。', tags: ['特色', '咖啡'] },
  { id: 'bl_food_2', name: '集野咖啡', category: 'food', lat: 29.5440, lng: 121.7780, description: '隐藏在橘树林间的野奢景观咖啡。', tags: ['景观', '野奢'] },
  { id: 'bl_food_3', name: '西夏王和文饭店', category: 'food', lat: 29.5370, lng: 121.7800, description: '斑斓海岸老字号，以新鲜黄鱼和地道象山菜闻名。', tags: ['海鲜', '老字号'] },
  { id: 'bl_food_4', name: '西沪渔家', category: 'food', lat: 29.5400, lng: 121.7840, description: '最靠近西沪港的渔民餐桌，食材鲜捕。', tags: ['地道', '渔家'] },
  { id: 'bl_food_5', name: '大樟树农家饭店', category: 'food', lat: 29.5290, lng: 121.7880, description: '古樟树下的农家风味，地道淳朴。', tags: ['农家菜', '古树'] },
  { id: 'bl_food_6', name: '落日咖啡', category: 'food', lat: 29.5420, lng: 121.7830, description: '象山绝佳日落观测点，晚霞中的极致浪漫。', tags: ['日落', '网红'], image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000' },

  // --- 斑斓海岸段：运动 (Scenery/Sport) ---
  { id: 'bl_sport_1', name: '艇好玩帆船营地', category: 'scenery', lat: 29.5080, lng: 121.8140, description: '专业水上运动基地，提供帆船、桨板体验。', tags: ['帆船', '运动'], image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&w=1000' }
];

export const ROAD_SEGMENTS: RoadSegment[] = [
  { 
    id: 'rs1', 
    name: '斑斓海岸段', 
    image: 'https://pic.rmb.bdstatic.com/bjh/down/bc865095877a6c094fd52254c77541de.jpeg@wm_2,t_55m+5a625Y+3L+Wlh+WIm+aXhea4uOmbhuWbog==,fc_ffffff,ff_U2ltSGVp,sz_27,x_17,y_17', 
    description: '山海田园，一口气看遍！',
    fullIntro: '有山、有海、有故事，斑斓海岸已经为你准备好了！🚗💨',
    locationInfo: '黄避岙乡，西沪港',
    length: '20.3 km',
    mustSee: ['斑斓海岸艺术中心', '山海剧场', '海带晒场'],
    mustPlay: ['艇好玩帆船营地'],
    coffeeView: ['黄鱼咖啡', '集野咖啡', '落日咖啡'],
    mustEat: ['西夏王和文饭店', '西沪渔家', '大樟树农家饭店'],
    campsites: ['沐光海太空舱露营地', '艇好玩帆船营地'],
    isLocked: false
  },
  { id: 'rs2', name: '风车奇遇段', image: 'https://images.unsplash.com/photo-1466611653911-95282fc365d5?auto=format&fit=crop&w=800', description: '遇一群同好，无限灵感', length: '12.8 km', isLocked: true },
  { id: 'rs3', name: '跃动山海段', image: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=800', description: '撒一回欢儿，无限活力', length: '15.7 km', isLocked: true },
  { id: 'rs4', name: '渔光古城段', image: 'https://images.unsplash.com/photo-1559739511-e9404f553331?auto=format&fit=crop&q=80&w=800', description: '赴一场渔光，无限烟火', length: '4.3 km', isLocked: true },
  { id: 'rs5', name: '盘山望海段', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800', description: '望一汪沧海，无限开阔', length: '15.4 km', isLocked: true },
  { id: 'rs6', name: '玄石秘境段', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800', description: '探一域石林，无限震撼', length: '5.6 km', isLocked: true },
  { id: 'rs7', name: '橘香原野段', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&w=800', description: '摘一篮酸甜，无限满足', length: '6.3 km', isLocked: true },
  { id: 'rs8', name: '戏梦片场段', image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&w=800', description: '造一个梦境，无限想象', length: '2.1 km', isLocked: true },
  { id: 'rs9', name: '灵岩蟹逅段', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&w=400', description: '偷一日悠闲，无限治愈', length: '17.6 km', isLocked: true },
  { id: 'rs10', name: '海山遥望段', image: 'https://images.unsplash.com/photo-1506466010722-395ee2bef877?auto=format&fit=crop&w=800', description: '入一片自然，无限自在', length: '10.8 km', isLocked: true }
];

export const ROAD_BOOKS: RoadBook[] = [
  { 
    id: 'rb1', 
    title: '〇号公路官方完整指南', 
    author: '象山文旅', 
    type: 'official', 
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400',
    intro: '官方出品，深度探索象山绝美海岸线。',
    points: [
      { id: 'p1', name: '〇号广场', description: '公路漫游的零公里处。', image: 'https://images.unsplash.com/photo-1506466010722-395ee2bef877?auto=format&w=200', coordinate: { x: 20, y: 30 } },
      { id: 'p2', name: '斑斓海岸', description: '追逐落日的彩色路段。', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=200', coordinate: { x: 45, y: 40 } }
    ]
  }
];

export const ROAD_STAYS: Stay[] = [
  {
    id: 'stay-0',
    name: '〇感青年旅舍',
    type: 'hostel',
    image: 'https://github.com/user-attachments/assets/e5686009-ac77-4f13-a286-931110a2eb91',
    price: '¥ 99 起',
    rating: '4.9',
    tags: ['社交', '数字游民', '极简'],
    description: '位于公路起点〇号广场旁，是数字游民与环岛漫游者的社交心脏。',
    amenities: ['wifi', 'coffee', 'local_parking', 'group'],
    locationDesc: '象山县〇号广场西侧'
  },
  {
    id: 'stay-1',
    name: '沐光海太空舱露营地',
    type: 'camping',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&w=800',
    price: '¥ 599 起',
    rating: '4.8',
    tags: ['海景', '露营', '日落'],
    description: '坐拥西沪港绝美落日视角，极具科技感的太空舱入住体验。',
    amenities: ['ac_unit', 'visibility', 'deck', 'local_fire_department'],
    locationDesc: '象山县黄避岙乡西沪港海岸'
  },
  {
    id: 'stay-2',
    name: '四季青藤度假酒店',
    type: 'hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&w=800',
    price: '¥ 680 起',
    rating: '4.7',
    tags: ['度假', '全服务', '高品质'],
    description: '地处斑斓海岸核心地带，将象山山海之韵融入精致的管家服务中。',
    amenities: ['pool', 'spa', 'restaurant', 'fitness_center'],
    locationDesc: '象山县斑斓海岸核心区'
  },
  {
    id: 'stay-3',
    name: '海米木木亲子庄园',
    type: 'bnb',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&w=800',
    price: '¥ 450 起',
    rating: '4.9',
    tags: ['亲子', '庄园', '田园'],
    description: '专为家庭设计的亲子度假庄园，拥有广阔的户外活动空间。',
    amenities: ['child_care', 'pets', 'kitchen', 'grass'],
    locationDesc: '象山县黄避岙乡斑斓海岸段'
  },
  {
    id: 'stay-4',
    name: '南铂酒店',
    type: 'hotel',
    image: 'https://images.unsplash.com/photo-1551882319-8eb74825275b?auto=format&w=800',
    price: '¥ 520 起',
    rating: '4.6',
    tags: ['现代', '海景', '商务'],
    description: '现代极简风格设计的滨海精品酒店，每一间房都面向蔚蓝大海。',
    amenities: ['meeting_room', 'balcony', 'local_bar', 'wifi'],
    locationDesc: '象山县黄避岙乡海岸线'
  }
];

export const EVENTS: RoadEvent[] = [
  {
    id: 'e1',
    title: '西沪港日落音乐会',
    date: '05.20',
    time: '17:30 - 20:00',
    location: '落日咖啡草坪',
    type: 'music',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    price: '免费',
    participants: 128,
    description: '在落日余晖中，与喜欢的乐团共赴一场浪漫之约。'
  },
];
