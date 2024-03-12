import type { Meta, StoryObj } from "@storybook/react";

import { CampaignIcon } from "@/components/icons/campaignIcon";

const meta = {
  title: "Icons/CampaignIcon",
  component: CampaignIcon,
} satisfies Meta<typeof CampaignIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
