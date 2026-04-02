// ── Final confirmed trip: Shanghai → Anhui 3 nights / 3 days ──
// Route: 上海 → 宁国 → 皖南川藏线(72拐) → 桃花潭 → 太平湖 → 宏村 → 屯溪 → 西溪南 → 上海

export interface Spot {
  name: string;
  desc: string;
  images: string[];
  badge?: string;
  playTips: string[];
  photoTips: string[];
  navAddress: string;
}

export interface TimeSlot {
  time: string;
  title: string;
  duration?: string;
  desc?: string;
  icon?: string;
  warn?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  theme: string;
  title: string;
  weather: string;
  weatherIcon: string;
  butlerIntro: string;
  schedule: TimeSlot[];
  spots: Spot[];
  foodTips: string[];
  stayArea: string;
  stayType: "民宿" | "酒店";
  stayNote: string;
  endNote?: string;
}

export interface CostItem {
  label: string;
  total: string;
  perPerson: string;
}

export interface PackingItem {
  name: string;
  required: boolean;
}

export interface PackingCategory {
  category: string;
  icon: string;
  items: PackingItem[];
}

export interface ReportItem {
  name: string;
  platform: string;
  heat: number;
  desc: string;
  visited: boolean;
  visitDay?: string;
  note: string;
}

export interface TripData {
  title: string;
  subtitle: string;
  dateRange: string;
  people: number;
  vehicle: string;
  totalKm: number;
  routeSummary: string;
  color: string;
  days: DayPlan[];
  costs: CostItem[];
  tips: string[];
}

// ── Packing list ──
export const PACKING_LIST: PackingCategory[] = [
  {
    category: "证件 & 现金",
    icon: "🪪",
    items: [
      { name: "身份证（景区实名制必须）", required: true },
      { name: "驾驶证 + 行驶证", required: true },
      { name: "少量现金（山区偶尔无信号）", required: true },
    ],
  },
  {
    category: "车辆 & 安全",
    icon: "🚗",
    items: [
      { name: "出发前加满油（川藏线沿途无加油站）", required: true },
      { name: "车载手机支架（导航用）", required: true },
      { name: "车载充电线", required: true },
      { name: "下好离线地图（山区信号弱）", required: true },
      { name: "行车记录仪确认工作正常", required: false },
    ],
  },
  {
    category: "衣物 & 防护",
    icon: "🧥",
    items: [
      { name: "薄外套/冲锋衣（早晚温差 10°C+）", required: true },
      { name: "舒适走路鞋（Day 2 走 7km+）", required: true },
      { name: "墨镜 + 防晒霜", required: false },
      { name: "雨伞/一次性雨衣（以防万一）", required: false },
    ],
  },
  {
    category: "食物 & 药品",
    icon: "🎒",
    items: [
      { name: "矿泉水 + 零食（川藏线 3-4h 补给）", required: true },
      { name: "充电宝", required: true },
      { name: "晕车药（川藏线 72 拐弯多）", required: false },
      { name: "肠胃药（农家乐饮食预防）", required: false },
    ],
  },
];

// ── Report: 小红书 / 抖音 recommended spots comparison ──
export const REPORT_DATA: ReportItem[] = [
  { name: "皖南川藏线(桃岭72拐)", platform: "抖音 120万+播放", heat: 5, desc: "入选全国13条精品自驾线，海拔200→800m连续发卡弯，SUV越野体验拉满", visited: true, visitDay: "Day 1", note: "全程精华，4h深度体验" },
  { name: "宏村", platform: "小红书/抖音 顶级热门", heat: 5, desc: "世界文化遗产，月沼倒影、南湖烟雨，'中国画里乡村'", visited: true, visitDay: "Day 2", note: "世界遗产必打卡" },
  { name: "屯溪老街", platform: "小红书 美食热门", heat: 4, desc: "1272米明清古街，灯光秀+徽菜美食聚集地", visited: true, visitDay: "Day 2 晚", note: "美食+夜游+捏脚" },
  { name: "西溪南", platform: "抖音 爆火", heat: 4, desc: "\"绿野仙踪\"小众古村，枫杨林+溪水，免费", visited: true, visitDay: "Day 3", note: "免费网红村" },
  { name: "桃花潭", platform: "小红书 中高热度", heat: 3, desc: "李白\"桃花潭水深千尺\"，摆渡船过江看两岸古建", visited: true, visitDay: "Day 1", note: "诗意打卡" },
  { name: "青龙湾/储家滩", platform: "抖音 高热度", heat: 4, desc: "川藏线起点\"十里画廊\"，湖面如镜白鹭翩翩", visited: true, visitDay: "Day 1", note: "川藏线沿途" },
  { name: "方塘落羽杉", platform: "抖音 爆火", heat: 4, desc: "\"皖南喀纳斯\"2000亩水杉林，4月翠绿版", visited: true, visitDay: "Day 1", note: "4月绿色也好看" },
  { name: "太平湖", platform: "小红书 中等热度", heat: 3, desc: "黄山脚下翡翠湖泊，湖光山色", visited: true, visitDay: "Day 1 住", note: "湖边住+吃鱼头" },
  { name: "黄山", platform: "全网 第一名山", heat: 5, desc: "\"五岳归来不看山，黄山归来不看岳\"", visited: false, note: "需爬山整天6-8h，不符合轻松要求" },
  { name: "西递", platform: "小红书 高热度", heat: 4, desc: "世界文化遗产，徽州三雕最精美，和宏村齐名", visited: false, note: "和宏村体验重叠，精简掉了" },
  { name: "查济古镇", platform: "小红书 中高热度", heat: 3, desc: "比宏村更安静的千年古镇，190+明清古建", visited: false, note: "时间让给了川藏线" },
  { name: "齐云山", platform: "小红书 小众推荐", heat: 3, desc: "道教四大名山，丹霞地貌，人少景美", visited: false, note: "需索道+爬山，车到不了山顶" },
  { name: "九华山", platform: "全网 高热度", heat: 4, desc: "佛教四大名山，地藏菩萨道场", visited: false, note: "方向偏北+需爬山整天" },
  { name: "新安江山水画廊", platform: "小红书 中等热度", heat: 3, desc: "\"流动的清明上河图\"，游船3小时", visited: false, note: "需半天+与环线方向不同" },
];

// ── Main trip data ──
export const TRIP: TripData = {
  title: "上海 → 安徽 自驾攻略",
  subtitle: "宁国 · 川藏线72拐 · 桃花潭 · 太平湖 · 宏村 · 屯溪",
  dateRange: "4月3日(周四)晚 — 4月6日(周日)下午",
  people: 5,
  vehicle: "越野车 SUV",
  totalKm: 900,
  routeSummary: "上海徐汇 → 宁国 → 皖南川藏线 → 桃花潭 → 太平湖 → 宏村 → 屯溪老街 → 西溪南 → 上海",
  color: "#F59E0B",
  days: [
    // ═══ Night 0: 4/3 ═══
    {
      day: 0,
      date: "4月3日",
      weekday: "周四",
      theme: "夜间赶路",
      title: "上海徐汇 → 宁国",
      weather: "多云 14°C",
      weatherIcon: "🌙",
      butlerIntro: "今晚的唯一任务：安全抵达宁国！各自吃饱出发，到了直接睡觉，明天才是重头戏~",
      schedule: [
        { time: "~19:00", title: "各自觅食", duration: "—", desc: "等小胡老师下班，自行解决晚餐", icon: "🍜" },
        { time: "20:30", title: "徐汇区集合出发", duration: "—", desc: "备注：等小胡老师下班集合", icon: "🚗" },
        { time: "20:30-23:15", title: "G50 沪渝高速 → 宁国", duration: "2h45min", desc: "约 270km，夜间路况好", icon: "🛣️" },
        { time: "~23:15", title: "抵达宁国，入住酒店", duration: "—", icon: "🏨" },
      ],
      spots: [],
      foodTips: ["出发前各自吃饱！到宁国已近午夜"],
      stayArea: "宁国市区",
      stayType: "酒店",
      stayNote: "就睡一觉，选有停车场、能深夜 check-in 的连锁/商务酒店（￥200-300/间）",
      endNote: "提醒：清明高速免费从 4/4 零点开始。如果到宁国时还没过零点不用刻意等，差那几十块不值得耗时间。",
    },
    // ═══ Day 1: 4/4 ═══
    {
      day: 1,
      date: "4月4日",
      weekday: "周五",
      theme: "公路大片 + 诗意江景",
      title: "皖南川藏线 → 桃花潭 → 太平湖",
      weather: "多云 12~22°C 无雨",
      weatherIcon: "⛅",
      butlerIntro: "今天是自驾体验的高潮！皖南川藏线72拐 + 桃花潭 + 太平湖晚餐，全程自然风光拉满。记得带好零食和水，山里补给有限~",
      schedule: [
        { time: "10:00", title: "起床", duration: "—", icon: "⏰" },
        { time: "10:00-10:30", title: "宁国市区吃早午餐 (Brunch)", duration: "30min", desc: "吃饱！后面山里午餐可能不好吃", icon: "🥐" },
        { time: "10:30", title: "出发，进入川藏线方向", duration: "—", icon: "🚗" },
        { time: "11:00-11:30", title: "储家滩 — 停车拍照", duration: "30min", desc: "免费 · 川藏线起点\"十里画廊\"", icon: "📸" },
        { time: "11:30-12:00", title: "驱车 → 方塘乡", duration: "30min车程", icon: "🚗" },
        { time: "12:00-12:20", title: "方塘落羽杉 — 拍照打卡", duration: "20min", desc: "免费 · 2000亩水杉林", icon: "🌲" },
        { time: "12:20-12:45", title: "驱车 → 板桥村", duration: "25min车程", icon: "🚗" },
        { time: "12:45-13:30", title: "板桥村午餐 — 农家乐", duration: "45min", desc: "山区农家乐，能吃饱就行", icon: "🍽️", warn: "⚠️ 山区农家乐味道可能一般" },
        { time: "13:30-15:00", title: "桃岭72拐 — 核心驾驶体验", duration: "1.5h", desc: "海拔200→800m · 连续发卡弯 · 六道湾观景台必停", icon: "🏔️" },
        { time: "15:00-16:30", title: "驱车 → 桃花潭", duration: "1.5h车程", desc: "60km 山路", icon: "🚗" },
        { time: "16:30-18:00", title: "桃花潭游览", duration: "1.5h", desc: "门票 ￥75/人（含渡船）", icon: "🌸" },
        { time: "18:00-18:30", title: "驱车 → 太平湖", duration: "30min车程", desc: "20km", icon: "🚗" },
        { time: "18:30", title: "入住太平湖畔民宿", duration: "—", icon: "🏨" },
        { time: "19:00-20:00", title: "湖边晚餐", duration: "1h", desc: "太平湖鱼头、农家土菜", icon: "🐟" },
      ],
      spots: [
        {
          name: "储家滩",
          desc: "川藏线起点的\"十里画廊\"，湖面如镜倒映远山",
          images: [
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80",
            "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=600&q=80",
          ],
          badge: "摄影推荐",
          playTips: ["沿湖边步道走一圈约15min", "如果有竹筏可以坐一下（20元/人）", "注意岔路口往右走才是川藏线方向"],
          photoTips: ["站在湖边拍水面镜像倒影", "清晨/傍晚有薄雾时最美", "如果看到白鹭飞过赶紧抓拍"],
          navAddress: "安徽省宣城市宁国市青龙乡储家滩",
        },
        {
          name: "方塘落羽杉",
          desc: "\"皖南喀纳斯\"，2000亩水杉林倒映水中",
          images: [
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
            "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&q=80",
          ],
          badge: "抖音爆火",
          playTips: ["岸边观景即可，不用深入", "有竹筏体验（20元/人）从水面看更美", "4月是翠绿版，秋天才变红但绿色也好看"],
          photoTips: ["拍水杉倒映水面的对称构图", "用广角拍出林海气势", "手机全景模式效果也不错"],
          navAddress: "安徽省宣城市宁国市方塘乡落羽杉湿地公园",
        },
        {
          name: "桃岭72拐",
          desc: "皖南川藏线灵魂路段，海拔从200m陡升至800m+",
          images: [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
          ],
          badge: "必去！全网推荐",
          playTips: [
            "入口纪念碑必须停车合影",
            "六道湾观景台是 THE 拍照点，俯瞰层叠发卡弯",
            "弯前鸣笛注意对向来车",
            "放一首燃的公路歌单，副驾和后座当导游报幕",
            "沿途看竹林、茶园、山涧溪流",
          ],
          photoTips: ["六道湾观景台：俯拍盘山公路像巨龙", "每个发卡弯出弯后回头拍弯道本身", "山顶拍远处山谷和村落全景"],
          navAddress: "安徽省宣城市泾县桃岭公路",
        },
        {
          name: "桃花潭",
          desc: "\"桃花潭水深千尺，不及汪伦送我情\" — 李白",
          images: [
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
          ],
          badge: "经典人文",
          playTips: ["乘摆渡船渡青弋江，两岸徽派建筑很美", "踏歌岸阁是核心景点，李白送别之地", "全程走一圈约 1.5 小时"],
          photoTips: ["渡船上拍两岸倒影", "踏歌岸阁拍古建+江面", "桥上拍全景最出片"],
          navAddress: "安徽省宣城市泾县桃花潭景区",
        },
      ],
      foodTips: [
        "宁国早午餐吃饱（酒店附近找一家）",
        "板桥村农家乐 — 笋干烧肉、土鸡汤（味道可能一般但能吃饱）",
        "太平湖鱼头 — 太平湖活水鱼现杀现做，晚餐重头戏",
      ],
      stayArea: "太平湖畔",
      stayType: "民宿",
      stayNote: "湖景民宿/徽派老宅改的民宿氛围更好，推荐翟家大院或太平湖景民宿（￥300-500/间）",
    },
    // ═══ Day 2: 4/5 ═══
    {
      day: 2,
      date: "4月5日",
      weekday: "周六",
      theme: "世界遗产 + 徽州美食夜",
      title: "宏村 → 屯溪老街",
      weather: "晴 11~26°C 无雨",
      weatherIcon: "☀️",
      butlerIntro: "今天去打卡世界遗产宏村！下午轻松到屯溪，晚上逛老街吃徽菜看灯光秀。今天走路最多（约7-8km），晚上强烈建议捏个脚~",
      schedule: [
        { time: "10:00", title: "起床", duration: "—", icon: "⏰" },
        { time: "10:30", title: "退房出发 → 宏村", duration: "1.5h车程", desc: "70km", icon: "🚗" },
        { time: "12:00-12:45", title: "午餐：宏村入口附近", duration: "45min", desc: "必吃臭鳜鱼、毛豆腐、黄山烧饼", icon: "🍽️" },
        { time: "12:45-15:15", title: "宏村游览", duration: "2.5h", desc: "门票 ￥104/人 · 需提前实名预约", icon: "🎨" },
        { time: "15:15-15:45", title: "奇墅湖散步", duration: "30min", desc: "免费 · 宏村西门外步行即到", icon: "🏞️" },
        { time: "15:45-16:45", title: "驱车 → 屯溪", duration: "1h车程", desc: "60km", icon: "🚗" },
        { time: "16:45", title: "到达屯溪，入住酒店", duration: "—", icon: "🏨" },
        { time: "17:00-18:00", title: "酒店休息/洗漱", duration: "1h", desc: "走了半天歇歇脚", icon: "🛀" },
        { time: "18:00-19:30", title: "晚餐：屯溪老街徽菜馆", duration: "1.5h", desc: "徽张臭鳜鱼 · 人均 ￥60", icon: "🐟" },
        { time: "19:30-20:00", title: "灯光秀", duration: "25min", desc: "19:30 准时开启，免费", icon: "✨" },
        { time: "20:00-21:30", title: "老街夜游逛吃", duration: "1.5h", desc: "买特产、吃小吃、拍夜景", icon: "🏮" },
        { time: "21:30-22:30", title: "推荐：足浴按摩", duration: "1h", desc: "今天走路约 7-8km，捏个脚！人均 ￥60-100", icon: "💆" },
      ],
      spots: [
        {
          name: "宏村",
          desc: "世界文化遗产，\"中国画里乡村\"，月沼倒影、南湖烟雨",
          images: [
            "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=600&q=80",
            "https://images.unsplash.com/photo-1528164344885-947ce28b5782?w=600&q=80",
            "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80",
          ],
          badge: "必去！世界文化遗产",
          playTips: [
            "从南湖入口进，沿水圳往里走",
            "月沼（半月形水池）是核心，多待一会看倒影",
            "承志堂是\"民间故宫\"，木雕极精美",
            "全程走一圈约 2-2.5 小时",
            "需提前在\"黟县徽黄旅游\"公众号实名预约",
          ],
          photoTips: ["月沼：蹲低拍水面倒影（上午光线好）", "南湖：拍桥+远山+粉墙黛瓦全景", "巷弄里拍光影效果很赞"],
          navAddress: "安徽省黄山市黟县宏村景区",
        },
        {
          name: "奇墅湖",
          desc: "宏村门口的隐藏湖景，免费开放、平地不爬山",
          images: [
            "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80",
          ],
          badge: "小众免费",
          playTips: ["宏村西门出来走几百米就到", "沿湖步道散步约 20-30min", "可以骑行环湖（如果有共享单车）"],
          photoTips: ["湖面拍远山倒影", "有木栈道/码头可以作为前景"],
          navAddress: "安徽省黄山市黟县奇墅湖",
        },
        {
          name: "屯溪老街",
          desc: "1272 米明清古街 + 夜间灯光秀 25 分钟",
          images: [
            "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=600&q=80",
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
          ],
          badge: "必去！美食圣地",
          playTips: [
            "先吃晚饭（推荐徽张臭鳜鱼，老街入口处）",
            "19:30 灯光秀准时开，找个好位置等",
            "沿街逛吃：毛豆腐(￥10)、黄山烧饼、徽墨酥",
            "今天走路多，附近找足浴店捏脚放松",
          ],
          photoTips: ["灯光秀全景：老街牌坊处拍摄", "路边现煎毛豆腐特写很有烟火气", "夜晚灯笼+古建筑氛围感满分"],
          navAddress: "安徽省黄山市屯溪区屯溪老街",
        },
      ],
      foodTips: [
        "臭鳜鱼 — 徽菜之首，\"闻之微臭，食之奇香\"",
        "毛豆腐 — 老街路边现煎 ￥10/份，省级非遗",
        "石耳炖鸡 — 黄山石耳 + 散养土鸡慢炖 3 小时",
        "胡适一品锅 — 一锅多料层层叠，文化名菜",
      ],
      stayArea: "屯溪/黄山市区",
      stayType: "酒店",
      stayNote: "屯溪是城市，酒店选择多条件好。捏完脚回酒店睡大床舒服（￥300-500/间）",
      endNote: "今天步行约 7-8km，是全程走路最多的一天。强烈建议晚上找足浴店放松一下！",
    },
    // ═══ Day 3: 4/6 ═══
    {
      day: 3,
      date: "4月6日",
      weekday: "周日",
      theme: "绿野仙踪 + 轻松返程",
      title: "西溪南 → 返程上海",
      weather: "多云微雾 17~23°C 仅 0.3mm",
      weatherIcon: "🌤️",
      butlerIntro: "最后一天轻松收尾~ 打卡抖音爆火的西溪南，然后回家！返程高速途中有个网红服务区可以停一下~",
      schedule: [
        { time: "10:00", title: "起床", duration: "—", icon: "⏰" },
        { time: "10:30", title: "退房出发 → 西溪南", duration: "15min车程", desc: "10km", icon: "🚗" },
        { time: "10:45-12:00", title: "西溪南游览", duration: "1.25h", desc: "免费！抖音爆火\"绿野仙踪\"", icon: "🌿" },
        { time: "12:00-12:45", title: "午餐：附近农家菜", duration: "45min", desc: "吃饱再上路！", icon: "🍽️" },
        { time: "13:00", title: "上 G3 京台高速返程", duration: "—", icon: "🛣️" },
        { time: "~13:10", title: "途经呈坎服务区（可停）", duration: "15-20min", desc: "安徽首个网红服务区，有非遗展+特产", icon: "🛒" },
        { time: "13:00-17:30", title: "高速返程 → 上海", duration: "4-4.5h", desc: "420km · 详见备选路线", icon: "🚗" },
        { time: "~17:00-17:30", title: "到达上海", duration: "—", desc: "完美收官！", icon: "🏠" },
      ],
      spots: [
        {
          name: "西溪南",
          desc: "小红书/抖音爆火\"绿野仙踪\"，枫杨林下溪水潺潺",
          images: [
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
            "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=600&q=80",
          ],
          badge: "抖音爆火 · 免费",
          playTips: ["进村后沿溪水方向走，穿过枫杨林", "全程走一圈约 40-60min", "溪边有石头可以坐着发呆拍照"],
          photoTips: ["枫杨林隧道：往里拍绿色隧道感", "溪水+石头+绿荫的小清新构图", "逆光拍树叶透光效果"],
          navAddress: "安徽省黄山市徽州区西溪南古村",
        },
        {
          name: "呈坎服务区",
          desc: "安徽首个网红交旅融合服务区，非遗展+特产",
          images: [
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
          ],
          playTips: ["上个厕所、买点特产零食路上吃", "有非遗徽州展区可以逛逛", "还有\"无忧园\"小景区（时间充裕可看15min）"],
          photoTips: ["徽派建筑风格的服务区本身就挺特别"],
          navAddress: "G3京台高速呈坎服务区",
        },
      ],
      foodTips: ["返程前吃饱！高速服务区选择有限", "呈坎服务区有黄山烧饼/茶叶特产可以买"],
      stayArea: "—",
      stayType: "酒店",
      stayNote: "今天回家！",
      endNote: "返程备选路线：① 主选 G3 京台高速（420km）② 如果 G3 堵车：走 G56 杭瑞高速→杭州→G60 沪昆高速→上海（多30km但可能更快）③ G50 沪渝高速经宣城（G3宣城段堵时切换）。出发前看高德实时路况再决定！",
    },
  ],
  costs: [
    { label: "油费（约900km SUV）", total: "￥720", perPerson: "￥144" },
    { label: "高速费（4/3晚可能~￥80）", total: "~￥80", perPerson: "~￥16" },
    { label: "住宿 3晚（2间房 × ￥350 × 3晚）", total: "￥2,100", perPerson: "￥420" },
    { label: "门票（桃花潭75 + 宏村104）", total: "—", perPerson: "￥179" },
    { label: "餐费（6正餐+3早餐 约￥50/餐）", total: "—", perPerson: "￥450" },
  ],
  tips: [
    "宏村需预约：提前在\"黟县徽黄旅游\"公众号实名预约",
    "加油：出发前在上海加满，川藏线沿途无加油站！宁国市区可补一次",
    "川藏线驾驶：桃岭段弯急坡陡，让经验最丰富的人开，弯前鸣笛",
    "下载离线地图：山区信号弱，提前下好高德离线地图和音乐",
    "返程建议：4/6 下午 13:00 上高速，看高德实时路况选路线",
    "5人轮换开车：Day 1 约 5h 驾驶，别让一个人开全程",
  ],
};
