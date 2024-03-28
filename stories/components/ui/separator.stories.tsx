import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "@/components/ui/separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

const Dot: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <p>Left</p>
      <Separator orientation="dot" />
      <p>Right</p>
    </div>
  ),
};

const Horizontal: Story = {
  render: () => (
    <div className="flex w-20 flex-col items-center">
      <p>Above</p>
      <Separator orientation="horizontal" />
      <p>Below</p>
    </div>
  ),
};

const Vertical: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex h-6 items-center gap-2">
        <p>Left</p>
        <Separator orientation="vertical" />
        <p>Right</p>
      </div>
      <div className="flex items-center gap-2">
        <p>Left</p>
        <Separator orientation="vertical" className="h-6" />
        <p>Right</p>
      </div>
    </div>
  ),
};

export { Dot, Horizontal, Vertical };
