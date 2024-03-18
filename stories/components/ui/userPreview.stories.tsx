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
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg/1920px-Vitalik_Buterin_TechCrunch_London_2015_%28cropped%29.jpg",
    name: "Vitalik",
    role: "Inventor",
  },
};

const Fallback: Story = {
  args: {
    image: undefined,
    name: "Username",
    role: "Role",
  },
};

export { Default, Fallback };
