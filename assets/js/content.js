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
    sourcePublishedAt: '2026-10-08', verifiedAt: '2026-11-01',
    programs: [
      { code: '080800', name: '电气工程', degree: '学硕', label: '电气学硕', exam: '806', ordinary: 51, joint: 0 },
      { code: '085801', name: '电气工程', degree: '专硕', label: '电气专硕', exam: '806', ordinary: 77, joint: 7 },
      { code: '081100', name: '控制科学与工程', degree: '学硕', label: '控制学硕', exam: '830', ordinary: 110, joint: 0 },
      { code: '085406', name: '控制工程', degree: '专硕', label: '控制专硕', exam: '830', ordinary: 121, joint: 0 }
    ]
  },
  textbooks: [
    { title: '自动控制原理', edition: '第四版', author: '夏德钤', publisher: '机械工业出版社', image: 'assets/books/automatic-control-4th.png', tag: '806 / 830 共同参考', scope: '电气与控制方向共同使用，专业课侧重点按各自科目要求区分。' },
    { title: '电力拖动自动控制系统—运动控制系统', edition: '第五版', author: '阮毅、杨影、陈伯时', publisher: '机械工业出版社', image: 'assets/books/electric-drive-5th.png', coverStyle: 'drive', tag: '直流部分', scope: '806：第 1–4 章；830：第 1–5 章。' },
    { title: '现代控制理论', edition: '第三版', author: '刘豹', publisher: '机械工业出版社', image: 'assets/books/modern-control-3rd.png', coverStyle: 'modern', tag: '830 控制方向增加', scope: '控制方向额外参考书，用于现代控制理论部分。' }
  ],
  // 日期为真实发布日期，不随页面刷新或监测自动改成“今天”。
  news: [
    { id: 'ysu-2027-catalog', pinned: true, category: '招生计划', date: '2026-10-08', reviewedAt: '2026-11-01', title: '2027 电气工程学院招生目录', summary: '四类目标专业的拟招生计划、806 / 830 考试科目与参考书目。', body: ['本站已整理电气工程学硕、电气工程专硕、控制科学与工程学硕、控制工程专硕四类专业。电气专硕的国内普通培养与中澳联合培养分别展示。', '目录公布的是拟招生计划，最终计划以教育部正式下达指标为准。考试科目、参考书目及后续调整请以学校官方公告为准。'], sourceLabel: '燕山大学招生网', url: 'https://zsjyc.ysu.edu.cn/info/1255/4497.htm', module: 'admissions', actionLabel: '查看招生计划' },
    { id: 'ysu-2027-registration-tip', category: '报考公告', date: '2026-10-25', reviewedAt: '2026-11-01', title: '2027 研考燕大（1349）报考点报名温馨提示', summary: '官方已发布报考点相关提示，适用范围和具体安排请查阅原公告。', body: ['此条为燕山大学（1349）报考点发布的官方公告入口。报考点与招生单位并非同一概念，请结合自己的报考点核对适用范围。', '公告发布日期为 2026 年 10 月 25 日；本文不自动推算报名或确认截止时间，具体要求请阅读原公告。'], sourceLabel: '燕山大学招生网', url: 'https://zsjyc.ysu.edu.cn/info/1254/7107.htm' },
    { id: 'ysu-2027-online-registration', category: '报考公告', date: '2026-10-08', reviewedAt: '2026-11-01', title: '燕山大学（10216）2027 年硕士研考网报公告', summary: '报考燕山大学的考生，可由官方入口查阅网报说明。', body: ['此条链接指向燕山大学作为招生单位（10216）的 2027 年硕士研究生招生考试网报公告。', '请以官方原公告中的报考条件、提交要求和时间安排为准。'], sourceLabel: '燕山大学招生网', url: 'https://zsjyc.ysu.edu.cn/info/1254/7089.htm' }
  ],
  promotions: [
    { id: 'buff-trial-lessons', category: '课程试听', date: '2026-11-01', title: '先试听，再选择适合自己的课。', summary: '10 个试听入口已整理，自控、团队其他专业课与公共课分组查看。', body: ['自动控制原理试听放在公开课窗口首位，便于了解自控课程的讲解方式。', '电路、电分、数字与模拟电路、电力电子、电机学和公共课试听作为团队拓展资源单独分组；燕山大学 806 / 830 的专业课范围请以初试模块为准。'], module: 'videos', actionLabel: '观看试听课', featured: true },
    { id: 'buff-2027-study-materials', category: '课程资料', date: '2026-11-01', title: '2027 课程与资料，按阶段看清楚。', summary: '全程、强化、冲刺与资料答疑分别介绍，海报和课程说明均可展开查看。', body: ['课程页面分别展示班型、课时、资料、价格和服务，不混用不同套餐的报价。', 'B 班包含专业课答疑，不包含数学答疑。资料答疑班的专业答疑仅限所赠送的内部资料。'], module: 'courses', actionLabel: '了解课程安排' },
    { id: 'buff-study-community', category: '备考交流', date: '2026-11-01', title: '备考有问题，联系桑桑哥。', summary: '课程、资料与拼团咨询，或加入 2027 燕大电气与控制考研交流群。', body: ['桑桑哥 QQ：3298202133。2027 燕山大学电气与控制考研交流群：716928002。', '具体开课时间、班型和活动安排可通过咨询入口进一步了解。'], module: 'contact', actionLabel: '联系与加入交流群' }
  ],
  posters: [
    { id: 'full-course-overview', group: 'full', title: '806 全程班 · 课程总览', description: '四阶段课程、配套资料、服务与班型价格。', image: 'assets/posters/full-course-overview.webp', preview: 'assets/posters/full-course-overview-preview.webp', placeholder: 'data:image/webp;base64,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', thumb: 'assets/posters/full-course-overview-thumb.webp', width: 1024, height: 1536 },
    { id: 'full-course-table', group: 'full', title: '806 全程班 · 课程服务表', description: '查看详细课时、师资、资料与服务项目。', image: 'assets/posters/full-course-table.webp', preview: 'assets/posters/full-course-table-preview.webp', placeholder: 'data:image/webp;base64,UklGRgAEAABXRUJQVlA4IPQDAADQFQCdASpDAGgAPy1+rVKuqCOitRZKqdAliU0KlXg5MmHNfRRboXcgAw9tuBShmeLGTxongKr+fzJlDupvOVT9zk8ONmueON5yib/pvwJy/OvnthivfdNy+E4SR96Qed5H52DUD0gLtkQmkVvI/PYi80uhHolxJs1eT5+ntIWK7n2FicfYUYOQfQkt/+3NAnHbYy6eF8T0b47RO88a1gSDVLMCqyQsX4iNcTvjWOU4mxcOAxEh3bAA/sjYYeyPSsOhpPyXiIfKvyAnAuaVfoBeAJSSoRwxL7MtI+YKCgp7kYc35TuBlUtSenC11wtOvmLRMlRIH563GJyVlGUNwyYajccacEwmvT5Y3djlMA6Nl7Evs6GSE+6YmizjFl6e5WtD0Oj2ILQa018Q2ET2cYaWq6DgBy3hjIGpZ5TOnosvyayfpvjtxWiB/myeUYHKORgeuvMuej/A+kftrV05eJraX5sTKt1lvO5cvHazrEnh60Yh09W2eRQmFew25dyrciNfPKM35lRLqW8WyClDd6Ecw552tIXmxhbRPHtt9wcDNZCyq+wcdDMBGvQAaL0bqTIQTi3DwDyOtDwTqSr11lVj+XKKM2Hrhs24SHAmEuOrvlLT+WmnnNWItI1zWS/ItNdJRYSW4S2g5Ao6Di7q+nCN8f4gbo+OCd7Q/UfixBCoIigd6LGRCq8LhuylERDiLlZ8jgzzNwiF7BWPhJu8yoU+AmvuYArOzln5unhCvP99WZj0tbnDFua4hYwH/QZwVLCxQRFXB0Di9XvNiTInAeVh42Dgr/ST+bIM8Q/P4vpgz1DaeJqsygs1SEXVLDpiqH+84G1tk6J0zRE7YhQckEQeUsnbDGNFjH6UXl/YVPZPrz3PywFC32wJho2cqrO0G6QYZhYKkCHRVkiPvA7wrSgIPwLSS273JP/9MK3kGcfy0aE+gujihWUQmpIGSL4LPr+f2iAYuL25kuGy1HvNQTmnM1/lr5RMXklAFsjnVf9T31doFOOg1TBXX/Fdbt7Afz0jZp2KpM4/RxHt2F03kP1zDYiED29FVYWsU2mlcdMe46LnbhzP72XJocHDv76erBAVz3IVswMxmnxUqD/SDDYBL7nPyED+/R/8exIjtY9JhBXx1m8xj6Fdt89xmlDvspugih7zuLDmveP0AFs6+qvP01TB3DwX2jDlmk0884nR8muKMRiGOuuR4Ut5wWd0sZyPKSA4FBYKlZ/ew0IJAQYrj9cgeuoXj3NGfkbtsUBh/1SxodHXsc6jkmhF+vx4xlkkEAOKMqhuoa9uW5f6MiJ2Ffm2clVo78eH2oBx6aAyleYL08aImdYJeP+I6FdLidjgAAAA', thumb: 'assets/posters/full-course-table-thumb.webp', width: 1280, height: 1988 },
    { id: 'intensive-course', group: 'full', title: '强化冲刺班 · 课程服务表', description: '专题课时、联报与单报价格、配套服务。', image: 'assets/posters/intensive-course.webp', preview: 'assets/posters/intensive-course-preview.webp', placeholder: 'data:image/webp;base64,UklGRiwEAABXRUJQVlA4ICAEAACQFwCdASpCAGgAPyV+sFKuKKSitRTt+cAkiUyFmdK+/YMSWmYdf8PpQfIBEzY3YL9Tp583+U/1QAtJf9uK+f8QA3x2XrFZXYyeKCFHfziPsROhyyw6G6pDPrn3actNFjXSvaNE8UYh+t7Fr4VAO3sozG4F6GablAyCknukrPJieHqTrUAl7OBP6SNcO1m4OWnmGxeMgTRsX3Ls2aeTvre9p1T/zRprJSaAdLTp8okp17OuNN2Xkqwuxv/+ZQq6uGzcGtAsgAD+05bj+VCwh3yCJZjs+zYt6L94xo+f/ngGG7axTh/0D3ji7nicIafgx2UThVxXAL55BR4WhZ7Qd7upXueF8vaOeFgdy5P0Wy3rNA9hy+eGpGBjfLlAeHLb4UfvgsGUirn0gr9fOjibDJoJHllpf4ASuULnBOFXkvaU3oGh4trTwOKwLN6gajIdjty4eq25nC6yVlL+YSv8CB93LwEky9T01jTlpe8fWjBS+Ov7fzummFGnEhQzD/4ZUbb8xIR1olbtbBhDChleomQ1f/1kHYkQnq6hVZI2vOkZSiCJ9EuopAusY+/8WSpmOEbrgR2It/Vd0hzImEuSUBbxjDRGbCYeZDdf8GFkp1wVoF9DVAyD16K6rPh/BbhcBTs0q3jki6vIms76s2HCfQbsRUb/udwaA6igJj5/SdjZkYAGEW2f6NjeagmTlemFgBG/M1vr/yT3s4TYadAtddrM5Jeatvrz99pRR7fdteNTyOjgGVX3TR7y+ChcTA6n/ZVXGk1v0XkKI7NYR2sFcz5e7O7ZSWD/hMKUDQVL17ehnq7HxuY6lMOuqqumrYN55Br/sSr/SK5dwzVNI1xziU8l1LPMJssW+KmpGq6gcIqMuXAqqqXzAEvSEMg+kYMvvvfF7oGNQytN+D2+UAsbIRrIPWUGuFidMpGqet2kOTs6mb88cr9nTeqKWF/tPA79E1mZT1FCTNTzeaeV81vBlm8d3SaL7vUOcdWl3Cply87ClOZLZ925m6ka0gEllyIfn3BKsh1ILDvIZiJyNMBUukKEVpmG1TSk6bqEvHY7aM3KbG7THrSkAmMnPzj60Kk7BRJoYMxJi6PLWIGLX/4w9rWm52ZQXXozAk3w9P8vpk7/IylHHTeLgzL72du6xIaoNA9WyCTu5pzeIEBGo5kinojjgfvV/KAOa81S9nszj0/Gdo4Oc+1szcdA5HT6dwrn3A0B+2hN8B5Lhtf9zaJKncrcY866SfzZcPN2SqHHAdXM25GPS3Uvs4iJ3lDtAa7zYKYDyt6eUEkF9ZZcMio5j4SWNRSP7cn4zj0wdJ9Hcq56p28U8wVqtjYigbiuAyonbKu6lfAnTiDVGw5oWsYCiVG1Kj24SKyWMiHUkqt+eNzyCFHooskuK7cjqOtIVbBLAAA=', thumb: 'assets/posters/intensive-course-thumb.webp', width: 1280, height: 2031 },
    { id: 'sprint-course', group: 'sprint', title: '806 / 830 VIP 冲刺班', description: '手算技巧、真题、八套卷与冲刺服务。', image: 'assets/posters/sprint-course.webp', preview: 'assets/posters/sprint-course-preview.webp', placeholder: 'data:image/webp;base64,UklGRgYEAABXRUJQVlA4IPoDAAAwFQCdASpIAGMAPzF+t1KuqCUislc6qdAmCUfUHU6tbP4k7P6ZxDqym1nmPG5Y36O4Zz3bkodx3bo7X8AtDT8yDHl2jusuIQMs6DnV7TPB304bN3+07ruyGD156z2rkhe3AhVeBG9uVn7FOV1E6fQVTqp2HDGLp90CP8TJRoHK0RnszVYi8ClkaBMhSIr8fNbd4iTY8oaQbWzkt36Udf0cy+h4b2rgTxosmUEJUQiLcLjAAP7D7RLZ6yI2i7VYKBN7hB57d5SkThboHvtcRKRJwt00d5xPa0fc6SNxWkk9wpUpwQNXjAmUhs6soSrBnQk6wWRQeafPhlunS500Oqerx4aK1xyulmDbuAvzD+fK838Z1BnpI03t4nmkDLkVoB3/q5f1UOSPL4b/M4ziiAzfms+q1aZFpuOLipIYNrM5G9n3a65r+zyxV7WLoPNAYlVp+q9mthsLJVtJQaLbmVsYVcKIXnLXNNqB5AdDL40FI8ao20qy6QkeeTD2FT5ow9feuUzS7wntR1Jixd+YCkuI2dyYUiqGQrMUVWJSKpg5EKfXnYhcT+9NIHoNWRY1bweG+FBsHjMqsiVWsmO17/Z/+nAHPiqRIlAUMVkF8OP6n1yKd64f++jyWP3DoA7LVmK2KM2t2sx2UlD5+Wof4k1M8vD/YqykegzHQOoD2u6fhJdE1wQprPU6d+kKRZNv8dguWFrfM6tHWYFelWF2SJUekb30I9w88lYnLiPJJ2Hx+qXN/kEU8qQn7hx4Fi4IcT10a634d3yDGn1OMeh6KHo721vmAC+WRZl33XJYsu3I5ycXNlT7EO13In56sHba6rEjmJJ+HcqYkKkATPwrsUgD6UrysgKDuzdfZSckfafCQRVMfVgUu0irSmLeQczEfesFNyAbJDRexqo7YzJjBqhvp7uoDMgamzw1aC/VXAzsn+kBgSkcvSx7f1rdc28ymBsdiFlNhqmNopL9iL0kMUF6lneREpEq+TbsRC4HZSPCie+l95MqVj3+70oOyxK7saev/qUd4jcSSrsL7Dw1iWyroI6FShQPQ+XNZlfC+VmzkHZ5peHB8OHbyLUl5xg/VFPqY47eX/vaP9Lx+mSHlYnpaHwKURGPxAm7VZ81mF0XYXWckq/ImJ0G22R/KDTFrWkCcyGor43UmtzlRCYVKQxnnFbotZUda2QK0xcF3XS1Np+5MQNvDR7NfRPPTQDtfk7M7S71wyWcDnQAYXvmUhVhtHgljdNleBeQqNDPNFs1mtEYm2e8xOht2WDhSha5T+iq624h7DHGn+5RYByj0GVW7XCi5TxkyasQaEQe4oHt8AqxhXkLpDbzhFTHthKf3FD/nYYIdYVEAAAA', thumb: 'assets/posters/sprint-course-thumb.webp', width: 1280, height: 1757 },
    { id: 'sprint-papers', group: 'sprint', title: '830 冲刺八套卷 · 考点分布', description: '八套卷、十类专题及解析与视频版价格。', image: 'assets/posters/sprint-papers.webp', preview: 'assets/posters/sprint-papers-preview.webp', placeholder: 'data:image/webp;base64,UklGRtACAABXRUJQVlA4IMQCAABwDACdASpIADAAPyV8sFKuKCSiszjtUcAkiWYzi6Ffqrmo/ACvWrbf/xHBsGal35jG4Ie3pMaWHSQiRhOQxrYVQuZ2W3jI0Yl0hCM8B6Nc5hwRHOpCId+D9LACSMFN8HJc6ijXiO9+BzKXtOAA9n5N0p5crhsKqod5Vu58D3a9s234UoFzfha0b9beoGL6/ImZYImh9/IPyOx4RdmPdzOiQr98wc7hcxC6qo5ygMTpS35WWSpeY7wrOReJJnZ+uhF1wbbLBM7f/pa8I/8etiX0aRZ42xR0DQMp/eOMIqAGvdxT3YnUmKMkdzj8wepEDJ+c+jYEnCb+KlQ83MhoXdtwmkwG6LMoQ7B8G07njN/38mwFzlSrymSh/2oVJ+Otba7+VprtkWCDNGaBQAJMTdA3cY+28waw29CUo/5bTtAOcBrD3UnQlhAtWtu4yQQ6Kb7hPEUbswC19s2nGaFBD8DbpdDmc4T2q6GirqQMjNCAiOZJiTANFlLfy4rCUclBbpZw6j2uiv9kfBujQWY7NRE4BOWmOktNQIgCloVdb3sFZy+Cg7jtf/R4ioFm20NQConv31rnQU+RLjuSlSyxtrFxB0LygfFuGxONTMjFGZKNw9omvyCS5BLF51evepLCAE0JVOS4HRdDdgVch8heKHKDRiyMm6pok5O3UbgscM/EhnyHhJjuiVTh1Z5JlFohGgcidRvL0Mf7FgTSmQsBH0zyBVglO+SLdQdcPFzP2UnyQc9DVWJZL/AgxOiGKs9dE+S/sGXr9+vkZ2wvU2kxe+O4c4aDZIiNKf1Id0Q0DfRUk6AlxsIcvRDcMTgY8ErUfddQCcURnPHvaqR96Y1TNzz2c7+c1wrEa918ID8isk5QU050cBu7d+vbGzk+IBo8au/f+3co6j1lRmsN3BIqdCYKREE7bElYGbv1c977fILDMYQYAAA=', thumb: 'assets/posters/sprint-papers-thumb.webp', width: 3200, height: 2154 },
    { id: 'qa-overview', group: 'qa', title: '自控资料答疑班 · 总览', description: '六册与八册资料组合、价格和咨询二维码。', image: 'assets/posters/qa-overview.webp', preview: 'assets/posters/qa-overview-preview.webp', placeholder: 'data:image/webp;base64,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', thumb: 'assets/posters/qa-overview-thumb.webp', width: 2542, height: 4509 },
    { id: 'qa-materials', group: 'qa', title: '答疑班 · 六册与八册清单', description: '对照两种资料组合及答疑服务范围。', image: 'assets/posters/qa-materials.webp', preview: 'assets/posters/qa-materials-preview.webp', placeholder: 'data:image/webp;base64,UklGRhwDAABXRUJQVlA4IBADAADQEQCdASo5AGgAPzGGt1OuqSUkLtibMdAmCWQAymyAVMv/76jambeZpgCglH+pQAk5yjdYYIFDCgOcm8EXu7KVXweLqZ1v+g6F8+byXyNs9RWPIj39D8h/zK/9TF/4wglWAXKUNAFPuImuYk0tvc7nLjdiFxR0ECo8gA1ph7EkNcyLGZ0X//sfAmWySmORY2mR19d3UuuIAP4PPUCLSjoY7teuCYiJHj8jU+YLTRB4cSinrSbEuUE4SHEOivtMaOtfxh9BQ99rg9HNf166zwmu9FoKkdkKFlRrnCbbeUn+9PZQC5ApCF/AZ0GunNixf4g9ZFBVV3FpFClgd/SUZ9SWSLWXq7mnwpEweDzpKLZSbAiGCtmql+u25yCLPwEyrua80KrRfV9LA5SaE09Rki2k3MakywvNMzL8Nr5ipaqX8p84zZa/c5IxCCx7i8SOebrSQmardzlgpjrMHHLFSzn/1wh8iVi9asL47/c2UETmSaaioVOgUNVF0+AeqWzg5EPLyIaXVQKjrVaifOOhTJTJgoujYVyps4HsA+dLoUFG3sk8yRG1uzvrnchPNfcn89AIQy6GQXvK04ti46JM2y+fpikDw+eiwgVpYBaJyb+ApjG+xnjwz3IPtHU4u/6SqUrHxwGYlum7IX+Ugs156dYFfjl7l74MY/lxWwPzNXwjb4EbmVpIe0M0si/l3cfyqKIxgsKacmpxF9b5XCTNyla2HhXEIopRs/XILxnrAJtt1/ZwyFmSah+ICofXehIdfdrrVJbR6+nd6H0U/uD6K0XJIgdms1a92YCaTcY39q7dRrT7rlhucSLyE0ClcZm2VJMCEdojzGOiNW5Y1GQ8VtTx1WT/yrOnnETabykGSC5u2c5iI6kPqW6mivJp2xwYdw8fAqSp8Xg791Uly7hSpvpxq2GL7/AMGH7P81hJIAinz1QUe1ixo+vEQoFfr1iHs6uD3cL1ofIgK4Nr7fIRNY+IHBAKQe3le44icNgCKt1DrLIHGTvoSiF7h27sdmk5TQa0Hjke/6hfU9+T7lxJTAAA', thumb: 'assets/posters/qa-materials-thumb.webp', width: 750, height: 1363 },
    { id: 'qa-collection', group: 'qa', title: '燕大八大宝藏 · 资料展示', description: '查看整套资料封面与报名信息。', image: 'assets/posters/qa-collection.webp', preview: 'assets/posters/qa-collection-preview.webp', placeholder: 'data:image/webp;base64,UklGRvAFAABXRUJQVlA4IOQFAADwGQCdASpIAGYAPyF6rlKtKCQitRsbUaAkCWxhB/LfH6ABTXXNY5TIsevJbh/QsSeRrt/udu04Dekp9w2+OJ2lxzsurTnNVhwtIM/FK/GTL53Jn5bURPEym3ZGyBmWTBzwdciZGaUuBCrsWGd2cy+udXFZfGndF5CRaNpZ960Q1XkuZTxJGhi5XiMF/XvvvsOxNKf+wOg70lXG/AM3rTYYA3a/nnqFuvylAfba7cthq749LsPJu1nKrI/vHBxz85h/kIcsq7jSlUfFTlAIIfp/211TkHTljAAA/tBSlcYiRq9LtAxIRaxbAVKLaf3uYO+1TaXsL+jBOu1lcrBsy3mPg+0+t1dczqceVxNZoyr476lPxlLzvf/QRm/zH1F5injpKl4Xs+YvVEop7oithqrvKuW7e1UJB1wWq9Hz4fQ0WiqtykxZiibjaK8qofewJo3P0WCHKokpjxURmdhAo8xJJ0woAa9Wab5trfuFp+dvYeZ71G8SAi4WRCIOyZGWayMNAMnd3bV4sM8q+puOdBgSpX+P+V89GfuqQ+llLm13exlKz+aqlpFJYMLvq2xif/b64kN3kaxHoQEYshKt/lZwyuFLGK2sB4vMt3IYjnKwObTTax7N+HQyO+Z+0p56jD2A2UJQEfTPUgPLP2oPyviA4E1bRT45Q5nZ9nE3VbRf9EI3XJuUkiOo/G8I7SS1O7s6LRiTgx458noL+Qyy3GUoJrmKtHV8x6COjGiyIwpmUZ1CDiNL6UMkc+wliRNgWnf3z2ZFASes8b6MBO30bm8M8JW25dMEde+nFdTTwckYG7BzXZU6JuTwVnOuCTFIYtHrqzFQNAP3DMMsQ0m118CELwwXFOSRZIgatr0qq5vUPpi75dPNdVNMOq0f+/1NjP0yB/u0BxzXUF6jyPif8frtHoDfLjMrxRO0nS10PfMZF5FZEMcOwrxmUo6k51wiH/+J7T3VrRN/8Bv/jPAfEQT0myVTAJQhSxW3nQTVZVWKueUWXJPP76cPNO48Fscd4HSIJ4jVs+q21g1+gwdzV3uHRi+M8uE/cvqch721ui0EbIXfqQUfE76/892RKVd7fIUzM+uiHUwqj4kdXox7nwS2GW+BK9aA+AricWYPGd1NGKErzgsk01tCREIuNFrm+mzgnYSGDN3JzsMjO8ZUclu5InV/hZylqj2svcYbsm9iPGfo9NR1qik9bMftYrPs0xrdvhzf8yCwQ5Qdggc7WSA0vy9DACoZbTHnf7Qo/8VlhrrWk+ljC36Z1bVAI5JTNf3puovOrLaBpjCSOkxuLF0W4kRk926RkIGWAdaWzUG5FgRgq1Qn+Iu4dAKmvlmr/+CAI9KAhCIrKoLXgldh/uqCpRd4erz1ffmDgJHiauigy7QBrWC/b/YyKxiTPF/x8y/OMh/va2O9RUvslABXZsht7vYocjO5W73NjKaiYK7FVxoxCTn/dZ98VGSFq/nBCP/QyKfo9F/z5dzQXXE3zbC2DoeeUa7tIdTVbionul8RYSOizo74vrYOD/evrNC7gC4koetxF93pE/aY8RaGdi3EX8qblMmhydyzIziEVsnPTOqyK1Wpu7V+mu0lqvKal9XPtQ06GaPtX+x6p3wRwqhXkTn+dICOE8OS5RUF7ab6hsNtrWKU8MR2SIXwoqH7+GTGOFBmdXqWLim7g0cDbdUf+yO1brP9Bvvn376gQRADpCM30SzOJiuqgzXW5ej2D+5h4zQUMFFAs3e6MAdi1TciRpVwTEGiT1m5tect715egX/r621FA8mzcY+O/yccUNb750sx6eDMBhdjo3/EsTONd++/Qfj3XfPRb5+KJr3jd7xhqGFigqjNxXLzVZwh1gcamMiPs/niT2/Ujolc9pYnMce2g/RC1TFzP0vtliO+T35SKgaNI+UErVm13cmIYmXABA4OM3koaRY2nzGaBXbu706tb/FmPhMovvGCEpbZlCcePVyVZ3yhVZ2NlwScSpftZiJO57nXZWwh7F8KaPNrfJswAA==', thumb: 'assets/posters/qa-collection-thumb.webp', width: 1055, height: 1491 }
  ],
  documents: [
    { title: '806 / 830 自控冲刺班课程介绍', description: '课程内容、八套卷、真题与配套资料展示。', pages: 7, size: '约 2.5 MB', url: 'assets/documents/buff-ysu-sprint-introduction.pdf', sourcePages: '原 PDF 第 1、5、6、7、9、10、13 页' },
    { title: '燕山大学课程及答疑班展示', description: '全程课程、配套资料与课程服务表。', pages: 6, size: '约 2.1 MB', url: 'assets/documents/buff-ysu-courses-and-qa.pdf', sourcePages: '原 PDF 第 4、5、7、9、11、14 页' }
  ],
  experiences: [
    {title:'电气专硕第四 · 上岸经验',year:2026,pages:5,size:'约 2.8 MB',url:'assets/documents/ysu-2026-professional-fourth.pdf',cover:'assets/images/ysu-2026-professional-fourth-cover.webp',pageImages:["assets/experiences/ysu-2026-professional-fourth-p01.webp", "assets/experiences/ysu-2026-professional-fourth-p02.webp", "assets/experiences/ysu-2026-professional-fourth-p03.webp", "assets/experiences/ysu-2026-professional-fourth-p04.webp", "assets/experiences/ysu-2026-professional-fourth-p05.webp"], sourcePages:[1, 2, 3, 4, 5], description:'初试各科复习与备考方法分享。'},
    {title:'二本上岸 · 初试第三经验',year:2026,pages:11,size:'约 5.3 MB',url:'assets/documents/ysu-2026-initial-third.pdf',cover:'assets/images/ysu-2026-initial-third-cover.webp',pageImages:["assets/experiences/ysu-2026-initial-third-p01.webp", "assets/experiences/ysu-2026-initial-third-p02.webp", "assets/experiences/ysu-2026-initial-third-p03.webp", "assets/experiences/ysu-2026-initial-third-p04.webp", "assets/experiences/ysu-2026-initial-third-p05.webp", "assets/experiences/ysu-2026-initial-third-p06.webp", "assets/experiences/ysu-2026-initial-third-p07.webp", "assets/experiences/ysu-2026-initial-third-p08.webp", "assets/experiences/ysu-2026-initial-third-p09.webp", "assets/experiences/ysu-2026-initial-third-p10.webp", "assets/experiences/ysu-2026-initial-third-p11.webp"], sourcePages:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 17], description:'个人备考经历与各科学习复盘。'},
    {title:'电气学硕第二 · 上岸经验',year:2026,pages:10,size:'约 6.9 MB',url:'assets/documents/ysu-2026-academic-second.pdf',cover:'assets/images/ysu-2026-academic-second-cover.webp',pageImages:["assets/experiences/ysu-2026-academic-second-p01.webp", "assets/experiences/ysu-2026-academic-second-p02.webp", "assets/experiences/ysu-2026-academic-second-p03.webp", "assets/experiences/ysu-2026-academic-second-p04.webp", "assets/experiences/ysu-2026-academic-second-p05.webp", "assets/experiences/ysu-2026-academic-second-p06.webp", "assets/experiences/ysu-2026-academic-second-p07.webp", "assets/experiences/ysu-2026-academic-second-p08.webp", "assets/experiences/ysu-2026-academic-second-p09.webp", "assets/experiences/ysu-2026-academic-second-p10.webp"], sourcePages:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], description:'电气学硕备考与复习阶段经验分享。'}
  ],
  // 每日一题：题目与答案解析放在同一个视频中，也可维护明确标注的视频合集入口。
  // 不在公开仓库放入需要权限控制的独立答案。
  // 示例字段：id, date (YYYY-MM-DD), subject, title, question, image,
  // knowledgePoint, bilibili, douyin。视频字段留空时显示讲解待更新。
  dailyQuestions: [
    {
      id: 'daily-douyin-collection', date: '', subject: '每日一题',
      title: '每日一题 · 抖音视频合集',
      question: '进入抖音合集，选择想练习的题目，观看题目与答案讲解。可以先暂停思考，再跟着视频核对解题过程。',
      image: '', knowledgePoint: '', bilibili: '',
      douyin: 'https://www.douyin.com/user/MS4wLjABAAAA8dRtIFbTDSuerYLkNZ2dafkrI7MZLHi26YU_ngKYYrXdwbf4a4d_Dgttqx5bb5RF?showSubTab=compilation'
    }
  ],
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
