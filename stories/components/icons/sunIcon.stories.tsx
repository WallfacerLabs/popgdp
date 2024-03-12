import type { Meta, StoryObj } from "@storybook/react";

import { SunIcon } from "@/components/icons/sunIcon";

const meta = {
  title: "Icons/SunIcon",
  component: SunIcon,
} satisfies Meta<typeof SunIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
