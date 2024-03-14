import type { Meta, StoryObj } from "@storybook/react";

import { TrashIcon } from "@/components/icons/trashIcon";

const meta = {
  title: "Icons/TrashIcon",
  component: TrashIcon,
} satisfies Meta<typeof TrashIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
