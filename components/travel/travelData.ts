// ── Confirmed trip: Shanghai → Anhui 3 nights / 3 days ──

export interface Spot {
  name: string;
  desc: string;
  image: string;
}

export interface TimeSlot {
  time: string;
  title: string;
  desc?: string;
  icon?: string;
}

export interface DayPlan {
  day: number;
  date: string;
  weekday: string;
  theme: string;
  title: string;
  weather: string;
  weatherIcon: string;
  schedule: TimeSlot[];
  spots: Spot[];
  foodTips: string[];
  stayTip?: string;
}

export interface CostItem {
  label: string;
  total: string;
  perPerson: string;
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

export const TRIP: TripData = {
  title: "上海 → 安徽 自驾攻略",
  subtitle: "泾县 · 查济 · 桃花潭 · 太平湖 · 宏村 · 屯溪",
  dateRange: "4月3日(周四)晚 — 4月6日(周日)下午",
  people: 5,
  vehicle: "越野车 SUV",
  totalKm: 950,
  routeSummary: "上海徐汇 → 泾县 → 查济古镇 → 桃花潭 → 太平湖 → 宏村 → 屯溪老街 → 上海",
  color: "#F59E0B",
  days: [
    // ── Night 0: 4/3 ──
    {
      day: 0,
      date: "4月3日",
      weekday: "周四",
      theme: "夜间赶路",
      title: "上海徐汇 → 泾县县城",
      weather: "多云 14°C",
      weatherIcon: "🌙",
      schedule: [
        { time: "18:00", title: "徐汇区公司集合出发", icon: "🚗" },
        { time: "18:00-21:30", title: "G50 沪渝高速 → 泾县出口", desc: "约 300km，3.5 小时车程" },
        { time: "21:30", title: "抵达泾县县城，入住酒店", icon: "🏨" },
        { time: "22:00", title: "泾县夜宵", desc: "推荐泾县肉焖面（当地名小吃）", icon: "🍜" },
      ],
      spots: [],
      foodTips: ["泾县肉焖面 — 当地特色名小吃，面条劲道、卤汁浓香"],
      stayTip: "泾县县城商务酒店（￥200-300/间），选有免费停车场的",
    },
    // ── Day 1: 4/4 ──
    {
      day: 1,
      date: "4月4日",
      weekday: "周五",
      theme: "千年古村 + 诗意湖泊",
      title: "查济古镇 → 桃花潭 → 太平湖",
      weather: "多云 12~22°C 无雨",
      weatherIcon: "⛅",
      schedule: [
        { time: "07:30", title: "早餐", desc: "酒店早餐或泾县街头早点，推荐泾县烧饼", icon: "🥐" },
        { time: "08:30", title: "出发 → 查济古镇", desc: "60km 约 1 小时", icon: "🚗" },
        { time: "09:30-12:00", title: "查济古镇游览（2.5h）", desc: "门票 ￥80/人 · 190+ 处明清古建 · 比宏村更安静原始", icon: "🏘️" },
        { time: "12:00-13:00", title: "午餐：查济村内农家乐", desc: "推荐笋干烧肉、土鸡汤、山野菜", icon: "🍽️" },
        { time: "13:30", title: "驱车 → 桃花潭", desc: "25km 约 30 分钟", icon: "🚗" },
        { time: "14:00-16:00", title: "桃花潭游览（2h）", desc: "门票 ￥70/人 + 摆渡船 ￥5 · 李白诗意之地", icon: "🌸" },
        { time: "16:30", title: "驱车 → 太平湖", desc: "15km 约 20 分钟", icon: "🚗" },
        { time: "17:00-18:00", title: "太平湖游船观光（1h）", desc: "船票 ￥100/人 · 皖南最大人工湖", icon: "🚢" },
        { time: "18:30", title: "入住太平湖/桃花潭附近民宿", icon: "🏨" },
        { time: "19:00", title: "晚餐", desc: "推荐太平湖鱼头、农家土菜", icon: "🐟" },
      ],
      spots: [
        { name: "查济古镇", desc: "全国重点文保单位，\"十里查村九里烟，三溪汇流万户间\"", image: "https://images.unsplash.com/photo-1528164344885-947ce28b5782?w=600&q=80" },
        { name: "桃花潭", desc: "\"桃花潭水深千尺，不及汪伦送我情\" — 李白", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80" },
        { name: "太平湖", desc: "黄山脚下的翡翠明珠，游船穿行于岛屿之间", image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80" },
      ],
      foodTips: [
        "笋干烧肉 — 春笋配五花肉，咸鲜入味",
        "土鸡汤 — 查济散养土鸡，黄油清甜",
        "太平湖鱼头 — 太平湖活鱼现杀现做",
      ],
      stayTip: "翟家大院（桃花潭景区店）— 评分 4.9 徽派古建 ￥300-400/间",
    },
    // ── Day 2: 4/5 ──
    {
      day: 2,
      date: "4月5日",
      weekday: "周六",
      theme: "世界遗产 + 徽州美食夜",
      title: "宏村 → 西递 → 屯溪老街",
      weather: "晴 11~26°C 无雨",
      weatherIcon: "☀️",
      schedule: [
        { time: "08:00", title: "早餐、退房", icon: "🥐" },
        { time: "08:30", title: "出发 → 宏村", desc: "70km 约 1.5 小时", icon: "🚗" },
        { time: "10:00-12:30", title: "宏村游览（2.5h）", desc: "门票 ￥104/人 · 需提前实名预约 · 世界文化遗产", icon: "🎨" },
        { time: "12:30-13:30", title: "午餐：宏村附近", desc: "必吃臭鳜鱼、毛豆腐、黄山烧饼", icon: "🍽️" },
        { time: "14:00", title: "驱车 → 西递", desc: "17km 约 20 分钟", icon: "🚗" },
        { time: "14:30-16:30", title: "西递游览（2h）", desc: "门票 ￥94/人 · 世界文化遗产 · 徽州三雕最精美", icon: "🏛️" },
        { time: "17:00", title: "驱车 → 屯溪", desc: "50km 约 1 小时", icon: "🚗" },
        { time: "18:00-19:30", title: "晚餐：屯溪老街徽菜馆", desc: "徽张臭鳜鱼 · 人均 ￥60", icon: "🐟" },
        { time: "19:30-21:00", title: "屯溪老街夜游 + 灯光秀", desc: "1272 米明清古街 · 灯光秀 19:30 开启", icon: "🏮" },
        { time: "21:00", title: "入住屯溪/黄山市区酒店", icon: "🏨" },
      ],
      spots: [
        { name: "宏村", desc: "\"中国画里乡村\" · 月沼倒影 · 南湖烟雨", image: "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=600&q=80" },
        { name: "西递", desc: "\"桃花源里人家\" · 徽州三雕（木雕/石雕/砖雕）最精", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=600&q=80" },
        { name: "屯溪老街", desc: "1272 米明清古街 · 夜间灯光秀 25 分钟", image: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?w=600&q=80" },
      ],
      foodTips: [
        "臭鳜鱼 — 徽菜之首，\"闻之微臭，食之奇香\"",
        "毛豆腐 — 老街路边现煎 ￥10/份，省级非遗",
        "石耳炖鸡 — 黄山石耳 + 散养土鸡慢炖 3 小时",
        "胡适一品锅 — 一锅多料层层叠，文化名菜",
      ],
      stayTip: "屯溪/黄山市区酒店 ￥300-500/间",
    },
    // ── Day 3: 4/6 ──
    {
      day: 3,
      date: "4月6日",
      weekday: "周日",
      theme: "绿野仙踪 + 轻松返程",
      title: "西溪南 → 返程上海",
      weather: "多云微雾 17~23°C 仅 0.3mm",
      weatherIcon: "🌤️",
      schedule: [
        { time: "08:00", title: "早餐", icon: "🥐" },
        { time: "08:30", title: "驱车 → 西溪南古村", desc: "10km 约 15 分钟", icon: "🚗" },
        { time: "09:00-10:30", title: "西溪南游览（1.5h）", desc: "免费！抖音爆火\"绿野仙踪\"古村", icon: "🌿" },
        { time: "11:00", title: "午餐：附近农家菜", icon: "🍽️" },
        { time: "12:30", title: "出发返程", desc: "G3 京台高速 → 上海 约 420km 4-4.5h", icon: "🚗" },
        { time: "~17:00", title: "抵达上海", desc: "完美收官！", icon: "🏠" },
      ],
      spots: [
        { name: "西溪南", desc: "小红书/抖音爆火\"绿野仙踪\"小众古村，枫杨林下溪水潺潺", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80" },
      ],
      foodTips: ["返程前吃饱！高速服务区选择有限"],
    },
  ],
  costs: [
    { label: "油费（约950km SUV）", total: "￥760", perPerson: "￥152" },
    { label: "高速费（清明免费，4/3晚约￥100）", total: "￥100", perPerson: "￥20" },
    { label: "住宿 3晚（2间房 × ￥350 × 3晚）", total: "￥2,100", perPerson: "￥420" },
    { label: "门票（查济+桃花潭+太平湖+宏村+西递）", total: "—", perPerson: "￥448" },
    { label: "餐费（6正餐+3早餐 约￥50/餐）", total: "—", perPerson: "￥450" },
  ],
  tips: [
    "清明高速免费：4月4日 0:00 至 4月6日 24:00，7座及以下免费。4/3晚出发可卡在 0:00 后下高速省过路费",
    "宏村需预约：提前在\"黟县徽黄旅游\"公众号实名预约",
    "加油：出发前在上海加满，泾县县城补充一次",
    "山路驾驶：查济方向有部分山路，SUV 没问题，弯道减速",
    "拍照时机：宏村月沼清晨 6:00-7:30 光线最佳，上午 10 点前也不错",
    "返程建议：4/6 下午 12:30 前上高速避开返程高峰",
    "茂林十二碗：泾县非遗美食，有机会一定要尝（茂林镇方和龙传承人餐厅）",
    "备选景点：可用齐云山（道教名山 ￥75+索道 ￥40）替换西递，游客极少景色堪比黄山",
  ],
};
