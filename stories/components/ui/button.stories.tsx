import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonProps } from "@/components/ui/button";

const meta = {
  title: "UI/Button",
  component: (args: ButtonProps) => <Button {...args}>Button</Button>,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    variant: "primary",
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

const Link: Story = {
  args: {
    variant: "link",
  },
};

const Default: Story = {
  args: {
    variant: "default",
  },
};

export { Primary, Secondary, Outline, Link, Default };
