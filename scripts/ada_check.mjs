import { writeFileSync } from 'fs';
import { execFileSync } from 'child_process';

const BATCH = parseInt(process.argv[2] || '30', 10);
const QUERIES = ['software','engineer','developer','programator','it','ai','data','embedded','automation','robot','python','java','web','internship','intern','junior'];

const AGENTS = [
  {
    name: 'Ada',
    tag: 'UTCNAC',
    prompt: `Ești Ada, studentă la UTCN Automatică și Calculatoare.
Skilluri: Programare(C/C++/Java/Python/OOP/SDA/Software/DB/OS/Web), AI/ML/DL/CV, Hardware(Electronica/Microprocesoare/Embedded), Automatizari(Sisteme/Reglare/Robotica), Retele(Securitate)`,
  },
  {
    name: 'Medeea',
    tag: 'UBVFMIIA',
    prompt: `Ești Medeea, studentă la Informatică Aplicată, Univ. Transilvania Brașov.
Skilluri: Programare(C/C++/Java/Python/OOP/SDA/SO/Web/Mobile/Angular/.Net/Android/Unity), AI/ML/DL/ComputerVision/NLP/LLM, Baze de date/SGBD/Cloud, Retele/Securitate, Testare/Validare, Grafica 3D, Paralela, Algoritmica, Matematica/Statistica/Stohastice`,
  },
];

// Fetch jobs from all queries, deduplicate
const seen = new Set();
const allJobs = [];
for (const q of QUERIES) {
  try {
    const r = await fetch(`https://api.peviitor.ro/v1/search/?q=${encodeURIComponent(q)}&page=1`);
    const d = await r.json();
    for (const doc of d.response?.docs || []) {
      if (!seen.has(doc.id)) { seen.add(doc.id); allJobs.push(doc); }
    }
  } catch {}
}
process.stdout.write(`Found ${allJobs.length} unique IT jobs\n`);

// Fetch descriptions from bestjobs.eu
async function getDesc(job) {
  try {
    const url = job.job_link || job.url;
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' } });
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

// Run opencode (execFileSync avoids shell interpretation of $, backticks etc)
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

// Initialize results per agent
const agentResults = AGENTS.map(() => []);

// Process jobs in batches for each agent
for (let start = 0; start < allJobs.length; start += BATCH) {
  const batch = allJobs.slice(start, start + BATCH);
  process.stdout.write(`\nBatch ${start/BATCH + 1}/${Math.ceil(allJobs.length/BATCH)}: fetching ${batch.length} descriptions...\n`);
  const descs = await Promise.all(batch.map(j => getDesc(j)));

  for (const agent of AGENTS) {
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

    process.stdout.write(`  ${agent.name} evaluating ${batch.length} jobs...\n`);
    const results = runOpencode(prompt);
    agentResults[AGENTS.indexOf(agent)].push(...results);

    const matched = (results || []).filter(r => r.match);
    process.stdout.write(`  ${agent.name}: ${matched.length}/${results.length} match\n`);
    for (const r of (results || []).slice(0, 3)) {
      process.stdout.write(`    ${r.match ? '✅' : '❌'} ${r.matchPercentage || 0}% - ${r.title}\n`);
    }
    if (results.length > 3) process.stdout.write(`    ... si ${results.length - 3} altele\n`);
  }
}

// Build final output for repo
const output = allJobs.map((j, i) => {
  const f_tag = [];
  const extra = {};
  for (const agent of AGENTS) {
    const idx = AGENTS.indexOf(agent);
    const r = agentResults[idx][i];
    if (r?.match) f_tag.push(agent.tag);
    extra[`${agent.name.toLowerCase()}_match_percentage`] = r?.matchPercentage ?? 0;
    extra[`${agent.name.toLowerCase()}_reason`] = r?.reason ?? '';
  }
  return {
    url: j.url,
    title: j.title,
    company: j.company,
    location: j.location,
    salary: j.salary,
    date: j.date,
    job_link: j.job_link,
    f_tag,
    ...extra,
  };
});

const outPath = '/home/sebi/github/ClujHackathon2026/jobs_ada_matched.json';
writeFileSync(outPath, JSON.stringify(output, null, 2));

// Stats
for (const agent of AGENTS) {
  const idx = AGENTS.indexOf(agent);
  const matched = agentResults[idx].filter(r => r?.match).length;
  process.stdout.write(`\n${agent.name} (${agent.tag}): ${matched}/${allJobs.length} match (${Math.round(matched/allJobs.length*100)}%)\n`);
}
process.stdout.write(`\nSalvat: ${outPath}\n`);
