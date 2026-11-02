// Run security and atomic-publication checks without a live token or writes.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/js/admin.js','utf8').split("  $('#connect').addEventListener")[0]+`
  window.TEST={validation,publish,stripAssetReferences,pruneMedia,configure:values=>{token='test-only';head='base';documentData=values;},state:()=>({head,dirty,busy})};
})();`;
async function fixture(mode='success'){
  const elements=new Map(),calls=[];
  const context={window:{},document:{querySelector:key=>{if(!elements.has(key))elements.set(key,{textContent:'',classList:{toggle(){}},disabled:false});return elements.get(key);}},structuredClone,TextEncoder,TextDecoder,Uint8Array,AbortSignal,Map,Set,URL,console,crypto:require('node:crypto').webcrypto,btoa:s=>Buffer.from(s,'binary').toString('base64'),atob:s=>Buffer.from(s,'base64').toString('binary'),setTimeout:callback=>{callback();return 0;},fetch:async(url,options)=>{
    calls.push({url,method:options.method,body:options.body&&JSON.parse(options.body)});
    let value;
    if(url.endsWith('/user'))value={login:mode==='unauthorized'?'someone-else':'san780020-lab'};
    else if(url.includes('/git/ref/heads/'))value={object:{sha:mode==='conflict'?'changed':'base'}};
    else if(url.endsWith('/git/commits/base'))value={tree:{sha:'tree-base'}};
    else if(url.includes('/contents/index.html?ref='))value={content:Buffer.from('<script src="assets/js/managed-data.js?v=old"></script>').toString('base64')};
    else if(url.endsWith('/git/blobs'))value={sha:'blob-new'};
    else if(url.endsWith('/git/trees'))value={sha:'tree-new'};
    else if(url.endsWith('/git/commits'))value={sha:'commit-new'};
    else if(url.includes('/git/refs/heads/'))value={};
    else if(url.endsWith('/pages/builds/latest'))value={commit:'commit-new',status:'built'};
    else if(url.endsWith('/pages/builds'))value={};
    else throw new Error('Unexpected request '+url);
    return {ok:true,json:async()=>value};
  }};
  vm.createContext(context);await vm.runInContext(source,context);return {test:context.window.TEST,calls,elements};
}
(async()=>{
  const {test,calls,elements}=await fixture();
  const valid={version:1,overrides:{analysis:{studentOrigins:{year:2027,sampleType:'机构学员样本',levels:[{label:'公办本科',percentage:100}],crossMajor:[{label:'非跨考',percentage:100}]}}}};
  test.validation(valid);
  test.validation({version:1,overrides:{site:{examYear:2028,pastPaperRange:'2004–最新',copyrightYear:'自动'},admissions:{year:2028}}});
  for(const site of [{examYear:0,pastPaperRange:'2004–最新'},{examYear:2028,pastPaperRange:'2004–最新',copyrightYear:'invalid'}])assert.throws(()=>test.validation({version:1,overrides:{site}}));
  assert.throws(()=>test.validation({version:1,overrides:{admissions:{year:0}}}));
  const path='assets/uploads/remove-test.webp',keep='assets/uploads/keep-test.webp';
  const draft={promotions:[{id:'a',images:[path,keep],body:['保留正文']}],contact:{qrImage:path},courses:[{cover:path}],other:{images:[{src:path,alt:'待移除'},{src:keep,alt:'保留'}]}};
  const removed=test.stripAssetReferences(draft,path);
  assert.equal(removed.count,4);assert.equal(JSON.stringify(removed.value).includes(path),false);assert.ok(JSON.stringify(removed.value).includes(keep));assert.equal(removed.value.promotions[0].body[0],'保留正文');assert.equal(removed.value.contact.qrImage,'');assert.ok(JSON.stringify(draft).includes(path),'Original input must stay unchanged');

  for(const mutation of [data=>data.overrides.analysis.studentOrigins.count=12,data=>data.overrides.analysis.studentOrigins.levels[0].school='Private school',data=>data.overrides.analysis.studentOrigins.levels[0].percentage=40]){
    const bad=structuredClone(valid);mutation(bad);assert.throws(()=>test.validation(bad));
  }
  assert.throws(()=>test.validation({version:1,overrides:{notAllowed:{}}}));
  assert.throws(()=>test.validation({version:1,overrides:{promotions:[{id:'x',title:'github_pat_test'}]}}));
  for(const privateText of [String.fromCharCode(67,58,92)+'Users'+String.fromCharCode(92)+'example', ['person','gmail.com'].join('@')])assert.throws(()=>test.validation({version:1,overrides:{copy:{example:privateText}}}),/本机绝对路径或私人邮箱/);
  const pdf='assets/uploads/upload-test.pdf',page={preview:'assets/uploads/upload-test-preview.webp',full:'assets/uploads/upload-test-full.webp',width:1100,height:1600};
  const mediaDraft={version:1,overrides:{documents:[{url:pdf}],media:{readers:{[pdf]:{cover:'assets/uploads/upload-test-cover.webp',pages:[page]}},images:{}}}};
  test.validation(mediaDraft);
  for(const mutation of [d=>d.overrides.media.readers[pdf].pages[0].full='https://example.com/private.webp',d=>d.overrides.media.readers[pdf].pages=[],d=>d.overrides.media.readers[pdf].cover='../outside.webp',d=>d.overrides.media.readers[pdf].pages[0].width=Infinity]){const bad=structuredClone(mediaDraft);mutation(bad);assert.throws(()=>test.validation(bad));}
  const pruned=structuredClone(mediaDraft);pruned.overrides.documents=[];test.configure(pruned);test.pruneMedia();assert.equal(Object.keys(pruned.overrides.media.readers).length,0,'Removed documents must not keep orphan preview files in future publications');
  test.configure(valid);await test.publish();
  const tree=calls.find(call=>call.url.endsWith('/git/trees')).body;
  assert.equal(tree.base_tree,'tree-base');assert.equal(tree.tree.length,3);assert.equal(tree.tree[0].path,'assets/data/managed-content.json');
  const ref=calls.find(call=>call.method==='PATCH').body;assert.equal(ref.force,false);assert.equal(ref.sha,'commit-new');
  const commit=calls.find(call=>call.url.endsWith('/git/commits')&&call.method==='POST').body;
  assert.equal(commit.author.email,'240846609+san780020-lab@users.noreply.github.com');assert.equal(commit.committer.email,commit.author.email,'Management commits must never default to a private account email');
  assert.match(elements.get('#status').textContent,/发布成功/);
  assert.ok(calls.every(call=>call.url.startsWith('https://api.github.com/')));
  for(const mode of ['unauthorized','conflict']){const other=await fixture(mode);other.test.configure(valid);await other.test.publish();assert.equal(other.calls.filter(call=>call.method!=='GET').length,0);assert.match(other.elements.get('#status').textContent,mode==='unauthorized'?/所有者/:/已有其他更新/);}
  console.log('PASS: owner rejection, concurrent-update rejection, atomic non-forced publish, percentage-only privacy, token leakage guard, removal across draft references.');
})().catch(error=>{console.error(error);process.exitCode=1;});
