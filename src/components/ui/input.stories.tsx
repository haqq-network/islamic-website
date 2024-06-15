import { Meta, StoryObj } from '@storybook/react';
import { Input as InputComponent } from './input';

const meta: Meta<typeof InputComponent> = {
  component: InputComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof InputComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your email',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Enter your email',
    state: 'error',
    hint: 'Email invalid',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Enter your email',
    disabled: true,
  },
};
