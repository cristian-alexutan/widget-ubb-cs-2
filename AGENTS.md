# Agenți & Pipeline

## Fluxul datelor

```
peviitor API  ──►  script (ada_check.mjs)  ──►  agenți (opencode)  ──►  jobs_ada_matched.json
                                                                              │
                                                                              ▼
                                                                      jobs_100.json (subset pentru frontend)
```

1. **Surse joburi**: API-ul peviitor (`https://api.peviitor.ro/v1/search/`) interogat cu termeni ca `software`, `engineer`, `developer`, `programator`, `it`, `ai`, `data`, `embedded`, `automation`, `robot`, `python`, `java`, `web`, `internship`, `intern`, `junior`.
2. **Script**: `scripts/ada_check.mjs` adună joburile unice, extrage descrierile, și le trimite agenților AI.
3. **Agenți AI**: Fiecare agent analizează descrierile și decide dacă jobul se potrivește cu skill-urile persoanei pe care o reprezintă.
4. **Rezultat**: Joburile matcheate primesc `f_tag`-ul agentului respectiv și sunt salvate în `jobs_ada_matched.json`.

---

## Agenți existenți

| Agent | Fișier profil | `f_tag` | Facultatea |
|-------|---------------|---------|------------|
| **Ada** | `agents/Ada.md` | `UTCNAC` | Automatică și Calculatoare, UTCN |
| **Medeea** | `agents/Medeea.md` | `UBVFMIIA` | Informatică Aplicată, Univ. Transilvania Brașov |

### Ada

- Studentă la **Facultatea de Automatică și Calculatoare, UTCN**
- Skill-uri: programare (C/C++/Java/Python), AI/ML/Deep Learning/Computer Vision, embedded, automatizări, rețele, securitate
- Rulează pe promptul din `scripts/ada_check.mjs` și filtrează joburi potrivite pentru nivel internship/junior/mid

### Medeea

- Studentă la **Informatică Aplicată, Universitatea Transilvania din Brașov**
- Skill-uri: programare (C/C++/Java/Python/OOP), web (Angular, .Net), mobile (Android), AI/ML/NLP/LLM, cloud, testare, Unity, grafică 3D
- Rulează pe promptul din `scripts/ada_check.mjs` și filtrează joburi potrivite pentru nivel internship/junior/mid

---

## Validare URL-uri

Înainte de a publica `jobs_100.json`, toate URL-urile trebuie verificate să returneze HTTP 200 (nu 404). Script de test:

```bash
node -e "
const j = require('./jobs_100.json');
async function check() {
  for (let i = 0; i < j.length; i++) {
    try {
      const r = await fetch(j[i].url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' }, signal: AbortSignal.timeout(10000) });
      console.log((i+1) + '. ' + r.status + ' ' + j[i].title);
    } catch(e) {
      console.log((i+1) + '. ERROR ' + j[i].title + ' - ' + e.message.substring(0,60));
    }
  }
}
check();
"
```

Orice URL cu status diferit de 200 trebuie înlocuit sau eliminat înainte de commit.

---

## Cum se adaugă un agent nou

Vezi `INSTRUCTIONS.md` — pașii sunt:

1. Creează fișierul de profil în `filter/NUME.md` (competențele persoanei)
2. Creează agentul în opencode
3. Actualizează workflow-ul n8n
4. Adaugă `f_tag` în jobs

---

## Fișiere relevante

| Fișier | Rol |
|--------|-----|
| `scripts/ada_check.mjs` | Script principal: extrage joburi din API, rulează agenții, generează `jobs_ada_matched.json` |
| `agents/Ada.md` | Profilul agentului Ada (prompt + skill-uri) |
| `agents/Medeea.md` | Profilul agentului Medeea (prompt + skill-uri) |
| `filter/UTCNAC.md` | Curriculum-ul UTCN Automatică și Calculatoare |
| `filter/UBVFMIIA.md` | Curriculum-ul UBV Informatică Aplicată |
| `jobs_100.json` | Subset de joburi folosit de frontend (cu fallback local) |
| `jobs_ada_matched.json` | Output complet după procesarea agenților |
| `src/services/api.js` | Frontend: încarcă `jobs_100.json` din GitHub, cu fallback local |
