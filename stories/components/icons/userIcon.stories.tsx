import type { Meta, StoryObj } from "@storybook/react";

import { UserIcon } from "@/components/icons/userIcon";

const meta = {
  title: "Icons/UserIcon",
  component: UserIcon,
} satisfies Meta<typeof UserIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
