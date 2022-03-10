import React from "react";

import { Box } from "./Box";
import { SpacingAlignment, SpacingSize } from "../foundations/Spacing";
import "./stack.css";

interface StackProps {
  className?: string;
  children: React.ReactNode;
  spacingSize?: SpacingSize;
  spacingAlignment?: SpacingAlignment;
  stretchHorizontally?: boolean;
}

export const Stack = ({
  children,
  className = "",
  spacingSize,
  spacingAlignment,
  stretchHorizontally,
}: StackProps) => (
  <Box
    spacingStyle="STACK"
    spacingSize={spacingSize}
    spacingAlignment={spacingAlignment}
    className={className}
    stretchHorizontally={stretchHorizontally}
  >
    {children}
  </Box>
);
