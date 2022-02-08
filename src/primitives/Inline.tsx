import React from "react";

import { Box } from "./Box";
import { SpacingAlignment, SpacingSize } from "../foundations/Spacing";
import "./inline.css";

interface InlineProps {
  children: React.ReactNode;
  spacingSize?: SpacingSize;
  spacingAlignment?: SpacingAlignment;
}

export const Inline = ({
  children,
  spacingSize = "MEDIUM",
  spacingAlignment = "LEFT",
}: InlineProps) => (
  <Box
    spacingStyle="INLINE"
    spacingSize={spacingSize}
    spacingAlignment={spacingAlignment}
  >
    {children}
  </Box>
);
