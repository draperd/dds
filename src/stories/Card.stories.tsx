import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Card } from '../recipes/Card';

export default {
  title: 'Example/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

