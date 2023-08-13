import { useState, useEffect, useRef, ReactNode } from "react";
import { AiOutlineHolder } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import "./dropdown.css";

interface DropdownProps {
  dropDownLabel?: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  children: ReactNode;
}

export default function Dropdown({
  dropDownLabel,
  options,
  selectedOption,
  setSelectedOption,
  children,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown noselect" ref={filterRef}>
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      <div data-visible={isOpen} className="dropdown-content">
        <h1>{dropDownLabel}</h1>
        {options.map((option: string, index: number) => (
          <div
            className="option"
            key={index}
            onClick={() => setSelectedOption(option)}
          >
            <div className="content">
              <AiOutlineHolder />
              {typeof option === "boolean"
                ? option
                  ? "Yes"
                  : "No"
                : String(option)}
            </div>
            <div className="check">
              {selectedOption === option && <BiCheck />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
