/* eslint-disable @nx/enforce-module-boundaries */
import type { Meta, StoryObj } from '@storybook/react';
import { withoutPadding } from '@storybook/decorators';
import { Footer as FooterComponent } from './footer';

const meta: Meta<typeof FooterComponent> = {
  component: FooterComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [withoutPadding],
};

export default meta;
type Story = StoryObj<typeof FooterComponent>;

export const Footer: Story = {};
