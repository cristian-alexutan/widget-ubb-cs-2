import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const TAG_FILE = 'local_tag.md';

function readTagFile() {
  const text = readFileSync(TAG_FILE, 'utf-8').trim();
  const lines = text.split('\n').map(l => l.trim());
  const tag = lines[0];
  const sourceLine = lines.find(l => l.startsWith('sursa:') || l.startsWith('sursa :'));
  const source = sourceLine
    ? sourceLine.replace(/^sursa\s*:\s*/, '')
    : '';

  if (!tag) throw new Error(`No tag found in ${TAG_FILE}`);
  if (!source) throw new Error(`No sursa found in ${TAG_FILE}`);

  return { tag, source };
}

async function main() {
  const { tag, source } = readTagFile();
  const outputPath = `filter/${tag}.md`;

  console.error(`Tag: ${tag}`);
  console.error(`Source: ${source}`);
  console.error(`Output: ${outputPath}`);

  const prompt = `Esti un asistent care genereaza planuri de invatamant complete pentru facultati din Romania in format Markdown.

Sarcina ta:
1. Acceseaza URL-ul: ${source}
2. Extrage TOATE specializarile/programele de licenta mentionate acolo
3. Pentru fiecare specializare, extrage TOATE disciplinele pe ani si semestre
4. Grupeaza disciplinele corect: obligatorii, optionale
5. Scrie rezultatul direct in fisierul ${outputPath}

Reguli stricte:
- Pastreaza denumirea exacta a facultatii, specializarilor si disciplinelor
- NU adauga sau inventa discipline care nu exista in sursa
- Daca nu gasesti toate informatiile, specifica ce ai gasit si ce lipseste
- Formateaza intr-un mod clar, cu tabele pentru fiecare semestru
- NU adauga niciun text in plus in fisier — doar continutul markdown

Exemplu de format:
\`\`\`markdown
# Nume Facultate — Nume Universitate

## 1. Specializarea X

### Anul I

#### Semestrul 1

| Disciplina | Tip |
|---|---|
| Disciplina 1 | Obligatorie |
| Disciplina 2 | Obligatorie |

#### Semestrul 2

| Disciplina | Tip |
|---|---|
| Disciplina 3 | Obligatorie |
\`\`\``;

  console.error('Generating curriculum...');
  execSync(`opencode run --model opencode/big-pickle --dangerously-skip-permissions ${JSON.stringify(prompt)}`,
    { timeout: 600000, encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024, shell: true, stdio: 'inherit' });

  console.error(`Done — check ${outputPath}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
