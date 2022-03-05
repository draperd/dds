import React from "react";
import "./input.css";

// NOTE: Clearly not the full set yet ;)
type InputType = "TEXT" | "NUMBER" | "CHECKBOX";

interface InputProps {
  id: string;
  name: string;
  className?: string;
  type?: InputType;
  onChange?: ChangeHandler;
  value?: number | string;
  checked?: boolean; // NOTE: Bit weird, maybe better to type checkbox separately? :/
}

export type ChangeHandler = (value: string) => void;

export type HandleChangeArgs = {
  evt: React.ChangeEvent<HTMLInputElement>;
  onChange: ChangeHandler | undefined;
};

export const handleChange = ({ evt, onChange }: HandleChangeArgs) => {
  if (onChange) {
    onChange(evt.target.value);
  }
};

export const Input = ({
  className = "",
  type = "TEXT",
  id,
  name,
  onChange,
  value,
  checked = false,
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className={className}
      onChange={(evt) => handleChange({ evt, onChange })}
      value={value}
      checked={checked}
    ></input>
  );
};
