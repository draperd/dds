import React from "react";

import { Box } from "../primitives/Box";
import { Text } from "../primitives/Text";
import "./button.css";

interface ButtonProps {
  label: string
}

export const Button = ({label}: ButtonProps) => (
  <Box spacingStyle="SQUISHED-INSET" spacingSize="MEDIUM" className="button">
    <Text content={label}></Text>
  </Box>
)
