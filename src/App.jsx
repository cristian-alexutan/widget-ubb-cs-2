import { useState, useEffect, useRef } from "react";
import UbbCluj from "./pages/ubbcluj";
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
    if (decodedHash.startsWith("#/widget")) return "widget";
    return "ubb";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const decodedHash = decodeURIComponent(hash);
      if (decodedHash.startsWith("#/widget")) {
        setView("widget");
      } else {
        setView("ubb");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (view === "widget") {
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(hash.split('?')[1] || "");
    const tag = searchParams.get('tag');
    const title = searchParams.get('title');
    const color = searchParams.get('color');
    const rounded = searchParams.get('rounded') || 'rounded-xl';

    return <WidgetApp tag={tag} title={title} color={color} rounded={rounded} />;
  }

  return <UbbCluj />;
}

export default App;
