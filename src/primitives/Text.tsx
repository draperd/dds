import React, { CSSProperties } from "react";
import { SpacingSize } from "../foundations/Spacing";
import {
  TypographyStyle,
  TypographyTransformation,
  TypographyWeight,
} from "../foundations/Typography";
import { AbstractText } from "./AbstractText";

interface TextProps {
  className?: string;
  content: string;
  typographyStyle?: TypographyStyle;
  typographySize?: SpacingSize;
  typographyWeight?: TypographyWeight;
  typographyTransformation?: TypographyTransformation;
  color?: CSSProperties["color"];
}

export const Text = ({
  className = "",
  content,
  typographyStyle = "TEXT",
  typographySize,
  typographyWeight = "NORMAL",
  typographyTransformation = "NONE",
  color,
}: TextProps) => {
  return (
    <AbstractText
      as="span"
      className={className}
      typographyStyle={typographyStyle}
      typographySize={typographySize}
      typographyWeight={typographyStyle === "BOLD" ? "BOLD" : typographyWeight}
      typographyTransformation={typographyTransformation}
      content={content}
      color={color}
    ></AbstractText>
  );
};
