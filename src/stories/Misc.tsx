import React from "react";

import { token } from "@atlaskit/tokens";
import { Box } from "../primitives/Box";
import { Inline } from "../primitives/Inline";
import { Stack } from "../primitives/Stack";
import { Text } from "../primitives/Text";
import { Link } from "../primitives/Link";

const message =
  "You're not allowed to change these restrictions. It's either due to the restrictions on the page, or permission settings for this space.";

export const MiscellaneousComponents = () => (
  <section>
    <Stack>
      <Text typographyStyle="HEADING" content="Section Message"></Text>
      <Box
        spacingStyle="INSET"
        backgroundColor={`${token("color.background.accent.blue.subtler")}`}
        stretchHorizontally={true}
      >
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
      <Box
        backgroundColor={`${token("color.background.selected.bold")}`}
        spacingSize="SMALL"
        radiusSize="MEDIUM"
      >
        <Text
          typographyStyle="TEXT"
          typographySize="XSMALL"
          content="99"
          color={`${token("color.text.inverse")}`}
        ></Text>
      </Box>
      <Text typographyStyle="HEADING" content="Lozenge"></Text>
      <Box
        backgroundColor={`${token("color.background.success")}`}
        spacingStyle="SQUISHED-INSET"
        spacingSize="SMALL"
        radiusSize="XSMALL"
      >
        <Text
          typographyStyle="TEXT"
          typographySize="XSMALL"
          typographyWeight="SEMIBOLD"
          typographyTransformation="UPPERCASE"
          content="Success"
          color={`${token("color.text.success")}`}
        ></Text>
      </Box>
    </Stack>
  </section>
);
