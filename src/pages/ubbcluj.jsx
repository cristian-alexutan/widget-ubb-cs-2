import { useState, useEffect } from "react";
import { ArrowLeft, Clock } from "lucide-react";

const THEME = "https://www.cs.ubbcluj.ro/wp-content/themes/CSUBB";
const SITE = "https://www.cs.ubbcluj.ro";

const MENU = [
  {
    label: "Studenţi",
    href: `${SITE}/studenti/`,
    items: [
      "Anunţuri studenţi",
      "Documente pentru studenţi",
      "Taxe",
      "Lista studenţilor",
      "Tutoriat şi consultaţii",
      "Practică",
      "Burse, cazare, tabere",
      "Examen de licenţă şi disertaţie",
      "Manifestări științifice studențești",
      "Concursuri",
      "Legături utile",
    ],
  },
  {
    label: "Cadre didactice",
    href: `${SITE}/cadre-didactice/`,
    items: [
      "Anunţuri cadre didactice",
      "Anunturi personal didactic auxiliar",
      "Documente pentru personalul didactic",
      "Lista cadrelor didactice",
      "Legături utile pentru cadrele didactice",
    ],
  },
  {
    label: "Învăţământ",
    href: `${SITE}/invatamant/oferta-educationala-a-facultatii-de-matematica-si-informatica/`,
    items: [
      "Oferta educaţională",
      "Programe academice",
      "Planuri de învăţământ",
      "Programe postuniversitare",
      "Formare continuă și cursuri deschise",
      "Structura anului universitar",
    ],
  },
  {
    label: "Cercetare",
    href: `${SITE}/cercetare/`,
    items: [
      "Reviste",
      "Conferinţe",
      "Şcoli de vară",
      "Centre şi grupuri de cercetare acreditate",
      "Comunicări",
    ],
  },
  {
    label: "Alumni",
    href: `${SITE}/alumni/`,
    items: [
      "Înscrieți-vă în comunitatea Alumni",
      "Informaţii",
      "Întâlniri ale absolvenţilor",
      "Anunţuri alumni",
      "Poveşti de succes",
    ],
  },
  {
    label: "Legislaţie",
    href: `${SITE}/legislatie/`,
    items: [
      "Legislaţie naţională",
      "Reglementări interne ale universităţii",
      "Reglementări interne ale facultăţii",
    ],
  },
  {
    label: "Despre facultate",
    href: `${SITE}/despre-facultate/`,
    items: [
      "Conducerea",
      "Structura",
      "Asigurarea calității",
      "Organigrama facultăţii",
      "Dotări şi facilităţi",
      "Istoric",
      "Contact",
    ],
  },
  {
    label: "Admitere",
    href: `${SITE}/admitere/`,
    items: [
      "Anunţuri admitere",
      "Nivel licenţă",
      "Nivel masterat",
      "Nivel doctorat",
      "Programe postuniversitare",
      "Admiterea în anii precedenți",
    ],
  },
];

const SOCIAL_ICONS = [
  "tiktok",
  "instagram",
  "linkedin",
  "facebook",
  "youtube",
  "email",
  "rss",
  "twitter",
];

const POSTS = [
  {
    title:
      "Locuri scoase la concurs pentru admiterea nivel master, sesiunea iulie 2026",
    date: "12.06.2026",
    excerpt:
      "Domeniul Matematică: Matematică computațională (în limba maghiară), Metode moderne în predarea matematicii, Matematici avansate (în limba engleză). Domeniul Informatică: Analiza datelor și modelare, Inteligență artificială aplicată, Inginerie software, Securitate cibernetică...",
    href: `${SITE}/admitere/`,
  },
  {
    title:
      "Locuri scoase la concurs pentru admiterea nivel licență, sesiunea iulie 2026",
    date: "12.06.2026",
    excerpt:
      "Specializările Informatică (română, engleză, germană, maghiară), Inteligență Artificială (engleză), Ingineria Informației, Matematică, Matematică-Informatică și Matematică-Informatică — dublă specializare. Detalii despre locurile la buget, CPV și taxă...",
    href: `${SITE}/admitere/`,
  },
  {
    title:
      "Burse 2026 pentru studenții UBB nivel Master la programul AI4CI (Artificial Intelligence for Connected Industries)",
    date: "05.06.2026",
    excerpt:
      "Studenții de la nivel master pot aplica pentru bursele oferite în cadrul programului AI4CI — Artificial Intelligence for Connected Industries. Calendarul depunerii dosarelor și criteriile de eligibilitate sunt disponibile în anunț...",
    href: SITE,
  },
  {
    title: "Finalizare studii iunie/iulie 2026",
    date: "28.05.2026",
    excerpt:
      "Informații privind înscrierea la examenul de licență și disertație, calendarul probelor, comisiile de examinare și depunerea lucrărilor pentru sesiunea iunie/iulie 2026...",
    href: `${SITE}/studenti/`,
  },
];

const SIDEBAR_LINKS = [
  "Tabere studențești în vacanța de vară 2026",
  "Anunț privind completarea contractelor de studiu pentru anul universitar 2026/2027",
  "Încasarea taxelor pentru examenele restante din sesiunea de vară, mai-iunie 2026",
  "Finalizare studii iunie/iulie 2026",
  "Acces la resursele, conturile și serverele oferite de universitate și facultate",
  "Eliberarea adeverinţelor de student",
];

function WidgetTitle({ children }) {
  return (
    <div className="text-[#414445] text-[16px] leading-[20px] font-bold uppercase border-b-2 border-[#bbbbbb] mb-[10px] py-[7px] pl-[6px]">
      {children}
    </div>
  );
}

export default function UbbCluj({ onBack }) {
  const [iframeHeight, setIframeHeight] = useState(650);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === "resize-iframe") {
        setIframeHeight(event.data.height);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      className="w-full min-h-screen h-screen overflow-y-auto bg-white text-[#1B1E1F]"
      style={{
        fontFamily: "Tahoma, Arial, Helvetica, sans-serif",
        fontSize: "13px",
        background: `#fff url(${THEME}/images/background.png) left top repeat-x`,
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          className="fixed bottom-6 right-6 z-50 bg-[#4D5B59] hover:bg-[#2C3231] text-white p-3.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group focus:outline-none"
          title="Înapoi la Selectorul de Universități"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-bold pr-1">Înapoi la Portal</span>
        </button>
      )}

      <div className="w-[960px] max-w-full mx-auto px-2 lg:px-0">
        <div className="flex flex-wrap items-center justify-between py-[20px] min-h-[80px]">
          <a href={SITE} target="_blank" rel="noopener noreferrer">
            <img
              src={`${THEME}/images/logo.png`}
              alt="Facultatea de Matematică și Informatică"
              className="max-h-[80px] w-auto"
            />
          </a>
          <div className="flex flex-col items-end gap-2 pt-1">
            <input
              type="text"
              defaultValue=""
              placeholder="Căutare"
              title="Tastaţi şi apăsaţi Enter"
              className="border border-[#ccc] bg-white text-[12px] px-2 py-1 w-[180px] outline-none focus:border-[#608ca4]"
            />
            <div className="flex items-center">
              {SOCIAL_ICONS.map((name) => (
                <a
                  key={name}
                  href={SITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <img
                    src={`${THEME}/images/social-profiles/${name}.png`}
                    alt={name}
                    className="h-[24px] w-auto mr-[6px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav
          className="relative z-[400] mt-px h-auto lg:h-[46px]"
          style={{
            background: `#2C3231 url(${THEME}/images/menu-primary-bg.png) left top repeat-x`,
          }}
        >
          <ul className="flex flex-wrap items-stretch text-white">
            <li>
              <a
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center h-[46px] px-[10px] hover:bg-black/20"
              >
                <img src={`${THEME}/images/home.png`} alt="Acasă" className="h-4 w-auto" />
              </a>
            </li>
            {MENU.map((m) => (
              <li key={m.label} className="relative group">
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center h-[46px] px-[8px] uppercase text-[11px] text-white hover:bg-black/20 whitespace-nowrap"
                >
                  {m.label}
                </a>
                <ul className="hidden group-hover:block absolute left-0 top-full min-w-[177px] bg-[#4D5B59] shadow-lg z-50">
                  {m.items.map((it) => (
                    <li key={it} className="border-b border-black/10 last:border-0">
                      <a
                        href={m.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-[15px] py-[10px] text-[11px] text-white hover:bg-[#3d4a48] whitespace-nowrap"
                      >
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li className="ml-auto flex items-center gap-[7px] pr-[10px]">
              <a href={SITE} target="_blank" rel="noopener noreferrer" title="Română">
                <span className="block w-[16px] h-[11px]"
                  style={{
                    background: "linear-gradient(to right, #002B7F 33%, #FCD116 33%, #FCD116 66%, #CE1126 66%)",
                  }}
                />
              </a>
              <a href={`${SITE}/en/`} target="_blank" rel="noopener noreferrer" title="English">
                <span className="block w-[16px] h-[11px] bg-[#012169] relative overflow-hidden">
                  <span className="absolute inset-0 flex items-center justify-center text-[7px] text-white font-bold">EN</span>
                </span>
              </a>
              <a href={SITE} target="_blank" rel="noopener noreferrer" title="Magyar">
                <span className="block w-[16px] h-[11px]"
                  style={{
                    background: "linear-gradient(to bottom, #CE2939 33%, #fff 33%, #fff 66%, #477050 66%)",
                  }}
                />
              </a>
              <a href={SITE} target="_blank" rel="noopener noreferrer" title="Deutsch">
                <span className="block w-[16px] h-[11px]"
                  style={{
                    background: "linear-gradient(to bottom, #000 33%, #DD0000 33%, #DD0000 66%, #FFCE00 66%)",
                  }}
                />
              </a>
            </li>
          </ul>
        </nav>

        <div className="bg-white pb-[15px] pt-[15px] flex flex-col lg:flex-row gap-[15px]">
          <div className="w-full lg:w-[645px] shrink-0 px-2 lg:px-0">
            <div className="ml-[13px] text-[#414445] text-[16px] leading-[20px] font-bold uppercase mb-2">
              Viaţa bate filmul! Descoperă Facultatea de Matematică şi Informatică în 8 minute!
            </div>
            <div className="mb-6">
              <iframe
                title="Descoperă Facultatea de Matematică şi Informatică"
                width="416"
                height="234"
                src="https://www.youtube.com/embed/ZU8XxwLL26o?rel=0&hl=ro"
                allowFullScreen
                className="border border-[#dddddd] max-w-full"
              />
            </div>

            {POSTS.map((p) => (
              <div key={p.title} className="border-b border-dashed border-[#bbbbbb] pb-4 mb-5 overflow-hidden">
                <h2 className="text-[17px] leading-[22px] font-bold mb-[10px]">
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-[#1B1E1F] hover:text-[#608ca4]">
                    {p.title}
                  </a>
                </h2>
                <div className="flex items-center gap-1.5 text-[12px] leading-[18px] text-[#AEACA4] pb-[10px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{p.date}</span>
                </div>
                <p className="text-[13px] leading-[19px] text-[#1B1E1F] mb-2">{p.excerpt}</p>
                <a href={p.href} target="_blank" rel="noopener noreferrer"
                  className="float-right mt-[8px] px-[8px] py-[4px] text-[12px] leading-[12px] text-[#535A59] bg-[#E1E3C9] border border-[#E1E3C9] hover:bg-white hover:text-[#2C3231] hover:border-[#bbbbbb]"
                >
                  Vezi restul anunţului
                </a>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[300px] shrink-0 px-2 lg:px-0">
            <div className="mb-6">
              <WidgetTitle>Joburi pentru studenți și absolvenți</WidgetTitle>
              <iframe
                src={`#/widget?tag=UBBFMI&title=${encodeURIComponent("Facultatea de Matematică și Informatică UBB")}&color=${encodeURIComponent("#608ca4")}&rounded=rounded-none`}
                width="100%"
                height={`${iframeHeight}px`}
                className="border-none bg-transparent w-full max-w-[320px] transition-all duration-300"
                title="Joburi peViitor"
              />
            </div>

            <div className="mb-6">
              <WidgetTitle>Concursul Mate-Info UBB 2026</WidgetTitle>
              <div className="text-[13px] leading-[18px]">
                <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-[#47504F] hover:text-[#608ca4]">
                  Concurs de matematică și informatică pentru elevi — admitere fără examen pentru premianți. Detalii și regulament.
                </a>
              </div>
            </div>

            <div className="mb-6">
              <WidgetTitle>Informații utile și de actualitate pentru studenți</WidgetTitle>
              <ul>
                {SIDEBAR_LINKS.map((l) => (
                  <li key={l} className="border-b border-dashed border-[#bbbbbb] pb-[9px] mb-[8px] pl-[12px] relative">
                    <span className="absolute left-0 top-[5px] w-[5px] h-[5px] bg-[#608ca4]" />
                    <a href={`${SITE}/studenti/`} target="_blank" rel="noopener noreferrer" className="text-[#47504F] leading-[18px] hover:text-[#608ca4]">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <WidgetTitle>Următoarele evenimente găzduite de facultate</WidgetTitle>
              <ul>
                <li className="border-b border-dashed border-[#bbbbbb] pb-[9px] mb-[8px] pl-[12px] relative">
                  <span className="absolute left-0 top-[5px] w-[5px] h-[5px] bg-[#608ca4]" />
                  <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-[#47504F] leading-[18px] hover:text-[#608ca4]">
                    Sesiunea de comunicări științifice studențești — iunie 2026
                  </a>
                </li>
                <li className="border-b border-dashed border-[#bbbbbb] pb-[9px] mb-[8px] pl-[12px] relative">
                  <span className="absolute left-0 top-[5px] w-[5px] h-[5px] bg-[#608ca4]" />
                  <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-[#47504F] leading-[18px] hover:text-[#608ca4]">
                    Festivitatea de absolvire a promoției 2026 — nivel master
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#4D5B59] text-white px-[15px] pt-[20px] pb-[15px] mb-[10px] flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="text-[14px] font-bold uppercase border-b border-[#2A3533] pb-[4px] mb-[10px]">Contact</div>
            <p className="text-[12px] leading-[18px]">
              Str. Mihail Kogălniceanu nr. 1<br />
              RO-400084 Cluj-Napoca<br />
              Tel: +40 264 405300<br />
              E-mail:{" "}
              <a href="mailto:math@ubbcluj.ro" className="text-white underline hover:text-[#9fc0d3]">math@ubbcluj.ro</a>
            </p>
          </div>
          <div className="md:w-1/3">
            <div className="text-[14px] font-bold uppercase border-b border-[#2A3533] pb-[4px] mb-[10px]">Legături utile</div>
            <ul className="text-[12px] leading-[18px] space-y-1">
              <li><a href="https://academicinfo.ubbcluj.ro" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9fc0d3] hover:underline">AcademicInfo</a></li>
              <li><a href="https://www.ubbcluj.ro/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9fc0d3] hover:underline">Universitatea Babeș-Bolyai</a></li>
              <li><a href="https://www.bcucluj.ro/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#9fc0d3] hover:underline">Biblioteca Centrală Universitară</a></li>
            </ul>
          </div>
          <div className="md:w-1/3">
            <div className="text-[14px] font-bold uppercase border-b border-[#2A3533] pb-[4px] mb-[10px]">Urmărește-ne</div>
            <div className="flex flex-wrap items-center">
              {SOCIAL_ICONS.map((name) => (
                <a key={name} href={SITE} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                  <img src={`${THEME}/images/social-profiles/${name}.png`} alt={name} className="h-[24px] w-auto mr-[6px] mb-[6px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[12px] leading-[18px] text-[#47504F] pb-[60px] px-2 lg:px-0">
          &copy; 1996-2026 | Facultatea de Matematică și Informatică, Universitatea Babeș-Bolyai Cluj-Napoca |{" "}
          <a href="https://www.ubbcluj.ro/ro/protectia_datelor/" target="_blank" rel="noopener noreferrer" className="text-[#608ca4] hover:underline">Protecția datelor cu caracter personal</a>{" "}
          .{" "}
          <a href={SITE} target="_blank" rel="noopener noreferrer" className="text-[#608ca4] hover:underline">Politica de utilizare a cookie-urilor</a>{" "}
          | Webmaster: Conf. dr. Darius Bufnea (webmaster[at]cs.ubbcluj.ro)
        </div>
      </div>
    </div>
  );
}
