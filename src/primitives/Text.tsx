import React, { CSSProperties } from "react";
import { TypographyStyle } from "../foundations/Typography";
import { token } from "@atlaskit/tokens";
import "./text.css";

interface TextProps {
  className?: string;
  content: string;
  typographyStyle?: TypographyStyle;
}

const cssPrefix = "typography-";

type GetTypographyClassNamesArgs = {
  className: string;
  typographyStyle: TypographyStyle;
};

const styles: CSSProperties = {
  color: `${token("color.text")}`,
};

// This is a bit of a short cut and we'd want unit tests for this!
export const getTypographyClassNames = ({
  className,
  typographyStyle,
}: GetTypographyClassNamesArgs) => {
  return `${cssPrefix}defaults ${cssPrefix}${typographyStyle.toLowerCase()} ${className}`;
};

export const Text = ({
  className = "",
  content,
  typographyStyle = "TEXT",
}: TextProps) => {
  const typographyClassNames = getTypographyClassNames({
    className,
    typographyStyle,
  });
  return (
    <span className={typographyClassNames} style={styles}>
      {content}
    </span>
  );
};
