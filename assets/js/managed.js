(() => {
  'use strict';
  const allowed=['subjects','courses','videos','textbooks','news','promotions','posters','documents','experiences','dailyQuestions','contact','admissions'];
  const text=(tag,value)=>{const node=document.createElement(tag);node.textContent=value;return node;};
  // Loaded in parallel with the other deferred scripts; no data-fetch waterfall.
  let managed=window.BUFF_MANAGED_DATA || {version:1,overrides:{}};
  try{
    if(new URLSearchParams(location.search).get('editor-preview')==='1'&&parent!==window&&parent.location.origin===location.origin&&/\/admin\.html$/.test(parent.location.pathname)&&parent.BUFF_EDITOR?.ready){
      const preview=parent.BUFF_EDITOR.snapshot();managed=preview.data;window.BUFF_VISUAL_PREVIEW=true;
      const assets=Object.fromEntries(Object.entries(preview.assets||{}).filter(([path,url])=>/^assets\/uploads\/[a-z0-9-]+\.(webp|pdf)$/.test(path)&&typeof url==='string'&&url.startsWith('blob:'+location.origin+'/')));
      window.BUFF_ASSET_URL=path=>assets[String(path).split('?')[0]]||path;
    }
  }catch{}
  window.BUFF_MANAGED_READY=Promise.resolve(managed)
    .then(data=>{
      const values=data?.overrides || {};window.BUFF_MANAGED=data;
      for(const key of allowed)if(Object.hasOwn(values,key))window.BUFF_CONTENT[key]=values[key];
      if(values.readings)Object.assign(window.BUFF_READING,values.readings);
      if(values.media){
        window.BUFF_MEDIA??={};
        for(const key of ['readers','images'])Object.assign(window.BUFF_MEDIA[key]??={},values.media[key]||{});
      }
      if(values.copy)for(const [key,value]of Object.entries(values.copy)){
        if(!/^[a-z0-9-]{1,80}$/.test(key)||typeof value!=='string')continue;
        const node=document.querySelector(`[data-edit-key="${key}"]`);if(node)node.textContent=value;
      }
      const site={examYear:2027,pastPaperRange:'2004–最新',copyrightYear:'自动',...values.site};
      if(Number.isInteger(site.examYear)&&site.examYear>=2027&&site.examYear<=2100){
        window.BUFF_EXAM_YEAR=site.examYear;
        for(const node of document.querySelectorAll('[data-cohort-year]'))node.textContent=node.textContent.replace(/20\d{2}/,String(site.examYear));
      }
      const range=document.querySelector('[data-edit-key="hero-text-7"]');if(range&&typeof site.pastPaperRange==='string'&&site.pastPaperRange.length<=30)range.textContent=site.pastPaperRange;
      const copyright=document.querySelector('[data-copyright-year]');if(copyright)copyright.textContent=/^20\d{2}$/.test(String(site.copyrightYear))?String(site.copyrightYear):String(new Date().getFullYear());
      const admissions=window.BUFF_CONTENT.admissions;
      if(Number.isInteger(admissions?.year)&&admissions.year>=2020&&admissions.year<=2100){
        const year=String(admissions.year);
        for(const node of document.querySelectorAll('a[href="#admissions"],[data-module-open="admissions"]'))node.textContent=node.textContent.replace(/20\d{2}/g,year);
        const section=document.getElementById('admissions');
        if(section){const walker=document.createTreeWalker(section,NodeFilter.SHOW_TEXT);let current;while((current=walker.nextNode()))current.nodeValue=current.nodeValue.replace(/20\d{2}/g,year);
          for(const node of section.querySelectorAll('[aria-label]'))node.setAttribute('aria-label',node.getAttribute('aria-label').replace(/20\d{2}/g,year));
          for(const link of section.querySelectorAll('a[target="_blank"]'))if(/^https:\/\//.test(admissions.source||''))link.href=admissions.source;
        }
      }
      if(values.sectionArticles)for(const [key,article]of Object.entries(values.sectionArticles)){
        if(!['initial-study','reexamination','employment','about'].includes(key))continue;
        const target=document.querySelector('#'+key+' .container');if(!target)continue;
        const block=document.createElement('article');block.className='reading-article managed-article';
        block.append(text('h3',article.title || ''));
        for(const paragraph of article.body || [])block.append(text('p',paragraph));
        for(const path of article.images || [])if(/^assets\/uploads\/[a-z0-9-]+\.webp$/.test(path)){const img=document.createElement('img');img.src=window.BUFF_ASSET_URL?.(path)||path;img.alt=article.title || '';img.loading='lazy';block.append(img);}
        target.insertBefore(block,target.querySelector('.module-related'));
      }
      return data;
    }).catch(()=>({version:1,overrides:{}}));
})();
