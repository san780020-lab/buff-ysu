/* Preview generation runs without GitHub credentials; files stay in this frame. */
(() => {
  'use strict';
  const MAX_BYTES=35*1024*1024,MAX_PAGES=100;
  async function generate(file,id,progress=()=>{}){
    if(!/^upload-[a-z0-9-]+$/.test(id)||!file?.size||file.size>15*1024*1024)throw new Error('文件为空或超过 15 MB。');
    const files=[],path=`assets/uploads/${id}`,result={files};let total=0;
    function add(suffix,blob){
      if(!blob)throw new Error('图片压缩失败，请重试。');
      total+=blob.size;if(total>MAX_BYTES)throw new Error('文件与预览合计超过 35 MB，请压缩 PDF 或拆分后重试。');
      const name=path+suffix;files.push({path:name,blob});return name;
    }
    async function image(source,max,quality,suffix){
      const scale=Math.min(1,max/Math.max(source.width,source.height)),canvas=document.createElement('canvas');
      canvas.width=Math.max(1,Math.round(source.width*scale));canvas.height=Math.max(1,Math.round(source.height*scale));
      try{
        canvas.getContext('2d').drawImage(source,0,0,canvas.width,canvas.height);
        const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',quality));
        if(blob?.type!=='image/webp')throw new Error('此浏览器不支持 WebP，请使用 Edge 或 Chrome。');
        return {path:add(suffix,blob),width:canvas.width,height:canvas.height};
      }finally{canvas.width=canvas.height=0;}
    }
    if(['image/png','image/jpeg','image/webp'].includes(file.type)){
      progress('正在生成图片缩略图与阅读图…');
      const bitmap=await createImageBitmap(file);
      try{
        const full=await image(bitmap,3000,.9,'.webp'),screen=await image(bitmap,1400,.84,'-screen.webp'),thumb=await image(bitmap,400,.8,'-thumb.webp');
        Object.assign(result,{type:'image',path:full.path,media:{width:full.width,height:full.height,screen:screen.path,thumb:thumb.path,preview:full.path}});
      }finally{bitmap.close();}
    }else if(file.type==='application/pdf'){
      progress('正在加载 PDF 预览组件…');
      const library=await import('../vendor/recognition/pdf/build/pdf.js'),root=new URL('assets/vendor/recognition/pdf/',location.href).href;
      library.GlobalWorkerOptions.workerSrc=root+'build/pdf.worker.js';
      const task=library.getDocument({data:new Uint8Array(await file.arrayBuffer()),isEvalSupported:false,cMapUrl:root+'cmaps/',cMapPacked:true,standardFontDataUrl:root+'standard_fonts/',wasmUrl:root+'wasm/'});
      // Password-protected files must fail promptly instead of waiting for a hidden dialog.
      const password=new Promise((resolve,reject)=>{task.onPassword=()=>reject(new Error('PDF 已加密，请上传无需密码的版本。'));});let pdf;
      try{
        pdf=await Promise.race([task.promise,password]);
        if(pdf.numPages>MAX_PAGES)throw new Error('自动预览最多支持 100 页，请拆分 PDF 后上传。');
        result.type='pdf';result.path=add('.pdf',file);result.media={pages:[]};
        for(let number=1;number<=pdf.numPages;number++){
          progress(`正在生成 PDF 预览 ${number} / ${pdf.numPages} 页…`);
          const page=await pdf.getPage(number),size=page.getViewport({scale:1}),viewport=page.getViewport({scale:Math.min(3,2200/Math.max(size.width,size.height))}),canvas=document.createElement('canvas');
          canvas.width=Math.max(1,Math.ceil(viewport.width));canvas.height=Math.max(1,Math.ceil(viewport.height));
          try{
            await page.render({canvasContext:canvas.getContext('2d'),viewport,background:'rgb(255,255,255)'}).promise;
            const full=await image(canvas,2200,.88,`-p${number}-full.webp`),preview=await image(canvas,1100,.82,`-p${number}-preview.webp`);
            result.media.pages.push({full:full.path,preview:preview.path,width:full.width,height:full.height,sourcePage:number});
            if(number===1)result.media.cover=(await image(canvas,400,.8,'-cover.webp')).path;
          }finally{canvas.width=canvas.height=0;page.cleanup();}
        }
      }catch(error){throw new Error(/password|Password|destroyed/i.test(error?.message||'')?'PDF 已加密，请上传无需密码的版本。':error.message||'PDF 无法读取。');}
      finally{await task.destroy();}
    }else throw new Error('仅支持 PNG、JPG、WebP 图片和 PDF。');
    return result;
  }
  window.BUFF_PREVIEWS={generate};
  let running=false;
  const send=(id,type,data={})=>parent.postMessage({channel:'buff-previews',id,type,...data},location.origin);
  window.addEventListener('message',async event=>{
    if(event.source!==parent||event.origin!==location.origin||event.data?.channel!=='buff-previews'||event.data.type!=='start'||running)return;
    running=true;const {id,file}=event.data;
    try{send(id,'result',{result:await generate(file,id,message=>send(id,'progress',{message}))});}
    catch(error){send(id,'error',{message:error.message||'预览生成失败。'});}
    finally{running=false;}
  });
  if(parent!==window)send(null,'ready');
})();
