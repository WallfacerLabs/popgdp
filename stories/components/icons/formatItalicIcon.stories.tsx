import type { Meta, StoryObj } from "@storybook/react";

import { FormatItalicIcon } from "@/components/icons/formatItalicIcon";

const meta = {
  title: "Icons/FormatItalicIcon",
  component: FormatItalicIcon,
} satisfies Meta<typeof FormatItalicIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
