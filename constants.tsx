
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
  { id: 'bl_art_1', name: '斑斓海岸艺术中心', category: 'scenery', lat: 29.5350, lng: 121.7880, description: '斑斓海岸艺术中心位于〇号公路起点。它是一处集环保与疗愈艺术展览、滨海日落景观及主题轻餐饮的海边艺文空间。', tags: ['艺术', '人文', '设计师'], image: 'https://inews.gtimg.com/om_bt/OfDw9YCx_AK2E9YlUcDYs1pd0FdvldOg5K3zkKFR3G398AA/641' },

  // --- 斑斓海岸段：餐饮 (Food) ---
  { id: 'bl_food_1', name: '黄鱼咖啡', category: 'food', lat: 29.5270, lng: 121.7940, description: '象山特色的海味咖啡馆，伴随海风品味醇香。', tags: ['特色', '咖啡'] },
  { id: 'bl_food_2', name: '集野咖啡', category: 'food', lat: 29.5440, lng: 121.7780, description: '隐藏在橘树林间的野奢景观咖啡。', tags: ['景观', '野奢'] },
  { id: 'bl_food_3', name: '西夏王和文饭店', category: 'food', lat: 29.5370, lng: 121.7800, description: '斑斓海岸老字号，以新鲜黄鱼和地道象山菜闻名。', tags: ['海鲜', '老字号'] },
  { id: 'bl_food_4', name: '西沪渔家', category: 'food', lat: 29.5400, lng: 121.7840, description: '最靠近西沪港的渔民餐桌，食材鲜捕。', tags: ['地道', '渔家'] },
  { id: 'bl_food_5', name: '大樟树农家饭店', category: 'food', lat: 29.5290, lng: 121.7880, description: '古樟树下的农家风味，地道淳朴。', tags: ['农家菜', '古树'] },
  { id: 'bl_food_6', name: '落日咖啡', category: 'food', lat: 29.5420, lng: 121.7830, description: '象山绝佳日落观测点，晚霞中的极致浪漫。', tags: ['日落', '网红'], image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000' },

  // --- 斑斓海岸段：运动 (Scenery/Sport) ---
  { id: 'bl_sport_1', name: '艇好玩帆船营地', category: 'scenery', lat: 29.5080, lng: 121.8140, description: '专业水上运动基地，提供帆船、桨板体验。', tags: ['帆船', '运动'], image: 'https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/480187961_953886250252896_2959170990121672560_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=amigyUnPY7YQ7kNvwE_lCjH&_nc_oc=AdkttgZl5lOphyowSBvkYC76EYnDuEJY7zCRrDJWK-kMua43Xx2MYAP73xqU5gmnGY4&_nc_zt=23&_nc_ht=scontent-lax3-2.xx&_nc_gid=cpVWoZgMEPqfqUEJkxgTLA&oh=00_AfpmjlGaBvRGnFiOR8o8IZ7hxe2BP5lpYYucQ9as8YQiTQ&oe=6980EFD8' }
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
    image: 'https://rmtsource.ntv.cn/files/wemedia/images/2503/16/1742062606889203.jpg',
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
    image: 'data:image/jpeg;base64,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',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTjudemsKekb_lKOC3V-UMC5sA-JXg2yYW-Q&s',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjjkHraAnuLxZkuIahzYchHCewkWeg5zexQg&s',
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
    image: 'https://dimg04.c-ctrip.com/images/0206912000a5swtc92177_C_750_340_Q70.jpg',
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
