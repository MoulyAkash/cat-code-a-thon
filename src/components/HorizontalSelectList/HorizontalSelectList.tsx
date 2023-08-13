import React from "react";
import "./horizontalselectlist.css";

interface SelectableListProps {
  title: string;
  items: string[];
  selectedItem: string;
  setSelectedItem: (value: string) => void;
  enabled: boolean;
}

const HorizontalSelectList: React.FC<SelectableListProps> = ({
  title,
  items,
  selectedItem,
  setSelectedItem,
  enabled,
}) => {
  const handleClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="selectable-list-container">
      <h4>{title}</h4>
      <div className="selectable-list">
        {items.map((item) => (
          <div
            key={item}
            className={`selectable-item ${
              item === selectedItem ? "selected" : ""
            }`}
            onClick={() => enabled && handleClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSelectList;
