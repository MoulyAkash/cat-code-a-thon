import React, { useState, useEffect, useRef, ReactNode } from "react";
import { FiEye } from "react-icons/fi";
import { AiOutlineHolder } from "react-icons/ai";
import "./filter.css";

interface FilterProps {
  filterLabel?: string;
  options: SelectedOptions;
  selectedOptions: SelectedOptions;
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>;
  children: ReactNode;
  align?: "left" | "right";
}

interface SelectedOptions {
  [key: string]: (string | boolean | number)[];
}

const Filter: React.FC<FilterProps> = ({
  filterLabel,
  options,
  selectedOptions,
  setSelectedOptions,
  children,
  align,
}) => {
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

  const updateFilters = (key: string, value: string | boolean | number) => {
    let oldSelectedOptions = selectedOptions;

    oldSelectedOptions[key].includes(value)
      ? (oldSelectedOptions[key] = oldSelectedOptions[key].filter(
          (item) => item !== value
        ))
      : oldSelectedOptions[key].push(value);

    Object.keys(oldSelectedOptions).map((key: string) =>
      oldSelectedOptions[key].length === options[key].length
        ? (oldSelectedOptions[key] = [])
        : null
    );

    setSelectedOptions({ ...oldSelectedOptions });
  };

  return (
    <div className="filter-dropdown noselect" ref={filterRef}>
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>
      <div
        data-visible={isOpen}
        data-align={align || "left"}
        className="filter-dropdown-content"
      >
        <h1>Filters</h1>
        {Object.keys(options).map(
          (groupLabel: string, index: number) =>
            (!filterLabel || filterLabel === groupLabel) && (
              <div className="group-wrapper" key={groupLabel}>
                <div className="group-container">
                  <div className="group-name">
                    <label>{groupLabel}</label>
                    {selectedOptions[groupLabel].length !== 0 && (
                      <div
                        className="visible-toggle"
                        onClick={() => {
                          setSelectedOptions(
                            (oldSelectedOptions: SelectedOptions) => {
                              oldSelectedOptions[groupLabel] = [];
                              return { ...oldSelectedOptions };
                            }
                          );
                        }}
                      >
                        Show all
                      </div>
                    )}
                  </div>
                  {options[groupLabel].map((option) => (
                    <div
                      className="option"
                      key={String(option)}
                      onClick={() => updateFilters(groupLabel, option)}
                    >
                      <div className="content">
                        <AiOutlineHolder />
                        {typeof option === "boolean"
                          ? option
                            ? "Yes"
                            : "No"
                          : String(option)}
                      </div>
                      <div className="visible-toggle">
                        {selectedOptions[groupLabel].includes(option) ? (
                          <FiEye />
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
                {index !== Object.keys(options).length - 1 && (
                  <div className="separator" />
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Filter;
