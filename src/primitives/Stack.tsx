import React from "react";

import { Box } from "./Box";
import "./stack.css";

interface StackProps {
  className?: string;
  children: React.ReactNode;
}

export const Stack = ({ children, className = "" }: StackProps) => (
  <Box spacingStyle="STACK" className={className}>
    {children}
  </Box>
);
