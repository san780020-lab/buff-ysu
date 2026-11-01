(() => {
  'use strict';
  const slider = document.getElementById('control-gain');
  if (!slider) return;
  const ns = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs, text) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => node.setAttribute(key, String(value)));
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const add = (svg, tag, attrs, text) => { const node = make(tag, attrs, text); svg.append(node); return node; };
  const line = (svg, x1, y1, x2, y2, color = '#33405a', dash = '') => add(svg, 'line', { x1, y1, x2, y2, stroke:color, 'stroke-width':1, 'stroke-dasharray':dash });
  function axes(svg, domainX, domainY, ticksX, ticksY, names) {
    svg.replaceChildren();
    const x = value => 49 + (value-domainX[0])/(domainX[1]-domainX[0])*401;
    const y = value => 196 - (value-domainY[0])/(domainY[1]-domainY[0])*166;
    ticksX.forEach(value => { line(svg,x(value),30,x(value),196,'#ffffff08'); add(svg,'text',{x:x(value),y:218,'text-anchor':'middle'},String(value).replace('-', '−')); });
    ticksY.forEach(value => { line(svg,49,y(value),450,y(value),'#ffffff08'); add(svg,'text',{x:38,y:y(value)+4,'text-anchor':'end'},String(value).replace('-', '−')); });
    line(svg,49,196,450,196); line(svg,49,30,49,196);
    add(svg,'text',{x:450,y:238,'text-anchor':'end',class:'axis-name'},names[0]);
    add(svg,'text',{x:49,y:15,class:'axis-name'},names[1]);
    return {x,y};
  }
  function render() {
    const gain = Number(slider.value);
    const omega = Math.sqrt(4*gain-1);
    const damping = 1/(2*Math.sqrt(gain));
    document.getElementById('gain-value').textContent = `K = ${gain.toFixed(2)}`;
    document.getElementById('controller-gain').textContent = `K = ${gain.toFixed(2)}`;
    document.getElementById('damping-value').textContent = `阻尼比 ζ = ${damping.toFixed(2)}`;
    const step = document.getElementById('step-plot');
    const a = axes(step,[0,8],[0,1.5],[0,2,4,6,8],[0,.5,1,1.5],['t / s','y(t)']);
    line(step,a.x(0),a.y(1),a.x(8),a.y(1),'#6b7d9d','4 5');
    let path = '';
    for(let i=0;i<=320;i++) {
      const t=i/40;
      const value=1-Math.exp(-t)*(Math.cos(omega*t)+Math.sin(omega*t)/omega);
      path += `${i?'L':'M'}${a.x(t).toFixed(2)},${a.y(value).toFixed(2)}`;
    }
    add(step,'path',{d:path,fill:'none',stroke:'#75b0ff','stroke-width':2.4,'stroke-linecap':'round','stroke-linejoin':'round'});
    const root = document.getElementById('root-plot');
    const r=axes(root,[-3.2,1.2],[-3.8,3.8],[-3,-2,-1,0,1],[-3,0,3],['Re(s)','Im(s)']);
    line(root,r.x(0),r.y(-3.8),r.x(0),r.y(3.8),'#3c4865');
    line(root,r.x(-3.2),r.y(0),r.x(1.2),r.y(0),'#3c4865');
    line(root,r.x(-2),r.y(0),r.x(0),r.y(0),'#9181bb');
    line(root,r.x(-1),r.y(-3.8),r.x(-1),r.y(3.8),'#9181bb');
    [-2,0].forEach(value => { const x=r.x(value),y=r.y(0); line(root,x-4,y-4,x+4,y+4,'#b6a4dd'); line(root,x+4,y-4,x-4,y+4,'#b6a4dd'); });
    [-omega,omega].forEach(value=>add(root,'circle',{cx:r.x(-1),cy:r.y(value),r:4.5,fill:'#a896ed',stroke:'#ddd0ff','stroke-width':1.3}));
    add(root,'text',{x:r.x(-1)+13,y:r.y(omega)-10,fill:'#b9a7e1'},`−1 ± j${omega.toFixed(2)}`);
  }
  slider.addEventListener('input',render); render();
})();
