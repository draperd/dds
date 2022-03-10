import React from "react";

import { Box } from "./Box";
import { SpacingAlignment, SpacingSize } from "../foundations/Spacing";
import "./inline.css";

interface InlineProps {
  children: React.ReactNode;
  spacingSize?: SpacingSize;
  spacingAlignment?: SpacingAlignment;
  wrapContent?: boolean;
  stretchHorizontally?: boolean;
}

export const Inline = ({
  children,
  spacingSize = "MEDIUM",
  spacingAlignment = "LEFT",
  wrapContent = false,
  stretchHorizontally = false,
}: InlineProps) => (
  <Box
    spacingStyle="INLINE"
    spacingSize={spacingSize}
    spacingAlignment={spacingAlignment}
    wrapContent={wrapContent}
    stretchHorizontally={stretchHorizontally}
  >
    {children}
  </Box>
);
