import React, { CSSProperties } from "react";

import { token } from "@atlaskit/tokens";
import { Box } from "../primitives/Box";
import { Inline } from "../primitives/Inline";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";

const message =
  "You're not allowed to change these restrictions. It's either due to the restrictions on the page, or permission settings for this space.";

const styles: CSSProperties = {
  backgroundColor: `${token("color.background.accent.blue.subtler")}`,
};

export const MiscellaneousComponents = () => (
  <section>
    <Box spacingStyle="INSET" style={styles}>
      <Inline>
        <Stack>
          <div>Icon</div>
        </Stack>
        <Stack spacingSize="SMALL">
          <Text content="Editing is restricted" typographyStyle="BOLD"></Text>
          <Text content={message} typographyStyle="TEXT"></Text>
          <Inline>
            <Text content="Request edit access" typographyStyle="TEXT"></Text>
            <Text content="." typographyStyle="TEXT"></Text>
            <Text content="Learn more" typographyStyle="TEXT"></Text>
          </Inline>
        </Stack>
      </Inline>
    </Box>
  </section>
);
