import React from "react";
import { PressHandler } from "../primitives/AbstractBox";

import { Pressable } from "../behaviors/Pressable";
import { Text } from "../primitives/Text";
import "./button.css";

// This is a really simple ternary (i.e. 3-state) checkbox that has been created
// for use in the table example. It is intended to be used in the header to indicate
// that either no, some or all rows are selected

export type TernaryCheckedState = "NONE" | "SOME" | "ALL";

interface TernaryCheckboxProps {
  onPress?: PressHandler;
  checkedState: TernaryCheckedState;
}

export const TernaryCheckbox = ({
  onPress,
  checkedState,
}: TernaryCheckboxProps) => {
  let label = "[ ]";
  if (checkedState === "SOME") {
    label = "[-]";
  } else if (checkedState === "ALL") label = "[/]";

  return (
    <Pressable
      spacingStyle="SQUISHED-INSET"
      spacingSize="MEDIUM"
      onPress={onPress}
    >
      <Text content={label}></Text>
    </Pressable>
  );
};
