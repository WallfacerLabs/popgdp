import type { Meta, StoryObj } from "@storybook/react";

import { ProductIcon } from "@/components/icons/productIcon";

const meta = {
  title: "Icons/ProductIcon",
  component: ProductIcon,
} satisfies Meta<typeof ProductIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { className: "w-10 h-10" },
};
