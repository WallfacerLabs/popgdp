import type { Meta, StoryObj } from "@storybook/react";

import { CalendarIcon } from "@/components/icons/calendarIcon";

const meta = {
  title: "Icons/CalendarIcon",
  component: CalendarIcon,
} satisfies Meta<typeof CalendarIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
