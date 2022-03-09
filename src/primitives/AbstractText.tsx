import React, { CSSProperties } from "react";
import { TypographyStyle } from "../foundations/Typography";
import { token } from "@atlaskit/tokens";
import "./abstractText.css";
import { SpacingSize } from "src/foundations/Spacing";

type TextTypes = "span" | "a";

interface AbstractTextProps {
  className?: string;
  content: string;
  typographyStyle?: TypographyStyle;
  typographySize?: SpacingSize;
  as: TextTypes;
  href?: string;
  color?: CSSProperties["color"];
}

const cssPrefix = "typography-";

type GetTypographyClassNamesArgs = {
  className: string;
  typographyStyle: TypographyStyle;
  typographySize: SpacingSize;
};

const styles: CSSProperties = {
  color: `${token("color.text")}`,
};

const linkStyles: CSSProperties = {
  color: `${token("color.link")}`,
};

// This is a bit of a short cut and we'd want unit tests for this!
export const getTypographyClassNames = ({
  className,
  typographyStyle,
  typographySize,
}: GetTypographyClassNamesArgs) => {
  const defaults = `${cssPrefix}defaults`;
  const style = `${cssPrefix}${typographyStyle.toLowerCase()}`;
  const size = `${cssPrefix}${typographySize.toLowerCase()}`;

  return `${defaults} ${style} ${size} ${className}`;
};

export const AbstractText = ({
  as: HtmlElement = "span",
  className = "",
  content,
  typographyStyle = "TEXT",
  color,
  typographySize = "MEDIUM",
}: AbstractTextProps) => {
  const typographyClassNames = getTypographyClassNames({
    className,
    typographyStyle,
    typographySize,
  });
  let textStyle = HtmlElement === "span" ? styles : linkStyles;
  if (color) {
    textStyle = {
      ...textStyle,
      color: color,
    };
  }
  return (
    <HtmlElement className={typographyClassNames} style={textStyle}>
      {content}
    </HtmlElement>
  );
};
