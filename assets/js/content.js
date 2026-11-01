// 日常内容更新入口：编辑本文件，再提交到 GitHub，Pages 会自动更新。
// 所有网址请填写完整的 https:// 地址。留空时展示“待更新”，不会生成虚假链接。
window.BUFF_CONTENT = {
  subjects: {
    electrical: {
      label: '电气考研', tag: 'ELECTRICAL ENGINEERING',
      title: '电气方向\n把基础学扎实。',
      description: '围绕专业基础、知识串联与题目训练，逐步建立自己的复习体系。'
    },
    control: {
      label: '控制考研', tag: 'CONTROL ENGINEERING',
      title: '控制方向\n让分析有思路。',
      description: '从基本概念与分析方法出发，连接知识框架，让理解、计算与表达相互配合。'
    }
  },
  // 这些是待确认的栏目规划，不代表已开设的实际课程。
  courses: [
    { id: 'foundation', stage: 'initial', stageLabel: '初试 · 基础阶段', title: '专业基础梳理', subtitle: '从理解出发，搭建知识框架。', audience: '适合准备建立专业课知识体系的同学', topics: ['基本概念与核心原理', '章节知识框架', '基础题型与学习方法'], number: '01' },
    { id: 'practice', stage: 'initial', stageLabel: '初试 · 专题阶段', title: '专题与真题训练', subtitle: '把知识串起来，把题目讲明白。', audience: '适合已有基础、准备开展专题训练的同学', topics: ['知识点串联与专题整理', '目标院校真题分析栏目', '错题复盘与解题思路'], number: '02' },
    { id: 'interview', stage: 'reexam', stageLabel: '复试 · 综合准备', title: '复试准备与表达', subtitle: '从掌握知识，到清楚表达。', audience: '适合准备开展复试复习的同学', topics: ['专业知识梳理', '英语自我介绍与话题表达', '个人经历与综合面试准备'], number: '03' }
  ],
  // 添加视频示例：{ title: '你的公开视频标题', category: '课程试听', platform: 'bilibili', url: 'https://www.bilibili.com/video/BV...', subject: 'all' }
  // platform 支持 bilibili / douyin；subject 支持 all / electrical / control。
  videos: [
    { title: '专业课公开课', category: '课程试听', platform: 'bilibili', url: '', subject: 'all', description: '从一节课，了解讲解思路。' },
    { title: '题目讲解与复盘', category: '解题思路', platform: 'bilibili', url: '', subject: 'all', description: '理解一道题，也理解背后的知识。' },
    { title: '备考经验与日常', category: '备考分享', platform: 'douyin', url: '', subject: 'all', description: '关于学习节奏与备考过程的分享。' }
  ],
  contact: {
    wechat: '',
    qqGroup: '',
    email: '',
    bilibili: '', // B 站主页完整网址
    douyin: '',   // 抖音主页完整网址
    qrImage: ''   // 例如 assets/images/contact-qr.png；请仅上传可公开的机构二维码
  }
};
