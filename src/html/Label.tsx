import React from "react";
import { AbstractText } from "../primitives/AbstractText";
import { token } from "@atlaskit/tokens";
import "./label.css";

interface TextProps {
  className?: string;
  htmlFor: string;
  content: string;
}

// NOTE: This should probably be reusing an abstraction of Text
export const Label = ({ className = "", content, htmlFor }: TextProps) => {
  return (
    <AbstractText
      as="label"
      htmlFor={htmlFor}
      className="typography-default"
      content={content}
      color={`${token("color.text.subtlest")}`}
      typographySize="SMALL"
      typographyWeight="SEMIBOLD"
    ></AbstractText>
  );
};
