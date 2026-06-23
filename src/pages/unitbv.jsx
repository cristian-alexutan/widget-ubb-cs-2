import { useState, useEffect } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  Settings,
  Award,
  Bookmark,
  Compass,
  CheckCircle2,
  Trophy,
  ArrowLeft,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Search,
  ExternalLink,
} from "lucide-react";
import roFlag from "../assets/ro.gif";
import enFlag from "../assets/en.gif";
import logoImg from "../assets/UNIVTB-01.png";

// CountUp Component for stats counters
function CountUp({ to, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const startValue = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (to - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    requestAnimationFrame(animate);
  }, [to, duration]);

  return <span>{count}</span>;
}

export default function MateInfoUnitbv({ onBack }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStudentsDropdownOpen, setIsStudentsDropdownOpen] = useState(false);
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

  const sliderImages = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1600&q=80",
  ];

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Auto-slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  return (
    <div
      className="w-full min-h-screen bg-white text-slate-700 h-screen overflow-y-auto selection:bg-[#007A87]/30 selection:text-[#007A87]"
      style={{ fontFamily: "'Ubuntu', sans-serif" }}
    >
      {/* Floating Return Button */}
      <button
        onClick={onBack}
        className="fixed bottom-6 right-6 z-50 bg-[#007A87] hover:bg-[#005f69] text-white p-3.5 rounded-full shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group focus:outline-none"
        title="Înapoi la Selectorul de Universități"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-xs font-bold pr-1">Înapoi la Portal</span>
      </button>

      {/* Sup Top Utility Bar */}
      <div
        id="sup-top"
        className="bg-[#1c2834] text-gray-300 text-xs py-2 px-4 md:px-8 border-b border-[#2d3e50]"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <a
              href="https://mateinfo.unitbv.ro/ro/ssmr.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors font-medium hover:underline flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#007A87]"></span>
              SSMR (Societatea de Științe Matematice)
            </a>
          </div>
          <div className="flex gap-4 md:gap-6 items-center">
            <a
              href="https://elearning.unitbv.ro/login/index.php"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 hover:underline"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>E-learning</span>
            </a>
            <a
              href="https://student.unitbv.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 hover:underline"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>E-mail</span>
            </a>
            <a
              href="https://intranet.unitbv.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Intranet</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Header Navbar */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center py-3.5">
          {/* Logo Brand */}
          <a
            href="https://mateinfo.unitbv.ro/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center shrink-0"
          >
            <img
              src={logoImg}
              alt="Logo UniTBV"
              className="h-24 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm text-slate-600">
            <a
              href="#"
              className="text-[#007A87] font-semibold border-b-2 border-[#007A87] pb-1 transition-colors"
            >
              Acasă
            </a>
            <a
              href="https://mateinfo.unitbv.ro/ro/despre.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007A87] pb-1 transition-colors"
            >
              Despre facultate
            </a>

            {/* Students Megamenu Dropdown Trigger */}
            <div
              className="relative group pb-1"
              onMouseEnter={() => setIsStudentsDropdownOpen(true)}
              onMouseLeave={() => setIsStudentsDropdownOpen(false)}
            >
              <button className="hover:text-[#007A87] flex items-center gap-1 focus:outline-none transition-colors">
                <span>Studenți</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isStudentsDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Megamenu dropdown pane */}
              {isStudentsDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white border border-gray-100 rounded-2xl shadow-xl p-6 grid grid-cols-12 gap-6 z-50 animate-fade-in">
                  {/* Left Column: Official Site Promo */}
                  <div className="col-span-5 border-r border-gray-100 pr-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-[#007A87] flex items-center justify-center text-white font-bold text-xs shadow-sm">
                          TBV
                        </div>
                        <span className="font-bold text-[#007A87] text-sm">
                          unitbv.ro
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed text-justify mb-4">
                        Accesează pagina dedicată studenților, pe www.unitbv.ro.
                        Vei găsi informații complete privind mobilitățile,
                        practica, informații administrative și evenimentele care
                        se desfășoară în universitate.
                      </p>
                    </div>
                    <a
                      href="http://www.unitbv.ro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#007A87] text-white text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center justify-center hover:bg-[#005f69] transition-colors w-fit"
                    >
                      www.unitbv.ro
                    </a>
                  </div>

                  {/* Middle Column: Nav Links */}
                  <div className="col-span-4">
                    <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
                      Navigare Studenți
                    </h5>
                    <ul className="space-y-2 text-xs text-slate-600 font-medium">
                      <li>
                        <a
                          href="https://mateinfo.unitbv.ro/ro/studenti/consultă-orarul.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#007A87] hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#007A87]"></span>{" "}
                          Orar
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://mateinfo.unitbv.ro/ro/studenti/programarea-examenelor.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#007A87] hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#007A87]"></span>{" "}
                          Examene
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://mateinfo.unitbv.ro/ro/studenti/licenta-si-disertatie.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#007A87] hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#007A87]"></span>{" "}
                          Licență & Disertație
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://mateinfo.unitbv.ro/ro/studenti/burse.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#007A87] hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#007A87]"></span>{" "}
                          Burse & Cazări
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://mateinfo.unitbv.ro/ro/studenti/erasmus.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#007A87] hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#007A87]"></span>{" "}
                          Erasmus
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://mateinfo.unitbv.ro/ro/studenti/practică.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#007A87] hover:underline flex items-center gap-1.5"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#007A87]"></span>{" "}
                          Practică
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Right Column: Mini news spotlight */}
                  <div className="col-span-3">
                    <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-3">
                      Eveniment
                    </h5>
                    <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50 p-2">
                      <img
                        src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=300&q=80"
                        alt="Spotlight"
                        className="w-full h-16 object-cover rounded-md mb-2"
                      />
                      <h6 className="font-bold text-[10px] text-slate-800 leading-tight mb-1 truncate">
                        Workshopuri studenți
                      </h6>
                      <p className="text-[9px] text-slate-500 leading-relaxed line-clamp-2">
                        11-12 mai 2026, corp P, sala PIII1
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="https://mateinfo.unitbv.ro/ro/evenimente.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007A87] pb-1 transition-colors"
            >
              Știri și evenimente
            </a>
            <a
              href="https://mateinfo.unitbv.ro/ro/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007A87] pb-1 transition-colors"
            >
              Contact
            </a>
            <a
              href="https://www.unitbv.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007A87] pb-1 transition-colors"
            >
              UNITBV
            </a>

            {/* Search Input inline */}
            <div className="flex items-center gap-2 pl-4 border-l border-gray-100">
              {searchOpen ? (
                <div className="flex items-center bg-gray-50 border border-[#007A87]/30 rounded-lg px-2 py-1 animate-fade-in">
                  <input
                    type="text"
                    placeholder="Caută..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none text-xs outline-none w-28 text-slate-800 placeholder-slate-400"
                  />
                  <X
                    className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    onClick={() => setSearchOpen(false)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hover:text-[#007A87] text-slate-500 focus:outline-none transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Language switch */}
            <div className="flex items-center gap-2 ml-2">
              <button
                className="opacity-100 hover:scale-105 transition-transform"
                title="Română"
              >
                <img
                  src={roFlag}
                  alt="Română"
                  className="h-3.5 w-5.5 object-cover rounded shadow-sm border border-gray-250"
                />
              </button>
              <button
                className="opacity-50 hover:opacity-100 hover:scale-105 transition-transform"
                title="English"
              >
                <img
                  src={enFlag}
                  alt="English"
                  className="h-3.5 w-5.5 object-cover rounded shadow-sm border border-gray-250"
                />
              </button>
            </div>
          </nav>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-3">
            {/* Lang select mobile */}
            <button className="hover:scale-105 transition-transform">
              <img
                src={roFlag}
                alt="Română"
                className="h-4 w-6 object-cover rounded shadow-sm border border-gray-200"
              />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 hover:text-[#007A87] focus:outline-none p-1"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3.5 shadow-inner animate-fade-in max-h-[80vh] overflow-y-auto">
            <a href="#" className="block font-bold text-[#007A87] text-sm">
              Acasă
            </a>
            <a
              href="https://mateinfo.unitbv.ro/ro/despre.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-semibold text-slate-600 text-sm hover:text-[#007A87]"
            >
              Despre facultate
            </a>
            <div className="space-y-2 border-l-2 border-gray-100 pl-3">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Studenți
              </span>
              <a
                href="https://mateinfo.unitbv.ro/ro/studenti/consultă-orarul.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-slate-600 hover:text-[#007A87]"
              >
                - Consultă orarul
              </a>
              <a
                href="https://mateinfo.unitbv.ro/ro/studenti/programarea-examenelor.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-slate-600 hover:text-[#007A87]"
              >
                - Programarea examenelor
              </a>
              <a
                href="https://mateinfo.unitbv.ro/ro/studenti/licenta-si-disertatie.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-slate-600 hover:text-[#007A87]"
              >
                - Licență și disertație
              </a>
              <a
                href="https://mateinfo.unitbv.ro/ro/studenti/burse.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-slate-600 hover:text-[#007A87]"
              >
                - Burse & Cazări
              </a>
              <a
                href="https://mateinfo.unitbv.ro/ro/studenti/practică.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-slate-600 hover:text-[#007A87]"
              >
                - Practică
              </a>
            </div>
            <a
              href="https://mateinfo.unitbv.ro/ro/evenimente.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-semibold text-slate-600 text-sm hover:text-[#007A87]"
            >
              Știri și evenimente
            </a>
            <a
              href="https://mateinfo.unitbv.ro/ro/contact.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-semibold text-slate-600 text-sm hover:text-[#007A87]"
            >
              Contact
            </a>
            <a
              href="https://www.unitbv.ro/"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-semibold text-slate-600 text-sm hover:text-[#007A87]"
            >
              UNITBV
            </a>
          </div>
        )}
      </header>

      {/* Hero Sequence Slider Section */}
      <section className="relative h-[280px] md:h-[450px] lg:h-[550px] overflow-hidden bg-slate-900">
        {sliderImages.map((imgUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/35 z-10"></div>
            <img
              src={imgUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transform scale-105 animate-pulse-slow"
              style={{ animationDuration: "15s" }}
            />
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {sliderImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`w-3.5 h-3.5 rounded-full border border-white transition-all ${
                idx === activeSlide
                  ? "bg-[#007A87] scale-110 shadow"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Map Section: Quick Links Grid */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {/* Card 1 */}
          <a
            href="https://mateinfo.unitbv.ro/programe-de-studii"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center p-6 bg-[#007A87] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all"
          >
            <div className="p-4 bg-white/10 rounded-full mb-3.5 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Programe de studii
            </h3>
          </a>

          {/* Card 2 */}
          <a
            href="https://mateinfo.unitbv.ro/ro/admitere.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center p-6 bg-[#006e79] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all"
          >
            <div className="p-4 bg-white/10 rounded-full mb-3.5 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Admitere
            </h3>
          </a>

          {/* Card 3 */}
          <a
            href="https://mateinfo.unitbv.ro/ro/studenti.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center p-6 bg-[#005f69] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all"
          >
            <div className="p-4 bg-white/10 rounded-full mb-3.5 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Studenți
            </h3>
          </a>

          {/* Card 4 */}
          <a
            href="https://mateinfo.unitbv.ro/cercetare"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center text-center p-6 bg-[#005059] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1.5 transition-all"
          >
            <div className="p-4 bg-white/10 rounded-full mb-3.5 group-hover:scale-110 transition-transform">
              <Settings className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Cercetare
            </h3>
          </a>
        </div>
      </section>

      {/* Welcome / Other Features Section & Job Widget */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Welcome Text + Info Grid */}
          <div className="lg:col-span-8 flex flex-col">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mb-4 font-serif uppercase text-center lg:text-left">
              Facultatea de Matematică și Informatică
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm md:text-base mb-12 text-center lg:text-left max-w-3xl">
              a reprezentat nucleul învățământului universitar brașovean,
              complementar învățământului politehnic. Astăzi oferă programe de
              licență, masterat și doctorat în domenii de mare actualitate.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {/* Box 1 */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="text-[#007A87] mb-3.5">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                    Admitere licență
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Accesează informațiile de care ai nevoie pentru admiterea la
                    facultate.
                  </p>
                </div>
                <a
                  href="https://mateinfo.unitbv.ro/ro/admitere/admitere-licenta.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-semibold py-2 px-4 rounded transition-colors text-center inline-block w-fit mt-auto"
                >
                  Detalii
                </a>
              </div>

              {/* Box 2 */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="text-[#007A87] mb-3.5">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                    Admitere masterat
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Accesează informațiile de care ai nevoie pentru admiterea la
                    facultate.
                  </p>
                </div>
                <a
                  href="https://mateinfo.unitbv.ro/ro/admitere/admitere-masterat.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-semibold py-2 px-4 rounded transition-colors text-center inline-block w-fit mt-auto"
                >
                  Detalii
                </a>
              </div>

              {/* Box 3 */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="text-[#007A87] mb-3.5">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                    Admitere doctorat
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Informații necesare pentru admiterea la doctorat.
                  </p>
                </div>
                <a
                  href="https://www.unitbv.ro/cercetare/studii-doctorale.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-semibold py-2 px-4 rounded transition-colors text-center inline-block w-fit mt-auto"
                >
                  Detalii
                </a>
              </div>

              {/* Box 4 */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="text-[#007A87] mb-3.5">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                    Rezultate admitere
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    Află rezultatele admiterii la licență, masterat sau
                    doctorat.
                  </p>
                </div>
                <a
                  href="https://mateinfo.unitbv.ro/ro/admitere/rezultate-admitere.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-semibold py-2 px-4 rounded transition-colors text-center inline-block w-fit mt-auto"
                >
                  Detalii
                </a>
              </div>
            </div>
          </div>

          {/* Job Board Widget */}
          <div className="lg:col-span-4 flex justify-center w-full">
            <iframe
              src={`#/widget?tag=UBVFMIIA&title=${encodeURIComponent("Facultatea de Matematică și Informatică UniTB")}&color=${encodeURIComponent("#007A87")}&rounded=rounded-xl`}
              width="100%"
              height={`${iframeHeight}px`}
              className="border-none bg-transparent max-w-[320px] mx-auto w-full transition-all duration-300"
              style={{ borderRadius: '12px' }}
            />
          </div>
        </div>
      </section>

      {/* Showcase Counters (Dark Pine background with stats animation) */}
      <section className="bg-gradient-to-br from-[#1c2834] to-[#0d1620] text-white py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <GraduationCap className="w-10 h-10 text-[#007A87] mb-3" />
            <div className="text-4xl font-extrabold tracking-tight text-[#007A87] mb-1 font-serif">
              <CountUp to={1050} />
            </div>
            <p className="text-sm font-medium text-gray-300">Studenți</p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center">
            <BookOpen className="w-10 h-10 text-[#007A87] mb-3" />
            <div className="text-4xl font-extrabold tracking-tight text-[#007A87] mb-1 font-serif">
              <CountUp to={5} />
            </div>
            <p className="text-sm font-medium text-gray-300">
              Programe de licență
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center">
            <Award className="w-10 h-10 text-[#007A87] mb-3" />
            <div className="text-4xl font-extrabold tracking-tight text-[#007A87] mb-1 font-serif">
              <CountUp to={4} />
            </div>
            <p className="text-sm font-medium text-gray-300">
              Programe de masterat
            </p>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center">
            <Users className="w-10 h-10 text-[#007A87] mb-3" />
            <div className="text-4xl font-extrabold tracking-tight text-[#007A87] mb-1 font-serif">
              <CountUp to={49} />
            </div>
            <p className="text-sm font-medium text-gray-300">Cadre didactice</p>
          </div>
        </div>
      </section>

      {/* Degree Programs Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-10 font-serif uppercase tracking-tight">
          Programe de studii
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Card 1: Bachelor's */}
          <div className="border border-gray-150 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-[#007A87]/30 transition-all flex flex-col justify-between">
            <div>
              <Bookmark className="w-8 h-8 text-[#007A87] mb-4" />
              <h4 className="text-base font-bold text-slate-800 mb-3 uppercase">
                Licență
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Descoperă programele de licență și perspectivele după
                finalizarea studiilor.
              </p>
            </div>
            <a
              href="https://mateinfo.unitbv.ro/ro/programe-de-studii/licenta.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-semibold py-2 px-4 rounded text-center block w-full transition-colors"
            >
              Detalii
            </a>
          </div>

          {/* Card 2: Master's */}
          <div className="border border-gray-150 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-[#007A87]/30 transition-all flex flex-col justify-between">
            <div>
              <Compass className="w-8 h-8 text-[#007A87] mb-4" />
              <h4 className="text-base font-bold text-slate-800 mb-3 uppercase">
                Masterat
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Află mai multe despre programele de studii de masterat.
              </p>
            </div>
            <a
              href="https://mateinfo.unitbv.ro/ro/programe-de-studii/masterat.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-semibold py-2 px-4 rounded text-center block w-full transition-colors"
            >
              Detalii
            </a>
          </div>

          {/* Card 3: PhD */}
          <div className="border border-gray-150 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-[#007A87]/30 transition-all flex flex-col justify-between">
            <div>
              <Award className="w-8 h-8 text-[#007A87] mb-4" />
              <h4 className="text-base font-bold text-slate-800 mb-3 uppercase">
                Doctorat
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                Accesează informațiile de care ai nevoie despre domeniile de
                doctorat.
              </p>
            </div>
            <a
              href="https://mateinfo.unitbv.ro/ro/programe-de-studii/doctorat.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-semibold py-2 px-4 rounded text-center block w-full transition-colors"
            >
              Detalii
            </a>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="bg-slate-50 border-t border-b border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-10 font-serif uppercase tracking-tight">
            Cercetare
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Article 1 */}
            <a
              href="https://mateinfo.unitbv.ro/ro/cercetare/rezultatele-cercetării-1.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:border-[#007A87]/20 transition-all group"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80"
                  alt="Rezultatele cercetării"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-[#007A87] transition-colors uppercase">
                  Rezultatele cercetării
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  Ne propunem să valorificăm resursele existente la nivelul
                  facultății noastre și să explorăm noi teme cu un potențial
                  ridicat de inovare.
                </p>
              </div>
            </a>

            {/* Article 2 */}
            <a
              href="https://mateinfo.unitbv.ro/ro/cercetare/grupuri-de-cercetare.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:border-[#007A87]/20 transition-all group"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"
                  alt="Grupuri de cercetare"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-[#007A87] transition-colors uppercase">
                  Grupuri de cercetare
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  Accesează informații despre centrele de cercetare, grupurile
                  și/sau echipele de cercetare din facultatea noastră.
                </p>
              </div>
            </a>

            {/* Article 3 */}
            <a
              href="https://mateinfo.unitbv.ro/ro/cercetare/conferinte.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 hover:border-[#007A87]/20 transition-all group"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=80"
                  alt="Conferințe"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h4 className="font-bold text-slate-800 text-sm mb-2 group-hover:text-[#007A87] transition-colors uppercase">
                  Conferințe
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  Află detalii despre evenimentele științifice și conferințele
                  naționale și internaționale organizate de facultatea noastră.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* News and Events */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-10 font-serif uppercase tracking-tight">
          Știri și evenimente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* News 1 */}
          <article className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-44 overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=500&q=80"
                  alt="Workshopuri"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">
                  08 Mai 2026
                </span>
                <h4 className="font-bold text-slate-800 text-sm mb-2 hover:text-[#007A87] transition-colors line-clamp-2">
                  <a
                    href="https://mateinfo.unitbv.ro/ro/evenimente/661-workshopuri-pentru-studenti.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Workshopuri pentru studenți
                  </a>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  11-12 mai 2026, corp P, sala PIII1
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-0">
              <a
                href="https://mateinfo.unitbv.ro/ro/evenimente/661-workshopuri-pentru-studenti.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007A87] hover:text-[#005f69] font-bold text-xs flex items-center gap-1 inline-block"
              >
                <span>Detalii</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>

          {/* News 2 */}
          <article className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-44 overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=500&q=80"
                  alt="Crosul"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">
                  16 Aprilie 2026
                </span>
                <h4 className="font-bold text-slate-800 text-sm mb-2 hover:text-[#007A87] transition-colors line-clamp-2">
                  <a
                    href="https://mateinfo.unitbv.ro/ro/evenimente/659-crosul-universitatii-transilvania-2026.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Crosul Universității Transilvania 2026
                  </a>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  7 mai 2026, ora: 10:30, Start: Cantina Memorandumului
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-0">
              <a
                href="https://mateinfo.unitbv.ro/ro/evenimente/659-crosul-universitatii-transilvania-2026.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007A87] hover:text-[#005f69] font-bold text-xs flex items-center gap-1 inline-block"
              >
                <span>Detalii</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>

          {/* News 3 */}
          <article className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-44 overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1521791136368-1a9b7d894387?auto=format&fit=crop&w=500&q=80"
                  alt="AFCO"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">
                  11 Martie 2026
                </span>
                <h4 className="font-bold text-slate-800 text-sm mb-2 hover:text-[#007A87] transition-colors line-clamp-2">
                  <a
                    href="https://mateinfo.unitbv.ro/ro/evenimente/657-absolventi-in-fata-companiilor-afco-2026.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Absolvenți în Fața Companiilor – AFCO 2026
                  </a>
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  14 mai 2026, Aula „Sergiu T. Chiriacescu” a Universității
                  Transilvania din Brașov
                </p>
              </div>
            </div>
            <div className="px-5 pb-5 pt-0">
              <a
                href="https://mateinfo.unitbv.ro/ro/evenimente/657-absolventi-in-fata-companiilor-afco-2026.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007A87] hover:text-[#005f69] font-bold text-xs flex items-center gap-1 inline-block"
              >
                <span>Detalii</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </article>
        </div>

        <div className="mt-10">
          <a
            href="https://mateinfo.unitbv.ro/ro/evenimente.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#007A87] hover:bg-[#005f69] text-white text-xs font-bold py-2.5 px-6 rounded-lg transition-colors inline-block"
          >
            Vezi mai multe știri
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#1c2834] text-gray-400 border-t border-[#2d3e50] pt-14 pb-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left mb-10">
          {/* Col 1: Contact Address */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#007A87] pl-3">
              Contact
            </h5>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-[#007A87]" />
                <span>Str. Iuliu Maniu, nr. 50, 500091, Brașov</span>
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-[#007A87]" />
                <span>Tel: +40 268 414016</span>
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4 text-[#007A87]" />
                <span>
                  E-mail:{" "}
                  <a
                    href="mailto:f-mi@unitbv.ro"
                    className="text-[#007A87] hover:underline"
                  >
                    f-mi@unitbv.ro
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Col 2: Social Links */}
          <div className="flex flex-col items-center">
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Urmărește-ne
            </h5>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/FacultateaDeMatematicaSiInformaticaUNITBV/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2d3e50] hover:bg-[#3b5998] hover:text-white flex items-center justify-center transition-all hover:scale-115 text-gray-300"
                title="Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V2h-3a4 4 0 00-4 4v2z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/universitateatransilvania/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2d3e50] hover:bg-gradient-to-tr hover:from-yellow-600 hover:to-purple-600 hover:text-white flex items-center justify-center transition-all hover:scale-115 text-gray-300"
                title="Instagram"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UC5PbsYmTh2kJuK9G9-GJfZQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2d3e50] hover:bg-[#ff0000] hover:text-white flex items-center justify-center transition-all hover:scale-115 text-gray-300"
                title="YouTube"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.5 6.25a3 3 0 00-2.1-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.5a3 3 0 00-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.75a3 3 0 002.1 2.1c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.75zM9.54 15.56V8.44L15.82 12l-6.28 3.56z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Brand Promo Footer */}
          <div className="flex flex-col items-center md:items-start justify-between">
            <img
              src={logoImg}
              alt="Logo footer FMI"
              className="h-10 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
            />
            <div className="text-xs space-y-1">
              <p>
                &copy; {new Date().getFullYear()} Facultatea de Matematică și
                Informatică.
              </p>
              <a
                href="https://mateinfo.unitbv.ro/ro/politica-de-confidențialitate.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-gray-500 block hover:text-[#007A87]"
              >
                Politica de confidențialitate
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
