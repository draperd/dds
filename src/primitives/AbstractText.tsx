import React, { CSSProperties } from "react";
import { TypographyStyle } from "../foundations/Typography";
import { token } from "@atlaskit/tokens";
import "./abstractText.css";

type TextTypes = "span" | "a";

interface AbstractTextProps {
  className?: string;
  content: string;
  typographyStyle?: TypographyStyle;
  as: TextTypes;
  href?: string;
}

const cssPrefix = "typography-";

type GetTypographyClassNamesArgs = {
  className: string;
  typographyStyle: TypographyStyle;
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
}: GetTypographyClassNamesArgs) => {
  return `${cssPrefix}defaults ${cssPrefix}${typographyStyle.toLowerCase()} ${className}`;
};

export const AbstractText = ({
  as: HtmlElement = "span",
  className = "",
  content,
  typographyStyle = "TEXT",
}: AbstractTextProps) => {
  const typographyClassNames = getTypographyClassNames({
    className,
    typographyStyle,
  });
  const useStyles = HtmlElement === "span" ? styles : linkStyles;
  return (
    <HtmlElement className={typographyClassNames} style={useStyles}>
      {content}
    </HtmlElement>
  );
};
