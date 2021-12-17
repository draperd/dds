import React, { ReactNode } from "react";

import { Box } from "../primitives/Box";
import { Button } from "./Button";
import { Inline } from "../primitives/Inline";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import "./dialog.css";

interface DialogProps {
  heading: string;
  content: string;
}

interface DialogHeaderProps {
  heading: string
}

interface DialogFooterProps {
    children?: ReactNode
}

interface DialogBodyProps {
  children?: ReactNode
}

export const DialogHeader = ({ heading }: DialogHeaderProps) => (
    <Inline><Text typographyStyle="HEADING" content={heading}></Text></Inline>
)

export const DialogFooter = ({ children }: DialogFooterProps) => (
    <Inline alignment="RIGHT">{children}</Inline>
)

export const DialogBody = ({ children }: DialogBodyProps) => (
  <Box spacingStyle="FLUSH">{children}</Box>
)

// This would need a number of additional accessibility attributes for this to be a proper dialog: 
// See -> https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html

export const Dialog = ({ heading, content }: DialogProps) => (
    <Box className="dialog">
      <Stack>
        <DialogHeader heading={heading}></DialogHeader>
        <DialogBody>
          <Text content={content}></Text>
        </DialogBody>
        <DialogFooter>
            <Button label="Cancel"></Button>
            <Button label="Confirm"></Button>
        </DialogFooter>
      </Stack>
    </Box>
);