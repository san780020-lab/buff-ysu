(() => {
  const svgNS='http://www.w3.org/2000/svg';
  const items={
    electrical:['电气 806','经典自控＋直流调速','M4 12h4l2-6 4 12 2-6h4'],
    control:['控制 830','自控＋现控＋直流','M3 12h4m4 0h3m5 0h2M5 12v7h13v-5M8 8h4v8H8zm6-1h5v10h-5z'],
    initial:['初试备考','两条专业路线','M7 4h10v17H5V4h2m2 0V2h6v4H9zm-1 7h6m-6 4h8'],
    reexam:['复试准备','知识与表达','M5 4h14v12H9l-4 4V4zm4 4h6m-6 4h4'],
    textbooks:['参考教材','书目与考试范围','M3 5c3-1 6-1 9 1 3-2 6-2 9-1v15c-3-1-6-1-9 1-3-2-6-2-9-1V5zm9 1v15'],
    courses:['课程介绍','按阶段选择','M3 7 12 3l9 4-9 4-9-4zm3 3v7c4 3 8 3 12 0v-7m3-3v10'],
    materials:['课程资料','海报与 PDF','M3 6h7l2 3h9v12H3V6zm0 5h18'],
    admissions:['招生计划','2027 官方目录','M3 21h18M5 21V8h14v13M3 8l9-5 9 5M8 11v6m4-6v6m4-6v6'],
    'admission-history':['历年录取','2022—2025','M3 21h19M6 18v-5h3v5m3 0V8h3v10m3 0V3h3v15'],
    'source-analysis':['生源分析','匿名百分比','M12 3a9 9 0 1 0 9 9h-9V3zm3 0v6h6a9 9 0 0 0-6-6z'],
    experiences:['上岸经验','2026 届分享','M5 3h14v18H5V3zm4 5h6m-6 4h6m-6 4h4'],
    videos:['公开课','课程试听','M3 5h18v14H3V5zm6 3 7 4-7 4V8z'],
    daily:['每日一题','题目与解析视频','M6 3h12v18H6V3zm3 6c0-4 6-4 6 0 0 2-3 2-3 5m0 3v1'],
    'daily-explanations':['题目讲解','对应每期视频','M3 5h18v14H3V5zm6 3 7 4-7 4V8z'],
    employment:['就业去向','后续补充','M3 7h18v14H3V7zm5 0V3h8v4M3 12h18m-10-2v4h2v-4'],
    contact:['联系咨询','桑桑哥与交流群','M8 3h3l1 5-2 1c1 3 2 4 5 5l1-2 5 1v3c0 3-3 4-5 3C9 17 5 13 3 7 2 5 5 3 8 3z'],
    promotions:['每日宣传','文字与图片','M3 9h6l11-5v16L9 15H3V9zm6 6 2 6h4l-3-6'],
    news:['院校消息','人工核对更新','M3 4h15v17H3V4zm15 5h3v12h-3M7 8h7m-7 4h7m-7 4h5'],
    about:['关于 BUFF','电气与控制考研','M12 3 2 8l10 5 10-5-10-5zm-7 9v5l7 4 7-4v-5']
  };
  window.BUFF_RENDER_PAGE_NAV=key=>{
    const root=document.getElementById('module-dialog'),nav=document.getElementById('page-chapters');
    const overview=!['course','poster','pdf','update-detail'].includes(key);root.dataset.pageType=overview?'overview':'detail';nav.hidden=!overview;nav.replaceChildren();if(!overview)return;
    let keys=['initial','reexam','courses','textbooks','admissions','admission-history','source-analysis','experiences','videos'];
    if(['electrical','control','initial'].includes(key))keys=['electrical','control','textbooks','courses','admissions','experiences','videos'];
    if(['admissions','admission-history','source-analysis','employment','news'].includes(key))keys=['news','admissions','admission-history','source-analysis','employment'];
    if(['about','promotions','contact','experiences'].includes(key))keys=['about','experiences','promotions','contact'];
    if(['daily','daily-explanations','videos'].includes(key))keys=['videos','daily','daily-explanations','experiences'];
    const row=document.createElement('div');row.className='page-chapter-row container';
    keys.forEach(id=>{const item=items[id];if(!item)return;const button=document.createElement('button');button.type='button';button.className='page-chapter';button.dataset.moduleOpen=id;button.setAttribute('aria-current',id===key?'page':'false');
      const svg=document.createElementNS(svgNS,'svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svgNS,'path');path.setAttribute('d',item[2]);svg.append(path);
      const title=document.createElement('strong');title.textContent=item[0];const caption=document.createElement('span');caption.textContent=item[1];button.append(svg,title,caption);row.append(button);
    });nav.append(row);
  };
})();
