import type { Meta, StoryObj } from "@storybook/react";

import { MinusIcon } from "@/components/icons/minusIcon";

const meta = {
  title: "Icons/MinusIcon",
  component: MinusIcon,
} satisfies Meta<typeof MinusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
