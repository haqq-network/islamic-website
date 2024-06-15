import type { Meta, StoryObj } from '@storybook/react';
import { WalletDownloadButton as WalletDownloadButtonComponent } from './wallet-download-button';

const meta: Meta<typeof WalletDownloadButtonComponent> = {
  component: WalletDownloadButtonComponent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof WalletDownloadButtonComponent>;

export const Apple: Story = {
  args: {
    type: 'apple',
  },
};

export const Google: Story = {
  args: {
    type: 'google',
  },
};
