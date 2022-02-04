import React from "react";

import { Box } from "./Box";
import { SpacingSize } from "../foundations/Spacing";
import "./stack.css";

interface StackProps {
  className?: string;
  children: React.ReactNode;
  spacingSize?: SpacingSize;
}

export const Stack = ({
  children,
  className = "",
  spacingSize,
}: StackProps) => (
  <Box spacingStyle="STACK" spacingSize={spacingSize} className={className}>
    {children}
  </Box>
);
