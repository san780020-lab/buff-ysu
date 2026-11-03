// Verify the draft bridge is restricted to a same-origin admin preview frame.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
async function run({search='?editor-preview=1',origin='https://example.invalid',parentPath='/site/admin.html',parentOrigin=origin,embedded=true}={}){
  const draft={version:1,overrides:{courses:[{title:'Draft course'}]}},published={version:1,overrides:{courses:[{title:'Published course'}]}};
  let snapshots=0;
  const window={BUFF_CONTENT:{},BUFF_READING:{},BUFF_MEDIA:{readers:{}},BUFF_MANAGED_DATA:published};
  const parent=embedded?{location:{origin:parentOrigin,pathname:parentPath},BUFF_EDITOR:{ready:true,snapshot:()=>{snapshots++;return{data:draft,assets:{'assets/uploads/upload-valid.webp':'blob:'+origin+'/valid','assets/uploads/upload-foreign.webp':'blob:https://foreign.invalid/other','../invalid.webp':'blob:'+origin+'/other'}};}}}:window;
  const document={querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({})};
  const context={window,parent,document,location:{search,origin},URLSearchParams};vm.createContext(context);vm.runInContext(fs.readFileSync('assets/js/managed.js','utf8'),context);await window.BUFF_MANAGED_READY;
  return{window,snapshots};
}
(async()=>{
  const draft=await run();assert.equal(draft.window.BUFF_CONTENT.courses[0].title,'Draft course');assert.equal(draft.snapshots,1);
  assert.equal(draft.window.BUFF_ASSET_URL('assets/uploads/upload-valid.webp?v=1'),'blob:https://example.invalid/valid');
  for(const path of ['assets/uploads/upload-foreign.webp','../invalid.webp','assets/images/unchanged.webp'])assert.equal(draft.window.BUFF_ASSET_URL(path),path);
  for(const options of [{search:''},{parentPath:'/site/index.html'},{parentOrigin:'https://foreign.invalid'},{embedded:false}]){
    const normal=await run(options);assert.equal(normal.snapshots,0);assert.equal(normal.window.BUFF_CONTENT.courses[0].title,'Published course');assert.equal(normal.window.BUFF_VISUAL_PREVIEW,undefined);
  }
  console.log('PASS: editor-only draft bridge, same-origin parent guard, local-asset URL restriction, unchanged public-site rendering.');
})().catch(error=>{console.error(error);process.exitCode=1;});
