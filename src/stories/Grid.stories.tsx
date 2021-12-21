import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Grid, GridItem } from '../layout/Grid';

export default {
  title: 'Example/Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;


export const Basic = Template.bind({});
Basic.args = {
  childrenForMobileDisplay: ( <>
                                <GridItem columnSpan={4}><div>Heading with menu</div></GridItem>
                                <GridItem columnSpan={4}><div>Main</div></GridItem>
                                <GridItem columnSpan={4}><div>Metadata</div></GridItem>
                                <GridItem columnSpan={4}><div>Comments</div></GridItem>
                              </>),
  childrenForTabletDisplay: (<>
                                <GridItem columnSpan={8}><div>Heading</div></GridItem>
                                <GridItem columnSpan={2} rowSpan={3}><div>Sidebar</div></GridItem>
                                <GridItem columnSpan={6}><div>Main</div></GridItem>
                                <GridItem columnSpan={6}><div>Metadata</div></GridItem>
                                <GridItem columnSpan={6}><div>Comments</div></GridItem>
                            </>),
  childrenForSmallDesktopDisplay: (<>
                                <GridItem columnSpan={12}><div>Heading</div></GridItem>
                                <GridItem columnSpan={2} rowSpan={2}><div>Sidebar</div></GridItem>
                                <GridItem columnSpan={5}><div>Main</div></GridItem>
                                <GridItem columnSpan={5} rowSpan={2}><div>Metadata</div></GridItem>
                                <GridItem columnSpan={5}><div>Comments</div></GridItem>
                              </>),
  childrenForLargeDesktopDisplay: (<>
                                    <GridItem columnSpan={16}><div>Heading</div></GridItem>
                                    <GridItem columnSpan={4} rowSpan={1}><div>Sidebar</div></GridItem>
                                    <GridItem columnSpan={4}><div>Main</div></GridItem>
                                    <GridItem columnSpan={4} rowSpan={1}><div>Metadata</div></GridItem>
                                    <GridItem columnSpan={4}><div>Comments</div></GridItem>
                                  </>)
};

