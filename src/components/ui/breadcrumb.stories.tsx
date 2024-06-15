import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb as BreadcrumbComponent } from './breadcrumb';

const meta: Meta<typeof BreadcrumbComponent> = {
  component: BreadcrumbComponent,
};

export default meta;

type Story = StoryObj<typeof BreadcrumbComponent>;

export const Breadcrumb: Story = {
  args: {
    title: 'lorem ipsum dolor sit amet',
    backTitle: 'Posts',
  },
};
