/* Conservative text-to-draft suggestions. No network, execution, or auto-publication. */
(() => {
  'use strict';
  function suggest(text,record){
    const raw=String(text||'').replace(/\r/g,'').trim();
    if(!raw||raw.length>120000)throw new Error('识别文字为空或过长，请先整理文字。');
    if(/github_pat_|gh[pousr]_[A-Za-z0-9]{20}/.test(raw))throw new Error('内容疑似包含访问令牌，不能填入网站。');
    // Old supplied posters contain a contact explicitly removed by the owner.
    const excluded=raw.split('\n').filter(line=>/1940908921|韦恩学长.*(?:QQ|联系)|(?:QQ|联系).*韦恩学长/i.test(line));
    const clean=raw.split('\n').filter(line=>!excluded.includes(line)).join('\n').trim();
    const lines=clean.split('\n').map(line=>line.trim()).filter(Boolean);
    const first=lines.find(line=>line.length>=4&&!/^第?\s*\d+\s*[页/]?$/.test(line))||lines[0]||'';
    const fields={};
    if(Object.hasOwn(record,'title'))fields.title=first.slice(0,100);
    if(Object.hasOwn(record,'body'))fields.body=clean.split(/\n\s*\n/).map(s=>s.trim()).filter(Boolean);
    else if(Object.hasOwn(record,'description'))fields.description=clean.slice(0,6000);
    else if(Object.hasOwn(record,'question'))fields.question=clean;
    else if(Object.hasOwn(record,'intro'))fields.intro=clean.slice(0,6000);
    if(Object.hasOwn(record,'priceLabel')){const prices=[...clean.matchAll(/(?:[¥￥]\s*\d{2,5}(?:\.\d{1,2})?|\d{2,5}(?:\.\d{1,2})?\s*元)/g)].map(match=>match[0]);if(prices.length)fields.priceLabel=[...new Set(prices)].slice(0,10).join(' / ');}
    for(const key of ['bilibili','douyin','url']){
      if(!Object.hasOwn(record,key))continue;
      const urls=clean.match(/https:\/\/[^\s<>，。；）\]]+/g)||[];
      const url=urls.find(value=>key==='bilibili'?/^https:\/\/(?:www\.)?(?:bilibili\.com|b23\.tv)\//.test(value):key==='douyin'?/^https:\/\/(?:www\.|v\.)?douyin\.com\//.test(value):true);
      if(url)fields[key]=url;
    }
    return {fields,excluded:excluded.length};
  }
  window.BUFF_IMPORT={suggest};
})();
