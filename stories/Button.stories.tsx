import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "@/components/ui/button";

const meta = {
  title: "Example/Button",
  component: (args: ButtonProps) => <Button {...args}>Button</Button>,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    variant: "default",
  },
};

const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

const Outline: Story = {
  args: {
    variant: "outline",
  },
};

const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

const Link: Story = {
  args: {
    variant: "link",
  },
};

const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export { Primary, Secondary, Outline, Ghost, Link, Destructive };
