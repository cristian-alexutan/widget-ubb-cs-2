import { readFileSync, existsSync, mkdirSync } from 'fs';
import { execSync } from 'child_process';

const TAG_PATH = 'local_tag.md';
const AGENTS_DIR = 'agents';
const AGENT_FILE = `${AGENTS_DIR}/student.md`;

const tag = readFileSync(TAG_PATH, 'utf-8').split('\n')[0].trim().replace(/ sursa:.*$/, '');
const filterPath = `filter/${tag}.md`;

if (!existsSync(filterPath)) {
  console.error(`Filter file not found: ${filterPath}`);
  process.exit(1);
}

if (!existsSync(AGENTS_DIR)) {
  mkdirSync(AGENTS_DIR, { recursive: true });
}

const curriculum = readFileSync(filterPath, 'utf-8');

const prompt = `Esti un generator de agenti studenti. Pe baza curriculumului unei facultati, generezi un fisier Markdown pentru un agent student care va analiza joburi.

Scrie rezultatul direct in fisierul ${AGENT_FILE}.

URMATI EXACT aceasta structura:

# Student Agent

You are **Student**, a student at the **FACULTATEA SI UNIVERSITATEA**.

## Your Profile

You are a hard-working student looking for job opportunities that match your studies.

## Your Skills (from the TAG curriculum)

### Category Name
- skill from curriculum
- skill from curriculum

### Another Category
- skill from curriculum

## Your Mission

When given a job description: analyze, match against your skills, score 0-100%, identify matching/missing skills, explain.

## Output Format

\`\`\`json
{
  "match": true/false,
  "matchPercentage": 0-100,
  "matchingSkills": ["skill1"],
  "missingSkills": ["skill1"],
  "explanation": "text"
}
\`\`\`

ACUM pe baza acestui curriculum:

${curriculum}

Genereaza ${AGENT_FILE}. Numele agentului: "Student". Extrage skillurile din materii si grupeaza-le pe categorii logice. Engleza.`;

console.error(`Generating student agent for ${tag}...`);
execSync(
  `opencode run --model opencode/big-pickle --dangerously-skip-permissions ${JSON.stringify(prompt)}`,
  { timeout: 900000, encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024, shell: true, stdio: 'inherit' }
);
console.error(`Done — check ${AGENT_FILE}`);
