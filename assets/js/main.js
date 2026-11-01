(() => {
  'use strict';
  const content = window.BUFF_CONTENT;
  if (!content) return;
  let selectedSubject = 'electrical';
  let selectedFilter = 'all';
  let selectedPosterFilter = 'all';
  let selectedPosterIndex = 0;
  let selectedMaterialStage = 'initial';
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function safeURL(value) {
    try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; }
    catch { return ''; }
  }
  function externalLink(text, url, className) {
    const link = element('a', className, text);
    link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    return link;
  }
  function safeAsset(value) {
    return /^assets\/(?:(?:posters|documents|images|books|experiences|promotions)\/[a-z0-9-]+\.(?:webp|pdf|png|jpe?g)|video-covers\/[a-z0-9-]+\.svg)$/i.test(value || '') ? value : '';
  }
  function safePromotionImage(value) {
    if(safeAsset(value))return value;
    try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password&&((url.hostname==='github.com'&&url.pathname.startsWith('/user-attachments/assets/'))||url.hostname==='user-images.githubusercontent.com')?url.href:'';}catch{return '';}
  }
  function assetLink(text, path, className) {
    const link = externalLink(text, safeAsset(path), className);
    if (/\.pdf$/i.test(path || '')) link.dataset.pdfView = path;
    return link;
  }
  function renderCourses() {
    const grid = $('#course-grid');
    grid.replaceChildren();
    const visible = content.courses.filter(course => (selectedFilter === 'all' || course.stage === selectedFilter) && (selectedSubject === 'all' || !course.subject || course.subject === 'all' || course.subject === selectedSubject) && !(selectedFilter === 'all' && course.status === '待更新'));
    for (const course of visible) {
      const card = element('article', 'course-card');
      const top = element('div', 'course-top');
      top.append(element('span', 'course-stage', course.stageLabel), element('span', 'course-number', course.number));
      const title = element('h3', '', course.title);
      const description = element('p', 'course-description', course.subtitle);
      const list = element('ul', 'course-topics');
      (course.previewTopics || course.topics).forEach(topic => list.append(element('li', '', topic)));
      const bottom = element('div', 'course-bottom');
      const button = element('button', 'text-link', '查看课程详情 →');
      button.type = 'button'; button.setAttribute('aria-label', `查看${course.title}详情`);
      button.addEventListener('click', () => openCourse(course));
      bottom.append(element('span', 'planning-label', course.status || '待更新'), button);
      card.append(top, title, description, element('div', 'course-price', course.priceLabel || '待公布'), list, bottom); grid.append(card);
    }
    if (!visible.length) grid.append(element('p', 'empty-state', '该方向的课程安排待更新。'));
    $('#course-direction').textContent = `当前方向：${content.subjects[selectedSubject].label}`;
  }
  function renderVideos() {
    const grid = $('#video-grid'); grid.replaceChildren();
    const groups = [
      {id:'control',title:'自动控制原理',description:'先从自控试听，了解老师的讲解方式。'},
      {id:'extended',title:'团队其他专业课试听',description:'电路、电分、数模电等团队试听资源；燕山大学 806 / 830 的专业课范围请查看初试模块。'},
      {id:'public',title:'公共课试听',description:'2027 考研公共课试听资源。'}
    ];
    groups.forEach(group => {
      const videos = content.videos.filter(video => (video.group || 'control') === group.id);
      if (!videos.length) return;
      const section = element('section', `video-group video-group-${group.id}`);
      const heading = element('div','video-group-heading'); heading.append(element('h3','',group.title),element('p','',group.description));
      const cards = element('div','video-card-grid');
      videos.forEach((video, index) => {
      const card = element('article', 'video-card');
      const url = safeURL(video.url);
      const thumbnail = element('div', `video-thumbnail video-theme-${index % 3}`);
      const cover = safeAsset(video.cover);
      if (cover) { const image = element('img','video-cover'); image.src=cover; image.alt=`${video.title}课程封面`; image.width=960; image.height=540; image.loading='lazy'; thumbnail.append(image); }
      else { const preview = element('div', 'video-preview-lines'); preview.setAttribute('aria-hidden', 'true'); thumbnail.append(preview); }
      const play = element('span', 'video-play', '▶'); play.setAttribute('aria-hidden', 'true');
      thumbnail.append(play, element('span', 'video-status', url ? '前往 B 站观看 ↗' : '视频待上线'));
      if (url) { const link = externalLink('', url, 'video-thumbnail-link'); link.setAttribute('aria-label', `观看${video.title}（在新标签页打开）`); link.append(thumbnail); card.append(link); }
      else card.append(thumbnail);
      const meta = element('div', 'video-meta'); meta.append(element('span', `platform-label ${video.platform}`, video.platform === 'douyin' ? '抖音' : 'BILIBILI'), element('span', '', video.category));
      const info=element('div','video-card-info'); const title=element('h4'); title.append(url ? externalLink(video.title,url) : document.createTextNode(video.title));
      info.append(meta,title,element('p','',video.description || '')); card.append(info);
      cards.append(card);
      });
      section.append(heading,cards); grid.append(section);
    });
    if (!grid.children.length) grid.append(element('p', 'empty-state', '该方向的公开视频待更新。'));
  }
  function fillProfileLinks(target) {
    target.replaceChildren();
    for (const [key,label] of [['bilibili','B 站主页'],['douyin','抖音主页']]) {
      const url=safeURL(content.contact[key]); if (!url) continue;
      const link=externalLink('',url,`profile-link profile-${key}`);
      link.setAttribute('aria-label', `${label}（在新标签页打开）`);
      link.append(element('span','profile-badge',key==='bilibili'?'B站':'抖音'),element('span','',label),element('span','profile-arrow','↗'));
      target.append(link);
    }
  }
  function selectSubject(subject) {
    if (!content.subjects[subject]) return;
    selectedSubject = subject;
    $$('[data-subject]').forEach(tab => { const active = tab.dataset.subject === subject; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
    const data = content.subjects[subject];
    $('#subject-tag').textContent = data.tag; $('#subject-name').textContent = data.title; $('#subject-description').textContent = data.description;
    $('#subject-panel').setAttribute('aria-labelledby', $(`#tab-${subject}`) ? `tab-${subject}` : 'preparation-title');
    $$('[data-route-subject]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.routeSubject === subject)));
    renderCourses(); renderVideos();
  }
  const dialog = $('#course-dialog');
  function renderCourseDetails(course) {
    $('#dialog-eyebrow').textContent = `${content.subjects[selectedSubject].label} / ${course.stageLabel}`;
    $('#dialog-title').textContent = course.title;
    $('#dialog-description').textContent = course.audience;
    $('#dialog-topics').replaceChildren(...course.topics.map(topic => element('li', '', topic)));
    const details = $('#dialog-details'); details.replaceChildren();
    if (course.pricing?.length) {
      details.append(element('h3', 'detail-heading', '班型与价格'));
      const prices = element('div', 'detail-prices');
      course.pricing.forEach(item => {
        const row = element('div', 'detail-price-row');
        const text = element('div'); text.append(element('strong', '', item.label), element('p', '', item.note));
        row.append(text, element('span', 'detail-price-value', `¥${item.price}`)); prices.append(row);
      });
      details.append(prices);
    }
    for (const [key, label] of [['materials', '配套资料'], ['services', '服务范围']]) {
      if (!course[key]?.length) continue;
      details.append(element('h3', 'detail-heading', label));
      const list = element('ul'); course[key].forEach(text => list.append(element('li', '', text))); details.append(list);
    }
    if (course.teachers) { details.append(element('h3', 'detail-heading', '授课与答疑'), element('p', 'detail-text', course.teachers)); }
    if (course.offer) details.append(element('p', 'detail-offer', course.offer));
    const links = element('div', 'detail-links');
    if (course.poster) {
      const button = element('button', 'text-link', '查看课程海报 ↗'); button.type = 'button';
      button.addEventListener('click', () => { dialog.close(); openPoster(course.poster); }); links.append(button);
    }
    if (safeAsset(course.document)) links.append(assetLink('打开 PDF 说明 ↗', course.document, 'text-link'));
    details.append(links);
    $('#dialog-notice').textContent = course.stage === 'reexam' ? '复试课程尚待更新，具体安排请咨询。' : `资料来源：${course.source}。价格、开课时间与优惠适用范围请在报名时确认。`;

  }
  function openCourse(course) { openModule('course',{courseID:course.id}); }
  $('.dialog-close').addEventListener('click', () => dialog.close());
  $('.dialog-contact').addEventListener('click', () => dialog.close());
  $$('[data-subject]').forEach(tab => {
    tab.addEventListener('click', () => selectSubject(tab.dataset.subject));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const subject = event.key === 'Home' ? 'electrical' : event.key === 'End' ? 'control' : selectedSubject === 'electrical' ? 'control' : 'electrical';
      selectSubject(subject); $(`[data-subject="${subject}"]`).focus();
    });
  });
  $$('[data-select-subject]').forEach(link => link.addEventListener('click', () => selectSubject(link.dataset.selectSubject)));
  $$('[data-filter]').forEach(button => button.addEventListener('click', () => {
    selectedFilter = button.dataset.filter;
    $$('[data-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    renderCourses();
  }));

  function renderDocuments() {
    const grid = $('#document-grid'); grid.replaceChildren();
    (content.documents || []).filter(document => (document.stage || 'initial') === selectedMaterialStage).forEach(document => {
      if (!safeAsset(document.url)) return;
      const card = element('article', 'document-card');
      const body = element('div', 'document-card-body');
      body.append(element('span', 'document-label', `PDF · 公开摘页 · ${document.pages} 页`), element('h3', '', document.title), element('p', '', document.description), element('small', 'document-source', `${document.sourcePages} · ${document.size}`));
      const actions = element('div', 'document-actions');
      const download = assetLink('下载 PDF ↓', document.url, 'text-link'); download.setAttribute('download', document.url.split('/').pop());
      actions.append(assetLink('在线查看 ↗', document.url, 'text-link'), download);
      card.append(body, actions); grid.append(card);
    });
    if (!grid.children.length) grid.append(element('p', 'empty-state', '复试课程与资料将在提供后单独更新。'));
    $('#document-note').textContent = selectedMaterialStage === 'initial' ? '初试 PDF 为课程与资料说明公开摘页，页码范围见下载卡片。' : '目前上传的海报与 PDF 均为初试资料，复试资料尚待补充。';
  }
  function renderPosters() {
    const grid = $('#poster-grid'); grid.replaceChildren();
    const posters = (content.posters || []).filter(poster => (poster.stage || 'initial') === selectedMaterialStage && (selectedPosterFilter === 'all' || poster.group === selectedPosterFilter));
    posters.forEach(poster => {
      if (!safeAsset(poster.image) || !safeAsset(poster.thumb)) return;
      const card = element('article', 'poster-card');
      const button = element('button', 'poster-preview'); button.type = 'button'; button.setAttribute('aria-label', `放大查看${poster.title}`);
      const image = element('img'); image.src = posterThumbnail(poster); image.alt = poster.title; image.width = poster.width; image.height = poster.height; image.loading = 'lazy'; image.decoding = 'async';
      if (posterPlaceholder(poster)) image.style.backgroundImage = `url("${posterPlaceholder(poster)}")`;
      image.addEventListener('error', () => { if(posterPlaceholder(poster)) image.src=posterPlaceholder(poster); }, {once:true});
      button.append(image, element('span', 'poster-expand', '放大查看 ↗')); button.addEventListener('click', () => openPoster(poster.id));
      const warm = () => loadPosterAsset(safeAsset(poster.preview) || safeAsset(poster.image), 'low').catch(() => {});
      button.addEventListener('pointerenter', warm, {once:true}); button.addEventListener('focus', warm, {once:true});
      card.append(button, element('h4', '', poster.title), element('p', '', poster.description)); grid.append(card);
    });
    $('#poster-count').textContent = `共 ${posters.length} 张`;
    if (!posters.length) grid.append(element('p', 'empty-state', selectedMaterialStage === 'reexam' ? '复试海报待更新。' : '该分类暂无海报。'));
  }
  function setMaterialStage(stage) {
    selectedMaterialStage = stage === 'reexam' ? 'reexam' : 'initial'; selectedPosterFilter = 'all';
    $$('[data-material-stage]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.materialStage === selectedMaterialStage)));
    $$('[data-material-stage]').forEach(button => button.classList.toggle('active', button.dataset.materialStage === selectedMaterialStage));
    $$('[data-poster-filter]').forEach(button => { const active = button.dataset.posterFilter === 'all'; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    renderDocuments(); renderPosters();
  }
  $$('[data-material-stage]').forEach(button => button.addEventListener('click', () => setMaterialStage(button.dataset.materialStage)));
  const posterDialog = $('#poster-dialog');
  const posterAssetCache = new Map();
  let posterRequest = 0;
  function posterThumbnail(poster) { return `${safeAsset(poster.thumb)}?v=20261101-fast`; }
  function posterPlaceholder(poster) { return /^data:image\/webp;base64,[A-Za-z0-9+/=]+$/.test(poster.placeholder || '') ? poster.placeholder : ''; }
  function loadPosterAsset(src, priority = 'high') {
    if (posterAssetCache.has(src)) { const entry=posterAssetCache.get(src); if(priority==='high') entry.image.fetchPriority='high'; return entry.promise; }
    const image=new Image(); image.decoding='async'; image.fetchPriority=priority;
    const promise=new Promise((resolve,reject) => {
      image.onload=async () => { try { await image.decode(); } catch {} resolve(src); };
      image.onerror=() => { posterAssetCache.delete(src); reject(new Error('Poster image unavailable')); };
    });
    posterAssetCache.set(src,{image,promise}); image.src=src; return promise;
  }
  function setPoster(index) {
    const request=++posterRequest; let quality=0;
    const total = content.posters.length; selectedPosterIndex = (index + total) % total;
    const poster = content.posters[selectedPosterIndex];
    $('#poster-dialog-title').textContent = poster.title;
    if(currentModule==='poster'){$('#module-title').textContent=poster.title;$('#module-subtitle').textContent=`${selectedPosterIndex+1} / ${total} · 课程海报`;if(!moduleDialog.hidden){currentPageOptions={posterID:poster.id};history.replaceState({...history.state,options:currentPageOptions},'',pageURL('poster',currentPageOptions));}}
    $('#poster-position').textContent = `${selectedPosterIndex + 1} / ${total} · 课程海报`;
    const image = $('#poster-full-image'); image.src = posterPlaceholder(poster) || posterThumbnail(poster); image.alt = `${poster.title}：${poster.description}`; image.width = poster.width; image.height = poster.height;
    const status=$('#poster-load-status'); const retry=$('#poster-retry'); const viewer=$('.poster-viewer');
    status.textContent='正在加载清晰预览…'; retry.hidden=true; viewer.setAttribute('aria-busy','true');
    loadPosterAsset(posterThumbnail(poster)).then(src => { if(request===posterRequest && quality<1) { quality=1; image.src=src; } }).catch(() => {});
    loadPosterAsset(safeAsset(poster.preview) || safeAsset(poster.image)).then(src => {
      if(request!==posterRequest) return;
      quality=2; image.src=src; status.textContent='清晰预览已加载'; viewer.setAttribute('aria-busy','false');
    }).catch(() => {
      if(request!==posterRequest) return;
      status.textContent='清晰图暂未加载，可重试或打开原图。'; retry.hidden=false; viewer.setAttribute('aria-busy','false');
    });
    $('#poster-original').href = safeAsset(poster.image);
    $('.poster-viewer').classList.remove('is-zoomed');
    $('.poster-viewer').scrollTop = 0; $('.poster-viewer').scrollLeft = 0;
    $('#poster-zoom').setAttribute('aria-pressed', 'false'); $('#poster-zoom').textContent = '放大阅读';
  }
  function openPoster(id) {
    const index = (content.posters || []).findIndex(poster => poster.id === id);
    if (index < 0) return;
    openModule('poster',{posterID:id});
  }
  $('#poster-prev').addEventListener('click', () => setPoster(selectedPosterIndex - 1));
  $('#poster-next').addEventListener('click', () => setPoster(selectedPosterIndex + 1));
  $('#poster-retry').addEventListener('click', () => setPoster(selectedPosterIndex));
  posterDialog.addEventListener('close', () => { if(!posterDialog.open) posterRequest++; });
  $('#poster-zoom').addEventListener('click', () => {
    const zoomed = $('.poster-viewer').classList.toggle('is-zoomed');
    $('#poster-zoom').setAttribute('aria-pressed', String(zoomed));
    $('#poster-zoom').textContent = zoomed ? '完整预览' : '放大阅读';
  });
  $('.poster-close').addEventListener('click', () => posterDialog.close());
  posterDialog.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault(); setPoster(selectedPosterIndex + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  $$('[data-poster-filter]').forEach(button => button.addEventListener('click', () => {
    selectedPosterFilter = button.dataset.posterFilter;
    $$('[data-poster-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    renderPosters();
  }));
  document.addEventListener('buff:theme-menu-open',closeMenu);
  const menuButton = $('.menu-toggle');
  const navGroups = $$('[data-nav-group]');
  const wideNav = window.matchMedia('(min-width: 901px)');
  let navCloseTimer;
  function closeMega() {
    window.clearTimeout(navCloseTimer);
    navGroups.forEach(group => {
      group.classList.remove('is-open');
      group.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
      group.querySelector('.nav-subtoggle').setAttribute('aria-expanded', 'false');
    });
    document.body.classList.remove('nav-open'); $('.site-header').classList.remove('menu-active');
  }
  function openMega(group) {
    closeMega(); group.classList.add('is-open');
    group.querySelector('.nav-link').setAttribute('aria-expanded', 'true');
    group.querySelector('.nav-subtoggle').setAttribute('aria-expanded', 'true');
    if (wideNav.matches) { document.body.classList.add('nav-open'); $('.site-header').classList.add('menu-active'); }
  }
  function closeMenu() {
    closeMega(); menuButton.setAttribute('aria-expanded', 'false'); $('.main-nav').classList.remove('is-open');
    menuButton.setAttribute('aria-label', '打开导航'); document.body.classList.remove('mobile-nav-open');
  }
  navGroups.forEach(group => {
    let pointerType = 'mouse';
    group.addEventListener('pointerdown', event => { pointerType=event.pointerType; });
    group.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { pointerType='mouse'; openMega(group); } });
    group.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse') navCloseTimer = window.setTimeout(closeMega, 160); });
    group.addEventListener('focusin', event => { if (wideNav.matches && event.target.matches(':focus-visible')) openMega(group); });
    group.addEventListener('focusout', event => { if (!group.contains(event.relatedTarget)) navCloseTimer = window.setTimeout(closeMega, 100); });
    group.querySelector('.nav-link').addEventListener('click', event => {
      if(pointerType==='mouse')return;
      event.preventDefault(); event.stopPropagation();
      const tapToggle = pointerType === 'touch' || pointerType === 'pen';
      if (tapToggle && group.classList.contains('is-open')) closeMega(); else openMega(group);
    });
    group.querySelector('.nav-subtoggle').addEventListener('click', () => { if (group.classList.contains('is-open')) closeMega(); else openMega(group); });
    group.querySelector('.nav-link').addEventListener('keydown', event => {
      if (event.key !== 'ArrowDown') return;
      event.preventDefault(); openMega(group); group.querySelector('.mega-primary a,.mega-primary button')?.focus();
    });
  });
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    if (!open) { closeMenu(); return; }
    closeMega(); menuButton.setAttribute('aria-expanded', 'true'); menuButton.setAttribute('aria-label', '关闭导航');
    $('.main-nav').classList.add('is-open'); document.body.classList.add('mobile-nav-open');
  });
  $('#nav-scrim').addEventListener('click', closeMenu);
  $$('[data-course-open]').forEach(button => button.addEventListener('click', () => {
    const course = content.courses.find(item => item.id === button.dataset.courseOpen);
    if (!course) return;
    const group = button.closest('[data-nav-group]')?.dataset.navGroup;
    if (course.subject && course.subject !== 'all') selectSubject(course.subject);
    else if (group === 'electrical' || group === 'control') selectSubject(group);
    closeMenu(); openCourse(course);
  }));
  $$('.main-nav a:not(.nav-link)').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
  wideNav.addEventListener('change', closeMenu);

  function renderContact() {
    const contact = content.contact;
    const target = $('#contact-content');
    const nodes = [];
    function numberCard(name, role, number, label) {
      const card = element('div', 'contact-person');
      card.append(element('span', 'contact-person-name', name), element('p', 'contact-person-role', role));
      const row = element('div', 'contact-number-row');
      row.append(element('strong', 'contact-number', number));
      const copy = element('button', 'copy-button', `复制${label}`); copy.type = 'button'; copy.setAttribute('aria-label', `复制${name}${label}`);
      copy.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(number); $('#copy-status').textContent = `已复制${name}${label}：${number}`; }
        catch { $('#copy-status').textContent = `请长按或选择号码复制：${number}`; }
      });
      row.append(copy); card.append(row); return card;
    }
    (contact.people || []).forEach(person => nodes.push(numberCard(person.name, person.role, person.qq, 'QQ')));
    if (contact.qqGroup) nodes.push(numberCard('考研交流群', contact.groupLabel || '燕山大学考研交流', contact.qqGroup, '群号'));
    if (contact.wechat) nodes.push(element('p', 'contact-detail', `微信：${contact.wechat}`));
    if (contact.publicAccount) nodes.push(element('p', 'contact-account', `微信公众号：${contact.publicAccount}`));
    if (contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) { const email = element('a', 'contact-detail', `邮箱：${contact.email}`); email.href = `mailto:${contact.email}`; nodes.push(email); }
    for (const [key, label] of [['bilibili', '前往 B 站主页 ↗'], ['douyin', '前往抖音主页 ↗']]) { const url = safeURL(contact[key]); if (url) nodes.push(externalLink(label, url, 'contact-platform')); }
    if (contact.qrImage && /^(?:\.\/)?assets\/images\/[\w./-]+\.(?:png|jpe?g|webp)$/i.test(contact.qrImage) && !contact.qrImage.includes('..')) { const img = element('img', 'contact-qr'); img.src = contact.qrImage; img.alt = 'BUFF 机构咨询二维码'; img.width = 128; img.height = 128; nodes.push(img); }
    if (nodes.length) target.replaceChildren(...nodes);
  }
  function renderTextbooks() {
    const grid = $('#textbook-grid'); grid.replaceChildren();
    (content.textbooks || []).forEach(book => {
      const card = element('article','textbook-card');
      const visual = element('div','reference-cover');
      if (safeAsset(book.image)) { const image=element('img'); image.src=book.image; image.alt=`${book.title}，${book.edition}教材封面`; image.width=190; image.height=250; if(['drive','modern'].includes(book.coverStyle)) image.dataset.coverStyle=book.coverStyle; visual.append(image); }
      else { const placeholder=element('div','reference-cover-placeholder'); placeholder.append(element('strong','',book.title),element('span','','封面待补充')); visual.append(placeholder); }
      const text=element('div','reference-info');
      text.append(element('span','reference-tag',book.tag),element('h3','',book.title),element('p','reference-meta',`${book.edition} · ${book.author}`),element('p','reference-meta',book.publisher),element('p','reference-scope',book.scope));
      card.append(visual,text); grid.append(card);
    });
  }
  function renderAdmissions() {
    const data=content.admissions; if (!data) return;
    const tbody=$('#admissions-table-body'); const chart=$('#admissions-chart'); tbody.replaceChildren(); chart.replaceChildren();
    const max=Math.max(...data.programs.map(item=>item.ordinary+item.joint));
    data.programs.forEach(item=> {
      const row=element('tr');
      [item.code,item.name,item.degree,item.exam,String(item.ordinary),item.joint?String(item.joint):'—'].forEach(value=>row.append(element('td','',value))); tbody.append(row);
      const barRow=element('div','admission-bar-row'); const track=element('div','admission-track');
      const ordinary=element('span',item.exam==='830'?'admission-fill control-fill':'admission-fill'); ordinary.style.width=`${item.ordinary/max*100}%`; track.append(ordinary);
      if(item.joint) { const joint=element('span','admission-fill joint-fill'); joint.style.width=`${item.joint/max*100}%`; track.append(joint); }
      barRow.append(element('span','admission-bar-label',item.label),track,element('strong','admission-bar-value',item.joint?`${item.ordinary}＋${item.joint}`:String(item.ordinary))); chart.append(barRow);
    });
    chart.append(element('p','admission-chart-note','蓝色：电气 · 紫色：控制 · 青色：中澳联合培养；人数来自 2027 年官方拟招生目录。'));
    const verification=$('#admissions-verification');
    verification.replaceChildren(element('strong','','官网来源 · 人工核对后发布'),element('p','',`目录发布：${data.sourcePublishedAt}　最近核对：${data.verifiedAt}`),element('p','','由机构核对官网后手动更新。当前展示为已核对版本。'));
    verification.append(externalLink('查看官方目录 ↗',safeURL(data.source),'text-link'));
  }
  function publishedUpdates(type) {
    if(type==='promotions')return [...(content.promotions || [])].sort((a,b)=>Number(!!b.featured)-Number(!!a.featured));
    return [...(type==='news' ? content.news || [] : content.promotions || [])]
      .filter(item=>/^\d{4}-\d{2}-\d{2}$/.test(item.date) && item.date <= new Date().toLocaleDateString('en-CA',{timeZone:'Asia/Shanghai'}))
      .sort((a,b)=>Number(!!b.pinned)-Number(!!a.pinned) || b.date.localeCompare(a.date));
  }
  function updateButton(item, compact=false) {
    const button=element('button',compact?'update-list-item':'update-card'); button.type='button'; button.dataset.updateId=item.id;
    const meta=element('span','update-meta');
    meta.append(element('span','',item.pinned?'置顶 · '+item.category:item.category));
    if(item.sourceLabel){const date=element('time','',item.date);date.dateTime=item.date;meta.append(date);}
    button.append(meta,element('strong','',item.title));
    if(!compact) button.append(element('p','',item.summary));
    button.append(element('span','update-read','展开阅读 ›')); return button;
  }
  function renderUpdates() {
    const news=publishedUpdates('news'),promotions=publishedUpdates('promotions');
    $('#home-news-list').replaceChildren(...news.slice(0,3).map(item=>updateButton(item,true)));
    const featured=promotions.find(item=>item.featured) || promotions[0];
    $('#home-promotion').replaceChildren(...(featured?[updateButton(featured)]:[element('p','empty-state','机构动态待更新。')]));
    const banner=$('#home-promotion-banner'); banner.replaceChildren();
    if(featured){const text=element('div','promo-banner-copy');if(featured.images?.length && safePromotionImage(typeof featured.images[0]==='string'?featured.images[0]:featured.images[0].src)){const source=featured.images[0],image=element('img','promo-banner-image');image.src=typeof source==='string'?source:source.src;image.alt=source.alt || '宣传图片';image.width=90;image.height=90;banner.append(image);}text.append(element('span','','BUFF 每日宣传'),element('strong','',featured.title));const action=element('button','button outline','展开查看 ›');action.type='button';action.dataset.updateId=featured.id;banner.append(text,action);}
    $('#news-list').replaceChildren(...news.map(item=>updateButton(item)));
    $('#promotion-list').replaceChildren(...promotions.map(item=>updateButton(item)));
    if(!news.length) $('#news-list').append(element('p','empty-state','暂未发布院校消息。'));
  }
  function renderExperiences() {
    const grid=$('#experience-grid'); grid.replaceChildren();
    (content.experiences || []).forEach(item=> {
      const card=element('article','experience-card');
      const preview=assetLink('',item.url,'experience-preview'); preview.setAttribute('aria-label',`阅读${item.title}`);
      const image=element('img'); image.src=safeAsset(item.cover); image.alt=`${item.title}首页`; image.width=420; image.height=594; image.loading='lazy'; preview.append(image);
      const info=element('div','experience-info');
      info.append(element('p','update-meta',`${item.year} 届 · ${item.pages} 页 · ${item.size}`),element('h3','',item.title),element('p','',item.description));
      const actions=element('div','update-actions');const download=assetLink('下载 PDF ↓',item.url,'text-link'); download.download=item.url.split('/').pop();
      actions.append(assetLink('在线阅读 ›',item.url,'text-link'),download);info.append(actions);card.append(preview,info);grid.append(card);
    });
  }
  function renderUpdateDetail(id) {
    const isNews=(content.news || []).some(item=>item.id===id);
    const item=publishedUpdates(isNews?'news':'promotions').find(item=>item.id===id);
    if(!item) { moduleContent.append(element('p','empty-state','这条消息尚未发布。')); return; }
    $('#module-title').textContent=isNews?'院校消息':'BUFF 每日宣传';
    const article=element('article','update-detail container');
    const meta=element('p','update-meta',`${item.category}${isNews?' · '+item.date+' · '+item.sourceLabel:' · BUFF 团队'}`);
    article.append(meta,element('h2','',item.title),element('p','update-summary',item.summary));
    (item.body || []).forEach(text=>article.append(element('p','update-paragraph',text)));
    if(item.images?.length){const gallery=element('div','promotion-image-gallery');item.images.forEach((source,index)=>{const path=typeof source==='string'?source:source.src;if(!safePromotionImage(path))return;const image=element('img');image.src=safePromotionImage(path);image.alt=source.alt || `宣传图片 ${index+1}`;image.loading=index?'lazy':'eager';image.decoding='async';gallery.append(image);});article.append(gallery);}
    const actions=element('div','update-actions');
    if(item.module) { const button=element('button','button primary',item.actionLabel || '进一步了解'); button.type='button'; button.dataset.moduleOpen=item.module; actions.append(button); }
    if(safeURL(item.url)) actions.append(externalLink('查看官网原公告 ↗',safeURL(item.url),'button outline'));
    article.append(actions);
    if(isNews) article.append(element('p','section-note',`本站核对：${item.reviewedAt}。公告日期按来源保留，重要报考事项以官方原公告及后续调整为准。`));
    moduleContent.append(article);
  }
  const moduleDialog = $('#module-dialog');
  const moduleContent = $('#module-content');
  const moduleScroll = $('#module-scroll');
  const modules = {
    electrical: { title:'电气考研', subtitle:'806 · 经典自控＋直流调速', sections:['preparation','courses'], subject:'electrical', filter:'initial' },
    control: { title:'控制考研', subtitle:'830 · 经典自控＋现代控制＋直流拖动控制系统', sections:['preparation','courses'], subject:'control', filter:'initial' },
    initial: { title:'初试备考', subtitle:'科目区别、课程与配套资料', sections:['initial-study','courses'], subject:'all', filter:'initial' },
    reexam: { title:'复试准备', subtitle:'专业课、英语表达、综合面试与复试资料，单独更新', sections:['reexamination','courses'], subject:'all', filter:'reexam' },
    courses: { title:'课程与服务', subtitle:'按方向与备考阶段选择课程', sections:['courses'], subject:'all', filter:'all' },
    materials: { title:'课程资料', subtitle:'初试与复试资料分区查看', sections:['materials'] },
    daily: { title:'每日一题', subtitle:'公开看题，前往平台查看讲解', sections:['daily-question'] },
    'daily-explanations': { title:'每日一题 · 题目讲解', subtitle:'每道题对应自己的 B 站或抖音视频', sections:['daily-explanations'] },
    videos: { title:'公开课与备考分享', subtitle:'试听、解题思路与备考经验', sections:['videos'] },
    about: { title:'关于 BUFF', subtitle:'电气与控制考研，两条专业路线', sections:['about'] },
    contact: { title:'联系咨询', subtitle:'桑桑哥与燕山大学考研交流群', sections:['contact'] },
    'control-demo': { title:'自动控制原理可视化', subtitle:'经典负反馈系统、阶跃响应与根轨迹', sections:['control-demo'] },
    'source-analysis': { title:'生源分析', subtitle:'2027 届机构学员样本 · 仅展示学校层次与跨考匿名汇总', sections:['source-analysis'] },
    employment: { title:'就业去向', subtitle:'研究生行业、单位、地区与继续深造', sections:['employment'] },
    textbooks: { title:'参考教材与考试范围', subtitle:'2027 · 两方向共同参考书与控制方向的现代控制增量', sections:['textbooks'] },
    admissions: { title:'2027 年招生计划', subtitle:'电气与控制四类专业，普通培养与联合培养分列', sections:['admissions'] },
    'admission-history': {title:'历年录取情况',subtitle:'2022—2025 · 电气工程 · 与 2027 拟招生计划分开展示',sections:['admission-history']},
    experiences: {title:'上岸经验',subtitle:'2026 届经验分享 · 在线阅读与下载',sections:['experiences']},
    news: { title:'院校消息', subtitle:'来自官网 · 保留原公告日期 · 核对后发布', sections:['news-center'] },
    promotions: { title:'BUFF 每日宣传', subtitle:'机构发布的课程、资料、公开课与备考活动', sections:['promotion-center'] },
    'update-detail': { title:'消息详情', subtitle:'展开查看，关闭后留在原位', sections:[] },
    course: { title:'课程详情',subtitle:'班型、课程内容与配套服务',sections:['course-detail-content'] },
    poster: {title:'课程海报',subtitle:'完整预览与放大阅读',sections:['poster-toolbar-content','poster-viewer-content']},
    pdf: { title:'课程 PDF 说明', subtitle:'在线预览与下载', sections:[] }
  };
  const moduleRoutes = { preparation:'electrical', 'initial-study':'initial', reexamination:'reexam', courses:'courses', materials:'materials', 'reexam-materials':'materials', 'daily-question':'daily', 'daily-explanations':'daily-explanations', videos:'videos', about:'about', contact:'contact', 'control-demo':'control-demo', 'source-analysis':'source-analysis', employment:'employment', textbooks:'textbooks', admissions:'admissions', 'news-center':'news', 'promotion-center':'promotions', 'admission-history':'admission-history', experiences:'experiences' };
  let mountedSections = [];
  let currentPageOptions = {};
  let currentModule = null;
  let currentPDFPath = null;
  let currentReaderObserver = null;
  let currentUpdateID = null;
  let homeScroll = 0;
  function restoreSections() {
    mountedSections.forEach(({node,placeholder}) => placeholder.replaceWith(node)); mountedSections = [];
  }
  function setCourseFilter(value) {
    selectedFilter = value;
    $$('[data-filter]').forEach(button => { const active = button.dataset.filter === value; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    renderCourses();
  }
  function openModule(key, options = {}) {
    const config = modules[key]; if (!config) return;
    closeMenu();
    if (!currentModule) homeScroll=window.scrollY;
    if (!options.fromHistory) {
      history.replaceState({...history.state,buffPage:true,key:currentModule,options:currentPageOptions,scroll:window.scrollY},'',location.href);
      const state={buffPage:true,key,options:{...options},scroll:0,depth:(history.state?.depth || 0)+(options.replace?0:1)};
      if(options.replace)history.replaceState(state,'',pageURL(key,options));else history.pushState(state,'',pageURL(key,options));
    }
    posterRequest++;
    currentReaderObserver?.disconnect(); currentReaderObserver=null;
    restoreSections(); moduleContent.replaceChildren();
    window.BUFF_RENDER_PAGE_NAV?.(key);
    currentModule = key; currentPageOptions={...options}; delete currentPageOptions.fromHistory; moduleDialog.dataset.module = key;
    currentPDFPath = key === 'pdf' ? safeAsset(options.pdfPath) : null;
    currentUpdateID = key === 'update-detail' ? options.updateID : null;
    $('#module-title').textContent = config.title; $('#module-subtitle').textContent = config.subtitle;
    $('#module-subject-switch').hidden = key !== 'courses';
    if (config.subject || options.subject) selectSubject(options.subject || config.subject);
    if (config.filter || options.filter) setCourseFilter(options.filter || config.filter);
    if (key === 'materials') setMaterialStage(options.stage || 'initial');
    if(key==='course'){const course=content.courses.find(item=>item.id===options.courseID);if(course){if(course.subject!=='all')selectSubject(course.subject);renderCourseDetails(course);}}
    config.sections.forEach(id => {
      const node = document.getElementById(id); if (!node) return;
      const placeholder = element('div','module-placeholder'); placeholder.setAttribute('aria-hidden','true');
      const hidden = node.closest('#module-store');
      if (hidden) placeholder.hidden = true; else placeholder.style.height = `${node.getBoundingClientRect().height}px`;
      node.before(placeholder); moduleContent.append(node); mountedSections.push({node,placeholder});
      node.querySelectorAll('.will-reveal').forEach(item => item.classList.add('is-visible'));
    });
    if(key==='update-detail') renderUpdateDetail(currentUpdateID);
    if(key==='poster'){const index=content.posters.findIndex(item=>item.id===options.posterID);setPoster(index<0?0:index);$('#module-title').textContent=content.posters[selectedPosterIndex].title;}
    if (key === 'pdf' && currentPDFPath) {
      const info=[...(content.documents || []),...(content.experiences || [])].find(item=>item.url===currentPDFPath);
      if(info) $('#module-title').textContent=info.title;
      const viewer=element('div','module-pdf-viewer');
      const download=assetLink('下载这份 PDF ↓',currentPDFPath,'text-link'); download.setAttribute('download',currentPDFPath.split('/').pop());
      if(info?.pageImages?.length) {
        viewer.classList.add('experience-reader');
        const toolbar=element('div','reader-toolbar');
        const label=element('label','','页码 '),pages=element('select');pages.setAttribute('aria-label','选择阅读页码');
        info.pageImages.forEach((_,index)=>{const option=element('option','',`${index+1} / ${info.pages}`);option.value=index;pages.append(option);});label.append(pages);
        const zoom=element('button','reader-zoom','放大阅读');zoom.type='button';zoom.setAttribute('aria-pressed','false');
        zoom.addEventListener('click',()=>{const active=viewer.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(active));zoom.textContent=active?'适合宽度':'放大阅读';});
        toolbar.append(label,zoom,download);const pageList=element('div','experience-pages'),figures=[];
        info.pageImages.forEach((src,index)=>{
          if(!safeAsset(src))return;const figure=element('figure','experience-page');
          const status=element('span','reader-page-status','正在加载页面…');
          const image=element('img');image.src=src;image.alt=`${info.title} · 第 ${index+1} 页`;image.width=1600;image.height=2263;image.loading=index?'lazy':'eager';image.decoding='async';if(!index)image.fetchPriority='high';
          const retry=element('button','reader-page-retry','此页暂未加载，点击重试');retry.type='button';retry.hidden=true;
          image.addEventListener('error',()=>{retry.hidden=false;status.hidden=true;});image.addEventListener('load',()=>{retry.hidden=true;status.hidden=true;});
          retry.addEventListener('click',()=>{image.src=src+'?retry='+Date.now();});
          figure.append(image,status,retry,element('figcaption','',`${index+1} / ${info.pages} · 原文页码 ${info.sourcePages?.[index] || index+1}`));pageList.append(figure);figures.push(figure);
        });
        pages.addEventListener('change',()=>figures[Number(pages.value)]?.scrollIntoView({block:'start',behavior:'instant'}));
        if('IntersectionObserver' in window){currentReaderObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)pages.value=String(figures.indexOf(entry.target));});},{rootMargin:'-170px 0px -55% 0px',threshold:0});figures.forEach(figure=>currentReaderObserver.observe(figure));}
        viewer.append(toolbar,element('p','reader-note','公开阅读版保留备考正文，聊天截图不公开。原文为中文。'),pageList);
      } else {
        const frame=element('iframe'); frame.src=currentPDFPath; frame.title=info?.title || '课程 PDF 说明';
        const actions=element('div','module-pdf-actions');actions.append(element('span','','若浏览器不支持内嵌预览，可下载查看。'),download);viewer.append(frame,actions);
      }
      moduleContent.append(viewer);
    }
    $('#module-back').hidden=false;
    $('#main').hidden=true; moduleDialog.after($('.site-footer')); $('.site-footer').hidden=false; moduleDialog.hidden=false; document.body.classList.add('content-page-open');
    window.scrollTo({top:options.scroll || 0,left:0,behavior:'instant'});
    $('#module-title').tabIndex=-1; $('#module-title').focus({preventScroll:true});
    window.requestAnimationFrame(()=>window.scrollTo({top:options.scroll || 0,left:0,behavior:'instant'}));
  }
  function pageURL(key,options={}) {
    let route=key;
    if(key==='course')route='course/'+options.courseID;
    if(key==='poster')route='posters/'+options.posterID;
    if(key==='update-detail')route='updates/'+options.updateID;
    if(key==='pdf')route='read/'+(options.pdfPath || '').split('/').pop().replace(/\.pdf$/,'');
    if(key==='materials' && options.stage==='reexam')route='reexam-materials';
    return location.pathname+location.search+'#/'+route;
  }
  function parsePageHash() {
    const route=decodeURIComponent(location.hash.replace(/^#\/?/,'')),parts=route.split('/');
    if(parts[0]==='course'&&content.courses.some(item=>item.id===parts[1]))return{key:'course',options:{courseID:parts[1]}};
    if(parts[0]==='posters'&&content.posters.some(item=>item.id===parts[1]))return{key:'poster',options:{posterID:parts[1]}};
    if(parts[0]==='updates')return{key:'update-detail',options:{updateID:parts[1]}};
    if(parts[0]==='read'){const doc=[...content.documents,...(content.experiences || [])].find(item=>item.url.split('/').pop()===parts[1]+'.pdf');if(doc)return{key:'pdf',options:{pdfPath:doc.url}};}
    if(route==='reexam-materials')return{key:'materials',options:{stage:'reexam'}};
    const key=modules[route]?route:moduleRoutes[route];return key?{key,options:{}}:null;
  }
  function showHome(options={}) {
    currentReaderObserver?.disconnect();currentReaderObserver=null;
    if(!options.fromHistory){history.replaceState({...history.state,buffPage:true,key:currentModule,options:currentPageOptions,scroll:window.scrollY},'',location.href);history.pushState({buffPage:true,key:null,depth:(history.state?.depth || 0)+1,scroll:homeScroll},'',location.pathname+location.search);}
    posterRequest++; restoreSections(); moduleContent.replaceChildren(); closeMenu(); currentModule=null;currentPageOptions={};currentPDFPath=null;currentUpdateID=null;
    moduleDialog.hidden=true;$('#main').hidden=false;$('.site-footer').hidden=false;document.body.classList.remove('content-page-open');
    window.scrollTo({top:options.scroll ?? homeScroll,left:0,behavior:'instant'});window.requestAnimationFrame(()=>window.scrollTo({top:options.scroll ?? homeScroll,left:0,behavior:'instant'}));
  }
  $('.module-close').addEventListener('click',()=>showHome());
  $('#module-back').addEventListener('click',()=>{if(history.state?.depth>0)history.back();else showHome();});
  function restoreURL(event) {
    const parsed=parsePageHash(),state=history.state;
    if(parsed){
      if(event.type==='hashchange' && currentModule===parsed.key && pageURL(currentModule,currentPageOptions)===pageURL(parsed.key,parsed.options))return;
      const matches=state?.buffPage && state.key===parsed.key && pageURL(state.key,state.options || {})===pageURL(parsed.key,parsed.options);
      openModule(parsed.key,{...parsed.options,scroll:matches?state.scroll:0,fromHistory:true});
    } else showHome({fromHistory:true,scroll:state?.key===null?state.scroll || 0:0});
  }
  window.addEventListener('popstate',restoreURL);
  window.addEventListener('hashchange',restoreURL);
  if('ResizeObserver' in window)new ResizeObserver(entries=>{document.documentElement.style.setProperty('--page-bar-height',entries[0].target.getBoundingClientRect().height+'px');}).observe($('.module-window-header'));
  $$('[data-route-subject]').forEach(button => button.addEventListener('click', () => selectSubject(button.dataset.routeSubject)));
  document.addEventListener('click', event => {
    if(event.target.closest('[data-scroll-top]')){window.scrollTo({top:0,behavior:'smooth'});return;}
    const update=event.target.closest('[data-update-id]');
    if(update) { event.preventDefault(); openModule('update-detail',{updateID:update.dataset.updateId}); return; }
    const pdfLink=event.target.closest('a[data-pdf-view]:not([download])');
    if(pdfLink) { event.preventDefault(); openModule('pdf',{pdfPath:pdfLink.dataset.pdfView}); return; }
    const anchor = event.target.closest('a[href^="#"]');
    const trigger = event.target.closest('[data-module-open]');
    let key, stage, subject;
    if (anchor) {
      const route = anchor.getAttribute('href').slice(1);
      if((route==='main'||!route) && currentModule){event.preventDefault();showHome();return;}
      key = moduleRoutes[route]; subject = anchor.dataset.selectSubject;
      if (subject && (route === 'preparation' || route === 'courses')) key = subject;
      stage = route === 'reexam-materials' ? 'reexam' : anchor.dataset.stage;
    } else if (trigger) { key = trigger.dataset.moduleOpen; stage = trigger.dataset.stage; subject = trigger.dataset.subject; }
    if (!key) return;
    event.preventDefault(); openModule(key,{stage,subject});
  });

  function renderDaily() {
    const questions = [...(content.dailyQuestions || [])].sort((a,b) => String(b.date).localeCompare(String(a.date)));
    const lectures=$('#daily-explanations-grid'); lectures.replaceChildren();
    questions.forEach(question => {
      const card=element('article','daily-lecture-card');
      card.append(element('p','update-meta',`${question.date || ''} · ${question.subject || '每日一题'}`),element('h3','',question.title));
      const actions=element('div','update-actions'); let links=0;
      for(const [key,name] of [['bilibili','B 站看本题讲解 ↗'],['douyin','抖音看本题讲解 ↗']]) {
        const url=safeURL(question[key]); if(url) { actions.append(externalLink(name,url,'button outline')); links++; }
      }
      if(!links) card.append(element('p','updates-explainer','本题讲解视频待更新。'));
      const view=element('button','text-link','查看这道题 ›'); view.type='button'; view.addEventListener('click',()=>{openModule('daily');show(question);});
      card.append(actions,view); lectures.append(card);
    });
    if(!questions.length) lectures.append(element('div','empty-state','每日一题讲解待更新，视频将按题目逐条发布。'));
    if (!questions.length) return;
    const target = $('#daily-content');
    function show(question) {
      const body = element('div','daily-question-body');
      body.append(element('span','daily-tag', `${question.date || ''} · ${question.subject || '每日一题'}`),element('h3','',question.title));
      if (question.question) body.append(element('p','',question.question));
      if (safeAsset(question.image)) { const image=element('img'); image.src=question.image; image.alt=question.title; body.append(image); }
      if (question.knowledgePoint) body.append(element('p','daily-knowledge',`知识点：${question.knowledgePoint}`));
      if (questions.length > 1) {
        const label=element('label','daily-archive','查看往期题目'); const select=element('select'); select.setAttribute('aria-label','选择每日一题');
        questions.forEach(item=> { const option=element('option','',`${item.date} · ${item.title}`); option.value=item.id; option.selected=item.id===question.id; select.append(option); });
        select.addEventListener('change',()=>show(questions.find(item=>item.id===select.value))); label.append(select); body.append(label);
      }
      const answer=element('div','daily-answer-panel'); answer.append(element('span','','题目与解析，同一个视频。'),element('h3','','跟着这期视频，一起想明白。'));
      let links=0;
      for(const [key,name] of [['bilibili','B 站看本期题目与解析 ↗'],['douyin','抖音看本期题目与解析 ↗']]) { const url=safeURL(question[key]); if(url) { answer.append(externalLink(name,url,'text-link')); links++; } }
      if(!links) answer.append(element('p','','本题视频讲解待更新。'));
      const profiles=element('div','profile-links'); fillProfileLinks(profiles); answer.append(profiles);
      target.replaceChildren(body,answer);
    }
    show(questions[0]);
  }
  selectSubject(selectedSubject); renderDocuments(); renderPosters(); renderContact(); renderDaily(); renderTextbooks(); renderAdmissions(); renderUpdates(); renderExperiences();
  fetch('assets/data/daily-promotion.txt',{cache:'no-cache'}).then(response=>{if(!response.ok)throw new Error('Promotion unavailable');return response.text();}).then(text=>{
    const lines=text.trim().split(/\r?\n/),title=lines.shift()?.trim();if(!title)return;
    const body=lines.join('\n').trim().split(/\n\s*\n/).map(part=>part.trim()).filter(Boolean);
    content.promotions.forEach(item=>item.featured=false);
    content.promotions.unshift({id:'daily-pasted',category:'机构宣传',title,summary:body[0] || '',body:body.slice(1),module:'contact',actionLabel:'联系咨询',featured:true,images:window.BUFF_PROMOTION_IMAGES || []});
    renderUpdates();if(currentModule==='update-detail'&&currentUpdateID==='daily-pasted'){moduleContent.replaceChildren();renderUpdateDetail(currentUpdateID);}
  }).catch(()=>{});
  fetch('assets/data/daily-promotion-images.json',{cache:'no-cache'}).then(response=>response.ok?response.json():[]).then(images=>{
    if(!Array.isArray(images))return;images=images.filter(image=>safePromotionImage(typeof image==='string'?image:image?.src));const latest=content.promotions.find(item=>item.id==='daily-pasted');if(latest)latest.images=images;
    window.BUFF_PROMOTION_IMAGES=images;
    renderUpdates();
    if(currentModule==='update-detail'&&currentUpdateID==='daily-pasted'){moduleContent.replaceChildren();renderUpdateDetail(currentUpdateID);}
  }).catch(()=>{});
  $$('[data-profile-links]').forEach(fillProfileLinks);
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold:.08 });
    $$('.showcase-card,.section-top').forEach(node => { node.classList.add('will-reveal'); observer.observe(node); });
  }
  $('#copyright-year').textContent = String(new Date().getFullYear());
  const initialPage=parsePageHash();
  history.replaceState({buffPage:true,key:null,depth:0,scroll:0},'',location.href);
  if(initialPage)openModule(initialPage.key,{...initialPage.options,replace:true});
})();
