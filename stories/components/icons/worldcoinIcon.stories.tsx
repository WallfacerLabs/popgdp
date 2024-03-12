import type { Meta, StoryObj } from "@storybook/react";

import { WorldcoinIcon } from "@/components/icons/worldcoinIcon";

const meta = {
  title: "Icons/WorldcoinIcon",
  component: WorldcoinIcon,
} satisfies Meta<typeof WorldcoinIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
