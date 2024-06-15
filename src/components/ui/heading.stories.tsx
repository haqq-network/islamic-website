import type { Meta, StoryObj } from '@storybook/react';
import { Heading as HeadingComponent } from './heading';

const meta: Meta<typeof HeadingComponent> = {
  component: HeadingComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HeadingComponent>;

export const Heading: Story = {
  args: {
    children: 'Heading',
    level: 1,
  },
};
