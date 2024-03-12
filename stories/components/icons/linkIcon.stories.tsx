import type { Meta, StoryObj } from "@storybook/react";

import { LinkIcon } from "@/components/icons/linkIcon";

const meta = {
  title: "Icons/LinkIcon",
  component: LinkIcon,
} satisfies Meta<typeof LinkIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
