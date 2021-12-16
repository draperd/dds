import React from "react";

import { Box } from "./Box";
import { SpacingSize } from "./Spacing";
import "./inline.css";

interface InlineProps {
  children: React.ReactNode
  spacingSize?: SpacingSize
}

export const Inline = ({children, spacingSize = "MEDIUM"}: InlineProps) => (
  <Box spacingStyle="INLINE" spacingSize={spacingSize}>
    {children}
  </Box>
)
