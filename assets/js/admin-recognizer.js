/* Receives file bytes only; never receives the parent's GitHub credentials. */
(() => {
  'use strict';
  const root=new URL('assets/vendor/recognition/',location.href).href;
  let running=false,worker=null,pdf=null;
  const send=(id,type,data={})=>parent.postMessage({channel:'buff-recognition',id,type,...data},location.origin);
  async function ocr(source,id){
    if(!worker)worker=await Tesseract.createWorker(['chi_sim','eng'],1,{workerPath:root+'tesseract/dist/worker.min.js',workerBlobURL:false,corePath:root+'core/',langPath:root+'lang',logger:event=>send(id,'progress',{message:event.status,progress:event.progress})});
    const result=await worker.recognize(source);return result.data.text;
  }
  window.addEventListener('message',async event=>{
    if(event.source!==parent||event.origin!==location.origin||event.data?.channel!=='buff-recognition'||event.data.type!=='start'||running)return;
    const {id,bytes,mime,maxPages}=event.data;
    if(!(bytes instanceof ArrayBuffer)||bytes.byteLength>15*1024*1024)return send(id,'error',{message:'文件为空或超过 15 MB。'});
    running=true;
    try{
      const parts=[];let pages=1,total=1;
      if(mime==='application/pdf'){
        const library=await import('../vendor/recognition/pdf/build/pdf.js');
        library.GlobalWorkerOptions.workerSrc=root+'pdf/build/pdf.worker.js';
        pdf=await library.getDocument({data:new Uint8Array(bytes),isEvalSupported:false,cMapUrl:root+'pdf/cmaps/',cMapPacked:true,standardFontDataUrl:root+'pdf/standard_fonts/',wasmUrl:root+'pdf/wasm/'}).promise;
        total=pdf.numPages;pages=Math.min(total,Math.max(1,Math.min(10,Number(maxPages)||3)));
        for(let index=1;index<=pages;index++){
          send(id,'progress',{message:`读取 PDF 第 ${index} / ${pages} 页`,progress:(index-1)/pages});
          const page=await pdf.getPage(index),content=await page.getTextContent();
          const text=content.items.map(item=>typeof item.str==='string'?item.str+(item.hasEOL?'\n':' '):'').join('').trim();
          if(text.replace(/\s/g,'').length>=30)parts.push(text);
          else{
            const original=page.getViewport({scale:1}),scale=Math.min(2,2200/Math.max(original.width,original.height)),viewport=page.getViewport({scale}),canvas=document.createElement('canvas');
            canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);
            await page.render({canvasContext:canvas.getContext('2d'),viewport,background:'rgb(255,255,255)'}).promise;
            parts.push(await ocr(canvas,id));canvas.width=canvas.height=0;
          }
          page.cleanup();if(parts.join('').length>120000)throw new Error('文字过长，请减少识别页数。');
        }
      }else if(['image/png','image/jpeg','image/webp'].includes(mime)){
        const bitmap=await createImageBitmap(new Blob([bytes],{type:mime})),scale=Math.min(1,3000/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');
        canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();parts.push(await ocr(canvas,id));canvas.width=canvas.height=0;
      }else throw new Error('只支持图片和 PDF。');
      send(id,'result',{text:parts.join('\n\n').replace(/([\u3400-\u9fff])[ \t]+(?=[\u3400-\u9fff])/g,'$1'),pages,total});
    }catch(error){send(id,'error',{message:error.message||'识别失败，请重试或手动粘贴文字。'});}
    finally{if(worker){await worker.terminate();worker=null;}if(pdf){await pdf.destroy();pdf=null;}running=false;}
  });
  parent.postMessage({channel:'buff-recognition',type:'ready'},location.origin);
})();
