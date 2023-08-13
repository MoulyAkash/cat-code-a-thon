import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { BiCheckCircle } from "react-icons/bi";
import "./searchlist.css";

interface SearchListProps {
  title: string;
  data: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  renderIcon?: (iconName: string) => React.ReactNode;
  editEnabled: boolean;
}

export default function SearchList({
  title,
  data,
  selectedItem,
  setSelectedItem,
  renderIcon,
  editEnabled,
}: SearchListProps) {
  const [searchString, setSearchString] = useState("");

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setSearchString("");
    searchListRef.current !== null
      ? (searchListRef.current.scrollTop = 0)
      : null;
  };

  const searchListRef = useRef<HTMLDivElement>(null);

  return (
    <div className="search-list-container">
      <h4>{title}</h4>
      {editEnabled && (
        <div className="search-bar noselect">
          <FiSearch />
          <input
            type="text"
            value={searchString}
            placeholder="Search"
            onChange={(e) => setSearchString(e.target.value)}
          />
        </div>
      )}
      <div className="search-list" ref={searchListRef}>
        {selectedItem && (
          <div
            className={
              editEnabled
                ? "search-list-item selected"
                : "search-list-item non-edit"
            }
          >
            {renderIcon && renderIcon(selectedItem)}
            <div className="content-container">
              <div className="content">
                <h4>{selectedItem}</h4>
                <p>{selectedItem}</p>
              </div>
              {editEnabled && <BiCheckCircle className="selected-icon" />}
            </div>
          </div>
        )}
        {editEnabled &&
          data.map(
            (item: string, index: number) =>
              (searchString === "" ||
                item.toLowerCase().includes(searchString.toLowerCase())) &&
              selectedItem !== item && (
                <div
                  key={index}
                  className={
                    editEnabled
                      ? "search-list-item"
                      : "search-list-item non-edit"
                  }
                  onClick={() => handleItemClick(item)}
                >
                  {renderIcon && renderIcon(item)}
                  <div className="content">
                    <h4>{item}</h4>
                    <p>{item}</p>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
}
