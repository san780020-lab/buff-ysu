// 2027 课程信息由机构提供。机构确认：B 班含专业课答疑，不含数学答疑。
// 后续直接修改本文件；站外链接使用完整 https:// 地址。
window.BUFF_CONTENT = {
  subjects: {
    all: { label: '全部方向', tag: 'ELECTRICAL & CONTROL', title: '两条路线，清楚区分。', description: '电气：经典自控＋直流调速。控制：经典自控＋现代控制＋直流拖动控制系统。' },
    electrical: {
      label: '电气考研', tag: '806 · ELECTRICAL',
      title: '电气方向\n经典自控＋直流调速。',
      description: '2027 招生目录中，806 为自动控制原理 B＋直流调速，其中自控占 60%、直流调速占 40%。复习围绕经典控制基础与直流调速展开。'
    },
    control: {
      label: '控制考研', tag: '830 · CONTROL',
      title: '控制方向\n自控＋现控＋直流部分。',
      description: '2027 招生目录中，830 包含自动控制原理 50%、现代控制理论 30%、直流拖动控制系统 20%。在经典自控基础上，单独安排状态空间、能控能观与反馈设计。'
    }
  },
  courses: [
    {
      id: 'full-course', subject: 'electrical', stage: 'initial', number: '01',
      stageLabel: '初试 · 全程辅导', title: '806 自控＋运控 VIP 全程班',
      subtitle: '基础、强化、冲刺与考前，串起完整复习路径。',
      audience: '适合希望系统学习自控与直流调速，并需要学习规划和过程跟进的同学。',
      priceLabel: '¥2200–2500', status: '2027 课程',
      previewTopics: ['基础 40＋课时 · 强化 30＋课时', '冲刺约 18＋课时 · 答疑课 12＋课时', '配套讲义、真题、200 题与学习服务'],
      topics: ['基础班：教材公式推导、原理分析、教材精讲与课后题选讲，40＋课时。', '强化班：重点分类讲解、知识归纳与做题方法提炼，30＋课时。', '冲刺班：近年真题与冲刺卷串讲，约 18＋课时。', '答疑课：月考题、重点章节讲义与课后习题讲解，12＋课时。', '小班内容：考纲讲解与重点规划约 2 课时，配合燕大小班班会与直播答疑。'],
      materials: ['辅导讲义与初试全攻略', '燕山大学真题及详细答案', '自控强化 200 题', '冲刺卷、每日一题及课后习题讲解'],
      pricing: [{ label: '全程 A 班', price: '2500', note: '含专业课答疑与数学答疑' }, { label: '全程 B 班', price: '2200', note: '含专业课答疑，不含数学答疑' }],
      services: ['一对一语音指导、各科复习规划与择校建议', '月度测评与批改、每日打卡、每月总结', '班主任跟进与备考信息支持'],
      teachers: '课程表列有子颜学长、东大红哥、子超学长、原枫学长等授课与答疑老师，具体安排请咨询。',
      offer: '海报列有两人团报减 100 元、三人团报减 200 元；团报与活动价不叠加，具体适用方式请咨询。',
      source: '2027 全程班海报与课程展示 PDF', poster: 'full-course-table', document: 'assets/documents/buff-ysu-courses-and-qa.pdf'
    },
    {
      id: 'intensive-course', subject: 'control', stage: 'initial', number: '02',
      stageLabel: '初试 · 强化＋冲刺', title: '自控＋运控＋现控强化冲刺班',
      subtitle: '按专题突破，再衔接真题与模拟卷训练。',
      audience: '适合已有基础，准备开展专题强化、真题训练与考前整理的同学。',
      priceLabel: '¥1500–1600', status: '2027 课程',
      previewTopics: ['建模、时域、根轨迹、频域与校正专题', '现代控制 20＋课时 · 运控 20＋课时', '强化 200 题与真题、模拟卷串讲'],
      topics: ['数学模型 2 课时、时域分析 4 课时、根轨迹 4 课时。', '频域分析 6 课时、校正专题 2 课时。', '现代控制 20＋课时、运控 20＋课时。', '自控强化 200 题习题课 15 课时。', '燕山大学近年真题串讲 3–8 课时、模拟卷串讲 6 课时、考前重点讲解 2–4 课时。'],
      materials: ['配套辅导讲义', '燕山大学真题', '自控强化 200 题', 'BUFF 冲刺卷与每日一题'],
      pricing: [{ label: '强化冲刺 A 班', price: '1600', note: '强化与冲刺联报' }, { label: '强化冲刺 B 班', price: '1500', note: '含专业课答疑，不含数学答疑' }, { label: '强化班单报', price: '1300', note: '按本张强化冲刺班海报报价' }, { label: '冲刺班单报', price: '800', note: '按本张联报海报中的单报条目报价' }],
      services: ['专业课答疑与复习规划', '一对一语音指导、月度测评与每日打卡', '进度跟踪、班主任跟进与陪伴复习'],
      offer: '海报列有两人团报减 100 元、三人团报减 200 元。与独立 VIP 冲刺班为不同报价条目，请核对班型。',
      source: '2027 自控＋运控＋现控 VIP 强化冲刺班海报', poster: 'intensive-course'
    },
    {
      id: 'sprint-course', subject: 'all', stage: 'initial', number: '03',
      stageLabel: '初试 · 独立冲刺班', title: '806 / 830 自控 VIP 冲刺班',
      subtitle: '手算技巧、真题串讲与八套卷讲解相互配合。',
      audience: '适合进入冲刺阶段，希望集中练习真题、手算技巧与模拟卷的同学。',
      priceLabel: '¥699–799', status: '2027 课程',
      previewTopics: ['手算技巧 10＋课时 · 真题集锦 24＋课时', '近年真题串讲与八套冲刺卷串讲', '考前冲刺 100 题与考前答疑'],
      topics: ['禁用计算器手算技巧：10＋课时。', '禁用计算器真题集锦讲解：24＋课时。', '近年真题串讲：3–10 课时，围绕目标院校安排。', '冲刺卷串讲：12＋课时，配套 8 套冲刺卷。', '考前冲刺 100 题：按高频考点整理，配套逐题讲解视频。', '考前答疑：6 课时。'],
      materials: ['禁用计算器专题讲义及真题集锦', '院校真题与详细答案', 'BUFF 冲刺卷', '每日一题'],
      pricing: [{ label: '冲刺 A 班', price: '799', note: '含专业课答疑与数学答疑' }, { label: '冲刺 B 班', price: '699', note: '含专业课答疑，不含数学答疑' }],
      services: ['一对一语音指导、复习规划与择校建议', '专业课月测、打卡、进度跟踪与班主任服务'],
      teachers: '冲刺班海报列有超人学长、东大红哥、子超学长、原枫学长等老师，具体授课安排请咨询。',
      offer: '团报活动与具体班型请咨询；本班与其他套餐中的单报冲刺条目分别报价。',
      source: '独立 VIP 冲刺班海报与冲刺班介绍 PDF', poster: 'sprint-course', document: 'assets/documents/buff-ysu-sprint-introduction.pdf'
    },
    {
      id: 'qa-course', subject: 'all', stage: 'initial', number: '04',
      stageLabel: '初试 · 自学资料与答疑', title: '806 / 830 自控资料答疑班',
      subtitle: '六册或八册资料，配合对应内部资料的专业答疑。',
      audience: '适合以自学为主，希望配套使用资料并咨询资料相关问题的同学。',
      priceLabel: '¥228 / ¥268', status: '2027 资料',
      previewTopics: ['6 册基础资料，或 8 册含强化 200 题', '历年真题、详解、高频考点与运控汇总', '答疑范围限于赠送的内部资料'],
      topics: ['六册版：历年真题、真题详解、高频考点汇总、运控知识点汇总、基础习题及解析、禁用计算器真题集锦。', '八册版：在六册版基础上增加自控强化 200 题题目册与解析册。', '海报中的真题资料年份为 2004–2025。'],
      materials: ['2004–2025 历年真题与真题详解', '经典控制、现代控制高频考点汇总', '运控知识点汇总与基础习题解析', '禁用计算器真题集锦', '强化 200 题题目册与解析册（八册版）'],
      pricing: [{ label: '不含 200 题 · 6 册', price: '228', note: '含对应内部资料的专业答疑' }, { label: '含 200 题 · 8 册', price: '268', note: '增加题目册与解析册' }],
      services: ['院校信息指导', '专业课答疑仅限赠送的内部资料，不等同于全程辅导班服务'],
      offer: '海报列有联系桑桑哥拼团减 20 元，具体活动请咨询确认。',
      source: '2027 答疑班海报及资料清单', poster: 'qa-overview', document: 'assets/documents/buff-ysu-courses-and-qa.pdf'
    },
    {
      id: 'sprint-papers', subject: 'control', stage: 'initial', number: '05',
      stageLabel: '初试 · 冲刺卷资料', title: '830 冲刺押题八套卷',
      subtitle: '自控 A＋直流拖动，按海报列示覆盖十类专题。',
      audience: '适合需要模拟练习的同学；请先核对 830、自控 A 与直流拖动是否匹配自己的考试科目。',
      priceLabel: '¥168 / ¥228', status: '2027 资料',
      previewTopics: ['8 套卷，每套 10 道大题、150 分', '经典控制＋现代控制＋直流拖动', '解析版或解析＋讲解视频版'],
      topics: ['每套 10 道大题，每题 15 分，共 150 分。', '经典控制：建模、二阶时域、稳态与扰动、根轨迹、奈氏判据、频域校正，共 90 分。', '现代控制：状态空间、状态反馈，共 30 分。', '直流拖动：直流调速、双闭环，共 30 分。', '完整的八套卷考点分布可在原海报中查看。'],
      pricing: [{ label: '八套卷＋解析', price: '168', note: '不含讲解视频' }, { label: '八套卷＋解析＋视频', price: '228', note: '含配套讲解视频' }],
      materials: ['冲刺八套卷与解析', '配套讲解视频（视频版）'],
      source: '2027 自控 A＋直流拖动 830 冲刺押题卷海报', poster: 'sprint-papers', document: 'assets/documents/buff-ysu-sprint-introduction.pdf'
    },
    {
      id: 'reexam-course', subject: 'all', stage: 'reexam', number: '06',
      stageLabel: '复试 · 后续更新', title: '复试课程与辅导安排',
      subtitle: '复试保留独立栏目，具体课程待补充。',
      audience: '适合准备关注复试辅导安排的同学。', priceLabel: '待公布', status: '待更新',
      previewTopics: ['本次提供的材料主要为初试课程', '复试科目、师资、课时与价格待补充', '可先通过咨询入口了解后续安排'],
      topics: ['本次资料未提供完整复试课程，暂不将初试课程安排套用到复试。', '复试课程、服务、课时与价格将在机构提供具体信息后更新。'],
      source: '复试课程资料待补充'
    }
  ],
  admissions: {
    year: 2027, source: 'https://zsjyc.ysu.edu.cn/info/1255/4497.htm',
    programs: [
      { code: '080800', name: '电气工程', degree: '学硕', label: '电气学硕', exam: '806', ordinary: 51, joint: 0 },
      { code: '085801', name: '电气工程', degree: '专硕', label: '电气专硕', exam: '806', ordinary: 77, joint: 7 },
      { code: '081100', name: '控制科学与工程', degree: '学硕', label: '控制学硕', exam: '830', ordinary: 110, joint: 0 },
      { code: '085406', name: '控制工程', degree: '专硕', label: '控制专硕', exam: '830', ordinary: 121, joint: 0 }
    ]
  },
  textbooks: [
    { title: '自动控制原理', edition: '第四版', author: '夏德钤', publisher: '机械工业出版社', image: 'assets/books/automatic-control-4th.png', tag: '806 / 830 共同参考', scope: '电气与控制方向共同使用，专业课侧重点按各自科目要求区分。' },
    { title: '电力拖动自动控制系统—运动控制系统', edition: '第五版', author: '阮毅、杨影、陈伯时', publisher: '机械工业出版社', image: 'assets/books/electric-drive-5th.png', tag: '直流部分', scope: '806：第 1–4 章；830：第 1–5 章。' },
    { title: '现代控制理论', edition: '第三版', author: '刘豹', publisher: '机械工业出版社', image: '', tag: '830 控制方向增加', scope: '控制方向额外参考书。先展示目录信息，封面后续补充。' }
  ],
  posters: [
    { id: 'full-course-overview', group: 'full', title: '806 全程班 · 课程总览', description: '四阶段课程、配套资料、服务与班型价格。', image: 'assets/posters/full-course-overview.webp', thumb: 'assets/posters/full-course-overview-thumb.webp', width: 1024, height: 1536 },
    { id: 'full-course-table', group: 'full', title: '806 全程班 · 课程服务表', description: '查看详细课时、师资、资料与服务项目。', image: 'assets/posters/full-course-table.webp', thumb: 'assets/posters/full-course-table-thumb.webp', width: 1280, height: 1988 },
    { id: 'intensive-course', group: 'full', title: '强化冲刺班 · 课程服务表', description: '专题课时、联报与单报价格、配套服务。', image: 'assets/posters/intensive-course.webp', thumb: 'assets/posters/intensive-course-thumb.webp', width: 1280, height: 2031 },
    { id: 'sprint-course', group: 'sprint', title: '806 / 830 VIP 冲刺班', description: '手算技巧、真题、八套卷与冲刺服务。', image: 'assets/posters/sprint-course.webp', thumb: 'assets/posters/sprint-course-thumb.webp', width: 1280, height: 1757 },
    { id: 'sprint-papers', group: 'sprint', title: '830 冲刺八套卷 · 考点分布', description: '八套卷、十类专题及解析与视频版价格。', image: 'assets/posters/sprint-papers.webp', thumb: 'assets/posters/sprint-papers-thumb.webp', width: 3200, height: 2154 },
    { id: 'qa-overview', group: 'qa', title: '自控资料答疑班 · 总览', description: '六册与八册资料组合、价格和咨询二维码。', image: 'assets/posters/qa-overview.webp', thumb: 'assets/posters/qa-overview-thumb.webp', width: 2542, height: 4509 },
    { id: 'qa-materials', group: 'qa', title: '答疑班 · 六册与八册清单', description: '对照两种资料组合及答疑服务范围。', image: 'assets/posters/qa-materials.webp', thumb: 'assets/posters/qa-materials-thumb.webp', width: 750, height: 1363 },
    { id: 'qa-collection', group: 'qa', title: '燕大八大宝藏 · 资料展示', description: '查看整套资料封面与报名信息。', image: 'assets/posters/qa-collection.webp', thumb: 'assets/posters/qa-collection-thumb.webp', width: 1055, height: 1491 }
  ],
  documents: [
    { title: '806 / 830 自控冲刺班课程介绍', description: '课程内容、八套卷、真题与配套资料展示。', pages: 7, size: '约 2.5 MB', url: 'assets/documents/buff-ysu-sprint-introduction.pdf', sourcePages: '原 PDF 第 1、5、6、7、9、10、13 页' },
    { title: '燕山大学课程及答疑班展示', description: '全程课程、配套资料与课程服务表。', pages: 6, size: '约 2.1 MB', url: 'assets/documents/buff-ysu-courses-and-qa.pdf', sourcePages: '原 PDF 第 4、5、7、9、11、14 页' }
  ],
  // 每日一题题目公开存放；不在公开仓库放入需要权限控制的答案。
  // 示例字段：id, date (YYYY-MM-DD), subject, title, question, image,
  // knowledgePoint, bilibili, douyin。视频字段留空时显示讲解待更新。
  dailyQuestions: [],
  videos: [
    { title: '自动控制原理全程班 · 系列三', category: '自控试听', group: 'control', platform: 'bilibili', url: 'https://b23.tv/STYQFiG', cover: 'assets/video-covers/automatic-control.svg', description: 'BUFF 控制考研 · 系列三老师试听课。' },
    { title: '电路全程班 · 炼炼哥系列一', category: '电路 · 直播试听', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/oQ9b9qv', cover: 'assets/video-covers/circuits-one.svg', description: '2027 BUFF 团队电路全程班系列一试听。' },
    { title: '电路全程班 · BUFF 学长系列二', category: '电路 · 直播试听', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/DnqlUwY', cover: 'assets/video-covers/circuits-two.svg', description: '2027 BUFF 团队电路全程班系列二试听。' },
    { title: '电路全程班 · 京京哥系列三', category: '电路 · 直播试听', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/xCFTy0P', cover: 'assets/video-covers/circuits-three.svg', description: '2027 BUFF 团队电路全程班系列三试听。' },
    { title: '开式网络的潮流计算', category: '电力系统分析', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/I2WLtQ3', cover: 'assets/video-covers/power-flow.svg', description: '藏锋学长 · 2027 电分试听课。' },
    { title: '对称分量法', category: '电力系统分析', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/PPHRPM7', cover: 'assets/video-covers/symmetrical-components.svg', description: '藏锋学长 · 2027 电分试听课。' },
    { title: '有功负荷最优分配', category: '电力系统分析', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/z0WV40I', cover: 'assets/video-covers/load-dispatch.svg', description: '藏锋学长 · 2027 电分试听课。' },
    { title: '数字电路、模拟电路试听', category: '其他初试专业课', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/ptA3Izq', cover: 'assets/video-covers/electronics.svg', description: '2027 BUFF 团队初试专业课试听。' },
    { title: '电力电子、电机学试听', category: '其他初试专业课', group: 'extended', platform: 'bilibili', url: 'https://b23.tv/MsoaCYh', cover: 'assets/video-covers/power-electronics.svg', description: '2027 BUFF 团队初试专业课试听。' },
    { title: '2027 考研公共课试听', category: '初试公共课', group: 'public', platform: 'bilibili', url: 'https://b23.tv/HxXmKIS', cover: 'assets/video-covers/public-courses.svg', description: 'BUFF 团队考研公共课试听课程。' }
  ],
  contact: {
    people: [{ name: '桑桑哥', role: '课程、资料与拼团咨询', qq: '3298202133' }],
    qqGroup: '716928002', groupLabel: '2027 燕山大学电气与控制考研交流群',
    publicAccount: 'BUFF电气考研', wechat: '', email: '',
    bilibili: 'https://space.bilibili.com/3747561124924582',
    douyin: 'https://www.douyin.com/user/MS4wLjABAAAA8dRtIFbTDSuerYLkNZ2dafkrI7MZLHi26YU_ngKYYrXdwbf4a4d_Dgttqx5bb5RF', qrImage: ''
  }
};
