export interface Spot {
  name: string;
  desc: string;
  image: string;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  spots: Spot[];
}

export interface RouteScores {
  crowd: number;      // 规避人群 1-10
  scenery: number;    // 自然风光
  convenience: number;// 便利性
  weather: number;    // 天气情况
  food: number;       // 美食人文
  photo: number;      // 出片程度
}

export interface SocialRec {
  platform: "xiaohongshu" | "douyin";
  text: string;
}

export interface RouteData {
  id: string;
  name: string;
  subtitle: string;
  distance: string;
  duration: string;
  cost: string;
  tags: string[];
  color: string;
  colorLight: string;
  emoji: string;
  heroImage: string;
  scores: RouteScores;
  scoreReasons: Record<keyof RouteScores, string>;
  highlights: string[];
  socialRecs: SocialRec[];
  itinerary: DayPlan[];
  tips: string[];
  weather: string;
}

export const DIMENSIONS: { key: keyof RouteScores; label: string; icon: string }[] = [
  { key: "crowd", label: "规避人群", icon: "👥" },
  { key: "scenery", label: "自然风光", icon: "🏔️" },
  { key: "convenience", label: "便利性", icon: "🚗" },
  { key: "weather", label: "天气情况", icon: "☀️" },
  { key: "food", label: "美食人文", icon: "🍜" },
  { key: "photo", label: "出片程度", icon: "📸" },
];

export const ROUTES: RouteData[] = [
  {
    id: "lishui",
    name: "丽水",
    subtitle: "浙南秘境 · 摄影天堂",
    distance: "~436km",
    duration: "~5小时",
    cost: "人均约1200-1500元",
    tags: ["摄影天堂", "云海梯田", "古村秘境", "人少景美"],
    color: "#10B981",
    colorLight: "#D1FAE5",
    emoji: "🌿",
    heroImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    scores: { crowd: 8, scenery: 10, convenience: 5, weather: 6, food: 6, photo: 10 },
    scoreReasons: {
      crowd: "松阳、景宁等地游客极少，属于小众秘境；但清明期间云和梯田、古堰画乡有不少游客",
      scenery: "云和梯田4月灌水如镜、古堰画乡瓯江晨雾、松阳古村群、仙都鼎湖峰，景观类型极丰富",
      convenience: "距离较远约5小时，山区弯道多需谨慎驾驶，但住宿选择丰富",
      weather: "4日多云22°C、5日晴25°C天气不错，但6日(返程)有中雨(39mm)，山区温差10°C",
      food: "缙云烧饼、处州鱼头、山区野菜，特色鲜明但种类和知名度不及徽菜和海鲜",
      photo: "被誉为'天然摄影棚'，瓯江晨雾帆影、梯田云海日出、徽派古村均为顶级出片题材",
    },
    highlights: [
      "云和梯田4月灌水期如镜面反射，日出云海壮观",
      "古堰画乡乘舴艋船游瓯江，晨雾中桅帆点点",
      "松阳杨家堂村被称'最后的江南秘境'",
      "景宁畲乡人少景美，可看免费畲族婚嫁表演",
    ],
    socialRecs: [
      { platform: "xiaohongshu", text: "「丽水真的被惊艳到了！路上无数次停下来拍照，青山绿水沿途畅通无人」— 2.3万赞" },
      { platform: "xiaohongshu", text: "「松阳古村群，每个村子都像画一样，陈家铺先锋书店巨出片」— 1.8万赞" },
      { platform: "douyin", text: "「云和梯田日出云海太震撼了，4月灌水期就像天空之镜」— 56万播放" },
      { platform: "douyin", text: "「自驾丽水5天，这才是真正的浙南秘境」— 38万播放" },
    ],
    itinerary: [
      {
        day: 1,
        title: "上海 → 缙云仙都 → 丽水",
        activities: [
          "08:00 上海出发，沪杭高速→杭金衢高速→金丽温高速",
          "13:00 抵达缙云仙都景区，游览鼎湖峰、朱潭山",
          "16:00 春季油菜花田拍照",
          "18:00 前往丽水市区，入住酒店",
          "19:00 品尝缙云烧饼、处州鱼头",
        ],
        spots: [
          { name: "仙都鼎湖峰", desc: "国家5A景区，春季油菜花与奇峰相映", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
          { name: "朱潭山", desc: "仙都核心景点，湖光山色", image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&q=80" },
        ],
      },
      {
        day: 2,
        title: "古堰画乡 → 云和梯田",
        activities: [
          "06:00 早起前往古堰画乡，拍摄瓯江晨雾帆影",
          "08:00 乘舴艋船游瓯江，参观通济堰（世界灌溉遗产）",
          "11:00 画乡老街漫步、午餐",
          "13:30 驱车前往云和梯田（约1.5h）",
          "15:30 抵达云和梯田，踩点日落机位",
          "17:30 拍摄梯田落日，入住梯田附近民宿",
        ],
        spots: [
          { name: "古堰画乡", desc: "瓯江晨雾中桅帆点点，摄影爱好者天堂", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80" },
          { name: "云和梯田", desc: "中国最美三大梯田之一，4月灌水如镜", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
        ],
      },
      {
        day: 3,
        title: "松阳古村 → 返程上海",
        activities: [
          "05:30 早起拍摄梯田日出云海",
          "08:00 早餐后驱车前往松阳（约2h）",
          "10:00 游览杨家堂村（金色布达拉宫）",
          "11:30 陈家铺先锋书店打卡",
          "12:30 松阳老街午餐",
          "14:00 返程上海（约4.5h）",
          "18:30 抵达上海",
        ],
        spots: [
          { name: "杨家堂村", desc: "被誉为'金色布达拉宫'，层层叠叠的明清古居", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80" },
          { name: "陈家铺先锋书店", desc: "悬崖边的最美书店，巷弄古村极出片", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80" },
        ],
      },
    ],
    tips: [
      "山区弯道多，建议有经验的司机驾驶",
      "云和梯田日出需凌晨出发，带保暖衣物",
      "古堰画乡晨雾最佳时间为6:00-8:00",
      "部分古村停车场较小，建议早到",
    ],
    weather: "4日：多云转晴 12~22°C 无雨｜5日：晴 12~25°C 无雨｜6日：中雨 17~22°C 降雨39mm ⚠️返程注意安全",
  },
  {
    id: "taizhou",
    name: "台州",
    subtitle: "山海奇观 · 仙境之城",
    distance: "~400km",
    duration: "~4.5小时",
    cost: "人均约1000-1300元",
    tags: ["神仙居", "中华第一瀑", "山海兼具", "小众秘境"],
    color: "#3B82F6",
    colorLight: "#DBEAFE",
    emoji: "⛰️",
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    scores: { crowd: 7, scenery: 9, convenience: 6, weather: 7, food: 6, photo: 8 },
    scoreReasons: {
      crowd: "神仙居清明有一定人流但非爆满，琼台仙谷等景点游人稀少",
      scenery: "神仙居流纹岩地貌独特，天台大瀑布325米落差壮观，山海景观兼具",
      convenience: "车程约4.5小时适中，高速直达，山路段较少",
      weather: "4日晴25°C、5日晴26°C前两天最佳，6日(返程)中雨(17mm)但弱于丽水",
      food: "天台农家菜有特色，仙居杨梅4月未到季节，整体美食丰富度一般",
      photo: "神仙居云雾缭绕极具仙气，天台大瀑布震撼，蛇蟠岛海岛风情",
    },
    highlights: [
      "神仙居5A景区，流纹岩地貌被评为国内最美自然风光之一",
      "天台山大瀑布中华第一高瀑，落差325米九级飞瀑",
      "琼台仙谷游人极少的宝藏景点，50元门票物超所值",
      "蛇蟠岛国内唯一海盗主题海岛，三面临海可观日落",
    ],
    socialRecs: [
      { platform: "xiaohongshu", text: "「神仙居真的名副其实！云雾缭绕像仙境一样，一定要爬到山顶」— 3.1万赞" },
      { platform: "xiaohongshu", text: "「琼台仙谷太小众了，基本没人！50块门票值回票价」— 9千赞" },
      { platform: "douyin", text: "「天台山大瀑布，325米落差太震撼了，水声轰鸣」— 89万播放" },
      { platform: "douyin", text: "「自驾台州三天两夜，跨越山海大地」— 42万播放" },
    ],
    itinerary: [
      {
        day: 1,
        title: "上海 → 天台山",
        activities: [
          "07:30 上海出发，沪杭高速→杭甬高速→上三高速",
          "12:00 抵达天台，午餐品尝当地农家菜",
          "13:30 游览天台山大瀑布（2-3小时）",
          "16:30 参观国清寺（免费）",
          "18:00 入住天台酒店",
          "19:00 天台老城区觅食",
        ],
        spots: [
          { name: "天台山大瀑布", desc: "中华第一高瀑，落差325米，九级飞瀑壮观", image: "https://images.unsplash.com/photo-1432405972618-c6b0cfba168a?w=600&q=80" },
          { name: "国清寺", desc: "天台宗祖庭，千年古刹免费参观", image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80" },
        ],
      },
      {
        day: 2,
        title: "神仙居 → 仙居",
        activities: [
          "07:00 早起出发前往仙居神仙居景区（约1h）",
          "08:00 抵达神仙居，乘索道上山",
          "08:30-12:00 游览神仙居全程（南门进北门出）",
          "12:30 仙居县城午餐",
          "14:00 永安溪休闲漂流（约2h）",
          "16:30 仙居老街漫步",
          "18:00 入住仙居民宿",
        ],
        spots: [
          { name: "神仙居", desc: "5A景区，流纹岩地貌，云雾缭绕如仙境", image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=600&q=80" },
          { name: "永安溪漂流", desc: "仙居母亲河上的休闲漂流体验", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80" },
        ],
      },
      {
        day: 3,
        title: "琼台仙谷 / 蛇蟠岛 → 返程",
        activities: [
          "08:00 前往琼台仙谷（小众宝藏景点）",
          "10:00 游览琼台仙谷（约2h）",
          "12:00 午餐",
          "13:00 返程上海（约4.5h）",
          "17:30 抵达上海",
        ],
        spots: [
          { name: "琼台仙谷", desc: "游人极少的小众景点，50元门票物超所值", image: "https://images.unsplash.com/photo-1471931452944-bcf648e0040a?w=600&q=80" },
        ],
      },
    ],
    tips: [
      "神仙居建议南门进北门出，全程约4小时",
      "景区内不支持社会车辆，需换乘接驳车",
      "天台大瀑布雨后水量最大最壮观",
      "建议工作日到达避开入园高峰",
    ],
    weather: "4日：多云转晴 14~25°C 无雨｜5日：晴 14~26°C 无雨｜6日：中雨 16~23°C 降雨17mm ⚠️返程注意",
  },
  {
    id: "wannan",
    name: "皖南",
    subtitle: "徽韵古村 · 川藏秘道",
    distance: "~350km",
    duration: "~4小时",
    cost: "人均约1000-1200元",
    tags: ["徽派古村", "皖南川藏线", "油菜花海", "水墨画卷"],
    color: "#F59E0B",
    colorLight: "#FEF3C7",
    emoji: "🏘️",
    heroImage: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=800&q=80",
    scores: { crowd: 5, scenery: 8, convenience: 7, weather: 8, food: 8, photo: 9 },
    scoreReasons: {
      crowd: "宏村西递清明节人流量大，但查济、水墨汀溪等替代景点人少；川藏线沿途人不多",
      scenery: "徽派粉墙黛瓦与油菜花海经典组合，但4月上旬花季已近尾声；川藏线桃岭72拐壮观",
      convenience: "距离适中约4小时，高速为主但川藏线山路弯急坡陡需注意",
      weather: "4日多云22°C无雨、5日晴26°C无雨、6日多云23°C仅0.3mm微雨，三天天气最佳",
      food: "徽菜名菜荟萃：毛豆腐、臭鳜鱼、笋衣烧肉、徽州饼，味道浓郁",
      photo: "粉墙黛瓦+油菜花+晨雾=水墨画卷，皖南川藏线公路大片",
    },
    highlights: [
      "皖南川藏线桃岭公路「七十二拐」，越野车驾驶体验极佳",
      "查济古村明清徽派建筑保存完好，游客远少于宏村",
      "4月上旬油菜花海正值尾声但仍有残留花田",
      "水墨汀溪皖南原生态景区，溪水清澈山林幽静",
    ],
    socialRecs: [
      { platform: "xiaohongshu", text: "「皖南川藏线太刺激了！72拐一个接一个，越野车冲冲冲」— 2.7万赞" },
      { platform: "xiaohongshu", text: "「查济古村人比宏村少太多了，随便拍都是大片」— 1.5万赞" },
      { platform: "douyin", text: "「自驾皖南川藏线，比318更容易抵达的公路天堂」— 120万播放" },
      { platform: "douyin", text: "「烟雨皖南太美了，粉墙黛瓦配油菜花绝了」— 67万播放" },
    ],
    itinerary: [
      {
        day: 1,
        title: "上海 → 查济古村",
        activities: [
          "07:30 上海出发，沪渝高速→宣广高速",
          "11:30 抵达查济古村，午餐品尝农家徽菜",
          "13:00 游览查济古村（明清古建筑群、查济河）",
          "16:00 写生/拍照，感受古村慢时光",
          "18:00 入住查济民宿",
          "19:00 品尝毛豆腐、笋衣烧肉",
        ],
        spots: [
          { name: "查济古村", desc: "明清徽派建筑保存完好，游客远少于宏村西递", image: "https://images.unsplash.com/photo-1528164344885-947ce28b5782?w=600&q=80" },
        ],
      },
      {
        day: 2,
        title: "皖南川藏线 → 水墨汀溪",
        activities: [
          "07:30 早餐后出发，前往皖南川藏线起点",
          "09:00 挑战桃岭公路「七十二拐」（越野车体验）",
          "11:00 沿途经板桥村、方塘乡",
          "12:00 青龙湾生态旅游区午餐",
          "14:00 前往水墨汀溪景区",
          "15:00 游览水墨汀溪（原生态山水、溪流徒步）",
          "18:00 入住水墨汀溪附近民宿",
        ],
        spots: [
          { name: "皖南川藏线", desc: "桃岭公路七十二拐，被称为'小川藏线'", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80" },
          { name: "水墨汀溪", desc: "皖南原生态景区，溪水清澈山林幽静", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80" },
        ],
      },
      {
        day: 3,
        title: "太平湖 → 返程上海",
        activities: [
          "08:00 早起游览太平湖晨景",
          "10:00 环湖骑行或徒步",
          "11:30 湖边午餐（太平湖鱼头）",
          "13:00 返程上海（约4h）",
          "17:00 抵达上海",
        ],
        spots: [
          { name: "太平湖", desc: "黄山脚下的翡翠明珠，湖光山色", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80" },
        ],
      },
    ],
    tips: [
      "皖南川藏线桃岭段坡陡弯急，新手勿驾",
      "4月皖南多雨，备好雨具和防滑鞋",
      "宏村西递清明爆满，建议选择查济等替代",
      "徽菜口味偏重，怕辣怕咸提前告知",
    ],
    weather: "4日：多云 12~22°C 无雨｜5日：晴 11~26°C 无雨｜6日：多云微雾 17~23°C 仅0.3mm 三天天气最好！",
  },
  {
    id: "qidong",
    name: "启东",
    subtitle: "海角轻旅 · 海鲜王国",
    distance: "~120km",
    duration: "~2小时",
    cost: "人均约800-1000元",
    tags: ["距离最近", "海鲜盛宴", "碧海银沙", "轻松度假"],
    color: "#EC4899",
    colorLight: "#FCE7F3",
    emoji: "🌊",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    scores: { crowd: 7, scenery: 5, convenience: 10, weather: 7, food: 9, photo: 5 },
    scoreReasons: {
      crowd: "启东整体游客密度不高，非热门清明目的地，碧海银沙可能有一些客流",
      scenery: "以海滨平原为主，自然景观种类单一，缺少山水层次",
      convenience: "仅2小时车程，全程高速，距上海最近，住宿餐饮配套完善",
      weather: "三天均无雨，但4日仅18°C体感凉、海风大(19km/h)，5日回暖至24°C，6日23°C舒适",
      food: "吕四港海鲜极新鲜：梭子蟹、带鱼、蛤蜊饼，可市场自购加工",
      photo: "碧海银沙有一定出片效果，但整体拍照题材不如山水丰富",
    },
    highlights: [
      "吕四渔港国家级渔港，海鲜新鲜到极致，人均消费低",
      "碧海银沙被称为'江苏小三亚'，细腻白沙碧蓝海水",
      "圆陀角可同时观赏长江、东海、黄海三水交汇",
      "启唐城大型唐风沉浸式乐园，晚上灯光演出精彩",
    ],
    socialRecs: [
      { platform: "xiaohongshu", text: "「启东吕四的海鲜太绝了！一个人100块吃到撑，全是活的」— 4.2万赞" },
      { platform: "xiaohongshu", text: "「碧海银沙真的很出片！江苏也有马尔代夫的感觉」— 1.1万赞" },
      { platform: "douyin", text: "「上海出发2小时就到启东，海鲜自由真的实现了」— 95万播放" },
      { platform: "douyin", text: "「启唐城夜景太梦幻了，穿越回大唐」— 28万播放" },
    ],
    itinerary: [
      {
        day: 1,
        title: "上海 → 启东",
        activities: [
          "09:00 上海出发（不赶早，轻松出行）",
          "11:00 抵达启东，前往吕四渔港",
          "11:30 吕四海鲜市场自购海鲜",
          "12:00 仙渔小镇餐厅加工海鲜大餐",
          "14:00 圆陀角景观大道骑行",
          "16:00 花儿营地打卡（紫色花海+灯塔）",
          "18:00 入住海景酒店",
          "20:00 启唐城夜游（唐风沉浸式演出）",
        ],
        spots: [
          { name: "吕四渔港", desc: "国家级渔港，海鲜极致新鲜", image: "https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=600&q=80" },
          { name: "启唐城", desc: "大型唐风沉浸式乐园，夜景梦幻", image: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=600&q=80" },
        ],
      },
      {
        day: 2,
        title: "碧海银沙 · 全天休闲",
        activities: [
          "08:30 睡到自然醒，酒店早餐",
          "10:00 碧海银沙景区（沙滩、恒温泳池）",
          "12:00 沙滩午餐",
          "14:00 继续沙滩活动 / 团建游戏",
          "16:00 沿海骑行 / 赶海拾贝",
          "18:00 海边看日落",
          "19:00 启东夜市觅食",
        ],
        spots: [
          { name: "碧海银沙", desc: "江苏版'小三亚'，白沙碧水恒温泳池", image: "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?w=600&q=80" },
        ],
      },
      {
        day: 3,
        title: "休闲半日 → 返程上海",
        activities: [
          "08:00 酒店早餐",
          "09:30 挡浪墙遗址公园漫步",
          "10:30 启东博物馆/美术馆参观",
          "12:00 最后一顿海鲜午餐",
          "13:30 返程上海（约2h）",
          "15:30 抵达上海，完美收官",
        ],
        spots: [
          { name: "圆陀角", desc: "长江、东海、黄海三水交汇奇景", image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=80" },
        ],
      },
    ],
    tips: [
      "吕四海鲜市场建议找当地人推荐的摊位",
      "4月海风较大，带防风外套",
      "碧海银沙假日建议提前预约门票",
      "启唐城夜场通常18:00后开始",
    ],
    weather: "4日：多云 9~18°C 无雨 风大19km/h 偏凉｜5日：阴 9~24°C 无雨 回暖｜6日：多云雾 15~23°C 无雨 三天无雨但风大体凉",
  },
];
