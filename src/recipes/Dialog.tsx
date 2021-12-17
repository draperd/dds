import React, { ReactNode } from "react";

import { Box } from "../primitives/Box";
import { Button } from "./Button";
import { Inline } from "../primitives/Inline";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import "./dialog.css";

interface DialogProps {
  header?: string;
  content?: string;
}

interface DialogHeader {
    content: string
}

interface DialogFooter {
    children?: ReactNode
}

export const DialogHeader = ({ content }: DialogHeader) => (
    <Inline><Text typographyStyle="HEADING" content={content}></Text></Inline>
)

export const DialogFooter = ({ children }: DialogFooter) => (
    <Inline alignment="RIGHT">{children}</Inline>
)

// This would need a number of additional accessibility attributes for this to be a proper dialog: 
// See -> https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html

export const Dialog = ({ }: DialogProps) => (
    <Box className="dialog">
      <Stack>
        <DialogHeader content="Heading"></DialogHeader>
        <Inline><Text content="Body"></Text></Inline>
        <DialogFooter>
            <Button label="Cancel"></Button>
            <Button label="Confirm"></Button>
        </DialogFooter>
      </Stack>
    </Box>
);