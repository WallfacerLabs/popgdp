import type { Meta, StoryObj } from "@storybook/react";

import { AssignmentIcon } from "@/components/icons/assignmentIcon";

const meta = {
  title: "Icons/AssignmentIcon",
  component: AssignmentIcon,
} satisfies Meta<typeof AssignmentIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
