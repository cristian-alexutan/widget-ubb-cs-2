import { Sun, Moon, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { CustomDropdown } from "../components/ui/CustomDropdown";

export function Header({
  theme,
  toggleTheme,
  student,
  setStudent,
  faculties,
  onBack,
}) {
  return (
    <header
      className="bg-bg/85 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200"
      role="banner"
    >
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1">
          {onBack && (
            <button
              onClick={onBack}
              className="text-text hover:text-text-h p-1 rounded-lg hover:bg-border/40 cursor-pointer flex items-center justify-center mr-1"
              aria-label="Înapoi la universități"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-sm font-bold tracking-tight text-text-h">
            peViitor.ro
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-7 w-7 rounded-lg text-text hover:text-text-h hover:bg-border/40 border-0 flex items-center justify-center"
          aria-label={theme === "light" ? "Mod întunecat" : "Mod luminos"}
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </Button>
      </div>

      <div className="border-t border-border/60 px-3 py-2">
        <CustomDropdown
          value={student.faculty}
          onChange={(val) => setStudent({ ...student, faculty: val })}
          options={faculties}
          ariaLabel="Selectează facultatea ta"
        />
      </div>
    </header>
  );
}
