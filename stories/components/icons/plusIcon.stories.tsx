import type { Meta, StoryObj } from "@storybook/react";

import { PlusIcon } from "@/components/icons/plusIcon";

const meta = {
  title: "Icons/PlusIcon",
  component: PlusIcon,
} satisfies Meta<typeof PlusIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
