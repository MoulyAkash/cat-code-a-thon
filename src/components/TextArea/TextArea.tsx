import "./textarea.css";

interface TextAreaProps {
  title: string;
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
  readOnly?: boolean;
}

export default function TextArea({
  title,
  placeholder,
  value,
  onChange,
  readOnly,
}: TextAreaProps) {
  return (
    <div className="text-area-container">
      <h4>{title}</h4>
      <div className="text-area-wrapper">
        <textarea
          value={value}
          className="text-area"
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
}
