import type { Meta, StoryObj } from "@storybook/react";

import { UserPreview, UserPreviewProps } from "@/components/ui/userPreview";

const meta = {
  title: "UI/UserPreview",
  component: (args: UserPreviewProps) => <UserPreview {...args} />,
} satisfies Meta<typeof UserPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    imageId: "0xId",
    name: "Vitalik",
    role: "Inventor",
  },
};

const Fallback: Story = {
  args: {
    imageId: undefined,
    name: "Username",
    role: "Role",
  },
};

export { Default, Fallback };
