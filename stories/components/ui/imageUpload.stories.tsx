import type { Meta, StoryObj } from "@storybook/react";

import { ImageUpload, ImageUploadProps } from "@/components/ui/imageUpload";

const meta = {
  title: "UI/ImageUpload",
  component: (args: ImageUploadProps) => <ImageUpload {...args} />,
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    placeholder: "Upload Cover Image",
  },
};

export { Default };
