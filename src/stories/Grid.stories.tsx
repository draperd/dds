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
//   // More on composing args: https://storybook.js.org/docs/react/writing-stories/args#args-composition
//   ...CardStories.LoggedIn.args,
};

