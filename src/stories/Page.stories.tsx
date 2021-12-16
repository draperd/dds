import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Page } from './Page';
import * as CardStories from './Card.stories';

export default {
  title: 'Example/Page',
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Card = Template.bind({});
Card.args = {
  // More on composing args: https://storybook.js.org/docs/react/writing-stories/args#args-composition
  ...CardStories.LoggedIn.args,
};

