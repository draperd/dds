import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { token } from "@atlaskit/tokens";
import { Grid } from "../layout/Grid";
import { GridItem } from "../layout/GridItem";
import { SubGrid } from "../layout/SubGrid";
import { Stack } from "../primitives/Stack";
import { Box } from "../primitives/Box";
import { Text } from "../primitives/Text";

export default {
  title: "Example/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

// Just wanted to render something on the page to fill the grid
const Shape = ({}) => (
  <GridItem columnSpan={2}>
    <Box backgroundColor={`${token("color.background.accent.blue.bolder")}`}>
      <Text content="Blob"></Text>
    </Box>
  </GridItem>
);

const renderShapes = ({ prefix, count }: { prefix: string; count: number }) => {
  const shapes = [];
  for (let i = 0; i < count; i++) {
    shapes.push(<Shape key={`${prefix}${i}`} />);
  }
  return shapes;
};

const Heading = () => (
  <Box backgroundColor={`${token("color.background.accent.blue.subtler")}`}>
    <Text content="Heading" typographyStyle="HEADING"></Text>
  </Box>
);

const Sidebar = () => (
  <Box>
    <Text content="Sidebar"></Text>
  </Box>
);

const Metadata = () => (
  <Box>
    <Text content="Metadata"></Text>
  </Box>
);

const Comments = () => (
  <Box>
    <Text content="Metadata"></Text>
  </Box>
);

export const Basic = Template.bind({});
Basic.args = {
  childrenForMobileDisplay: (
    <>
      <GridItem columnSpan={4}>
        <Heading></Heading>
      </GridItem>
      <GridItem columnSpan={4}>
        <SubGrid columns={4}>{renderShapes({ prefix: "a", count: 9 })}</SubGrid>
      </GridItem>
      <GridItem columnSpan={4}>
        <Metadata></Metadata>
      </GridItem>
      <GridItem columnSpan={4}>
        <Comments></Comments>
      </GridItem>
    </>
  ),
  childrenForTabletDisplay: (
    <>
      <GridItem columnSpan={8}>
        <Heading></Heading>
      </GridItem>
      <GridItem columnSpan={2}>
        <Sidebar></Sidebar>
      </GridItem>
      <GridItem columnSpan={6}>
        <Stack>
          <SubGrid columns={6}>
            {renderShapes({ prefix: "a", count: 9 })}
          </SubGrid>
          <SubGrid columns={6}>
            <Metadata></Metadata>
          </SubGrid>
          <SubGrid columns={6}>
            <Comments></Comments>
          </SubGrid>
        </Stack>
      </GridItem>
    </>
  ),
  childrenForSmallDesktopDisplay: (
    <>
      <GridItem columnSpan={12}>
        <Heading></Heading>
      </GridItem>
      <GridItem columnSpan={2}>
        <Sidebar></Sidebar>
      </GridItem>
      <GridItem columnSpan={6}>
        <Stack>
          <SubGrid columns={6}>
            {renderShapes({ prefix: "a", count: 9 })}
          </SubGrid>
          <Comments></Comments>
        </Stack>
      </GridItem>
      <GridItem columnSpan={4}>
        <Metadata></Metadata>
      </GridItem>
    </>
  ),
  childrenForLargeDesktopDisplay: (
    <>
      <GridItem columnSpan={16}>
        <Heading></Heading>
      </GridItem>
      <GridItem columnSpan={4}>
        <Sidebar></Sidebar>
      </GridItem>
      <GridItem columnSpan={6}>
        <SubGrid columns={6}>{renderShapes({ prefix: "a", count: 9 })}</SubGrid>
      </GridItem>
      <GridItem columnSpan={3}>
        <Metadata></Metadata>
      </GridItem>
      <GridItem columnSpan={3}>
        <Comments></Comments>
      </GridItem>
    </>
  ),
};
