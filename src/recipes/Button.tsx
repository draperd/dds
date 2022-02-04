import React from "react";
import { PressHandler } from "../primitives/AbstractBox";

import { Pressable } from "../behaviors/Pressable";
import { Text } from "../primitives/Text";
import "./button.css";

interface ButtonProps {
  label: string;
  onPress?: PressHandler;
}

export const Button = ({ label, onPress }: ButtonProps) => (
  <Pressable
    spacingStyle="SQUISHED-INSET"
    spacingSize="MEDIUM"
    className="button"
    onPress={onPress}
  >
    <Text content={label}></Text>
  </Pressable>
);
