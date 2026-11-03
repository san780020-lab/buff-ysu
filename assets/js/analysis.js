(async () => {
  'use strict';
  await window.BUFF_MANAGED_READY;
  const $=s=>document.querySelector(s), ns='http://www.w3.org/2000/svg';
  const colors=['#77a9fa','#b298ec','#62c1be','#8d9bb0'];
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const svgNode=(tag,attrs,text)=>{const n=document.createElementNS(ns,tag);Object.entries(attrs).forEach(([k,v])=>n.setAttribute(k,String(v)));if(text!==undefined)n.textContent=text;return n;};
  function donut(title,data,note) {
    const card=el('article','student-chart-card');card.append(el('h3','',title));
    const svg=svgNode('svg',{viewBox:'0 0 260 250',role:'group','aria-label':title});
    const circles=[],legend=el('div','donut-legend'),length=2*Math.PI*86,total=data.reduce((sum,item)=>sum+item.percentage,0);
    const number=svgNode('text',{x:130,y:107,'text-anchor':'middle',class:'donut-number'},'100%');
    const label=svgNode('text',{x:130,y:137,'text-anchor':'middle',class:'donut-label'},'占比汇总');
    const percent=svgNode('text',{x:130,y:160,'text-anchor':'middle',class:'donut-percent'},'2027 届');
    let offset=0;
    function highlight(index) {
      circles.forEach((circle,i)=>circle.classList.toggle('is-highlighted',i===index));
      if(index<0){number.textContent='100%';label.textContent='占比汇总';percent.textContent='2027 届';return;}
      const item=data[index];number.textContent=`${item.percentage}%`;label.textContent=item.label.replace('（含独立学院）','');percent.textContent='2027 届';
    }
    data.forEach((item,index)=>{
      const ratio=item.percentage/total,span=length*ratio,color=item.label.includes('待确认')?colors[3]:colors[index%colors.length];
      const circle=svgNode('circle',{cx:130,cy:121,r:86,fill:'none',stroke:color,'stroke-width':24,'stroke-dasharray':`${Math.max(0,span-2)} ${length-span+2}`,'stroke-dashoffset':-offset,transform:'rotate(-90 130 121)',tabindex:0,role:'button','aria-label':`${item.label}：${item.percentage}%`});
      circle.append(svgNode('title',{},`${item.label} ${item.percentage}%`));
      circle.addEventListener('pointerenter',()=>highlight(index));circle.addEventListener('focus',()=>highlight(index));circle.addEventListener('click',()=>highlight(index));
      circle.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();highlight(index);}});
      svg.append(circle);circles.push(circle);offset+=span;
      const row=el('button','donut-legend-row');row.type='button';const dot=el('i');dot.style.background=color;
      row.append(dot,el('span','',item.label),el('strong','donut-share',`${item.percentage}%`));
      row.addEventListener('pointerenter',()=>highlight(index));row.addEventListener('focus',()=>highlight(index));row.addEventListener('click',()=>highlight(index));legend.append(row);
    });
    svg.append(number,label,percent);card.append(svg,legend,el('p','chart-method',note));return card;
  }
  function renderStudents(data) {
    const target=$('#student-charts');
    target.replaceChildren(donut('学校层次与类型',data.levels,data.levelDefinition),donut('是否跨考',data.crossMajor,data.crossDefinition));
  }
  function renderHistory(data) {
    const target=$('#admission-trend-chart');target.replaceChildren();
    const legend=el('div','history-legend');legend.append(el('span','academic-key','电气学硕'),el('span','professional-key','电气专硕'));target.append(legend);
    const max=Math.ceil(Math.max(...data.years.flatMap(y=>[y.academic.total,y.professional.total]))/20)*20;
    const svg=svgNode('svg',{viewBox:'0 0 680 310',role:'img','aria-label':'2022至2025年电气学硕与专硕实际录取人数对比'});
    const top=35,bottom=250,yScale=v=>bottom-v/max*(bottom-top);
    for(let v=0;v<=max;v+=20){svg.append(svgNode('line',{x1:50,y1:yScale(v),x2:660,y2:yScale(v),class:'history-grid'}),svgNode('text',{x:37,y:yScale(v)+4,'text-anchor':'end',class:'history-axis'},v));}
    data.years.forEach((year,index)=>{
      const center=125+index*155;
      [['academic',-39],['professional',5]].forEach(([key,dx])=>{
        const value=year[key].total;const bar=svgNode('rect',{x:center+dx,y:yScale(value),width:34,height:bottom-yScale(value),rx:5,class:`history-${key}`});
        bar.append(svgNode('title',{},`${year.year} 年${key==='academic'?'电气学硕':'电气专硕'}：${value} 人`));
        svg.append(bar,svgNode('text',{x:center+dx+17,y:yScale(value)-10,'text-anchor':'middle',class:'history-value'},value));
      });
      svg.append(svgNode('text',{x:center,y:283,'text-anchor':'middle',class:'history-year'},year.year));
    });
    target.append(svg);
    const select=$('#history-year-select'),tbody=$('#history-table-body');select.replaceChildren();tbody.replaceChildren();
    [...data.years].reverse().forEach(item=>{const option=el('option','',`${item.year} 年`);option.value=item.year;select.append(option);});
    data.years.forEach(year=>[['academic','学硕'],['professional','专硕']].forEach(([key,label])=>{const row=el('tr');[year.year,label,year[key].first,year[key].transfer,year[key].total].forEach(value=>row.append(el('td','',value)));tbody.append(row);}));
    function composition() {
      const year=data.years.find(item=>String(item.year)===select.value),area=$('#history-composition');area.replaceChildren();
      [['academic','电气学硕'],['professional','电气专硕']].forEach(([key,label])=>{
        const item=year[key],card=el('article','history-composition-card');card.append(el('h4','',`${label} · ${item.total} 人`));
        const bar=el('div','history-stack');bar.setAttribute('role','img');bar.setAttribute('aria-label',`${label}一志愿录取${item.first}人，调剂录取${item.transfer}人`);
        [['first','一志愿'],['transfer','调剂']].forEach(([part,name])=>{if(item[part]){const fill=el('span',`history-${part}`,`${name} ${item[part]}`);fill.style.width=`${item[part]/item.total*100}%`;bar.append(fill);}});
        card.append(bar,el('p','',`一志愿 ${item.first} 人　调剂 ${item.transfer} 人`));area.append(card);
      });
    }
    select.addEventListener('change',composition);composition();
  }
  fetch('assets/data/analysis.json?v=20261101-analysis',{cache:'no-cache'}).then(response=>{if(!response.ok)throw new Error('Analysis data unavailable');return response.json();})
    .then(data=>{Object.assign(data,window.BUFF_MANAGED?.overrides?.analysis || {});renderStudents(data.studentOrigins);renderHistory(data.admissionHistory);})
    .catch(()=>{$('#student-charts').replaceChildren(el('p','empty-state','汇总图表暂未加载，请刷新重试。'));$('#admission-trend-chart').replaceChildren(el('p','empty-state','录取图表暂未加载，请刷新重试。'));});
})();
