import React from "react";
import { Stack } from "../primitives/Stack";

import { Input } from "../html/Input";
import { Label } from "../html/Label";

interface NumberSpinnerProps {
  id: string;
  label: string;
}

export const NumberSpinner = ({ id, label }: NumberSpinnerProps) => (
  <Stack spacingSize="SMALL">
    <Label htmlFor={id} content={label}></Label>
    <Input type="NUMBER" id={id} name={id}></Input>
  </Stack>
);
