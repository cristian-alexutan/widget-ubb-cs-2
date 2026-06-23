import { useState, useEffect, useRef } from "react";
import Unitbv from "./pages/unitbv";
import Utcn from "./pages/utcn";
import { Card } from "./components/ui/card";
import unitbvImg from "./assets/unitbv.jpg";
import utcnImg from "./assets/utcn.jpg";
import Widget from "./components/Widget";

function WidgetApp({ tag, title, color, rounded }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.body.style.background = "transparent";
    const rootEl = document.getElementById("root");
    if (rootEl) {
      rootEl.style.minHeight = "auto";
    }

    if (!wrapperRef.current || window.parent === window) return;
    
    const ro = new ResizeObserver(() => {
      if (wrapperRef.current) {
        window.parent.postMessage({ type: 'resize-iframe', height: wrapperRef.current.offsetHeight }, '*');
      }
    });
    ro.observe(wrapperRef.current);
    
    return () => ro.disconnect();
  }, []);

  return (
    <div className="w-full flex justify-center bg-transparent items-start">
      <div ref={wrapperRef} className="w-full max-w-[320px]">
        <Widget
          isEmbedded={true}
          embeddedTag={tag}
          embeddedTitle={title}
          themeColor={color}
          roundedClass={rounded}
        />
      </div>
    </div>
  );
}

function App() {
  const [view, setView] = useState(() => {
    const hash = window.location.hash;
    const decodedHash = decodeURIComponent(hash);
    if (decodedHash.startsWith("#/unitbv")) return "unitbv";
    if (decodedHash.startsWith("#/utcn")) return "utcn";
    if (decodedHash.startsWith("#/widget")) return "widget";
    return "home";
  });

  // Keep theme class updated on page load
  useState(() => {
    const savedTheme = localStorage.getItem("peviitor-theme") || "light";
    const root = document.documentElement;
    if (savedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  });

  // Listen for browser back/forward and direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const decodedHash = decodeURIComponent(hash);
      if (decodedHash.startsWith("#/unitbv")) {
        setView("unitbv");
      } else if (decodedHash.startsWith("#/utcn")) {
        setView("utcn");
      } else if (decodedHash.startsWith("#/widget")) {
        setView("widget");
      } else {
        setView("home");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (newView) => {
    if (newView === "unitbv") {
      window.location.hash = `/unitbv-${encodeURIComponent("Facultatea de Matematică și Informatică")}`;
    } else if (newView === "utcn") {
      window.location.hash = `/utcn-${encodeURIComponent("Facultatea de Automatică și Calculatoare")}`;
    } else {
      window.location.hash = "/";
    }
  };

  if (view === "unitbv") {
    return <Unitbv onBack={() => navigateTo("home")} />;
  }

  if (view === "utcn") {
    return <Utcn onBack={() => navigateTo("home")} />;
  }

  if (view === "widget") {
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(hash.split('?')[1] || "");
    const tag = searchParams.get('tag');
    const title = searchParams.get('title');
    const color = searchParams.get('color');
    const rounded = searchParams.get('rounded') || 'rounded-xl';

    return <WidgetApp tag={tag} title={title} color={color} rounded={rounded} />;
  }

  return (
    <div
      className="w-full min-h-screen bg-bg text-text transition-colors duration-200 flex flex-col items-center justify-center p-6 md:p-12 gap-8"
    >
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-h m-0 tracking-tight leading-tight">
          Portal Carieră
        </h1>
        <p className="text-sm md:text-base text-text mt-3">
          Alege universitatea și facultatea pentru a accesa joburile disponibile
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full items-center max-w-[538px] mt-2">
        {/* Card UniTBV */}
        <Card
          onClick={() => navigateTo("unitbv")}
          className="relative flex flex-col justify-between overflow-hidden cursor-pointer rounded-2xl shadow-md hover:shadow-2xl transition-all w-full h-[295px] p-6 group"
        >
          {/* Background Image */}
          <img
            src={unitbvImg}
            alt="Universitatea Transilvania"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 z-10" />

          {/* Card Content */}
          <div className="relative z-20 flex flex-col justify-between h-full text-white">
            <div className="flex justify-between items-start">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#007A87] to-[#005f69] flex items-center justify-center text-white font-black text-sm px-3 py-2 shadow-md border border-white/10 shrink-0">
                UniTBV
              </div>
            </div>
            <div className="text-left min-w-0">
              <h3 className="text-lg font-extrabold text-white m-0 leading-snug drop-shadow-md">
                Universitatea Transilvania din Brașov
              </h3>
              <p className="text-xs md:text-sm text-white/85 mt-1.5 leading-relaxed font-semibold drop-shadow-xs">
                Facultatea de Matematică și Informatică
              </p>
            </div>
          </div>
        </Card>

        {/* Card UTCN */}
        <Card
          onClick={() => navigateTo("utcn")}
          className="relative flex flex-col justify-between overflow-hidden cursor-pointer rounded-2xl shadow-md hover:shadow-2xl transition-all w-full h-[295px] p-6 group"
        >
          {/* Background Image */}
          <img
            src={utcnImg}
            alt="Universitatea Tehnica Cluj-Napoca"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 z-10" />

          {/* Card Content */}
          <div className="relative z-20 flex flex-col justify-between h-full text-white">
            <div className="flex justify-between items-start">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#4261e4] to-indigo-700 flex items-center justify-center text-white font-black text-sm px-3 py-2 shadow-md border border-white/10 shrink-0">
                UTCN
              </div>
            </div>
            <div className="text-left min-w-0">
              <h3 className="text-lg font-extrabold text-white m-0 leading-snug drop-shadow-md">
                Universitatea Tehnică din Cluj-Napoca
              </h3>
              <p className="text-xs md:text-sm text-white/85 mt-1.5 leading-relaxed font-semibold drop-shadow-xs">
                Facultatea de Automatică și Calculatoare
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
