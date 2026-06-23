import { useState, useEffect } from "react";
import { getJobs } from "../services/api";
import { Header } from "../layout/Header";
import { JobsWrapper } from "./JobsWrapper";
import { DEFAULT_STUDENT, ALL_FACULTIES_OPTION } from "../utils/constants";
import { Moon, Sun } from "lucide-react";

function Widget({
  university,
  onBack,
  isEmbedded,
  embeddedTitle,
  themeColor,
  embeddedTag,
  roundedClass = "rounded-xl",
}) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("peviitor-theme") || "light";
  });

  const [student, setStudent] = useState(DEFAULT_STUDENT);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs on mount
  useEffect(() => {
    let active = true;
    getJobs().then((data) => {
      if (active) {
        setJobs(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Filter faculties belonging to this university
  const isUtcnTag = (tag) => tag.startsWith("UTCN");
  const isUnitbvTag = (tag) => tag.startsWith("UBV");

  const faculties = isEmbedded
    ? []
    : [
        ALL_FACULTIES_OPTION,
        ...new Set(
          jobs
            .flatMap((job) => job.f_tag || [])
            .filter((tag) => {
              if (university === "UTCN") return isUtcnTag(tag);
              if (university === "UNITBV") return isUnitbvTag(tag);
              return true;
            }),
        ),
      ];

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("peviitor-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleApplyStart = (job) => {
    const applyUrl = job._root_ || job.url;
    if (applyUrl) {
      window.open(applyUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Filter jobs based on university and faculty selection
  const filteredJobs = jobs.filter((job) => {
    const tags = job.f_tag || [];

    if (isEmbedded) {
      return tags.includes(embeddedTag);
    }

    // Check if the job belongs to the selected university
    const matchesUniversity = tags.some((tag) => {
      if (university === "UTCN") return isUtcnTag(tag);
      if (university === "UNITBV") return isUnitbvTag(tag);
      return true;
    });

    if (!matchesUniversity) return false;

    // Filter by selected faculty
    if (student.faculty !== ALL_FACULTIES_OPTION) {
      if (!tags.includes(student.faculty)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div
      className={`bg-bg text-text transition-colors duration-200 flex flex-col w-full mx-auto shadow-sm overflow-hidden border border-border ${isEmbedded ? roundedClass : ""} ${theme}`}
      style={{ maxWidth: "320px", width: "100%" }}
    >
      {isEmbedded ? (
        <>
          {/* Embedded Widget Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-bg border-b border-neutral-400/30">
            <span className="text-sm font-bold tracking-tight text-text-h">
              peViitor.ro
            </span>
            <button
              onClick={toggleTheme}
              className="h-7 w-7 rounded-lg text-text hover:text-text-h hover:bg-border/40 border-0 flex items-center justify-center cursor-pointer transition-colors"
              aria-label={theme === "light" ? "Mod întunecat" : "Mod luminos"}
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Static Title Banner */}
          <div className="p-3 bg-bg border-b border-neutral-400/30">
            <div
              className={`text-xs font-bold text-center py-2.5 px-3 shadow-xs border ${roundedClass}`}
              style={{
                backgroundColor: `${themeColor}1A`,
                borderColor: `${themeColor}33`,
                color: themeColor,
              }}
            >
              {embeddedTitle}
            </div>
          </div>
        </>
      ) : (
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          student={student}
          setStudent={setStudent}
          faculties={faculties}
          onBack={onBack}
        />
      )}

      <main
        className={`bg-bg overflow-y-auto ${isEmbedded ? "p-3.5 max-h-[420px]" : "flex-1 p-3"}`}
        id="main-content"
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-xs text-text/60 font-semibold gap-2">
            <div
              className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin`}
              style={{
                borderColor: themeColor || "#4f46e5",
                borderTopColor: "transparent",
              }}
            ></div>
            <span>Se încarcă joburile...</span>
          </div>
        ) : (
          <JobsWrapper
            filteredJobs={filteredJobs}
            totalJobsCount={jobs.length}
            onResetFilter={() =>
              setStudent({ ...student, faculty: ALL_FACULTIES_OPTION })
            }
            onApply={handleApplyStart}
          />
        )}
      </main>
    </div>
  );
}

export default Widget;
