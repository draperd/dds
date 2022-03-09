import React from "react";
import { TypographyStyle } from "../foundations/Typography";
import "./text.css";
import { AbstractText } from "./AbstractText";

interface TextProps {
  className?: string;
  content: string;
  typographyStyle?: TypographyStyle;
}

export const Text = ({
  className = "",
  content,
  typographyStyle = "TEXT",
}: TextProps) => (
  <AbstractText
    as="span"
    className={className}
    typographyStyle={typographyStyle}
    content={content}
  ></AbstractText>
);
