import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "@/components/ui/button";

const meta = {
  title: "Example/Button",
  component: (args: ButtonProps) => (
    <Button {...args} />
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    children: "Primary",
  },
};
