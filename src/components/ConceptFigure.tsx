import { useId, useState } from 'react';
import type { Diagram } from '../content/schema';

/** Authored, offline figures. Exploring a figure never records mastery. */
export function ConceptFigure({ diagram }: { diagram: Diagram }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const max = Math.max(...diagram.items.map(item => Math.abs(item.value)), 1);
  return <figure className={`concept-figure figure-${diagram.kind}`} aria-labelledby={`${id}-title`}>
    <figcaption id={`${id}-title`}>{diagram.title}</figcaption>
    {diagram.kind === 'network' ? <>
      <svg className="network-map" viewBox="0 0 360 200" role="img" aria-label="Input neurons excite learning neurons. The highlighted middle learning neuron excites its inhibitory partner, which suppresses both outer learning neurons. Only that winner’s feedback is shown.">
        <defs><marker id={`${id}-arrow`} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 8 4 0 8" fill="var(--accent)"/></marker></defs>
        <g fill="none" stroke="currentColor" strokeWidth="2" className={active === 0 || active === 2 ? 'network-lit' : 'network-dim'}>
          {[60,105,150].flatMap(y=>[60,105,150].map(z=><path key={`${y}-${z}`} d={`M52 ${y} L170 ${z}`} markerEnd={`url(#${id}-arrow)`}/>))}
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="2" className={active === 1 ? 'network-lit' : 'network-dim'}>
          {[60,105,150].map(y=><path key={y} d={`M198 ${y} H294`} markerEnd={`url(#${id}-arrow)`}/>)}
          <path className="inhibitory-wire" d="M297 105 Q255 30 202 60 M297 105 Q255 180 202 150"/>
          <path className="inhibitory-wire" d="M202 142 v16 M202 52 v16"/>
        </g>
        {['Input','Learning','Inhibition'].map((label,i)=><text key={label} x={[38,184,310][i]} y="22" textAnchor="middle">{label}</text>)}
        {[60,105,150].map((y,i)=><g key={y}>
          <circle cx="38" cy={y} r="13" className={active === 0 ? 'node-lit' : 'node-input'}/>
          <circle cx="184" cy={y} r="14" className={i===1 ? 'node-lit' : 'node-input'}/>
          <circle cx="310" cy={y} r="13" className={i===1 ? "node-inhibit winner-inhibitor" : "node-inhibit"}/>
        </g>)}
        {active === 3 && <path d="M165 82 h38" stroke="currentColor" strokeWidth="3" className="network-lit"/>}
        <text x="180" y="190" textAnchor="middle" className="map-note">Arrows excite · blunt ends inhibit</text>
      </svg>
      <div className="figure-controls" role="group" aria-label="Explore network mechanisms">{diagram.items.map((item,i)=><button key={item.label} aria-pressed={active===i} onClick={()=>setActive(i)}>{item.label}</button>)}</div>
      <p className="figure-explanation" aria-live="polite">{diagram.items[active].note}</p>
    </> : diagram.kind === 'beakers' ? <div className="beaker-sequence">{diagram.items.map((item,i)=>{
      const threshold = item.threshold ?? 1;
      return <div key={item.label} className="beaker-state"><svg viewBox="0 0 100 130" role="img" aria-label={`${item.label}: ${item.note}; water level ${item.value}`}>
        <path d="M18 12 V112 Q18 120 26 120 H74 Q82 120 82 112 V12" fill="none" stroke="currentColor" strokeWidth="2.5"/>
        <rect x="21" y={117-item.value*74} width="58" height={item.value*74} className="beaker-water"/>
        <path d={`M10 ${117-threshold*74} H90`} className="threshold-line"/>
        <text x="50" y="110" textAnchor="middle">{item.note.startsWith('θ') ? item.value : item.note}</text>
      </svg><span>{item.label}</span>{item.threshold !== undefined && <small className="beaker-threshold">{item.note}</small>}{i<diagram.items.length-1&&<span className="sequence-arrow" aria-hidden="true">→</span>}</div>;
    })}</div> : diagram.kind === 'bars' ? <div className="figure-bars">{diagram.items.map(item=><div className="figure-bar" key={item.label}><div><span>{item.label}</span><strong>{item.note}</strong></div><div className="bar-track"><div style={{width:`${Math.abs(item.value)/max*100}%`}}/></div></div>)}</div> : diagram.kind === 'spikes' ? <div className="spike-trains">{diagram.items.map(item=><div className="spike-row" key={item.label}><strong>{item.label}</strong><div className="spike-line" role="img" aria-label={`${item.label}: spikes at ${item.note}`}>{Array.from({length:10},(_,i)=><span key={i} className={item.note.split(',').map(Number).includes(i+1)?'has-spike':''}><i/>{i+1}</span>)}</div></div>)}<p className="axis-label">Time →</p></div> : diagram.kind === 'curve' ? <svg className="concept-curve" viewBox="0 0 340 180" role="img" aria-label={diagram.caption}>
      <path d="M30 15 V140 H320" fill="none" stroke="currentColor" className="curve-axis"/>
      <path d={diagram.items.map((item,i)=>i && diagram.curveStyle === 'step' ? `H${40+i*270/(diagram.items.length-1)} V${135-item.value*100}` : `${i?'L':'M'}${40+i*270/(diagram.items.length-1)} ${135-item.value*100}`).join(' ')} fill="none" stroke="currentColor" strokeWidth="3" className="curve-line"/>
      {diagram.items.map((item,i)=><text key={i} x={40+i*270/(diagram.items.length-1)} y="165" textAnchor="middle">{item.label}</text>)}
      <text x="12" y="140">0</text><text x="12" y="40">1</text>
    </svg> : <ol className="concept-flow">{diagram.items.map(item=><li key={item.label}><strong>{item.label}</strong><span>{item.note}</span></li>)}</ol>}
    <p className="figure-caption">{diagram.caption}</p>
  </figure>;
}
