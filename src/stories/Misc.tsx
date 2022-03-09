import React, { CSSProperties } from "react";

import { token } from "@atlaskit/tokens";
import { Box } from "../primitives/Box";
import { Inline } from "../primitives/Inline";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import { Link } from "../primitives/Link";

const message =
  "You're not allowed to change these restrictions. It's either due to the restrictions on the page, or permission settings for this space.";

const sectionMessageStyles: CSSProperties = {
  backgroundColor: `${token("color.background.accent.blue.subtler")}`,
};

const badgeStyles: CSSProperties = {
  backgroundColor: `${token("color.background.selected.bold")}`,
};

export const MiscellaneousComponents = () => (
  <section>
    <Stack>
      <Text typographyStyle="HEADING" content="Section Message"></Text>
      <Box spacingStyle="INSET" style={sectionMessageStyles}>
        <Inline>
          <Stack>
            <div>Icon</div>
          </Stack>
          <Stack spacingSize="SMALL">
            <Text content="Editing is restricted" typographyStyle="BOLD"></Text>
            <Text content={message} typographyStyle="TEXT"></Text>
            <Inline>
              <Link content="Request edit access" href="#"></Link>
              <Text content="." typographyStyle="TEXT"></Text>
              <Link content="Learn more" href="#"></Link>
            </Inline>
          </Stack>
        </Inline>
      </Box>
      <Text typographyStyle="HEADING" content="Badge"></Text>
      <Box style={badgeStyles} spacingSize="SMALL" radiusSize="MEDIUM">
        <Text
          typographyStyle="TEXT"
          typographySize="XSMALL"
          content="99"
          color={`${token("color.text.inverse")}`}
        ></Text>
      </Box>
    </Stack>
  </section>
);
