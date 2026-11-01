(() => {
  'use strict';
  const content = window.BUFF_CONTENT;
  if (!content) return;
  let selectedSubject = 'electrical';
  let selectedFilter = 'all';
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
      course.topics.forEach(topic => list.append(element('li', '', topic)));
      const bottom = element('div', 'course-bottom');
      const button = element('button', 'text-link', '查看课程规划 →');
      button.type = 'button'; button.setAttribute('aria-label', `查看${course.title}课程规划`);
      button.addEventListener('click', () => openCourse(course));
      bottom.append(element('span', 'planning-label', '规划中'), button);
      card.append(top, title, description, list, bottom); grid.append(card);
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
  const menuButton = $('.menu-toggle');
  function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); $('.main-nav').classList.remove('is-open'); menuButton.setAttribute('aria-label', '打开导航'); }
  menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? '关闭导航' : '打开导航'); $('.main-nav').classList.toggle('is-open', open); });
  $$('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  function renderContact() {
    const contact = content.contact;
    const target = $('#contact-content');
    const nodes = [];
    if (contact.wechat) nodes.push(element('p', 'contact-detail', `微信：${contact.wechat}`));
    if (contact.qqGroup) nodes.push(element('p', 'contact-detail', `QQ群：${contact.qqGroup}`));
    if (contact.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) { const email = element('a', 'contact-detail', `邮箱：${contact.email}`); email.href = `mailto:${contact.email}`; nodes.push(email); }
    for (const [key, label] of [['bilibili', '前往 B 站主页 ↗'], ['douyin', '前往抖音主页 ↗']]) { const url = safeURL(contact[key]); if (url) nodes.push(externalLink(label, url, 'contact-platform')); }
    if (contact.qrImage && /^(?:\.\/)?assets\/images\/[\w./-]+\.(?:png|jpe?g|webp)$/i.test(contact.qrImage) && !contact.qrImage.includes('..')) { const img = element('img', 'contact-qr'); img.src = contact.qrImage; img.alt = 'BUFF 机构咨询二维码'; img.width = 128; img.height = 128; nodes.push(img); }
    if (nodes.length) target.replaceChildren(...nodes);
  }
  selectSubject(selectedSubject); renderContact();
  $('#copyright-year').textContent = String(new Date().getFullYear());
})();
