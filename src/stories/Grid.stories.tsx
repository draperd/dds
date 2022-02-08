import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Grid } from "../layout/Grid";
import { GridItem } from "../layout/GridItem";
import { SubGrid } from "../layout/SubGrid";

export default {
  title: "Example/Grid",
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;

// Just wanted to render something on the page to fill the grid
const Shape = ({}) => (
  <div style={{ backgroundColor: "orange", height: "100%", width: "100%" }}>
    Shape
  </div>
);

const renderShapes = ({ prefix, count }: { prefix: string; count: number }) => {
  const shapes = [];
  for (let i = 0; i < count; i++) {
    shapes.push(<Shape key={`${prefix}${i}`} />);
  }
  return shapes;
};

export const Basic = Template.bind({});
Basic.args = {
  childrenForMobileDisplay: (
    <>
      <GridItem columnSpan={4}>
        <div>Heading (w/ hamburger menu)</div>
      </GridItem>
      <GridItem columnSpan={4}>
        <SubGrid columns={4}>{renderShapes({ prefix: "a", count: 9 })}</SubGrid>
      </GridItem>
      <GridItem columnSpan={4}>
        <div>Metadata</div>
      </GridItem>
      <GridItem columnSpan={4}>
        <div>Comments</div>
      </GridItem>
    </>
  ),
  childrenForTabletDisplay: (
    <>
      <GridItem columnSpan={8}>
        <div>Heading</div>
      </GridItem>
      <GridItem columnSpan={2} rowSpan={3}>
        <div>Sidebar</div>
      </GridItem>
      <GridItem columnSpan={6}>
        <SubGrid columns={6}>{renderShapes({ prefix: "a", count: 9 })}</SubGrid>
      </GridItem>
      <GridItem columnSpan={6}>
        <div>Metadata</div>
      </GridItem>
      <GridItem columnSpan={6}>
        <div>Comments</div>
      </GridItem>
    </>
  ),
  childrenForSmallDesktopDisplay: (
    <>
      <GridItem columnSpan={12}>
        <div>Heading</div>
      </GridItem>
      <GridItem columnSpan={2} rowSpan={2}>
        <div>Sidebar</div>
      </GridItem>
      <GridItem columnSpan={6}>
        <SubGrid columns={6}>{renderShapes({ prefix: "a", count: 9 })}</SubGrid>
      </GridItem>
      <GridItem columnSpan={4} rowSpan={2}>
        <div>Metadata</div>
      </GridItem>
      <GridItem columnSpan={6}>
        <div>Comments</div>
      </GridItem>
    </>
  ),
  childrenForLargeDesktopDisplay: (
    <>
      <GridItem columnSpan={16}>
        <div>Heading</div>
      </GridItem>
      <GridItem columnSpan={4} rowSpan={1}>
        <div>Sidebar</div>
      </GridItem>
      <GridItem columnSpan={6}>
        <SubGrid columns={6}>{renderShapes({ prefix: "a", count: 2 })}</SubGrid>
      </GridItem>
      <GridItem columnSpan={3} rowSpan={1}>
        <div>Metadata</div>
      </GridItem>
      <GridItem columnSpan={3}>
        <div>Comments</div>
      </GridItem>
    </>
  ),
};
