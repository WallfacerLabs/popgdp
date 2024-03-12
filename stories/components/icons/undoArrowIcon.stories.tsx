import type { Meta, StoryObj } from "@storybook/react";

import { UndoArrowIcon } from "@/components/icons/undoArrowIcon";

const meta = {
  title: "Icons/UndoArrowIcon",
  component: UndoArrowIcon,
} satisfies Meta<typeof UndoArrowIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
