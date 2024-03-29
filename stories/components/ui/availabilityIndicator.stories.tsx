import type { Meta, StoryObj } from "@storybook/react";

import { AvailabilityIndicator } from "@/components/ui/availabilityIndicator";

const meta = {
  title: "UI/AvailabilityIndicator",
  component: AvailabilityIndicator,
} satisfies Meta<typeof AvailabilityIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

const Available: Story = {
  args: {
    available: true,
    children: "Available",
  },
};

const NotAvailable: Story = {
  args: {
    available: false,
    children: "Not available",
  },
};

export { Available, NotAvailable };
