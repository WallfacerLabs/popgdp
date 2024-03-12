import type { Meta, StoryObj } from "@storybook/react";

import { TeamIcon } from "@/components/icons/teamIcon";

const meta = {
  title: "Icons/TeamIcon",
  component: TeamIcon,
} satisfies Meta<typeof TeamIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
