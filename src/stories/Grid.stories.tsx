import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Grid } from '../layout/Grid';

export default {
  title: 'Example/Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof Grid> = (args) => <Grid {...args} />;


export const Basic = Template.bind({});
Basic.args = {
  childrenForMobileDisplay: ( <>
                                <div>Heading</div>
                                <div>Main</div>
                              </>),
  childrenForTabletDisplay: (<>
                                <div>Heading</div>
                                <div>Sidebar</div>
                                <div>Main</div>
                            </>),
  childrenForDesktopDisplay: (<>
                                <div>Heading</div>
                                <div>Sidebar</div>
                                <div>Main</div>
                                <div>Metadata</div>
                                <div>Comments</div>
                              </>)
};

