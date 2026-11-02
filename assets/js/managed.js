(() => {
  'use strict';
  const allowed=['subjects','courses','videos','textbooks','news','promotions','posters','documents','experiences','dailyQuestions','contact','admissions'];
  const text=(tag,value)=>{const node=document.createElement(tag);node.textContent=value;return node;};
  // Loaded in parallel with the other deferred scripts; no data-fetch waterfall.
  window.BUFF_MANAGED_READY=Promise.resolve(window.BUFF_MANAGED_DATA || {version:1,overrides:{}})
    .then(data=>{
      const values=data?.overrides || {};window.BUFF_MANAGED=data;
      for(const key of allowed)if(Object.hasOwn(values,key))window.BUFF_CONTENT[key]=values[key];
      if(values.readings)Object.assign(window.BUFF_READING,values.readings);
      if(values.copy)for(const [key,value]of Object.entries(values.copy)){
        if(!/^[a-z0-9-]{1,80}$/.test(key)||typeof value!=='string')continue;
        const node=document.querySelector(`[data-edit-key="${key}"]`);if(node)node.textContent=value;
      }
      if(values.sectionArticles)for(const [key,article]of Object.entries(values.sectionArticles)){
        if(!['initial-study','reexamination','employment','about'].includes(key))continue;
        const target=document.querySelector('#'+key+' .container');if(!target)continue;
        const block=document.createElement('article');block.className='reading-article managed-article';
        block.append(text('h3',article.title || ''));
        for(const paragraph of article.body || [])block.append(text('p',paragraph));
        for(const path of article.images || [])if(/^assets\/uploads\/[a-z0-9-]+\.webp$/.test(path)){const img=document.createElement('img');img.src=path;img.alt=article.title || '';img.loading='lazy';block.append(img);}
        target.insertBefore(block,target.querySelector('.module-related'));
      }
      return data;
    }).catch(()=>({version:1,overrides:{}}));
})();
