(() => {
  const button=document.getElementById('hero-motion-control');if(!button)return;
  let enabled=true;try{enabled=localStorage.getItem('buff-motion')!=='off';}catch{}
  const apply=()=>{document.documentElement.dataset.motion=enabled?'on':'off';button.textContent=enabled?'暂停动效':'开启动效';button.setAttribute('aria-pressed',String(!enabled));};
  button.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem('buff-motion',enabled?'on':'off');}catch{}apply();});apply();
})();
