import React from "react";

import { Box } from "./Box";
import { SpacingSize } from "../foundations/Spacing";
import "./inline.css";

export type Alignment = "LEFT" | "RIGHT";

interface InlineProps {
  children: React.ReactNode;
  spacingSize?: SpacingSize;
  alignment?: Alignment;
}

interface GetClassNameArgs {
  alignment: Alignment;
}

interface GetClassName {
  (args: GetClassNameArgs): string;
}

const getClassName: GetClassName = ({ alignment }) => {
  if (alignment === "LEFT") {
    return "inline-left";
  }
  return "inline-right";
};

export const Inline = ({
  children,
  spacingSize = "MEDIUM",
  alignment = "LEFT",
}: InlineProps) => (
  <Box
    className={getClassName({ alignment })}
    spacingStyle="INLINE"
    spacingSize={spacingSize}
  >
    {children}
  </Box>
);
