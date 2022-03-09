import React, { CSSProperties } from "react";
import { SpacingSize } from "../foundations/Spacing";
import { TypographyStyle } from "../foundations/Typography";
import { AbstractText } from "./AbstractText";

interface TextProps {
  className?: string;
  content: string;
  typographyStyle?: TypographyStyle;
  typographySize?: SpacingSize;
  color?: CSSProperties["color"];
}

export const Text = ({
  className = "",
  content,
  typographyStyle = "TEXT",
  typographySize,
  color,
}: TextProps) => (
  <AbstractText
    as="span"
    className={className}
    typographyStyle={typographyStyle}
    content={content}
    color={color}
    typographySize={typographySize}
  ></AbstractText>
);
