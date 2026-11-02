(() => {
  'use strict';
  const manifest=window.BUFF_MEDIA?.readers || {},cache=new Map(),queue=[],active=new Set();
  let generation=0,cleanup=()=>{};
  const el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
  const safe=path=>/^assets\/(?:readers|experiences)\/[a-z0-9-]+\.webp$/.test(path || '');
  const canPrefetch=()=>!navigator.connection?.saveData&&!/^(slow-)?2g$/.test(navigator.connection?.effectiveType || '');
  function pump(){
    queue.sort((a,b)=>a.priority-b.priority);
    while(active.size<2&&queue.length){
      const job=queue.shift();
      if(job.generation!==null&&job.generation!==generation){cache.delete(job.src);job.resolve(null);continue;}
      active.add(job);const image=new Image();image.decoding='async';image.fetchPriority=job.priority<=0?'high':'low';
      let settled=false;
      const finish=(error)=>{
        if(settled)return;settled=true;clearTimeout(timer);image.onload=image.onerror=null;active.delete(job);
        if(error){image.src='';cache.delete(job.src);job.reject(error);}else{job.done=true;job.resolve(job.src);}
        pump();
      };
      const timer=setTimeout(()=>finish(new Error('Image timeout')),22000);
      job.cancel=()=>{const error=new Error('Reader request cancelled');error.name='AbortError';finish(error);};
      image.onload=async()=>{try{await image.decode();}catch{}finish();};
      image.onerror=()=>finish(new Error('Image unavailable'));image.src=job.src;
    }
  }
  function load(src,priority=0,token=generation){
    if(!safe(src))return Promise.reject(new Error('Invalid reader image'));
    const existing=cache.get(src);
    if(existing){existing.priority=Math.min(existing.priority,priority);return existing.promise;}
    const job={src,priority,generation:token,done:false};
    job.promise=new Promise((resolve,reject)=>{job.resolve=resolve;job.reject=reject;});cache.set(src,job);queue.push(job);
    if(cache.size>48){for(const [key,value]of cache){if(value.done){cache.delete(key);break;}}}
    pump();return job.promise;
  }
  function reset(){
    generation++;cleanup();cleanup=()=>{};
    for(const job of [...active])if(job.generation!==null&&job.generation!==generation)job.cancel();
    pump();
  }
  function prefetch(url){
    const first=manifest[url]?.pages[0];if(first&&canPrefetch())load(first.preview,5,null).catch(()=>{});
  }
  function mount(viewer,info,download){
    const data=manifest[info.url],token=generation;
    if(!data?.pages?.length)return;
    viewer.classList.add('experience-reader');
    const toolbar=el('div','reader-toolbar'),label=el('label','','页码 '),select=el('select');select.setAttribute('aria-label','选择阅读页码');
    download.textContent='下载 PDF ↓';
    data.pages.forEach((page,index)=>{const option=el('option','',`${index+1} / ${data.pages.length}`);option.value=index;select.append(option);});label.append(select);
    const zoom=el('button','reader-zoom','高清阅读');zoom.type='button';zoom.setAttribute('aria-pressed','false');
    toolbar.append(label,zoom,download);
    const list=el('div','experience-pages'),figures=[],states=[];let zoomed=false,current=0,scheduled=false;
    function prioritize(index){
      const keep=new Set();
      data.pages.slice(Math.max(0,index-1),index+2).forEach(page=>keep.add(page.preview));
      if(zoomed)keep.add(data.pages[index].full);
      for(let i=queue.length-1;i>=0;i--){const job=queue[i];if(job.generation!==null&&!keep.has(job.src)){queue.splice(i,1);cache.delete(job.src);job.resolve(null);}}
      for(const job of [...active])if(job.generation!==null&&!keep.has(job.src))job.cancel();
    }
    function ensure(index,quality=1,priority=0){
      const state=states[index];if(!state||state.shown>=quality||state.requested.has(quality))return;
      if(quality===1&&state.requested.has(2))return;
      const source=quality===2?state.page.full:state.page.preview;state.requested.add(quality);
      state.retry.hidden=true;
      state.figure.setAttribute('aria-busy','true');
      if(!state.shown||quality===2&&index===current){state.status.textContent=quality===2?'正在加载高清页面…':'正在加载清晰页面…';state.status.hidden=false;}
      load(source,priority,token).then(src=>{
        if(!src){state.requested.delete(quality);state.status.textContent='清晰页待加载';state.figure.setAttribute('aria-busy','false');return;}
        if(token!==generation||quality<state.shown)return;
        state.image.src=src;state.shown=quality;state.figure.setAttribute('aria-busy','false');state.retry.hidden=true;
        state.status.hidden=!(zoomed&&index===current&&quality<2);
      }).catch(error=>{
        state.requested.delete(quality);if(token!==generation)return;
        if(error.name==='AbortError'){state.status.textContent='清晰页待加载';state.figure.setAttribute('aria-busy','false');return;}
        state.status.hidden=true;state.retry.hidden=false;
        state.retry.textContent=state.shown?'高清暂未加载，点击重试':'此页暂未加载，点击重试';
      });
    }
    function update(){
      scheduled=false;if(token!==generation)return;
      const anchor=toolbar.getBoundingClientRect().bottom+20;
      let index=figures.findIndex(figure=>figure.getBoundingClientRect().bottom>anchor);
      if(index<0)index=figures.length-1;current=index;select.value=String(index);
      prioritize(index);
      ensure(index,zoomed?2:1,0);if(canPrefetch())ensure(index+1,1,3);
    }
    data.pages.forEach((page,index)=>{
      const figure=el('figure','experience-page');figure.setAttribute('aria-busy','true');
      const image=el('img');image.width=page.width;image.height=page.height;image.decoding='async';image.style.aspectRatio=page.width+'/'+page.height;image.alt=`${info.title} · 第 ${index+1} 页`;
      if(/^data:image\/webp;base64,[A-Za-z0-9+/=]+$/.test(page.placeholder || ''))image.src=page.placeholder;
      const status=el('span','reader-page-status','清晰页待加载'),retry=el('button','reader-page-retry','此页暂未加载，点击重试');retry.type='button';retry.hidden=true;
      retry.addEventListener('click',()=>{const quality=zoomed&&index===current?2:1;cache.delete(quality===2?page.full:page.preview);states[index].requested.delete(quality);ensure(index,quality,-1);});
      figure.append(image,status,retry,el('figcaption','',`${index+1} / ${data.pages.length} · 原文页码 ${page.sourcePage}`));list.append(figure);figures.push(figure);states.push({page,image,figure,status,retry,shown:0,requested:new Set()});
    });
    function alignPage(index){
      const header=document.querySelector('.site-header').getBoundingClientRect().height;
      const pageBar=document.querySelector('.module-window-header').getBoundingClientRect().height;
      const offset=header+pageBar+toolbar.getBoundingClientRect().height+12;
      window.scrollTo({top:Math.max(0,figures[index].getBoundingClientRect().top+window.scrollY-offset),left:0,behavior:'instant'});
    }
    function jump(){current=Number(select.value);prioritize(current);ensure(current,zoomed?2:1,-1);alignPage(current);if(canPrefetch())ensure(current+1,1,3);}
    select.addEventListener('change',jump);
    zoom.addEventListener('click',()=>{
      current=Number(select.value);zoomed=!zoomed;viewer.classList.toggle('is-zoomed',zoomed);zoom.setAttribute('aria-pressed',String(zoomed));zoom.textContent=zoomed?'适合宽度':'高清阅读';
      prioritize(current);
      ensure(current,zoomed?2:1,-1);alignPage(current);
      if(!zoomed)states.forEach(state=>{if(state.shown)state.status.hidden=true;});
    });
    const note=data.kind==='experience'?'轻量预览优先显示；点击“高清阅读”加载高清页，原 PDF 可下载。公开版不含聊天截图。':'轻量预览优先显示；点击“高清阅读”加载高清页，原 PDF 可下载。';
    viewer.append(toolbar,el('p','reader-note',note),list);
    const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){const index=figures.indexOf(entry.target);ensure(index,1,1);}},{rootMargin:'200px 0px',threshold:0}):null;
    figures.forEach(figure=>observer?.observe(figure));
    const scroll=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}};window.addEventListener('scroll',scroll,{passive:true});
    cleanup=()=>{observer?.disconnect();window.removeEventListener('scroll',scroll);};
    ensure(0,1,-1);if(canPrefetch())ensure(1,1,3);
  }
  window.BUFF_READER={has:url=>!!manifest[url],mount,reset,prefetch};
})();
