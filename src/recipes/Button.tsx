import React from "react";
import { PressHandler } from "../primitives/AbstractBox";

import { Pressable } from "../behaviors/Pressable";
import { Text } from "../primitives/Text";
import "./button.css";
import { SpacingAlignment } from "src/foundations/Spacing";

interface ButtonProps {
  label: string;
  onPress?: PressHandler;
  disabled?: boolean;
  selected?: boolean;
  spacingAlignment?: SpacingAlignment;
}

export const Button = ({
  label,
  onPress,
  disabled = false,
  selected = false,
  spacingAlignment,
}: ButtonProps) => (
  <Pressable
    spacingAlignment={spacingAlignment}
    spacingStyle="SQUISHED-INSET"
    spacingSize="MEDIUM"
    className={`button ${disabled ? "disabled" : ""} ${
      selected ? "selected" : ""
    }`}
    onPress={onPress}
    disabled={disabled}
  >
    <Text content={label}></Text>
  </Pressable>
);
