import { Meta, StoryObj } from '@storybook/react';
import { BurgerButton as BurgerButtonComponent } from './burger-button';

const meta: Meta<typeof BurgerButtonComponent> = {
  component: BurgerButtonComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof BurgerButtonComponent>;

export const BurgerButton: Story = {
  args: {
    isOpen: false,
  },
};
