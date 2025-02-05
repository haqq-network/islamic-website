import { Meta, StoryObj } from '@storybook/react';
import { Tooltip as TooltipComponent } from './tooltip';

const meta: Meta<typeof TooltipComponent> = {
  component: TooltipComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TooltipComponent>;

export const Tooltip: Story = {
  args: {
    children: 'Hover me!',
    text: (
      <div className="min-w-[260px]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </div>
    ),
  },
};
