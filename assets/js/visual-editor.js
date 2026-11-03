/* The webpage is the module picker. Authentication remains in admin.js only. */
(() => {
  'use strict';
  const $=selector=>document.querySelector(selector),frame=$('#visual-site');
  if(!frame)return;
  let api,started=false,viewing=false,needsPreview=false,observer,restoreScroll=0;
  const labels={site:'届别与年份',subjects:'备考路线',courses:'课程',documents:'PDF 资料',posters:'海报',videos:'公开课',promotions:'宣传',news:'院校消息',dailyQuestions:'每日一题',experiences:'经验分享',textbooks:'参考教材',contact:'联系方式',admissions:'招生计划',studentOrigins:'生源百分比',admissionHistory:'历年录取'};
  const sections=[
    ['.hero',[['site','届别与年份']]],
    ['#updates-board',[['promotions','编辑每日宣传'],['news','编辑院校消息']]],
    ['#preparation',[['subjects','编辑备考路线']]],
    ['#courses',[['courses','编辑课程与价格']]],
    ['#materials',[['documents','编辑 PDF 资料'],['posters','编辑海报']]],
    ['#reexam-materials',[['documents','编辑资料'],['posters','编辑海报']]],
    ['#daily-question',[['dailyQuestions','编辑每日一题']]],
    ['#daily-explanations',[['dailyQuestions','编辑题目与视频']]],
    ['#videos',[['videos','编辑公开课']]],
    ['#experiences',[['experiences','编辑经验分享']]],
    ['#textbooks',[['textbooks','编辑教材']]],
    ['#admissions',[['admissions','编辑招生计划']]],
    ['#source-analysis',[['studentOrigins','编辑匿名百分比']]],
    ['#admission-history',[['admissionHistory','编辑录取数据']]],
    ['#news-center',[['news','编辑院校消息']]],
    ['#promotion-center',[['promotions','编辑每日宣传']]],
    ['#contact',[['contact','编辑联系方式']]],
    ['#initial-study',[['initial-study','编辑图文补充']]],
    ['#reexamination',[['reexamination','编辑图文补充']]],
    ['#employment',[['employment','编辑图文补充']]],
    ['#about',[['about','编辑机构介绍']]]
  ];
  function setPanel(open){
    document.body.classList.toggle('visual-panel-open',open);
    $('.admin-layout').setAttribute('aria-hidden',String(!open));$('.admin-layout').inert=!open;
    if(open)requestAnimationFrame(()=>$('#editor').querySelector('input,textarea,select,button')?.focus());
  }
  function pick(key,index,keys){
    if(api.working){$('#status').textContent='正在处理素材或发布，请等待完成后再切换编辑内容。';return;}
    const ok=keys?api.text(keys):api.open(key,index);if(!ok)return;
    $('#auth-card').hidden=true;document.body.classList.remove('visual-picking');setPanel(true);
  }
  function refreshSite(){
    if(!started||api.working)return;
    let hash='';try{hash=frame.contentWindow.location.hash;restoreScroll=frame.contentWindow.scrollY;}catch{}
    $('#visual-loading').hidden=false;
    frame.src='./index.html?editor-preview=1&draft='+Date.now().toString(36)+hash;
    needsPreview=false;
  }
  function done(){if(api.working){$('#status').textContent='请等待素材处理或发布完成。';return;}setPanel(false);document.body.classList.remove('visual-picking');if(needsPreview)refreshSite();}
  function applyMode(){try{frame.contentDocument.documentElement.toggleAttribute('data-visual-browse',viewing);}catch{}$('#visual-preview').textContent=viewing?'继续编辑':'预览网站';$('#visual-preview').setAttribute('aria-pressed',String(viewing));}
  function makeButton(doc,text,key,index,keys){
    const button=doc.createElement('button');button.type='button';button.className='visual-edit-button';button.textContent=text;button.setAttribute('data-no-translate','');
    button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();pick(key,index,keys);});return button;
  }
  function controls(doc,target,actions,extraKeys){
    if(target.hasAttribute('data-visual-decorated'))return;
    const keys=extraKeys||[...target.querySelectorAll('[data-edit-key]')].map(node=>node.dataset.editKey);
    if(!actions.length&&!keys.length)return;
    target.setAttribute('data-visual-decorated','');target.classList.add('visual-edit-region');
    const bar=doc.createElement('div');bar.className='visual-edit-controls';bar.setAttribute('data-no-translate','');
    for(const [key,label]of actions)bar.append(makeButton(doc,label,key));
    if(keys.length)bar.append(makeButton(doc,'编辑说明文字',null,null,keys));
    if(bar.children.length)target.prepend(bar);
  }
  function decorate(doc){
    for(const [selector,actions]of sections)for(const target of doc.querySelectorAll(selector))controls(doc,target,actions);
    for(const target of doc.querySelectorAll('.section:not([data-visual-decorated])'))controls(doc,target,[]);
    for(const target of doc.querySelectorAll('.showcase-card'))controls(doc,target,[]);
    for(const target of doc.querySelectorAll('[data-visual-module]')){
      if(target.querySelector(':scope > .visual-edit-button')||target.parentElement?.classList.contains('visual-item-wrapper'))continue;
      target.setAttribute('data-visual-item-ready','');target.classList.add('visual-edit-item');
      const index=Number(target.dataset.visualIndex),key=target.dataset.visualModule;if(index<0||!Number.isInteger(index))continue;
      const button=makeButton(doc,'编辑'+(labels[key]||'这项内容'),key,index);
      if(target.tagName==='BUTTON'||target.tagName==='A'){
        // Keep edit controls outside existing links/buttons to avoid nested interactive elements.
        const wrapper=doc.createElement('div');wrapper.className='visual-item-wrapper';target.before(wrapper);wrapper.append(target,button);
      }else target.prepend(button);
    }
  }
  function mount(){
    const doc=frame.contentDocument;if(!doc||!doc.defaultView?.BUFF_VISUAL_PREVIEW){$('#visual-loading').hidden=true;return;}
    observer?.disconnect();
    const stylesheet=doc.createElement('link');stylesheet.rel='stylesheet';stylesheet.href='assets/css/visual-target.css?v=20261103-editor2';doc.head.append(stylesheet);
    decorate(doc);let pending=false;
    observer=new MutationObserver(()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;decorate(doc);});});observer.observe(doc.body,{childList:true,subtree:true});
    doc.addEventListener('click',event=>{
      const admin=event.target.closest('a[href*="admin.html"]');if(admin){event.preventDefault();event.stopImmediatePropagation();$('#auth-card').hidden=false;$('#token').focus();return;}
      if(viewing||event.target.closest('.visual-edit-button'))return;
      const text=event.target.closest('[data-edit-key]');
      if(text){event.preventDefault();event.stopImmediatePropagation();pick(null,null,[text.dataset.editKey]);}
    },true);
    doc.addEventListener('keydown',event=>{if(event.key==='Escape')done();});
    doc.addEventListener('pointerover',event=>{if(viewing)return;const text=event.target.closest('[data-edit-key]');if(text)text.title='点击编辑这段文字';});
    const manager=doc.querySelector('.header-admin');if(manager)manager.textContent='编辑模式';
    applyMode();
    frame.contentWindow.requestAnimationFrame(()=>frame.contentWindow.requestAnimationFrame(()=>{frame.contentWindow.scrollTo({top:restoreScroll,behavior:'instant'});$('#visual-loading').hidden=true;}));
  }
  function sizeChrome(){document.documentElement.style.setProperty('--visual-top',($('.admin-header').offsetHeight+$('#status').offsetHeight)+'px');document.documentElement.style.setProperty('--visual-bottom',$('.publish-bar').offsetHeight+'px');}
  function init(){
    if(started||!window.BUFF_EDITOR?.ready)return;api=window.BUFF_EDITOR;started=true;
    document.body.classList.add('visual-admin');$('.admin-layout').setAttribute('role','dialog');$('.admin-layout').setAttribute('aria-label','编辑所选网页内容');setPanel(false);
    frame.addEventListener('load',mount);refreshSite();
    window.addEventListener('buff:admin-change',()=>{needsPreview=true;});
    window.addEventListener('buff:admin-refresh',refreshSite);
    window.addEventListener('buff:admin-select',()=>{if(started){document.body.classList.remove('visual-picking');setPanel(true);}});
    $('#finish-editing').addEventListener('click',done);
    $('#visual-preview').addEventListener('click',()=>{if(api.working)return;viewing=!viewing;done();applyMode();});
    $('#open-auth').addEventListener('click',()=>{$('#auth-card').hidden=false;$('#token').focus();});
    $('#close-auth').addEventListener('click',()=>{$('#auth-card').hidden=true;});
    $('#all-modules').addEventListener('click',()=>{if(api.working)return;if(document.body.classList.contains('visual-picking')){done();return;}setPanel(true);document.body.classList.add('visual-picking');$('#module-search').focus();});
    $('#close-module-picker').addEventListener('click',done);
    document.addEventListener('keydown',event=>{if(event.key==='Escape'){if(!$('#auth-card').hidden)$('#auth-card').hidden=true;else done();}});
    // Always preview the current draft before publication, including edits in a still-open panel.
    $('#publish').addEventListener('click',()=>{if(!api.working)done();},true);
    const resizer=new ResizeObserver(sizeChrome);for(const element of [$('.admin-header'),$('#status'),$('.publish-bar')])resizer.observe(element);sizeChrome();
    $('#status').textContent='点击网页模块旁的“编辑”或点选说明文字。修改先保存在草稿中，连接身份后统一发布。';
  }
  window.addEventListener('buff:admin-ready',init,{once:true});init();
})();
