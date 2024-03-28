import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@/components/ui/checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {};

const Disabled: Story = {
  args: {
    disabled: true,
  },
};

const Checked: Story = {
  args: {
    checked: true,
  },
};

const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export { Checked, Default, Disabled, DisabledChecked };
