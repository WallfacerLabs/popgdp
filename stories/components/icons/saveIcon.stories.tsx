import type { Meta, StoryObj } from "@storybook/react";

import { SaveIcon } from "@/components/icons/saveIcon";

const meta = {
  title: "Icons/SaveIcon",
  component: SaveIcon,
} satisfies Meta<typeof SaveIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
