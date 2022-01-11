import React from "react";

import { Box } from "./Box";
import { SpacingSize } from "../foundations/Spacing";
import "./spread.css";

interface SpreadProps {
  children: React.ReactNode[];
  spacingSize?: SpacingSize;
}

// The idea of this component is to be able to spread things across the width of the box...
// So you can use to align things both left and right on the same row for example
// NOTE: This is quite hacky and there are almost certainly better ways to achieve this :/
export const Spread = ({
  children = [],
  spacingSize = "MEDIUM",
}: SpreadProps) => (
  <Box className="spread" spacingStyle="SPREAD" spacingSize={spacingSize}>
    {children.map((child) => (
      <div>{child}</div>
    ))}
  </Box>
);
