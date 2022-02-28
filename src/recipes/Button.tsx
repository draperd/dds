import React from "react";
import { PressHandler } from "../primitives/AbstractBox";

import { Pressable } from "../behaviors/Pressable";
import { Text } from "../primitives/Text";
import "./button.css";

interface ButtonProps {
  label: string;
  onPress?: PressHandler;
  disabled?: boolean;
  selected?: boolean;
}

export const Button = ({
  label,
  onPress,
  disabled = false,
  selected = false,
}: ButtonProps) => (
  <Pressable
    spacingStyle="SQUISHED-INSET"
    spacingSize="MEDIUM"
    className={`button ${disabled ? "disabled" : ""} ${
      selected ? "selected" : ""
    }`}
    onPress={onPress}
  >
    <Text content={label}></Text>
  </Pressable>
);
