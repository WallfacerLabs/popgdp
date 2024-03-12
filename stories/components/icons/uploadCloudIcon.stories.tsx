import type { Meta, StoryObj } from "@storybook/react";

import { UploadCloudIcon } from "@/components/icons/uploadCloudIcon";

const meta = {
  title: "Icons/UploadCloudIcon",
  component: UploadCloudIcon,
} satisfies Meta<typeof UploadCloudIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
