import type { Meta, StoryObj } from "@storybook/react";

import { LogoutIcon } from "@/components/icons/logoutIcon";

const meta = {
  title: "Icons/LogoutIcon",
  component: LogoutIcon,
} satisfies Meta<typeof LogoutIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
