import React from "react";
import "./input.css";

// NOTE: Clearly not the full set yet ;)
type InputType = "TEXT" | "NUMBER";

interface InputProps {
  id: string;
  name: string;
  className?: string;
  type?: InputType;
}
export const Input = ({
  className = "",
  type = "TEXT",
  id,
  name,
}: InputProps) => {
  return <input id={id} name={name} type={type} className={className}></input>;
};
