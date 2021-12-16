import React from "react";

import { Box } from "../primitives/Box";
import { Text } from "../primitives/Text";
import "./pill.css";

interface PillProps {
  content: string;
}

export const Pill = ({ content }: PillProps) => (
  <Box className="pill" spacingStyle="INSET" spacingSize="SMALL">
    <Text content={content}></Text>
  </Box>
);