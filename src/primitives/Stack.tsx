import React from "react";

import { Box } from "./Box";
import { SpacingAlignment, SpacingSize } from "../foundations/Spacing";
import "./stack.css";

interface StackProps {
  className?: string;
  children: React.ReactNode;
  spacingSize?: SpacingSize;
  spacingAlignment?: SpacingAlignment;
}

export const Stack = ({
  children,
  className = "",
  spacingSize,
  spacingAlignment,
}: StackProps) => (
  <Box
    spacingStyle="STACK"
    spacingSize={spacingSize}
    spacingAlignment={spacingAlignment}
    className={className}
  >
    {children}
  </Box>
);
