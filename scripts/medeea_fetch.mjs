import { writeFileSync } from 'fs';
import { execFileSync } from 'child_process';

const QUERIES = ['software','engineer','developer','programator','it','ai','data','python','java','web','internship','intern','junior','mobile','angular','android','unity','frontend','backend','fullstack','csharp','dotnet'];
const TARGET_MATCHED = 30;
const BATCH = 25;

const agent = {
  name: 'Medeea',
  tag: 'UBVFMIIA',
  prompt: `Ești Medeea, studentă la Informatică Aplicată, Univ. Transilvania Brașov.
Skilluri: Programare(C/C++/Java/Python/OOP/SDA/SO/Web/Mobile/Angular/.Net/Android/Unity), AI/ML/DL/ComputerVision/NLP/LLM, Baze de date/SGBD/Cloud, Retele/Securitate, Testare/Validare, Grafica 3D, Paralela, Algoritmica, Matematica/Statistica/Stohastice`,
};

const seen = new Set();
const allJobs = [];
for (const q of QUERIES) {
  try {
    const r = await fetch(`https://api.peviitor.ro/v1/search/?q=${encodeURIComponent(q)}&page=1`);
    const d = await r.json();
    for (const doc of d.response?.docs || []) {
      if (!seen.has(doc.id)) { seen.add(doc.id); allJobs.push(doc); }
    }
  } catch (e) {}
}
process.stdout.write(`Found ${allJobs.length} unique IT jobs\n`);

async function getDesc(job) {
  try {
    const url = job.job_link || job.url;
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' }, signal: AbortSignal.timeout(10000) });
    const html = await r.text();
    const ldMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);
    if (ldMatch) { try { const ld = JSON.parse(ldMatch[1]); if (ld.description) return ld.description; } catch {} }
    const metaMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i);
    if (metaMatch) return metaMatch[1];
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const idx = text.search(/about.?the.?job|descrierea.?postului|descriere/i);
    return idx > 0 ? text.slice(idx, idx + 2000) : text.slice(0, 1500);
  } catch { return ''; }
}

function runOpencode(promptText) {
  const stdout = execFileSync('opencode', [
    'run', '--model', 'opencode/big-pickle', '--format', 'json',
    '--dangerously-skip-permissions', promptText,
  ], { timeout: 180000, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });

  let text = '';
  for (const line of stdout.split('\n').filter(l => l.trim())) {
    try { const ev = JSON.parse(line); if (ev.type === 'text') text = ev.part?.text || ''; } catch {}
  }
  const json = text.match(/\[[\s\S]*\]/);
  return json ? JSON.parse(json[0]) : [];
}

const matchedJobs = [];

for (let start = 0; start < allJobs.length && matchedJobs.length < TARGET_MATCHED; start += BATCH) {
  const batch = allJobs.slice(start, start + BATCH);
  process.stdout.write(`\nBatch ${start/BATCH + 1}: fetching ${batch.length} descriptions...\n`);
  const descs = await Promise.all(batch.map(j => getDesc(j)));

  const jobList = batch.map((j, i) =>
    `${i+1}. ${j.title} @ ${j.company}
   Loc: ${JSON.stringify(j.location)} | Salariu: ${JSON.stringify(j.salary)}
   ${(descs[i] || '(fara descriere)').slice(0, 1200)}`
  ).join('\n');

  const prompt = `${agent.prompt}

Pentru fiecare job de mai jos, decide dacă e potrivit pentru un student ca tine (internship/junior/mid).
Raspunde DOAR cu JSON array:
[{"title":"...", "match":bool, "matchPercentage":0-100, "reason":"..."}]

---
${jobList}`;

  process.stdout.write(`  Medeea evaluating ${batch.length} jobs...\n`);
  const results = runOpencode(prompt);

  for (let i = 0; i < results.length; i++) {
    if (results[i]?.match && matchedJobs.length < TARGET_MATCHED) {
      matchedJobs.push({
        url: batch[i].url,
        title: batch[i].title,
        company: batch[i].company,
        location: batch[i].location,
        salary: batch[i].salary,
        date: batch[i].date,
        status: batch[i].status,
        _version_: batch[i]._version_,
        _root_: batch[i]._root_,
        f_tag: ['UBVFMIIA'],
        matchPercentage: results[i].matchPercentage,
        reason: results[i].reason,
      });
    }
  }
  process.stdout.write(`  Matched so far: ${matchedJobs.length}/${TARGET_MATCHED}\n`);
}

const outPath = '/home/sebi/ClujHackathon2026/next_jobs.json';
writeFileSync(outPath, JSON.stringify(matchedJobs, null, 2));
process.stdout.write(`\nDone! ${matchedJobs.length} matched jobs saved to next_jobs.json\n`);
