import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

const meta = {
  title: "Example/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Primary",
  },
};
