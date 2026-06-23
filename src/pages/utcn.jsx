import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Menu,
  X,
  ChevronDown,
  Search,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import acLogoImg from "../assets/ac_logo_small_complete.jpg";
import utcnLogoAlb from "../assets/utcn-logo-alb.png";

export default function Utcn({ onBack }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [iframeHeight, setIframeHeight] = useState(650);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'resize-iframe') {
        setIframeHeight(event.data.height);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const [isSticky, setIsSticky] = useState(false);

  const sliderImages = [
    "https://ac.utcluj.ro/files/Acasa/images/slide_images/HERO1rsz.png",
    "https://ac.utcluj.ro/files/Acasa/images/slide_images/HERO2rsz.png",
    "https://ac.utcluj.ro/files/Acasa/images/slide_images/HERO3rsz.png",
  ];

  // Auto-slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  // Load Roboto/Open Sans style font for UTCN
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..0,800;1,300..1,800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleScroll = (e) => {
    const scrollTop = e.currentTarget.scrollTop;
    const isLg = window.innerWidth >= 1024;
    const threshold = isLg ? 100 : 60;
    const shouldBeSticky = scrollTop > threshold;
    if (shouldBeSticky !== isSticky) {
      setIsSticky(shouldBeSticky);
    }
  };

  const headerClass = isSticky
    ? "sticky lg:fixed top-0 lg:top-0 left-0 w-full bg-white shadow-md z-40 h-[70px] lg:h-[80px] flex items-center border-b border-gray-100"
    : "sticky lg:absolute top-0 lg:top-[100px] lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-[calc(100%-4rem)] lg:max-w-7xl bg-white/95 lg:bg-white backdrop-blur-md lg:backdrop-blur-none z-40 border-b lg:border-none border-gray-100 lg:shadow-xl h-[80px] lg:h-[105px] flex items-center";

  return (
    <div
      onScroll={handleScroll}
      className="w-full min-h-screen bg-white text-slate-700 h-screen overflow-y-auto selection:bg-[#4261e4]/30 selection:text-[#4261e4]"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Floating Return Button */}
      <button
        onClick={onBack}
        className="fixed bottom-6 right-6 z-50 bg-[#4261e4] hover:bg-blue-700 text-white p-3.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group focus:outline-none"
        title="Înapoi la Selectorul de Universități"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-xs font-bold pr-1">Înapoi la Portal</span>
      </button>

      {/* Black Top Utility Bar */}
      <div className="utcn-topbar text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-auto px-4 md:px-8">
          <div className="flex items-center gap-4 h-full">
            <a
              href="https://www.utcluj.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src={utcnLogoAlb}
                alt="UTCN Logo"
                className="h-14 w-auto object-contain py-0.5 my-1"
              />
            </a>
          </div>
          <div className="flex gap-0 items-center font-bold text-[11px] h-full">
            <div className="hidden md:flex items-center gap-1.5 mr-4 border-r border-gray-700 pr-4 h-full py-1">
              <a
                href="https://www.instagram.com/ac.utcluj.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity"
                aria-label="Instagram"
              >
                <img
                  src="https://ac.utcluj.ro/files/Acasa/images/social_media_icons/instagram.png"
                  alt="Instagram Icon"
                  className="w-8 h-8 object-contain"
                />
              </a>
              <a
                href="https://www.tiktok.com/@ac.utcluj.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity"
                aria-label="TikTok"
              >
                <img
                  src="https://ac.utcluj.ro/files/Acasa/images/social_media_icons/tiktok.png"
                  alt="TikTok Icon"
                  className="w-8 h-8 object-contain"
                />
              </a>
              <a
                href="https://www.facebook.com/ac.utcluj.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity"
                aria-label="Facebook"
              >
                <img
                  src="https://ac.utcluj.ro/files/Acasa/images/social_media_icons/107153_circle_facebook_icon.png"
                  alt="Facebook Icon"
                  className="w-8 h-8 object-contain"
                />
              </a>
              <a
                href="https://www.linkedin.com/school/facultatea-de-automatic%C4%83-%C8%99i-calculatoare/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity"
                aria-label="LinkedIn"
              >
                <img
                  src="https://ac.utcluj.ro/files/Acasa/images/social_media_icons/linkedin.png"
                  alt="LinkedIn Icon"
                  className="w-8 h-8 object-contain"
                />
              </a>
              <a
                href="https://www.youtube.com/@AutomaticaSiCalculatoareUTCluj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity"
                aria-label="YouTube"
              >
                <img
                  src="https://ac.utcluj.ro/files/Acasa/images/social_media_icons/youtube.png"
                  alt="YouTube Icon"
                  className="w-8 h-8 object-contain"
                />
              </a>
              <a
                href="https://x.com/ACutclujro"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity"
                aria-label="Twitter"
              >
                <img
                  src="https://ac.utcluj.ro/files/Acasa/images/social_media_icons/twitter.png"
                  alt="Twitter Icon"
                  className="w-8 h-8 object-contain"
                />
              </a>
            </div>
            <a
              href="https://ac.utcluj.ro/home.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5173ff] transition-colors uppercase py-3 px-3.5"
            >
              English
            </a>
            <a
              href="http://www.utcluj.ro/telefoane/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#5173ff] transition-colors uppercase py-3 px-3.5"
            >
              Telefoane
            </a>
            <div className="utcn-intranet h-full flex items-center">
              <a
                href="http://intranet.utcluj.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#fefefe] uppercase py-3 px-4 flex items-center gap-1 h-full font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Intranet</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Top Header Navbar - Floating inside the carousel on desktop, sticky on mobile */}
      <header className={headerClass}>
        <div className="w-full lg:max-w-7xl mx-auto px-4 lg:px-8 flex justify-between items-center h-full">
          {/* Logo Brand */}
          <a href="#" className="flex items-center shrink-0">
            <img
              src={acLogoImg}
              alt="Logo AC UTCN"
              className={`${
                isSticky ? "h-[54px] lg:h-[70px]" : "h-[68px] lg:h-[87px]"
              } w-auto object-contain transition-all duration-300`}
            />
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4 font-bold text-xs text-slate-600 h-full">
            <a
              href="#"
              className="utcn-active-link text-white px-4 h-full flex items-center font-extrabold uppercase transition-colors"
            >
              Acasă
            </a>

            {/* Menu Items with Hover Dropdowns */}
            {[
              {
                title: "Prezentare",
                links: [
                  {
                    name: "Identitate vizuală",
                    href: "https://ac.utcluj.ro/identitate-vizuala.html",
                  },
                  {
                    name: "Misiune și obiective",
                    href: "https://ac.utcluj.ro/misiune-si-obiective.html",
                  },
                  {
                    name: "Plan operațional",
                    href: "https://ac.utcluj.ro/plan-operational.html",
                  },
                  {
                    name: "Plan strategic",
                    href: "https://ac.utcluj.ro/plan-strategic.html",
                  },
                  {
                    name: "Alegeri",
                    href: "https://ac.utcluj.ro/alegeri.html",
                  },
                ],
              },
              {
                title: "Structură",
                links: [
                  {
                    name: "Departamente",
                    href: "https://ac.utcluj.ro/departamente.html",
                  },
                  {
                    name: "Secretariat",
                    href: "https://ac.utcluj.ro/secretariat.html",
                  },
                  {
                    name: "ROF AC",
                    href: "https://ac.utcluj.ro/organigrama.html",
                  },
                  {
                    name: "Biroul consiliului",
                    href: "https://ac.utcluj.ro/biroul-consiliului.html",
                  },
                  {
                    name: "Dezbatere publică",
                    href: "https://ac.utcluj.ro/dezbatere-publica.html",
                  },
                  {
                    name: "Consiliul facultății și comisii",
                    href: "https://ac.utcluj.ro/consiliul-facultatii-si-comisiile.html",
                  },
                  {
                    name: "Hotărâri consiliu",
                    href: "https://ac.utcluj.ro/hotarari-consiliu.html",
                  },
                  {
                    name: "Rapoarte",
                    href: "https://ac.utcluj.ro/rapoarte.html",
                  },
                  {
                    name: "Școala doctorală",
                    href: "https://ac.utcluj.ro/scoala-doctorala.html",
                  },
                ],
              },
              {
                title: "Educație",
                links: [
                  {
                    name: "Oferta educațională",
                    href: "https://ac.utcluj.ro/oferta-educationala.html",
                  },
                  {
                    name: "Planuri de învățământ",
                    href: "https://ac.utcluj.ro/planuri-de-invatamant.html",
                  },
                  {
                    name: "Finalizare studii",
                    href: "https://ac.utcluj.ro/finalizare-studii.html",
                  },
                  {
                    name: "Structuri de cercetare",
                    href: "https://ac.utcluj.ro/structuri-de-cercetare.html",
                  },
                ],
              },
              {
                title: "Admitere",
                links: [
                  {
                    name: "Admitere licență",
                    href: "https://ac.utcluj.ro/admitere-licenta.html",
                  },
                  {
                    name: "Admitere master",
                    href: "https://ac.utcluj.ro/admitere-master.html",
                  },
                  {
                    name: "Admitere doctorat",
                    href: "https://ac.utcluj.ro/admitere-doctorat.html",
                  },
                ],
              },
              {
                title: "Studenți",
                links: [
                  {
                    name: "Fișă de lichidare",
                    href: "https://ac.utcluj.ro/fisa-de-lichidare.html",
                  },
                  { name: "Orar", href: "https://ac.utcluj.ro/orar.html" },
                  {
                    name: "Formulare utile",
                    href: "https://ac.utcluj.ro/formulare-utile.html",
                  },
                  {
                    name: "Practică",
                    href: "https://ac.utcluj.ro/practica.html",
                  },
                  { name: "Cazare", href: "https://ac.utcluj.ro/cazare.html" },
                  {
                    name: "Erasmus",
                    href: "https://ac.utcluj.ro/erasmus.html",
                  },
                  {
                    name: "Consilieri de studii",
                    href: "https://ac.utcluj.ro/consilieri-de-studii.html",
                  },
                  {
                    name: "Reprezentanți studenți (șefi de an)",
                    href: "https://ac.utcluj.ro/reprezentanti-studenti-sefi-de-an.html",
                  },
                  {
                    name: "Regulamente și taxe",
                    href: "https://ac.utcluj.ro/regulamente-si-taxe.html",
                  },
                  {
                    name: "Doctoranzi",
                    href: "https://ac.utcluj.ro/doctoranzi.html",
                  },
                  {
                    name: "Organizații",
                    href: "https://ac.utcluj.ro/organizatii.html",
                  },
                  {
                    name: "Consultant consilier de carieră",
                    href: "https://ac.utcluj.ro/studenti/consultant-consilier-de-cariera.html",
                  },
                  {
                    name: "Portal studenți websinu",
                    href: "https://websinu.utcluj.ro/",
                  },
                ],
              },
            ].map((menu) => (
              <div
                key={menu.title}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setActiveDropdown(menu.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="hover:text-[#4261e4] flex items-center gap-1 focus:outline-none transition-colors h-full px-3 uppercase font-extrabold text-slate-700">
                  <span>{menu.title}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === menu.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === menu.title && (
                  <div className="absolute left-0 top-full w-56 bg-white border border-gray-150 rounded-none shadow-lg py-2 z-50 animate-fade-in text-left">
                    {menu.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-[#4261e4]/5 hover:text-[#4261e4] transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Inline search input */}
            <div className="flex items-center gap-2 pl-4 border-l border-gray-150 h-full">
              {searchOpen ? (
                <div className="flex items-center bg-slate-50 border border-[#4261e4]/30 rounded-none px-2 py-1 animate-fade-in">
                  <input
                    type="text"
                    placeholder="Caută..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-xs outline-none w-28 text-slate-800 placeholder-slate-400 font-semibold"
                  />
                  <X
                    className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    onClick={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hover:text-[#4261e4] text-slate-500 focus:outline-none transition-colors p-2"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-[#4261e4] focus:outline-none p-1"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3.5 shadow-inner max-h-[85vh] overflow-y-auto text-left w-full absolute top-[60px] left-0">
            <a href="#" className="block font-bold text-[#4261e4] text-sm">
              Acasă
            </a>
            {[
              "Prezentare",
              "Structură",
              "Educație",
              "Admitere",
              "Studenți",
            ].map((menu) => (
              <div
                key={menu}
                className="space-y-1.5 border-l-2 border-gray-100 pl-3"
              >
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {menu}
                </span>
                <a
                  href="#"
                  className="block text-xs text-slate-600 hover:text-[#4261e4]"
                >
                  - Vezi secțiunea pe site
                </a>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Hero Image Slider (Matched 590px height) */}
      <section className="relative h-[250px] md:h-[450px] lg:h-[590px] overflow-hidden bg-slate-900">
        {sliderImages.map((imgUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/45 z-10"></div>
            <img
              src={imgUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transform scale-102"
            />
          </div>
        ))}
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-3 h-3 rounded-full border border-white transition-all ${
                idx === activeSlide
                  ? "bg-[#4261e4] scale-110 shadow"
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Blue Dashboard: Contact, Announcements, and Job Widget (Matched #4261e4 blue) */}
      <section className="utcn-blue-section text-white py-12 px-4 md:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Column */}
          <div className="lg:col-span-5 flex flex-col space-y-4 text-left">
            <h3 className="text-xl font-extrabold uppercase tracking-wide pb-1">
              Contact
            </h3>
            <ul className="space-y-1.5 text-xs text-white/90 leading-relaxed font-semibold">
              <li>Facultatea de Automatică și Calculatoare</li>
              <li>
                Adresă: Str. G. Barițiu nr. 26-28, 400027 Cluj-Napoca, România
              </li>
              <li className="pt-3">
                Decanat - Sala 48, Telefon: +40-264-401219
              </li>
              <li>Secretariat Decanat - Sala 48, Telefon: +40-264-401218</li>
              <li className="pb-3">
                Secretariat Studenți - Sala 45, Telefon (vezi contacte mai jos)
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://ac.utcluj.ro/secretariat.html"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-gray-100 text-[#4261e4] text-xs font-bold py-2.5 px-4 rounded-none shadow-sm transition-colors text-center inline-block"
              >
                Contact Secretariat
              </a>
              <a
                href="https://jr.utcluj.ro/jobrouter/index.php?cmd=PublicStart&ps=2b90cfb22d5b8c2627537b8a7df14883&username=PublicUser"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white hover:bg-white/10 text-white text-xs font-bold py-2.5 px-4 rounded-none transition-colors text-center inline-block"
              >
                Programări Online
              </a>
            </div>
          </div>

          {/* Announcements Column */}
          <div className="lg:col-span-4 flex flex-col space-y-4 text-left">
            <h3 className="text-xl font-extrabold uppercase tracking-wide pb-1">
              Anunțuri
            </h3>
            <div className="space-y-3.5 text-xs font-semibold leading-relaxed">
              {[
                {
                  date: "22-05-2026 11:43",
                  title:
                    "Hackathon-ul pentru Democratie, Strasbourg, 17-19 iunie 2026",
                  href: "https://ac.utcluj.ro/anunt/hackathon-ul-pentru-democratie-strasbourg-17-19-iunie-2026.html",
                },
                {
                  date: "19-05-2026 06:34",
                  title: "Festivitatea de absolvire UTCN 2026",
                  href: "https://ac.utcluj.ro/anunt/festivitatea-de-absolvire-utcn-2026.html",
                },
                {
                  date: "18-05-2026 05:13",
                  title: "Seminar informare_IMPACT+UTCN_21.05.2026",
                  href: "https://ac.utcluj.ro/anunt/seminar-informare-impact-utcn-21-05-2026.html",
                },
                {
                  date: "15-05-2026 12:16",
                  title:
                    "Sesiune vară și sesiune excepțională/Summer and exceptional exam session",
                  href: "https://ac.utcluj.ro/anunt/sesiune-iarna-restante-winter-retakes-exam-session-2.html",
                },
                {
                  date: "13-05-2026 09:11",
                  title:
                    "Planificarea pentru susținerea testelor de limbă engleză pentru candidații la admitere master Ingineria Sistemelor",
                  href: "https://ac.utcluj.ro/anunt/planificarea-pentru-sustinerea-testelor-de-limba-engleza-pentru-candidatii-la-admitere-master-ingineria-sistemelor.html",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border-b border-white/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-white/90 font-bold">{item.date}</span>
                  <span className="text-white/70 mx-1.5">-</span>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline transition-colors font-bold inline"
                  >
                    {item.title}
                  </a>
                </div>
              ))}
            </div>
            <a
              href="https://ac.utcluj.ro/anunturi.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white underline hover:text-white/85 inline-block font-bold pt-1"
            >
              Arhivă Anunțuri
            </a>
          </div>

          {/* Job Board Widget (White contrast theme against blue) */}
          <div className="lg:col-span-3 flex justify-center w-full">
            <iframe
              src={`#/widget?tag=UTCNAC&title=${encodeURIComponent("Facultatea de Automatică și Calculatoare UTCN")}&color=${encodeURIComponent("#4261e4")}&rounded=rounded-none`}
              width="100%"
              height={`${iframeHeight}px`}
              className="border-none bg-transparent max-w-[320px] mx-auto w-full transition-all duration-300"
              style={{ borderRadius: '0' }}
            />
          </div>
        </div>
      </section>

      {/* Main Sections Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Links List */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box 1: University */}
            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5 shadow-xs text-left">
              <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                Universitatea
              </h5>
              <ul className="space-y-3 text-xs font-bold text-slate-600">
                {[
                  {
                    name: "Despre universitate",
                    href: "https://www.utcluj.ro/universitatea/despre/",
                  },
                  {
                    name: "Conducerea",
                    href: "https://www.utcluj.ro/universitatea/conducere/",
                  },
                  {
                    name: "Educație",
                    href: "https://www.utcluj.ro/universitatea/educatie/",
                  },
                  {
                    name: "Cercetare",
                    href: "http://research.utcluj.ro/index.php/acasa.html",
                  },
                  {
                    name: "Facultăți",
                    href: "https://www.utcluj.ro/universitatea/facultati/",
                  },
                  {
                    name: "Structura Universității Tehnice",
                    href: "https://www.utcluj.ro/universitatea/structura/",
                  },
                  {
                    name: "Relații internaționale",
                    href: "http://bri.utcluj.ro/",
                  },
                  {
                    name: "Contact",
                    href: "https://www.utcluj.ro/universitatea/contact/",
                  },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#4261e4] transition-colors flex items-center justify-between group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 text-[#4261e4]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Admissions */}
            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5 shadow-xs text-left">
              <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                Admitere
              </h5>
              <ul className="space-y-3 text-xs font-bold text-slate-600">
                {[
                  {
                    name: "Admitere Licență",
                    href: "https://www.utcluj.ro/admitere/licenta/",
                  },
                  {
                    name: "Admitere Master",
                    href: "https://www.utcluj.ro/admitere/master/",
                  },
                  {
                    name: "Admitere Doctorat",
                    href: "http://iosud.utcluj.ro/admitere.html",
                  },
                  {
                    name: "Birou Admitere",
                    href: "https://www.utcluj.ro/birou-admitere/",
                  },
                  {
                    name: "Facilități",
                    href: "https://www.utcluj.ro/universitatea/facilitati/",
                  },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#4261e4] transition-colors flex items-center justify-between group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 text-[#4261e4]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 3: I am a Student */}
            <div className="bg-slate-50 border border-gray-100 rounded-xl p-5 shadow-xs text-left">
              <h5 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-4 border-b border-gray-200 pb-2">
                Sunt student
              </h5>
              <ul className="space-y-3 text-xs font-bold text-slate-600">
                {[
                  {
                    name: "Organizații Studențești",
                    href: "https://www.utcluj.ro/studenti/organizatii/",
                  },
                  {
                    name: "Regulamente studenți",
                    href: "https://www.utcluj.ro/universitatea/despre/regulamente/regulamente-studenti/",
                  },
                  {
                    name: "Mobilități",
                    href: "https://www.utcluj.ro/studenti/mobilitati/",
                  },
                  {
                    name: "Portal Studenți websinu",
                    href: "https://websinu.utcluj.ro/",
                  },
                  { name: "Biblioteca", href: "https://biblioteca.utcluj.ro/" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#4261e4] transition-colors flex items-center justify-between group"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 text-[#4261e4]" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Evenimente Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase border-b border-gray-100 pb-2.5 font-serif text-center lg:text-left">
                Evenimente
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex justify-center">
                  <article className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-350 group max-w-md w-full text-left">
                    <div className="h-44 overflow-hidden bg-slate-100 p-2 flex items-center justify-center">
                      <img
                        src="https://ac.utcluj.ro/files/Acasa/Site/documente/admitere/logo%20EUR-%20ACE.png"
                        alt="AIA EUR-ACE certificata"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold text-[#4261e4] block mb-1">
                        13-02-2023
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm mb-3 group-hover:text-[#4261e4] transition-colors leading-snug">
                        <a
                          href="https://ac.utcluj.ro/eveniment/automatica-si-informatica-aplicata-in-limba-engleza-certificata-eur-ace.html"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Automatica si Informatica Aplicata (in limba engleza)
                          certificata EUR-ACE
                        </a>
                      </h4>
                    </div>
                  </article>
                </div>
              </div>
              <div className="pt-3 d-flex items-center justify-center">
                <a
                  href="https://ac.utcluj.ro/evenimente.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4261e4] hover:bg-blue-700 text-white font-bold text-xs py-2 px-6 rounded-lg shadow-sm transition-colors text-center inline-block"
                >
                  Afișează toate
                </a>
              </div>
            </div>

            {/* Frequently Visited Pages (Spotlight grid layout) */}
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-slate-800 tracking-tight uppercase border-b border-gray-100 pb-2.5 font-serif text-center lg:text-left">
                Pagini vizitate frecvent
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    title: "Despre Universitate",
                    url: "https://www.utcluj.ro/universitatea/despre/",
                    image:
                      "https://www.utcluj.ro/media/astatic/facultati/images/new_images/Optimized-departamente4.jpg",
                    span: "md:col-span-2",
                  },
                  {
                    title: "Conducerea",
                    url: "https://www.utcluj.ro/universitatea/conducere/",
                    image:
                      "https://www.utcluj.ro/media/astatic/facultati/images/new_images/Optimized-educatie3.jpg",
                    span: "md:col-span-1",
                  },
                  {
                    title: "Cercetare",
                    url: "http://research.utcluj.ro/index.php/acasa.html",
                    image:
                      "https://www.utcluj.ro/media/astatic/facultati/images/new_images/Optimized-cercetare4.jpg",
                    span: "md:col-span-1",
                  },
                  {
                    title: "Portal studenti",
                    url: "https://websinu.utcluj.ro/",
                    image:
                      "https://www.utcluj.ro/media/astatic/facultati/images/new_images/Optimized-studenti.jpg",
                    span: "md:col-span-2",
                  },
                  {
                    title: "Admitere online",
                    url: "https://admitereonline.utcluj.ro",
                    image:
                      "https://www.utcluj.ro/media/astatic/facultati/images/new_images/admitere-facultati.jpg",
                    span: "md:col-span-2",
                  },
                ].map((box, idx) => (
                  <a
                    key={idx}
                    href={box.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative group overflow-hidden h-40 shadow-xs hover:shadow-md transition-all flex items-end p-5 ${box.span}`}
                  >
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-colors z-10"></div>
                    <img
                      src={box.image}
                      alt={box.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="relative z-20 w-full flex items-center justify-between text-white font-extrabold text-sm uppercase tracking-wide">
                      <span>{box.title}</span>
                      <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section (Matched real layout and columns) */}
      <footer className="bg-[#111622] text-gray-400 border-t border-[#1d273a] pt-14 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 text-xs text-left">
          {/* Logo brand footer */}
          <div className="md:col-span-4 flex flex-col space-y-4 items-center md:items-start">
            <div className="flex gap-4 items-center">
              <a
                href="https://www.utcluj.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={utcnLogoAlb}
                  alt="UTCN logo footer"
                  className="h-12 w-auto object-contain brightness-95 hover:brightness-100 transition-all"
                />
              </a>
              <div className="w-px h-10 bg-gray-700"></div>
              <a
                href="https://univ-tech.eu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://ac.utcluj.ro/files/Acasa/images/new_images/eut-logo.png"
                  alt="EUt+ logo footer"
                  className="h-12 w-auto object-contain brightness-95 hover:brightness-100 transition-all"
                />
              </a>
            </div>
            <p className="text-gray-500 text-[10px] leading-relaxed text-center md:text-left font-semibold">
              Universitatea Tehnică din Cluj-Napoca. O universitate de cercetare
              avansată și educație.
            </p>
          </div>

          {/* Cluj-Napoca columns */}
          <div className="md:col-span-3 space-y-3">
            <h6 className="text-white font-bold uppercase tracking-wider border-l-2 border-[#4261e4] pl-2">
              Cluj-Napoca
            </h6>
            <ul className="space-y-1.5 font-bold text-[11px]">
              <li>
                <a
                  href="http://fau.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Arhitectură și Urbanism
                </a>
              </li>
              <li>
                <a
                  href="http://ac.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Automatică și Calculatoare
                </a>
              </li>
              <li>
                <a
                  href="http://armm.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Autovehicule Rutiere, Mecatronică și Mecanică
                </a>
              </li>
              <li>
                <a
                  href="http://constructii.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Construcții
                </a>
              </li>
              <li>
                <a
                  href="http://cm.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Inginerie Industrială, Robotică și Management
                </a>
              </li>
              <li>
                <a
                  href="http://etti.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Electronică, Telecomunicații și IT
                </a>
              </li>
              <li>
                <a
                  href="http://imm.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Ingineria Materialelor și a Mediului
                </a>
              </li>
              <li>
                <a
                  href="http://ie.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Inginerie Electrică
                </a>
              </li>
              <li>
                <a
                  href="http://instalatii.utcluj.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Inginerie a Instalațiilor
                </a>
              </li>
            </ul>
          </div>

          {/* Baia Mare & Extensions */}
          <div className="md:col-span-3 space-y-4">
            <div className="space-y-2.5">
              <h6 className="text-white font-bold uppercase tracking-wider border-l-2 border-[#4261e4] pl-2">
                C.U. Nord Baia Mare
              </h6>
              <ul className="space-y-1.5 font-bold text-[11px]">
                <li>
                  <a
                    href="http://inginerie.utcluj.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facultatea de Inginerie
                  </a>
                </li>
                <li>
                  <a
                    href="http://litere.utcluj.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facultatea de Litere
                  </a>
                </li>
                <li>
                  <a
                    href="http://stiinte.utcluj.ro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facultatea de Științe
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2.5 pt-1">
              <h6 className="text-white font-bold uppercase tracking-wider border-l-2 border-[#4261e4] pl-2">
                Extensii
              </h6>
              <ul className="space-y-1.5 font-bold text-[11px]">
                <li>
                  <a
                    href="https://albaiulia.utcluj.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Alba Iulia
                  </a>
                </li>
                <li>
                  <a
                    href="https://bistrita.utcluj.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Bistrița
                  </a>
                </li>
                <li>
                  <a
                    href="https://satumare.utcluj.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Satu Mare
                  </a>
                </li>
                <li>
                  <a
                    href="https://zalau.utcluj.ro/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Zalău
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Admissions & Students links */}
          <div className="md:col-span-2 space-y-4">
            <div className="space-y-2.5">
              <h6 className="text-white font-bold uppercase tracking-wider border-l-2 border-[#4261e4] pl-2">
                Admitere
              </h6>
              <ul className="space-y-1.5 font-bold text-[11px]">
                <li>
                  <a
                    href="http://www.utcluj.ro/admitere/licenta/"
                    className="hover:text-white transition-colors"
                  >
                    Admitere licență
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.utcluj.ro/admitere/master/"
                    className="hover:text-white transition-colors"
                  >
                    Admitere master
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.utcluj.ro/admitere/doctorat/"
                    className="hover:text-white transition-colors"
                  >
                    Admitere doctorat
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-2.5 pt-1">
              <h6 className="text-white font-bold uppercase tracking-wider border-l-2 border-[#4261e4] pl-2">
                Pentru Studenți
              </h6>
              <ul className="space-y-1.5 font-bold text-[11px]">
                <li>
                  <a
                    href="http://www.utcluj.ro/studenti/portal"
                    className="hover:text-white transition-colors"
                  >
                    Portal studenți
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.utcluj.ro/studenti/organizatii/"
                    className="hover:text-white transition-colors"
                  >
                    Organizații studențești
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.utcluj.ro/studenti/regulamente/"
                    className="hover:text-white transition-colors"
                  >
                    Regulamente studenți
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.utcluj.ro/campus/"
                    className="hover:text-white transition-colors"
                  >
                    Campusul studențesc
                  </a>
                </li>
                <li>
                  <a
                    href="http://utcluj.ro/biblioteca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Biblioteca
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#1d273a]/60 text-[10px] text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-4 text-left">
          <div className="flex gap-4">
            <a
              href="http://www.utcluj.ro"
              className="hover:text-white transition-colors"
            >
              UTCN
            </a>
            <span>&middot;</span>
            <a
              href="http://www.utcluj.ro/universitatea/despre/informatii-publice/"
              className="hover:text-white transition-colors"
            >
              Informații Publice
            </a>
            <span>&middot;</span>
            <a
              href="http://www.utcluj.ro/universitatea/despre/regulamente/"
              className="hover:text-white transition-colors"
            >
              Regulamente și proceduri
            </a>
            <span>&middot;</span>
            <a
              href="https://www.utcluj.ro/termeni-si-conditii/"
              className="hover:text-white transition-colors"
            >
              Politică de Confidențialitate
            </a>
          </div>
          <p className="rights text-center sm:text-right">
            &copy; {new Date().getFullYear()} Universitatea Tehnică din
            Cluj-Napoca. Toate drepturile rezervate.
          </p>
        </div>
      </footer>
    </div>
  );
}
