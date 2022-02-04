import React from "react";
import { Stack } from "../primitives/Stack";

import { ChangeHandler, Input } from "../html/Input";
import { Label } from "../html/Label";

interface NumberSpinnerProps {
  id: string;
  label: string;
  value?: number;
  onChange?: ChangeHandler;
}

export const NumberSpinner = ({
  id,
  label,
  value,
  onChange,
}: NumberSpinnerProps) => (
  <Stack spacingSize="SMALL">
    <Label htmlFor={id} content={label}></Label>
    <Input
      type="NUMBER"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
    ></Input>
  </Stack>
);
