import React, { CSSProperties } from "react";
import {
  TypographyStyle,
  TypographyTransformation,
  TypographyWeight,
} from "../foundations/Typography";
import { token } from "@atlaskit/tokens";
import "./abstractText.css";
import { SpacingSize } from "src/foundations/Spacing";

type TextTypes = "span" | "a" | "label";

interface AbstractTextProps {
  className?: string;
  content: string;
  typographyStyle?: TypographyStyle;
  typographySize?: SpacingSize; // TODO: Change from "spacing" ? :/
  typographyWeight?: TypographyWeight;
  typographyTransformation?: TypographyTransformation;
  as: TextTypes;
  href?: string;
  htmlFor?: string;
  color?: CSSProperties["color"];
}

const cssPrefix = "typography-";

type GetTypographyClassNamesArgs = {
  className: string;
  typographyStyle: TypographyStyle;
  typographySize: SpacingSize;
  typographyWeight: TypographyWeight;
  typographyTransformation: TypographyTransformation;
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
  typographyWeight,
  typographyTransformation,
}: GetTypographyClassNamesArgs) => {
  const defaults = `${cssPrefix}defaults`;
  const style = `${cssPrefix}${typographyStyle.toLowerCase()}`;
  const size = `${cssPrefix}size-${typographySize.toLowerCase()}`;
  const weight = `${cssPrefix}weight-${typographyWeight.toLowerCase()}`;
  const transformation = `${cssPrefix}transformation-${typographyTransformation.toLowerCase()}`;

  return `${defaults} ${style} ${size} ${weight} ${transformation} ${className}`;
};

export const AbstractText = ({
  as: HtmlElement = "span",
  className = "",
  content,
  typographyStyle = "TEXT",
  color,
  typographySize = "MEDIUM",
  typographyWeight = "NORMAL",
  typographyTransformation = "NONE",
  href,
  htmlFor,
}: AbstractTextProps) => {
  const typographyClassNames = getTypographyClassNames({
    className,
    typographyStyle,
    typographySize,
    typographyWeight,
    typographyTransformation,
  });
  let textStyle = HtmlElement === "a" ? linkStyles : styles;
  if (color) {
    textStyle = {
      ...textStyle,
      color: color,
    };
  }
  if (HtmlElement === "label") {
    <HtmlElement
      className={typographyClassNames}
      style={textStyle}
      htmlFor={htmlFor}
    >
      {content}
    </HtmlElement>;
  }
  if (HtmlElement === "a") {
    <HtmlElement className={typographyClassNames} style={textStyle} href={href}>
      {content}
    </HtmlElement>;
  }
  return (
    <HtmlElement className={typographyClassNames} style={textStyle}>
      {content}
    </HtmlElement>
  );
};
