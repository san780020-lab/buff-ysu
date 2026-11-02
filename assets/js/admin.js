(async () => {
  'use strict';
  const OWNER='san780020-lab',REPO='buff-ysu',BRANCH='main',ROOT=`/repos/${OWNER}/${REPO}`,DATA='assets/data/managed-content.json';
  const $=selector=>document.querySelector(selector),clone=value=>structuredClone(value),node=(tag,text,className)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;};
  const labels={id:'条目标识（英文短横线）',title:'标题',description:'说明',summary:'摘要',body:'正文（空行分段）',intro:'导语',sections:'内容章节',paragraphs:'段落（空行分段）',year:'年份',date:'发布日期',reviewedAt:'核对日期',sourcePublishedAt:'官网发布日期',verifiedAt:'核对日期',category:'分类',stage:'备考阶段',subject:'方向',stageLabel:'阶段说明',number:'展示编号',subtitle:'副标题',audience:'适合人群',priceLabel:'价格展示',status:'状态',previewTopics:'卡片要点（一行一条）',topics:'课程内容（一行一条）',materials:'配套资料（一行一条）',services:'服务内容（一行一条）',pricing:'班型与价格',price:'价格',note:'备注',teachers:'授课与答疑老师',offer:'活动说明',source:'资料来源 / 官方链接',poster:'关联海报标识',document:'关联 PDF',url:'链接 / PDF 文件',cover:'封面',image:'图片',images:'图片列表（一行一个路径）',thumb:'缩略图',preview:'高清图',screen:'普通预览图',group:'分组',platform:'平台',edition:'版本',author:'作者',publisher:'出版社',scope:'适用范围',tag:'标签',pages:'页数',size:'文件大小说明',sourcePages:'原文页码说明',people:'联系人',name:'姓名 / 名称',role:'说明',qq:'QQ',qqGroup:'交流群号',groupLabel:'群说明',publicAccount:'公众号',wechat:'微信',email:'邮箱',bilibili:'B 站链接',douyin:'抖音链接',qrImage:'二维码图片',label:'类别名称',question:'题目文字（题目与答案可同在视频中）',knowledgePoint:'知识点',featured:'首页主推（宣传只选一条）',pinned:'置顶',sourceLabel:'来源名称',actionLabel:'按钮文字',module:'相关模块',programs:'专业招生计划',ordinary:'普通培养人数',joint:'联合培养人数',code:'专业代码',degree:'学位类型',exam:'专业课代码',years:'历史年份',academic:'学硕',professional:'专硕',first:'一志愿录取',transfer:'调剂录取',total:'总录取人数',sampleType:'样本口径',levelDefinition:'学校层次统计口径',crossDefinition:'跨考统计口径',levels:'学校层次百分比',crossMajor:'跨考百分比',percentage:'百分比（0–100）',all:'全部方向',electrical:'电气',control:'控制',levelSource:'分类依据链接'};
  Object.assign(labels,{courses:'课程列表',documents:'PDF 资料列表',posters:'海报列表',videos:'视频列表',dailyQuestions:'每日一题列表',experiences:'经验分享列表',promotions:'宣传列表',news:'院校消息',textbooks:'教材列表',readings:'文字阅读版',copy:'页面文字',subjects:'备考路线',contact:'联系方式',admissions:'招生计划',studentOrigins:'生源分析',admissionHistory:'历年录取',people:'联系人'});
  const choices={stage:[['initial','初试'],['reexam','复试']],subject:[['all','全部'],['electrical','电气'],['control','控制']],group:[['control','自控试听'],['extended','团队其他专业课'],['public','公共课'],['full','全程班海报'],['intensive','强化海报'],['sprint','冲刺海报'],['qa','资料答疑海报']],module:[['','无'],['contact','联系咨询'],['courses','课程'],['materials','资料'],['videos','公开课'],['admissions','招生'],['reexam','复试']]};
  const templates={courses:{id:'',subject:'all',stage:'initial',number:'',stageLabel:'',title:'',subtitle:'',audience:'',priceLabel:'',status:'',topics:[],previewTopics:[],materials:[],services:[],pricing:[],offer:'',source:'',poster:'',document:''},pricing:{label:'',price:'',note:''},documents:{title:'',description:'',stage:'initial',url:'',pages:0,size:'',body:[],images:[]},posters:{id:'',group:'full',stage:'initial',title:'',description:'',image:'',thumb:'',preview:'',screen:'',width:1000,height:1400},videos:{title:'',category:'',group:'control',platform:'bilibili',url:'',cover:'',description:''},dailyQuestions:{id:'',date:'',subject:'自控',title:'',question:'',image:'',knowledgePoint:'',bilibili:'',douyin:''},experiences:{title:'',description:'',year:2027,url:'',cover:'',pages:0,size:'',body:[],images:[]},promotions:{id:'',category:'机构宣传',title:'',summary:'',body:[],images:[],featured:false,module:'contact',actionLabel:'联系咨询'},news:{id:'',category:'院校消息',date:'',title:'',summary:'',body:[],sourceLabel:'',url:'',pinned:false},textbooks:{title:'',edition:'',author:'',publisher:'',image:'',tag:'',scope:''},people:{name:'',role:'',qq:''},programs:{code:'',name:'',degree:'',exam:'806',label:'',ordinary:0,joint:0},years:{year:2027,academic:{first:0,transfer:0,total:0},professional:{first:0,transfer:0,total:0}},levels:{label:'',percentage:0},crossMajor:{label:'',percentage:0},sections:{title:'',paragraphs:[]}};
  let token='',head='',base={},documentData={version:1,overrides:{}},modules=[],selected=null,dirty=false,busy=false,selectedAsset=null;
  const uploads=new Map();
  function status(message,error=false){$('#status').textContent=message;$('#status').classList.toggle('error',error);}
  function changed(){dirty=true;$('#draft-state').textContent='有未发布修改';$('#publish').disabled=!token||busy;}
  const pathGet=(object,path)=>path.reduce((value,key)=>value?.[key],object);
  function pathSet(object,path,value){let target=object;path.slice(0,-1).forEach(key=>target=target[key]??=( {} ));target[path.at(-1)]=value;}
  function valueFor(module){return clone(pathGet(documentData.overrides,module.path)??pathGet(base,module.path));}
  function update(value){pathSet(documentData.overrides,selected.path,value);changed();}
  async function api(path,method='GET',body){
    if(!token)throw new Error('请先连接管理身份');
    const response=await fetch('https://api.github.com'+path,{method,headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','Content-Type':'application/json','X-GitHub-Api-Version':'2022-11-28'},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(45000),cache:'no-store'});
    const data=await response.json().catch(()=>({}));
    if(!response.ok){if(response.status===401){token='';$('#publish').disabled=true;$('#identity').textContent='连接已失效，请重新验证';$('#auth-card').hidden=false;}throw new Error(response.status===403?'GitHub 拒绝访问：请核对仓库与令牌 Contents / Pages 权限。':`GitHub ${response.status}：${data.message || '请求失败'}`);}
    return data;
  }
  function utf8Base64(text){const bytes=new TextEncoder().encode(text);let binary='';for(let offset=0;offset<bytes.length;offset+=8192)binary+=String.fromCharCode(...bytes.subarray(offset,offset+8192));return btoa(binary);}
  function decodeBase64(content){return new TextDecoder().decode(Uint8Array.from(atob(content.replace(/\s/g,'')),x=>x.charCodeAt(0)));}
  function blank(value){if(Array.isArray(value))return [];if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,blank(v)]));return typeof value==='boolean'?false:typeof value==='number'?0:'';}
  function field(value,key,set,depth=0){
    const wrap=node('div',undefined,'field'),label=node('label',labels[key] || key);wrap.append(label);
    if(Array.isArray(value)&&(!value.length&&!templates[key]||value.length&&typeof value[0]!=='object')){
      const input=node('textarea');input.value=value.join(['body','paragraphs'].includes(key)?'\n\n':'\n');input.setAttribute('aria-label',labels[key] || key);input.addEventListener('input',()=>set(input.value.split(['body','paragraphs'].includes(key)?/\n\s*\n/:/\n/).map(x=>x.trim()).filter(Boolean)));wrap.append(input);
      if(key==='images')assetButton(wrap,path=>{const paths=input.value.split(/\n/).map(x=>x.trim()).filter(Boolean);paths.push(path);set(paths);input.value=paths.join('\n');});
    } else if(Array.isArray(value)){
      value.forEach((item,index)=>{
        const group=node('fieldset',undefined,'object-group');group.append(node('legend',`${index+1} · ${item.title || item.label || item.name || item.year || labels[key] || ''}`));
        group.append(field(item,'',next=>{value[index]=next;set(value);},depth+1));
        const actions=node('div',undefined,'row-actions');
        [['↑',()=>{if(index>0)[value[index-1],value[index]]=[value[index],value[index-1]];}],['↓',()=>{if(index<value.length-1)[value[index+1],value[index]]=[value[index],value[index+1]];}],['移除本条',()=>value.splice(index,1)]].forEach(([text,action])=>{const button=node('button',text);button.type='button';button.addEventListener('click',()=>{action();set(value);renderEditor();});actions.append(button);});group.append(actions);wrap.append(group);
      });
      const add=node('button','＋ 添加一条','add-row');add.type='button';add.addEventListener('click',()=>{const item=clone(templates[key] || blank(value[0] || {}));if(Object.hasOwn(item,'id'))item.id='item-'+Date.now().toString(36);value.push(item);set(value);renderEditor();});wrap.append(add);
    } else if(value&&typeof value==='object'){
      for(const [child,item]of Object.entries(value)){
        if(['placeholder','pageImages','width','height','coverStyle','levelSource'].includes(child))continue;
        wrap.append(field(item,child,next=>{value[child]=next;set(value);},depth+1));
      }
    } else {
      let input;
      if(choices[key]){input=node('select');for(const [v,title]of choices[key]){const option=node('option',title);option.value=v;input.append(option);}if(!choices[key].some(x=>x[0]===String(value))) {const option=node('option',value || '未设置');option.value=value || '';input.append(option);}input.value=value;}
      else if(typeof value==='boolean'){input=node('input');input.type='checkbox';input.checked=value;}
      else if(typeof value==='number'){input=node('input');input.type='number';input.min='0';if(key==='percentage')input.max='100';input.value=value;}
      else{input=node(['description','subtitle','audience','question','intro','teachers','offer','scope','levelDefinition','crossDefinition'].includes(key)||(value || '').length>80?'textarea':'input');input.value=value??'';}
      input.setAttribute('aria-label',labels[key] || key || '内容');input.addEventListener('input',()=>set(typeof value==='boolean'?input.checked:typeof value==='number'?Number(input.value):input.value));wrap.append(input);
      if(['image','images','cover','thumb','preview','screen','url','document','qrImage'].includes(key))assetButton(wrap,path=>{input.value=path;set(path);});
    }
    return wrap;
  }
  function assetButton(wrap,use){const button=node('button','使用选中素材','use-asset');button.type='button';button.addEventListener('click',()=>{if(!selectedAsset){status('请先在素材区选中一张图片或一个 PDF。',true);return;}use(selectedAsset.path);});wrap.append(button);}
  function stripAssetReferences(value,path){
    let count=0;
    function visit(item){
      if(item===path){count++;return '';}
      if(Array.isArray(item))return item.filter(entry=>{if(entry===path||entry&&typeof entry==='object'&&entry.src===path){count++;return false;}return true;}).map(visit);
      if(item&&typeof item==='object')return Object.fromEntries(Object.entries(item).map(([key,entry])=>[key,visit(entry)]));
      return item;
    }
    return {value:visit(value),count};
  }
  function removeAsset(asset){
    if(busy){status('正在发布，请等待完成后再移除素材。');return;}
    const result=stripAssetReferences(documentData.overrides,asset.path);
    documentData.overrides=result.value;uploads.delete(asset.path);URL.revokeObjectURL(asset.url);
    if(selectedAsset===asset)selectedAsset=null;
    if(result.count){changed();renderEditor();}
    $('#file-input').value='';refreshAssets();
    status(result.count?'已移除素材，并清除草稿中对应的图片 / 文件引用。':'已移除未使用的素材。');
  }
  function renderEditor(){if(!selected)return;$('#editor-title').textContent=selected.title;$('#editor-description').textContent=selected.description || '修改表单后可预览，确认内容再发布。';$('#module-count').textContent=`${modules.indexOf(selected)+1} / ${modules.length} 个模块`;const value=valueFor(selected);$('#editor').replaceChildren(field(value,selected.path.at(-1),update));$('#module-list').querySelectorAll('button').forEach(button=>button.setAttribute('aria-current',String(button.dataset.key===selected.key)));}
  function showModule(module){selected=module;renderEditor();}
  function renderNav(){const term=$('#module-search').value.trim();$('#module-list').replaceChildren();modules.filter(m=>m.title.includes(term)||m.description?.includes(term)).forEach(module=>{const button=node('button',module.title);button.dataset.key=module.key;button.addEventListener('click',()=>showModule(module));$('#module-list').append(button);});}
  function validation(data){
    const allowed=new Set(['subjects','courses','videos','textbooks','news','promotions','posters','documents','experiences','dailyQuestions','contact','admissions','copy','analysis','readings','sectionArticles']);
    if(!data||data.version!==1||!data.overrides||Array.isArray(data.overrides))throw new Error('不是有效的管理草稿');
    for(const key of Object.keys(data.overrides))if(!allowed.has(key))throw new Error('不支持的内容模块：'+key);
    const origins=data.overrides.analysis?.studentOrigins;
    if(origins){
      const safeKeys=new Set(['year','sampleType','levelDefinition','crossDefinition','levelSource','levels','crossMajor']);
      for(const key of Object.keys(origins))if(!safeKeys.has(key))throw new Error('生源数据只能包含匿名类别与百分比，禁止人数与原始信息。');
      for(const group of ['levels','crossMajor']){if(!Array.isArray(origins[group])||!origins[group].length)throw new Error('生源百分比不能为空');let sum=0;for(const row of origins[group]){if(Object.keys(row).sort().join(',')!=='label,percentage'||typeof row.label!=='string'||!Number.isFinite(row.percentage)||row.percentage<0||row.percentage>100)throw new Error('生源只允许类别名称和 0–100 的百分比');sum+=row.percentage;}if(Math.abs(sum-100)>1)throw new Error('每组生源百分比合计应约等于 100%');}
    }
    for(const key of ['courses','posters','dailyQuestions','news','promotions'])if(data.overrides[key]){const ids=new Set();for(const item of data.overrides[key]){if(!/^[a-z0-9-]+$/.test(item.id || '')||ids.has(item.id))throw new Error(`${key} 的条目标识不能为空或重复，只用小写英文、数字、短横线。`);ids.add(item.id);}}
    if((data.overrides.promotions || []).filter(x=>x.featured).length>1)throw new Error('首页主推宣传只能选择一条');
    const serialized=JSON.stringify(data);if(/github_pat_|gh[pousr]_[A-Za-z0-9]{20}/.test(serialized))throw new Error('内容疑似包含访问令牌，已阻止发布');
    if(new TextEncoder().encode(serialized).length>900000)throw new Error('文字内容过大，请把图片通过素材区上传');
  }
  function previewValue(value,target,key=''){
    if(Array.isArray(value)){for(const item of value){const section=node('article');previewValue(item,section,key);target.append(section);}return;}
    if(value&&typeof value==='object'){for(const [k,v]of Object.entries(value)){if(['placeholder','pageImages','width','height','coverStyle','sourcePages'].includes(k))continue;previewValue(v,target,k);}return;}
    if(value===''||value===false||value===undefined)return;
    if(typeof value==='string'&&/^assets\/.+\.(?:webp|png|jpg|jpeg)$/.test(value)){const image=node('img');image.src=uploads.get(value)?.url || value;image.alt=labels[key] || key;target.append(image);return;}
    const p=node(key==='title'?'h3':'p',String(value));if(key!=='title')p.prepend(node('small',(labels[key] || key)+'：'));target.append(p);
  }
  function refreshAssets(){
    const list=$('#asset-list');list.replaceChildren();
    for(const asset of uploads.values()){
      const card=node('div',undefined,'asset-card'),button=node('button',undefined,'asset');button.type='button';button.setAttribute('aria-pressed',String(selectedAsset===asset));
      if(asset.type==='image'){const image=node('img');image.src=asset.url;image.alt=asset.name;button.append(image);}
      button.append(node('span',asset.name),node('span',Math.ceil(asset.blob.size/1024)+' KB'));button.addEventListener('click',()=>{selectedAsset=asset;refreshAssets();});
      const remove=node('button','移除','asset-remove');remove.type='button';remove.setAttribute('aria-label','移除素材 '+asset.name);remove.addEventListener('click',()=>removeAsset(asset));
      card.append(button,remove);list.append(card);
    }
  }
  async function addFiles(files){
    for(const file of files){
      if(file.size>15*1024*1024)throw new Error('文件超过 15 MB，请先压缩或使用网盘分享链接。');
      const id='upload-'+Date.now().toString(36)+'-'+crypto.randomUUID().slice(0,8);let blob=file,type='pdf',ext='pdf';
      if(['image/png','image/jpeg','image/webp'].includes(file.type)){
        const bitmap=await createImageBitmap(file),scale=Math.min(1,1800/Math.max(bitmap.width,bitmap.height));const canvas=document.createElement('canvas');canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.86));if(!blob||blob.type!=='image/webp')throw new Error('此浏览器不支持 WebP 压缩，请更换 Edge 或 Chrome。');type='image';ext='webp';
      }else if(file.type!=='application/pdf')throw new Error('仅支持 PNG、JPG、WebP 图片和 PDF，禁止上传原始生源表。');
      if([...uploads.values()].reduce((sum,item)=>sum+item.blob.size,blob.size)>35*1024*1024)throw new Error('本次素材合计超过 35 MB，请分批发布。');
      const asset={name:file.name,path:`assets/uploads/${id}.${ext}`,blob,url:URL.createObjectURL(blob),type};uploads.set(asset.path,asset);selectedAsset=asset;
    }refreshAssets();status('素材已准备，请选择对应字段并点击“使用选中素材”。素材会随内容一起发布。');
  }
  async function publish(){
    if(!token||busy)return;
    try{
      validation(documentData);busy=true;$('#publish').disabled=true;status('正在校验最新版本…');
      const user=await api('/user');if(user.login!==OWNER)throw new Error('只允许仓库所有者发布');
      const ref=await api(ROOT+'/git/ref/heads/'+BRANCH);if(ref.object.sha!==head)throw new Error('网站已有其他更新，请先导出草稿，再刷新连接并重新应用修改，避免覆盖。');
      const parent=await api(ROOT+'/git/commits/'+head),tree=[];
      const serialized=JSON.stringify(documentData,null,2)+'\n';
      const existingPaths=new Set([...serialized.matchAll(/assets\/uploads\/[a-z0-9-]+\.(?:webp|pdf)/g)].map(match=>match[0]).filter(path=>!uploads.has(path)));
      if(existingPaths.size){const remoteTree=await api(ROOT+'/git/trees/'+parent.tree.sha+'?recursive=1'),known=new Set(remoteTree.tree.map(entry=>entry.path));for(const path of existingPaths)if(!known.has(path))throw new Error('草稿中的素材尚未上传，请重新上传并替换路径：'+path);}
      const referenced=[...uploads.values()].filter(asset=>serialized.includes(asset.path));
      for(let index=0;index<referenced.length;index++){
        const asset=referenced[index];status(`正在上传素材 ${index+1} / ${referenced.length}…`);
        const bytes=new Uint8Array(await asset.blob.arrayBuffer());let binary='';for(let offset=0;offset<bytes.length;offset+=8192)binary+=String.fromCharCode(...bytes.subarray(offset,offset+8192));
        const blob=await api(ROOT+'/git/blobs','POST',{content:btoa(binary),encoding:'base64'});tree.push({path:asset.path,mode:'100644',type:'blob',sha:blob.sha});
      }
      const indexFile=await api(ROOT+'/contents/index.html?ref='+head),indexSource=decodeBase64(indexFile.content);
      if(!/assets\/js\/managed-data\.js\?v=[^"]+/.test(indexSource))throw new Error('管理资源版本标记缺失，请联系维护人员。');
      const revision=Date.now().toString(36),indexNext=indexSource.replace(/assets\/js\/managed-data\.js\?v=[^"]+/,'assets/js/managed-data.js?v='+revision);
      const bundle='window.BUFF_MANAGED_DATA = '+JSON.stringify(documentData).replace(/</g,'\\u003c')+';\n';
      for(const [path,content]of [[DATA,serialized],['assets/js/managed-data.js',bundle],['index.html',indexNext]]){const blob=await api(ROOT+'/git/blobs','POST',{content:utf8Base64(content),encoding:'base64'});tree.push({path,mode:'100644',type:'blob',sha:blob.sha});}
      const newTree=await api(ROOT+'/git/trees','POST',{base_tree:parent.tree.sha,tree});const commit=await api(ROOT+'/git/commits','POST',{message:'Update website content from BUFF management',tree:newTree.sha,parents:[head]});
      // A non-forced update rejects concurrent commits instead of overwriting them.
      await api(ROOT+'/git/refs/heads/'+BRANCH,'PATCH',{sha:commit.sha,force:false});head=commit.sha;dirty=false;window.__adminInitial=clone(documentData);$('#draft-state').textContent='内容已提交';
      status('内容已保存到仓库，正在请求 GitHub Pages 更新…');
      try{await api(ROOT+'/pages/builds','POST',{});}catch{status('内容已保存；Pages 会在提交后自动部署。稍后刷新网站查看。');return;}
      for(let attempt=0;attempt<18;attempt++){
        await new Promise(resolve=>setTimeout(resolve,5000));const build=await api(ROOT+'/pages/builds/latest');
        if(build.commit!==head)continue;
        if(build.status==='built'){status('发布成功，网站已更新。打开网站并刷新即可查看。');$('#draft-state').textContent='已发布';return;}
        if(build.status==='errored')throw new Error('内容已保存，但 Pages 部署失败。请查看 GitHub Actions；无需重复上传素材。');
      }status('内容已保存，GitHub Pages 仍在部署。请稍后刷新网站，不要重复发布。');
    }catch(error){status(error.message,true);}finally{busy=false;$('#publish').disabled=!token||!dirty;}
  }
  async function loadBase(){
    const [analysis,managed,html,promotion,images]=await Promise.all([fetch('assets/data/analysis.json',{cache:'no-cache'}).then(r=>r.json()),fetch(DATA,{cache:'no-cache'}).then(r=>r.json()),fetch('index.html',{cache:'no-cache'}).then(r=>r.text()),fetch('assets/data/daily-promotion.txt',{cache:'no-cache'}).then(r=>r.text()),fetch('assets/data/daily-promotion-images.json',{cache:'no-cache'}).then(r=>r.json())]);
    base={...clone(window.BUFF_CONTENT),analysis,readings:clone(window.BUFF_READING),copy:{},sectionArticles:{}};documentData=managed;validation(documentData);
    if(!Object.hasOwn(documentData.overrides,'promotions')){const lines=promotion.trim().split(/\r?\n/),title=lines.shift();const paragraphs=lines.join('\n').trim().split(/\n\s*\n/);base.promotions.forEach(item=>item.featured=false);base.promotions.unshift({...clone(templates.promotions),id:'daily-pasted',title,summary:paragraphs[0],body:paragraphs.slice(1),images,featured:true});}
    for(const key of ['courses','documents','posters','videos','dailyQuestions','experiences','promotions','news','textbooks'])base[key]=base[key].map(item=>({...clone(templates[key]),...item}));
    modules=[['每日宣传','promotions'],['课程与价格','courses'],['初试 / 复试 PDF 资料','documents'],['课程海报','posters'],['每日一题','dailyQuestions'],['公开课 / 视频','videos'],['上岸经验与附件','experiences'],['参考教材与范围','textbooks'],['2027 招生计划','admissions'],['院校消息','news'],['联系方式与平台主页','contact'],['两条备考路线','subjects'],['文字阅读版','readings']].map(([title,key])=>({title,key,path:[key]}));
    modules.push({title:'生源分析（仅百分比）',key:'studentOrigins',path:['analysis','studentOrigins'],description:'只编辑类别和百分比；禁止样本人数、姓名、院校名单、QQ 等原始信息。'},{title:'历年录取数据',key:'admissionHistory',path:['analysis','admissionHistory']});
    const parsed=new DOMParser().parseFromString(html,'text/html'),groups=new Map();
    for(const element of parsed.querySelectorAll('[data-edit-key]')){const key=element.dataset.editKey,group=element.dataset.editGroup || '页面文字';base.copy[key]=element.textContent;labels[key]=element.textContent.trim().slice(0,36);groups.has(group)||groups.set(group,[]);groups.get(group).push(key);}
    // Copy sections are normal forms as well; only stable, annotated text is writable.
    for(const [group,keys]of groups){const path=['copy'];const module={title:group+' · 页面文字',key:'copy-'+group,path,keys};modules.push(module);}
    for(const [id,title]of [['initial-study','初试图文补充'],['reexamination','复试图文补充'],['employment','就业去向图文'],['about','机构图文介绍']]){base.sectionArticles[id]={title:'',body:[],images:[]};modules.push({title,key:id,path:['sectionArticles',id],description:'可粘贴正文、上传图片，显示在对应栏目。页面原有说明可在“页面文字”中修改。'});}
    renderNav();showModule(modules[0]);status('已读取网站内容。可以先编辑预览；连接身份后才能发布。');
  }
  // Only expose the current copy group's fields, while preserving other groups.
  const originalRender=renderEditor;
  renderEditor=function(){originalRender();if(selected?.keys){const values=valueFor(selected),area=$('#editor');area.replaceChildren();for(const key of selected.keys)area.append(field(values[key] || '',key,next=>{values[key]=next;update(values);}));}};
  $('#connect').addEventListener('click',async()=>{
    if(busy)return;token=$('#token').value.trim();$('#token').value='';if(!token){status('请粘贴你自己的仓库访问令牌。',true);return;}
    $('#connect').disabled=true;
    try{status('正在验证 GitHub 身份和仓库权限…');const user=await api('/user');if(user.login!==OWNER)throw new Error('只允许 san780020-lab 身份连接。');const repo=await api(ROOT);if(!repo.permissions?.push)throw new Error('当前令牌没有此仓库写入权限。');const ref=await api(ROOT+'/git/ref/heads/'+BRANCH);head=ref.object.sha;const remote=await api(ROOT+'/contents/'+DATA+'?ref='+head);
      if(dirty&&JSON.stringify(JSON.parse(decodeBase64(remote.content)))!==JSON.stringify(window.__adminInitial))throw new Error('远端内容已变化，请导出草稿后刷新重试。');
      if(!dirty){documentData=JSON.parse(decodeBase64(remote.content));validation(documentData);renderEditor();}window.__adminInitial=clone(JSON.parse(decodeBase64(remote.content)));$('#identity').textContent='已连接：'+OWNER;$('#logout').hidden=false;$('#auth-card').hidden=true;$('#publish').disabled=!dirty;status('身份已验证。编辑、预览后点击“发布全部修改”。');
    }catch(error){token='';status(error.message,true);}finally{$('#connect').disabled=false;}
  });
  $('#logout').addEventListener('click',()=>{token='';head='';$('#token').value='';$('#auth-card').hidden=false;$('#logout').hidden=true;$('#identity').textContent='未连接';$('#publish').disabled=true;status('已退出，未发布的内容仍保留在当前页面，令牌已清除。');});
  $('#module-search').addEventListener('input',renderNav);$('#editor').addEventListener('submit',event=>event.preventDefault());
  $('#file-input').addEventListener('change',event=>addFiles([...event.target.files]).catch(error=>status(error.message,true)));
  document.addEventListener('paste',event=>{if(event.target===$('#token'))return;const files=[...event.clipboardData.items].filter(item=>item.kind==='file').map(item=>item.getAsFile()).filter(Boolean);if(files.length){event.preventDefault();addFiles(files).catch(error=>status(error.message,true));}});
  $('#preview').addEventListener('click',()=>{const target=$('#preview-content');target.replaceChildren(node('h2',selected.title));const value=valueFor(selected);previewValue(selected.keys?Object.fromEntries(selected.keys.map(key=>[key,value[key]])):value,target);$('#preview-dialog').showModal();});
  $('#close-preview').addEventListener('click',()=>$('#preview-dialog').close());$('#publish').addEventListener('click',publish);
  $('#export-draft').addEventListener('click',()=>{const exported=clone(documentData),serialized=JSON.stringify(exported,null,2);if([...uploads.keys()].some(path=>serialized.includes(path))){status('草稿不含未上传素材，请保留原始图片；导入后需重新上传并替换对应素材路径。');}const blob=new Blob([serialized],{type:'application/json'}),url=URL.createObjectURL(blob),a=node('a');a.href=url;a.download='buff-content-draft.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  $('#import-draft').addEventListener('change',async event=>{try{const file=event.target.files[0];if(!file||file.size>900000)throw new Error('草稿文件为空或过大');const imported=JSON.parse(await file.text());validation(imported);documentData=imported;changed();renderEditor();status('已导入草稿，请逐项预览后发布。');}catch(error){status(error.message,true);}});
  window.addEventListener('beforeunload',event=>{if(dirty||busy){event.preventDefault();event.returnValue='';}});
  try{await loadBase();window.__adminInitial=clone(documentData);}catch(error){status('读取内容失败，请刷新：'+error.message,true);}
})();
