# Structura fișierului `jobs_100.json`

`jobs_100.json` este un array JSON care conține **100 de obiecte job**. Fiecare obiect reprezintă un anunț de loc de muncă agregat din diverse surse (ANOFM, OLX, bestjobs, publi24, jobviewtrack, hipo, etc.).

---

## Câmpurile unui obiect job

| Câmp | Tip | Obligatoriu | Descriere |
|------|-----|-------------|-----------|
| `url` | `string` | da | Link-ul direct către anunțul original |
| `title` | `string` | da | Titlul postului |
| `company` | `string` | da | Numele companiei angajatoare |
| `location` | `string[]` | da | Lista de orașe/locații (de obicei un singur element) |
| `salary` | `string[]` | nu | Salariul exprimat ca string (ex: `"4000-6000 RON"`, `"1 RON"`) |
| `date` | `string` (ISO 8601) | nu | Data publicării anunțului (ex: `"2026-05-22T00:00:00Z"`) |
| `status` | `string` | da | Starea anunțului — întotdeauna `"published"` |
| `_version_` | `number` | da | Identificator intern de versionare (probabil SolR) |
| `_root_` | `string` | da | URL-ul rădăcină (de obicei identic cu `url`) |
| `f_tag` | `string[]` | da | Tag-ul (tag-urile) de filtrare — vezi secțiunea dedicată |

### Exemple de obiecte

**Cu salariu și dată:**
```json
{
  "url": "https://www.olx.ro/oferta/...",
  "title": "Ajutor instalator aer condiționat",
  "company": "KADIX CLIMA",
  "location": ["Bucuresti"],
  "salary": ["4000-6000 RON"],
  "date": "2026-05-21T00:00:00Z",
  "status": "published",
  "_version_": 1865967876689625093,
  "_root_": "https://www.olx.ro/oferta/...",
  "f_tag": ["UBVFMIIA"]
}
```

**Fără salariu și fără dată:**
```json
{
  "url": "https://jobviewtrack.com/v2/...",
  "title": "Femeie De Serviciu",
  "company": "TEKOS EXPERT SRL",
  "location": ["Sibiu"],
  "date": "2026-05-13T00:00:00Z",
  "status": "published",
  "_version_": 1865967876686479360,
  "_root_": "https://jobviewtrack.com/v2/...",
  "f_tag": ["UTCNAC"]
}
```

---

## Câmpul `f_tag` în detaliu

Câmpul `f_tag` (array de string-uri) asociază fiecare job cu una sau mai multe **persoane (agenți)** care caută activ un loc de muncă. Fiecare valoare din array corespunde numelui unui fișier Markdown din directorul `filter/` (fără extensia `.md`).

### Cum funcționează

1. În `filter/` există fișiere de tip `NUME.md` care descriu **competențele** unei persoane (curiculum universitar, skill-uri tehnice, certificări).
2. Un agent AI (definit în `agents/`) analizează fiecare anunț de job și, dacă skill-urile persoanei se potrivesc cu descrierea jobului, adaugă tag-ul respectiv în `f_tag`.
3. Astfel, un job poate fi etichetat cu mai multe tag-uri dacă se potrivește cu mai multe persoane.

### Valorile curente

| `f_tag` | Fișier filtru | Persoană / Profil |
|---------|---------------|-------------------|
| `"UTCNAC"` | `filter/UTCNAC.md` | Student/absolvent al **Facultății de Automatică și Calculatoare, UTCN** (Universitatea Tehnică Cluj-Napoca) — profil tehnic, automatică, informatică aplicată |
| `"UBVFMIIA"` | `filter/UBVFMIIA.md` | Student/absolvent al **Facultății de Matematică și Informatică Aplicată, Universitatea Transilvania din Brașov** — profil informatică aplicată |

### Exemplu cu tag-uri multiple

```json
"f_tag": ["UTCNAC", "UBVFMIIA"]
```

În acest caz, jobul se potrivește cu ambele persoane (deține competențe relevante pentru ambele profiluri).

---

## Surse de proveniență

Joburile sunt agregate din următoarele platforme:

- **ANOFM** — `https://mediere.anofm.ro/`
- **OLX** — `https://www.olx.ro/`
- **bestjobs** — `https://www.bestjobs.eu/`
- **publi24** — `https://www.publi24.ro/`
- **jobviewtrack** — URL-uri trackate (sursa originală poate varia)
- **hipo** — `https://www.hipo.ro/`
- **iajob** — `https://www.iajob.ro/`
- **oferimdemunca** — `https://oferimdemunca.ro/`
- **ceragon**, **hootsuite**, **mastercard**, **JTI**, **DIVERSEY**, etc. — cariere directe ale companiilor
