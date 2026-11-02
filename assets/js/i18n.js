(() => {
  'use strict';
  const extra={
    '文字阅读':'Text view','原图预览':'Original pages','内容管理':'Manage content','管理':'Admin',
    '200题':'200 Qs','2004–最新':'2004–Latest',
    '清晰页待加载':'Preview ready; full page pending',
    '高清阅读':'HD view','正在加载清晰页面…':'Loading readable preview…','正在加载高清页面…':'Loading high-resolution page…','高清暂未加载，点击重试':'High resolution unavailable. Retry','高清预览已加载':'High-resolution preview loaded','高清暂未加载，可重试或打开原图。':'High resolution unavailable. Retry or open the original.',
    '轻量预览优先显示；点击“高清阅读”加载高清页，原 PDF 可下载。公开版不含聊天截图。':'Lightweight previews load first. Select high-resolution reading for detail, or download the original PDF. Chat screenshots are excluded.',
    '轻量预览优先显示；点击“高清阅读”加载高清页，原 PDF 可下载。':'Lightweight previews load first. Select high-resolution reading for detail, or download the original PDF.',
    '正在加载页面…':'Loading page…',
    '课程介绍':'Courses','参考教材':'Reference books','当前方向：':'Current track: ','查看课程详情 →':'View course details →',
    '下载这份 PDF ↓':'Download PDF ↓','页码':'Page','选择阅读页码':'Choose page','公开阅读版保留备考正文，聊天截图不公开。原文为中文。':'The public edition includes the study essay; chat screenshots are omitted. Original document in Chinese.',
    '原文页码':'Original page','此页暂未加载，点击重试':'Page not loaded. Retry','展开完整演示 ›':'Explore the full demo ›',
    '课程详情':'Course details','班型、课程内容与配套服务':'Classes, syllabus & study support','服务范围':'Support included','授课与答疑':'Teaching & Q&A',
    '暂停动效':'Pause animation','置顶':'Pinned','课程海报':'Course posters','完整预览与放大阅读':'Full previews & zoomed reading',
    '电气 806':'Electrical 806','控制 830':'Control 830','经典自控＋直流调速':'Classical control + DC speed control','自控＋现控＋直流':'Classical + modern control + DC drives',
    '两条专业路线':'Two study tracks','知识与表达':'Knowledge & communication','书目与考试范围':'Books & exam scope','按阶段选择':'Choose your stage','海报与 PDF':'Posters & PDFs',
    '2027 官方目录':'2027 official directory','历年录取':'Past admissions','匿名百分比':'Anonymous percentages','2026 届分享':'2026 cohort','课程试听':'Trial lessons',
    '题目与解析视频':'Questions & solution videos','对应每期视频':'A link for each lesson','后续补充':'Coming later','桑桑哥与交流群':'Sangsang & study group','每日宣传':'Agency updates','文字与图片':'Text & images','人工核对更新':'Manually verified updates',
    '初试备考':'Initial exam prep','科目区别、课程与配套资料':'Exam subjects, courses & companion materials','复试准备':'Interview exam prep','专业课、英语表达、综合面试与复试资料，单独更新':'Major subjects, English, interviews and dedicated materials',
    '课程与服务':'Courses & support','按方向与备考阶段选择课程':'Choose by subject track and preparation stage','初试与复试资料分区查看':'Initial-exam and interview-exam materials, organized separately',
    '公开看题，前往平台查看讲解':'View questions and watch the explanation on the platform','每日一题 · 题目讲解':'Daily practice · Video explanations','每道题对应自己的 B 站或抖音视频':'Each question links to its own Bilibili or Douyin video',
    '公开课与备考分享':'Trial lessons & study insights','试听、解题思路与备考经验':'Teaching trials, solutions & preparation experience','电气与控制考研，两条专业路线':'Two postgraduate exam tracks: Electrical and Control',
    '桑桑哥与燕山大学考研交流群':'Sangsang and the Yanshan exam study group','自动控制原理可视化':'Automatic control, visualized','经典负反馈系统、阶跃响应与根轨迹':'Negative feedback, step response & root locus',
    '生源分析':'Student backgrounds','2027 届机构学员样本 · 仅展示学校层次与跨考匿名汇总':'2027 BUFF student sample · Institution types and cross-major percentages only',
    '就业去向':'Career destinations','研究生行业、单位、地区与继续深造':'Industries, employers, locations & further study','参考教材与考试范围':'Reference books & exam scope','2027 · 两方向共同参考书与控制方向的现代控制增量':'2027 · Common references and the additional modern-control scope',
    '2027 年招生计划':'2027 admission plans','电气与控制四类专业，普通培养与联合培养分列':'Four degree programs, with domestic and joint training listed separately','历年录取情况':'Historical admissions','2022—2025 · 电气工程 · 与 2027 拟招生计划分开展示':'2022–2025 · Electrical Engineering · Separate from 2027 plans',
    '上岸经验':'Student experiences','2026 届经验分享 · 在线阅读与下载':'2026 cohort experiences · Read online or download','院校消息':'University news','来自官网 · 保留原公告日期 · 核对后发布':'Official sources · Original publication dates · Verified before publishing',
    '机构发布的课程、资料、公开课与备考活动':'Courses, materials, trial lessons & study activities','消息详情':'Update details','展开查看，关闭后留在原位':'Read the full update and return with Back','课程 PDF 说明':'Course PDF guides',
    '历年录取，分清年份与类别。':'Admissions by year and degree.','机构复试资料中的电气学硕、专硕录取统计；专硕包含国内及中澳联合培养。':'Electrical Engineering academic and professional admissions, 2022–2025. Professional totals include domestic and Sino-Australian joint training.',
    '学员生源，只看匿名汇总。':'Student backgrounds. Anonymous summaries.','2027 届机构学员样本':'2027 BUFF student sample','展示学校层次与跨考情况，统计口径为机构学员样本。':'Institution types and cross-major applications among BUFF students.',
    '本图反映所提供样本，不代表燕山大学全部录取生源。仅发布类别百分比，不公开样本人数；百分比已取整。':'These charts describe the supplied BUFF student sample, not all Yanshan admissions. Only rounded percentages are published; sample sizes are withheld.',
    '主题':'Theme','累计访问次数':'Total visits','加载中…':'Loading…','统计暂不可用':'Unavailable','发布宣传 ↗':'Publish update ↗',
    '学校层次与类型':'Undergraduate institution types','是否跨考':'Cross-major applications','占比汇总':'All categories','2027 届':'2027 cohort',
    '公办普通本科':'Public undergraduate institutions','民办本科（含独立学院）':'Private undergraduate institutions','民办本科':'Private undergraduate institutions','职业本科':'Vocational undergraduate institutions','信息待确认':'Unconfirmed','非跨考':'Same major category','跨考':'Cross-major',
    '按本科办学类型汇总，不按分省招生批次划分一本、二本；缺失或无法核对的院校信息单列。':'Grouped by undergraduate institution type, rather than provincial admission tiers. Missing or unverified information is listed separately.',
    '按本科专业类别与报考方向对照：电气类对应电气方向，自动化类对应控制方向；缩写及缺失项不强行归类。':'Undergraduate major categories are compared with the application track: electrical majors with electrical, and automation majors with control. Ambiguous or missing information is not forced into a category.',
    '电气学硕':'Electrical · Academic','电气专硕':'Electrical · Professional','学硕':'Academic','专硕':'Professional','一志愿':'First choice','调剂':'Transfer',
    '首页':'Home','返回':'Back','下载 PDF ↓':'Download PDF ↓','在线阅读 ›':'Read online ›','上一页':'Previous','下一页':'Next','放大阅读':'Zoom in','适合宽度':'Fit width',
    '宣传图片':'Promotion image','机构宣传':'Agency updates','BUFF 每日宣传':'BUFF Updates','展开查看 ›':'Read more ›','展开阅读 ›':'Read more ›',
    '耗时18个月，终于可以公布了！':'18 months in the making. Ready to share.',
    'BUFF团队十年沉淀，呕心沥血一年半，只为服务莘莘学子。精心编制、反复打磨，内容全面升级，史上最大优化，《28电气考研电路全程班讲义》终于和大家见面！':'Built on a decade of BUFF teaching experience and 18 months of preparation, the 2028 Electrical Exam Circuit Analysis Course Notes are here, with carefully revised and expanded content.',
    '28讲义共分为基础讲义、强化讲义，为不同学习阶段量身打造。基础讲义部分打基础、夯根基、打通任督二脉。强化讲义部分抓重点、提能力、补短板、求突破。':'The 2028 notes include Foundation and Intensive volumes for different stages. Foundation notes build core understanding; Intensive notes focus on key topics, skills and areas for improvement.',
    'BUFF团队2028电路讲义宣传。燕山大学2027电气与控制专业课信息请查看对应课程页面。':'These are BUFF’s 2028 Circuit Analysis notes. See the relevant course pages for Yanshan’s 2027 Electrical and Control exam preparation.',
    '切换主题，当前':'Change theme. Current: ','主题：':'Theme: ','跟随系统':'System','深色':'Dark','浅色':'Light',
    '暂停动态':'Pause animation','开启动效':'Enable animation','开启动态':'Play animation',
    '班型与价格':'Classes & prices','课程内容':'Course content','配套资料':'Companion materials','服务支持':'Study support','授课老师':'Instructors','课程说明':'Course details','资料说明':'Materials',
    '课程资料':'Course materials','进一步了解':'Learn more','统计年份':'Year','当年录取组成':'Admission composition','录取图表暂未加载，请刷新重试。':'Could not load admissions. Please reload.',
    '汇总图表暂未加载，请刷新重试。':'Could not load the charts. Please reload.','图表加载中…':'Loading charts…',
    '暂无控制方向历史录取数据。':'Historical Control admissions are not yet available.',
    '一志愿录取':'First-choice admissions','调剂录取':'Transfer admissions','总录取':'Total admissions','电气类别':'Electrical degree','年份':'Year',
    '在线预览与下载':'Read online & download','公开课':'Trial lessons','电气控制考研':'Electrical & Control','初试':'Initial exam','复试':'Interview exam','院校分析':'University insights','课程与资料':'Courses & materials','每日一题':'Daily practice','关于 BUFF':'About BUFF','联系咨询':'Contact',
    '本期视频':'This lesson','题目与解析':'Question & solution','目录':'Contents','页':'page','人':'students',
    '专业答疑':'Major-subject Q&A','数学答疑':'Mathematics Q&A','含专业课答疑，不含数学答疑':'Includes major-subject Q&A; excludes mathematics Q&A'
  };
  const dictionary={...window.BUFF_I18N_STATIC,...window.BUFF_I18N_CONTENT,...extra};
  const phrases=Object.keys(dictionary).filter(key=>key.length>1).sort((a,b)=>b.length-a.length);
  const originals=new WeakMap(),attributes=new WeakMap();
  let language='zh',pending=false;
  try{language=localStorage.getItem('buff-language')==='en'?'en':'zh';}catch{}
  function translate(text){
    if(!/[\u3400-\u9fff]/.test(text))return text;
    const trimmed=text.trim();if(dictionary[trimmed])return text.replace(trimmed,dictionary[trimmed]);
    let result=text;for(const phrase of phrases)if(result.includes(phrase))result=result.split(phrase).join(dictionary[phrase]);
    return result.replace(/(\d+) 年/g,'$1').replace(/(\d+) 届/g,'$1 cohort').replace(/(\d+) 人/g,'$1 students').replace(/(\d+) 页/g,'$1 pages');
  }
  const observer=new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;apply();});}});
  function apply(){
    observer.disconnect();
    const root=document.documentElement;root.lang=language==='en'?'en':'zh-CN';root.dataset.language=language;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;while((node=walker.nextNode())){
      if(node.parentElement?.closest('script,style,code,pre,[data-no-translate]'))continue;
      const value=node.nodeValue,record=originals.get(node);
      const original=record&&record.rendered===value?record.original:value;
      const rendered=language==='en'?translate(original):original;
      originals.set(node,{original,rendered});if(rendered!==value)node.nodeValue=rendered;
    }
    document.querySelectorAll('[aria-label],[title],[alt],[placeholder]').forEach(element=>{
      if(element.closest('[data-no-translate]'))return;
      const records=attributes.get(element)||{};
      for(const key of ['aria-label','title','alt','placeholder']){
        if(!element.hasAttribute(key))continue;const value=element.getAttribute(key),record=records[key];
        const original=record&&record.rendered===value?record.original:value,rendered=language==='en'?translate(original):original;
        records[key]={original,rendered};if(rendered!==value)element.setAttribute(key,rendered);
      }attributes.set(element,records);
    });
    const button=document.getElementById('language-toggle');button.textContent=language==='en'?'中文':'EN';button.setAttribute('aria-label',language==='en'?'切换为中文':'Switch to English');
    document.title=language==='en'?'BUFF · Yanshan Electrical & Control Exam Prep':'BUFF 考研 · 燕山大学电气与控制备考专区';
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','alt','placeholder']});
  }
  document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('language-toggle').addEventListener('click',()=>{language=language==='en'?'zh':'en';try{localStorage.setItem('buff-language',language);}catch{}apply();});apply();
  });
})();
