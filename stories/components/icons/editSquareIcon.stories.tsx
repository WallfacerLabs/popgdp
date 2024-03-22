import type { Meta, StoryObj } from "@storybook/react";

import { EditSquareIcon } from "@/components/icons/editSquareIcon";

const meta = {
  title: "Icons/EditSquareIcon",
  component: EditSquareIcon,
} satisfies Meta<typeof EditSquareIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
