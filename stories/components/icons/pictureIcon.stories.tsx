import type { Meta, StoryObj } from "@storybook/react";

import { PictureIcon } from "@/components/icons/pictureIcon";

const meta = {
  title: "Icons/PictureIcon",
  component: PictureIcon,
} satisfies Meta<typeof PictureIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
