/* eslint-disable @nx/enforce-module-boundaries */
import type { Meta, StoryObj } from '@storybook/react';
import { withoutPadding } from '@storybook/decorators';
import { Header as HeaderComponent } from './header';

const meta: Meta<typeof HeaderComponent> = {
  component: HeaderComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [withoutPadding],
};

export default meta;
type Story = StoryObj<typeof HeaderComponent>;

export const Header: Story = {};
