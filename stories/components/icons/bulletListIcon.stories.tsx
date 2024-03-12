import type { Meta, StoryObj } from "@storybook/react";

import { BulletListIcon } from "@/components/icons/bulletListIcon";

const meta = {
  title: "Icons/BulletListIcon",
  component: BulletListIcon,
} satisfies Meta<typeof BulletListIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
