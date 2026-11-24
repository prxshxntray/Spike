import { useState } from 'react';
import katex from 'katex';
import type { Card } from '../content/schema';
import { Beaker, IzhSim } from './Sim';
import { ConceptFigure } from './ConceptFigure';

export function CardView({ card }: { card: Card }) {
  const [revealed, setRevealed] = useState(1);
  return <section className="learning-card">
    <h1>{card.title}</h1>
    {card.diagram && <ConceptFigure diagram={card.diagram}/>}
    {card.body && <div className="lesson-body">{card.body.split('\n\n').map(p=><p key={p}>{p}</p>)}</div>}
    {card.kind === 'equation' && <div className="equations">
      {card.steps?.slice(0, revealed).map(s=><div key={s} dangerouslySetInnerHTML={{__html:katex.renderToString(s,{throwOnError:false,displayMode:true})}}/>)}
      {revealed < (card.steps?.length ?? 0) && <button className="secondary" onClick={()=>setRevealed(n=>n+1)}>Show the next step</button>}
    </div>}
    {(card.kind === 'tracker' || card.kind === 'compare') && <>
      <div className="table-scroll"><table><thead><tr>{card.columns?.map(c=><th key={c} scope="col">{c}</th>)}</tr></thead><tbody>{card.rows?.slice(0,revealed).map((row,i)=><tr key={i}>{row.map((v,j)=><td key={j}>{v}</td>)}</tr>)}</tbody></table></div>
      {revealed < (card.rows?.length ?? 0) && <button className="secondary" onClick={()=>setRevealed(n=>n+1)}>Reveal next row</button>}
    </>}
    {card.kind === 'sim' && (card.simId === 'izhikevich' ? <IzhSim/> : <Beaker/>)}
  </section>;
}
