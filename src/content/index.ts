import { topicSchema, type Topic } from './schema';
const topicFiles=import.meta.glob('./topics/*/topic.json',{eager:true,import:'default'});
const unitFiles=import.meta.glob('./topics/*/units/*.json',{eager:true,import:'default'});
export const topics:Topic[]=Object.entries(topicFiles).map(([path,raw])=>{const topic=raw as {units:string[]};const dir=path.slice(0,path.lastIndexOf('/'));return topicSchema.parse({...topic,units:topic.units.map(id=>unitFiles[`${dir}/units/${id}.json`])});});
export const topic=topics[0];
export const levels=topic.units.flatMap(u=>u.levels);
export function validateGraph(t:Topic){const ids=new Set(t.concepts.map(c=>c.id));const visiting=new Set<string>();const visited=new Set<string>();function visit(id:string){if(visiting.has(id))throw new Error('Cycle in prerequisite graph');if(visited.has(id))return;visiting.add(id);const c=t.concepts.find(c=>c.id===id);if(!c)throw new Error(`Unknown concept ${id}`);c.prerequisites.forEach(visit);visiting.delete(id);visited.add(id);}ids.forEach(visit);const qs=t.units.flatMap(u=>u.levels).flatMap(l=>[...l.quiz,...l.retries]);for(const q of qs)for(const id of [q.concept,...q.requires])if(!ids.has(id))throw new Error(`Unknown question concept ${id}`);return true;}
topics.forEach(validateGraph);
