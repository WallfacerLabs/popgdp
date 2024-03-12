import type { Meta, StoryObj } from "@storybook/react";

import { PlusCircleIcon } from "@/components/icons/plusCircleIcon";

const meta = {
  title: "Icons/PlusCircleIcon",
  component: PlusCircleIcon,
} satisfies Meta<typeof PlusCircleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
