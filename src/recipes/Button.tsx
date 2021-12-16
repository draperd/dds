import React from "react";

import { Pressable } from "../behaviors/Pressable";
import { Box } from "../primitives/Box";
import { Text } from "../primitives/Text";
import "./button.css";

interface ButtonProps {
  label: string
}

export const Button = ({label}: ButtonProps) => (
  <Pressable>
    <Box spacingStyle="SQUISHED-INSET" spacingSize="MEDIUM" className="button">
      <Text content={label}></Text>
    </Box>
  </Pressable>
)
