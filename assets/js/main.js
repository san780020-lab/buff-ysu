(() => {
  'use strict';
  const content = window.BUFF_CONTENT;
  if (!content) return;
  let selectedSubject = 'electrical';
  let selectedFilter = 'all';
  let selectedPosterFilter = 'all';
  let selectedPosterIndex = 0;
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
    return /^assets\/(?:posters|documents|images)\/[a-z0-9-]+\.(?:webp|pdf|png|jpe?g)$/i.test(value || '') ? value : '';
  }
  function assetLink(text, path, className) {
    const link = externalLink(text, safeAsset(path), className);
    return link;
  }
  function renderCourses() {
    const grid = $('#course-grid');
    grid.replaceChildren();
    const visible = content.courses.filter(course => (selectedFilter === 'all' || course.stage === selectedFilter) && (!course.subject || course.subject === 'all' || course.subject === selectedSubject));
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
    content.videos.filter(video => !video.subject || video.subject === 'all' || video.subject === selectedSubject).forEach((video, index) => {
      const card = element('article', 'video-card');
      const url = safeURL(video.url);
      const thumbnail = element('div', `video-thumbnail video-theme-${index % 3}`);
      const preview = element('div', 'video-preview-lines'); preview.setAttribute('aria-hidden', 'true');
      const play = element('span', 'video-play', '▶'); play.setAttribute('aria-hidden', 'true');
      thumbnail.append(preview, element('span', 'video-category', video.category), play, element('span', 'video-status', url ? '观看视频 ↗' : '视频待上线'));
      if (url) { const link = externalLink('', url, 'video-thumbnail-link'); link.setAttribute('aria-label', `观看${video.title}（在新标签页打开）`); link.append(thumbnail); card.append(link); }
      else card.append(thumbnail);
      const meta = element('div', 'video-meta'); meta.append(element('span', `platform-label ${video.platform}`, video.platform === 'douyin' ? '抖音' : 'BILIBILI'), element('span', '', video.category));
      card.append(meta, element('h3', '', video.title), element('p', '', video.description || ''));
      grid.append(card);
    });
    if (!grid.children.length) grid.append(element('p', 'empty-state', '该方向的公开视频待更新。'));
  }
  function selectSubject(subject) {
    if (!content.subjects[subject]) return;
    selectedSubject = subject;
    $$('[data-subject]').forEach(tab => { const active = tab.dataset.subject === subject; tab.setAttribute('aria-selected', String(active)); tab.tabIndex = active ? 0 : -1; });
    const data = content.subjects[subject];
    $('#subject-tag').textContent = data.tag; $('#subject-name').textContent = data.title; $('#subject-description').textContent = data.description;
    $('#subject-panel').setAttribute('aria-labelledby', `tab-${subject}`);
    renderCourses(); renderVideos();
  }
  const dialog = $('#course-dialog');
  function openCourse(course) {
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
    dialog.showModal();
  }
  $('.dialog-close').addEventListener('click', () => dialog.close());
  $('.dialog-contact').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
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
    (content.documents || []).forEach(document => {
      if (!safeAsset(document.url)) return;
      const card = element('article', 'document-card');
      const body = element('div', 'document-card-body');
      body.append(element('span', 'document-label', `PDF · 公开摘页 · ${document.pages} 页`), element('h3', '', document.title), element('p', '', document.description), element('small', 'document-source', `${document.sourcePages} · ${document.size}`));
      const actions = element('div', 'document-actions');
      const download = assetLink('下载 PDF ↓', document.url, 'text-link'); download.setAttribute('download', document.url.split('/').pop());
      actions.append(assetLink('在线查看 ↗', document.url, 'text-link'), download);
      card.append(body, actions); grid.append(card);
    });
  }
  function renderPosters() {
    const grid = $('#poster-grid'); grid.replaceChildren();
    const posters = (content.posters || []).filter(poster => selectedPosterFilter === 'all' || poster.group === selectedPosterFilter);
    posters.forEach(poster => {
      if (!safeAsset(poster.image) || !safeAsset(poster.thumb)) return;
      const card = element('article', 'poster-card');
      const button = element('button', 'poster-preview'); button.type = 'button'; button.setAttribute('aria-label', `放大查看${poster.title}`);
      const image = element('img'); image.src = poster.thumb; image.alt = poster.title; image.width = poster.width; image.height = poster.height; image.loading = 'lazy'; image.decoding = 'async';
      button.append(image, element('span', 'poster-expand', '放大查看 ↗')); button.addEventListener('click', () => openPoster(poster.id));
      card.append(button, element('h4', '', poster.title), element('p', '', poster.description)); grid.append(card);
    });
    $('#poster-count').textContent = `共 ${posters.length} 张`;
  }
  const posterDialog = $('#poster-dialog');
  function setPoster(index) {
    const total = content.posters.length; selectedPosterIndex = (index + total) % total;
    const poster = content.posters[selectedPosterIndex];
    $('#poster-dialog-title').textContent = poster.title;
    $('#poster-position').textContent = `${selectedPosterIndex + 1} / ${total} · 课程海报`;
    const image = $('#poster-full-image'); image.src = safeAsset(poster.image); image.alt = `${poster.title}：${poster.description}`; image.width = poster.width; image.height = poster.height;
    $('#poster-original').href = safeAsset(poster.image);
    $('.poster-viewer').classList.remove('is-zoomed');
    $('.poster-viewer').scrollTop = 0; $('.poster-viewer').scrollLeft = 0;
    $('#poster-zoom').setAttribute('aria-pressed', 'false'); $('#poster-zoom').textContent = '放大阅读';
  }
  function openPoster(id) {
    const index = (content.posters || []).findIndex(poster => poster.id === id);
    if (index < 0) return;
    setPoster(index); posterDialog.showModal();
  }
  $('#poster-prev').addEventListener('click', () => setPoster(selectedPosterIndex - 1));
  $('#poster-next').addEventListener('click', () => setPoster(selectedPosterIndex + 1));
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
  posterDialog.addEventListener('click', event => {
    if (event.target !== posterDialog) return;
    const rect = posterDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) posterDialog.close();
  });
  $$('[data-poster-filter]').forEach(button => button.addEventListener('click', () => {
    selectedPosterFilter = button.dataset.posterFilter;
    $$('[data-poster-filter]').forEach(item => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    renderPosters();
  }));
  const menuButton = $('.menu-toggle');
  const navGroups = $$('[data-nav-group]');
  const desktopNav = window.matchMedia('(min-width: 901px)');
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
    if (desktopNav.matches) { document.body.classList.add('nav-open'); $('.site-header').classList.add('menu-active'); }
  }
  function closeMenu() {
    closeMega(); menuButton.setAttribute('aria-expanded', 'false'); $('.main-nav').classList.remove('is-open');
    menuButton.setAttribute('aria-label', '打开导航'); document.body.classList.remove('mobile-nav-open');
  }
  navGroups.forEach(group => {
    group.addEventListener('pointerenter', event => { if (desktopNav.matches && event.pointerType !== 'touch') openMega(group); });
    group.addEventListener('pointerleave', () => { if (desktopNav.matches) navCloseTimer = window.setTimeout(closeMega, 160); });
    group.addEventListener('focusin', () => { if (desktopNav.matches) openMega(group); });
    group.addEventListener('focusout', event => { if (!group.contains(event.relatedTarget)) navCloseTimer = window.setTimeout(closeMega, 100); });
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
  $$('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

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
  function renderDaily() {
    const questions = [...(content.dailyQuestions || [])].sort((a,b) => String(b.date).localeCompare(String(a.date)));
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
      const answer=element('div','daily-answer-panel'); answer.append(element('span','','跟着讲解，再想深一层。'),element('h3','','看题，也看思路。'));
      let links=0;
      for(const [key,name] of [['bilibili','前往 B 站看讲解 ↗'],['douyin','前往抖音看讲解 ↗']]) { const url=safeURL(question[key]); if(url) { answer.append(externalLink(name,url,'text-link')); links++; } }
      if(!links) answer.append(element('p','','本题视频讲解待更新。'));
      target.replaceChildren(body,answer);
    }
    show(questions[0]);
  }
  selectSubject(selectedSubject); renderDocuments(); renderPosters(); renderContact(); renderDaily();
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold:.08 });
    $$('.showcase-card,.section-top').forEach(node => { node.classList.add('will-reveal'); observer.observe(node); });
  }
  $('#copyright-year').textContent = String(new Date().getFullYear());
})();
