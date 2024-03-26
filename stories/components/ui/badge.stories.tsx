import type { Meta, StoryObj } from "@storybook/react";

import { Badge, BadgeProps } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: (args: BadgeProps) => <Badge {...args}>Badge</Badge>,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const Green: Story = {
  args: {
    variant: "green",
  },
};

const Orange: Story = {
  args: {
    variant: "orange",
  },
};

const Red: Story = {
  args: {
    variant: "red",
  },
};

const Blue: Story = {
  args: {
    variant: "blue",
  },
};

const Pink: Story = {
  args: {
    variant: "pink",
  },
};

export { Green, Orange, Red, Blue, Pink };
