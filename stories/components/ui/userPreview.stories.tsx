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
    image: {
      height: 60,
      width: 60,
      placeholder:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAOXRFWHRTb2Z0d2FyZQBNYXRwbG90bGliIHZlcnNpb24zLjQuMywgaHR0cHM6Ly9tYXRwbG90bGliLm9yZy/MnkTPAAAACXBIWXMAAB7CAAAewgFu0HU+AAEAAElEQVR4nOzdd3gU5f7H8e9f7",
      id: "1",
    },
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
