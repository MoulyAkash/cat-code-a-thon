import React from "react";
import "./toggleswitch.css";

interface ToggleSwitchProps {
  title: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  enabled: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  title,
  checked,
  onChange,
  enabled,
}) => {
  const handleToggle = () => {
    enabled && onChange(!checked);
  };

  return (
    <div className="toggle-container">
      <h4>{title}</h4>
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        <span className="slider" />
      </label>
    </div>
  );
};

export default ToggleSwitch;
