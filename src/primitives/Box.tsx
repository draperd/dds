import React from "react";
import { AbstractBox, PublicBoxProps } from "./AbstractBox";
import "./box.css";

export type BoxProps = PublicBoxProps;

// Box is a concrete implementation of AbstractBox
// The idea is that it is JUST a box - with not pressable or focusable behaviours
export const Box = ({
  spacingStyle = "INSET",
  spacingSize = "MEDIUM",
  spacingAlignment = "LEFT",
  className = "",
  children,
}: BoxProps) => (
  <AbstractBox
    className={className}
    spacingStyle={spacingStyle}
    spacingSize={spacingSize}
    spacingAlignment={spacingAlignment}
  >
    {children}
  </AbstractBox>
);
