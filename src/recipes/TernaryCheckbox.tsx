import React from "react";
import { PressHandler } from "../primitives/AbstractBox";

import { Pressable } from "../behaviors/Pressable";
import { Text } from "../primitives/Text";
import "./button.css";
import { SpacingAlignment } from "src/foundations/Spacing";

// This is a really simple ternary (i.e. 3-state) checkbox that has been created
// for use in the table example. It is intended to be used in the header to indicate
// that either no, some or all rows are selected

export type TernaryCheckedState = "NONE" | "SOME" | "ALL";

interface TernaryCheckboxProps {
  onPress?: PressHandler;
  checkedState: TernaryCheckedState;
  spacingAlignment?: SpacingAlignment;
}

export const TernaryCheckbox = ({
  onPress,
  checkedState,
  spacingAlignment = "LEFT",
}: TernaryCheckboxProps) => {
  let label = "[ ]";
  if (checkedState === "SOME") {
    label = "[-]";
  } else if (checkedState === "ALL") label = "[/]";

  return (
    <Pressable
      spacingStyle="FLUSH"
      spacingSize="MEDIUM"
      onPress={onPress}
      spacingAlignment={spacingAlignment}
    >
      <Text content={label}></Text>
    </Pressable>
  );
};
