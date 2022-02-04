import React from "react";
import "./label.css";

interface TextProps {
  className?: string;
  htmlFor: string;
  content: string;
}

// NOTE: This should probably be reusing an abstraction of Text
export const Label = ({ className = "", content, htmlFor }: TextProps) => {
  return (
    <label htmlFor={htmlFor} className="typography-default">
      {content}
    </label>
  );
};
