import { readdir,readFile,writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
async function walk(dir){let out=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=dir+'/'+e.name;if(e.isDirectory())out.push(...await walk(p));else out.push('/'+p.slice(5));}return out;}
const files=(await walk('dist')).filter(p=>p!='/sw.js');
const hash=createHash('sha256');for(const file of files)hash.update(await readFile('dist'+file));
const version='spike-'+hash.digest('hex').slice(0,12);
await writeFile('dist/sw.js',`const CACHE=${JSON.stringify(version)},FILES=${JSON.stringify(files)};
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('spike-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.match(e.request,{ignoreVary:true}).then(cached=>cached||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('/index.html'):Response.error())));});
`);
console.log(`Offline cache: ${files.length} assets · ${version}`);
