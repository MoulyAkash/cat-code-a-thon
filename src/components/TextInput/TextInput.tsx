import { useState } from "react";
import { TbEye } from "react-icons/tb";
import "./textinput.css";

interface TextInputProps {
  title: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
  validateWith: (e: string) => RegExpMatchArray | null | boolean;
  errorText: string;
  readOnly?: boolean;
}

export default function TextInput({
  title,
  type,
  placeholder,
  value,
  onChange,
  validateWith,
  errorText,
  readOnly,
}: TextInputProps) {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="text-input-container">
      <h4>{title}</h4>
      <div className="text-input-wrapper">
        <input
          type={type === "password" && !visible ? "password" : "text"}
          value={value}
          className="text-input"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setError(!validateWith(e.target.value));
          }}
          readOnly={readOnly}
        />
        {type === "password" && (
          <div className="text-input-eye" onClick={() => setVisible(!visible)}>
            <TbEye />
          </div>
        )}
      </div>
      {error && errorText && <p className="text-input-error">{errorText}</p>}
    </div>
  );
}
