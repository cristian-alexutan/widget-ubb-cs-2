import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export function CustomDropdown({ value, onChange, options, ariaLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      const currentIdx = options.findIndex((opt) => opt === value);
      setHighlightedIndex(currentIdx >= 0 ? currentIdx : 0);
    }
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex((prev) => (prev + 1) % options.length);
      }
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(options.length - 1);
      } else {
        setHighlightedIndex(
          (prev) => (prev - 1 + options.length) % options.length,
        );
      }
      e.preventDefault();
    } else if (e.key === "Enter" || e.key === " ") {
      if (isOpen) {
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleSelect(options[highlightedIndex]);
        }
      } else {
        setIsOpen(true);
      }
      e.preventDefault();
    }
  };

  return (
    <div
      className="relative w-full"
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
    >
      {/* Dropdown Button Trigger */}
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={`w-full bg-bg-card text-text-h text-xs border rounded-xl px-3.5 py-2.5 text-left flex items-center justify-between cursor-pointer focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 hover:border-text/30 transition-all font-medium ${
          isOpen
            ? "border-accent ring-2 ring-accent/20 ring-offset-0"
            : "border-border"
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`w-4 h-4 text-text transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-bg-card border border-border rounded-xl shadow-lg py-1 overflow-y-auto max-h-60 focus:outline-none animate-fade-in"
          aria-label={ariaLabel}
        >
          {options.map((option, idx) => {
            const isSelected = option === value;
            const isHighlighted = idx === highlightedIndex;
            return (
              <li
                key={option}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option)}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={`px-3.5 py-2 text-xs cursor-pointer select-none transition-colors duration-150 flex items-center justify-between ${
                  isSelected
                    ? "font-bold text-accent bg-accent-bg"
                    : isHighlighted
                      ? "bg-code-bg text-text-h font-medium"
                      : "text-text"
                }`}
              >
                <span className="truncate w-full text-left pr-2">{option}</span>
                {isSelected && (
                  <Check
                    className="w-4 h-4 text-accent shrink-0"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
