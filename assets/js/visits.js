(() => {
  'use strict';
  const display=document.getElementById('busuanzi_value_site_pv');
  if(!display)return;
  if(location.hostname!=='san780020-lab.github.io'){display.textContent='—';return;}
  const script=document.createElement('script');
  script.src='https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';script.defer=true;
  const unavailable=()=>{if(!/\d/.test(display.textContent))display.textContent='统计暂不可用';};
  script.addEventListener('error',unavailable);document.head.append(script);setTimeout(unavailable,15000);
})();
