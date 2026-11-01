(() => {
  'use strict';
  const key='buff-theme',root=document.documentElement,system=window.matchMedia('(prefers-color-scheme: dark)');
  const labels={system:'跟随系统',dark:'深色',light:'浅色'};
  let preference='system';
  try { const saved=localStorage.getItem(key); if(['system','dark','light'].includes(saved)) preference=saved; } catch {}
  function apply() {
    const theme=preference==='system'?(system.matches?'dark':'light'):preference;
    root.dataset.theme=theme;root.dataset.themePreference=preference;root.style.colorScheme=theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',theme==='dark'?'#161823':'#f5f5f7');
    const button=document.getElementById('theme-toggle');
    if(button){button.setAttribute('aria-label',`切换主题，当前${labels[preference]}`);button.title=`主题：${labels[preference]}`;}
    document.querySelectorAll('[data-theme-preference-option]').forEach(item=>item.setAttribute('aria-checked',String(item.dataset.themePreferenceOption===preference)));
  }
  apply();
  system.addEventListener('change',()=>{if(preference==='system')apply();});
  window.addEventListener('storage',event=>{if(event.key===key){preference=['system','dark','light'].includes(event.newValue)?event.newValue:'system';apply();}});
  document.addEventListener('DOMContentLoaded',()=>{
    const button=document.getElementById('theme-toggle'),menu=document.getElementById('theme-menu');
    const close=()=>{menu.hidden=true;button.setAttribute('aria-expanded','false');};
    button.addEventListener('click',()=>{const opening=menu.hidden;menu.hidden=!opening;button.setAttribute('aria-expanded',String(opening));if(opening)document.dispatchEvent(new Event('buff:theme-menu-open'));});
    document.querySelectorAll('[data-theme-preference-option]').forEach(item=>item.addEventListener('click',()=>{
      preference=item.dataset.themePreferenceOption;try{localStorage.setItem(key,preference);}catch{}apply();close();button.focus({preventScroll:true});
    }));
    button.addEventListener('keydown',event=>{if(event.key==='ArrowDown'){event.preventDefault();menu.hidden=false;button.setAttribute('aria-expanded','true');menu.querySelector('button')?.focus();}});
    menu.addEventListener('keydown',event=>{
      const items=[...menu.querySelectorAll('button')],index=items.indexOf(document.activeElement);
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();items[(index+(event.key==='ArrowDown'?1:-1)+items.length)%items.length].focus();}
      if(event.key==='Escape'){close();button.focus({preventScroll:true});}
    });
    document.addEventListener('click',event=>{if(!event.target.closest('.theme-control'))close();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
    apply();
  });
})();
