import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/ui/button";

import * as ICONS from "./icons";

const meta = {
  title: "Icons",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function copyIcon(label: string) {
  const iconElement = `<${label} />`;
  navigator.clipboard.writeText(iconElement);
}

const Icons: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold">Click to copy</h2>
        <ul className="flex flex-wrap gap-4">
          {Object.entries(ICONS).map(([label, Icon]) => (
            <li key={label}>
              <Button
                variant="secondary"
                onClick={() => copyIcon(label)}
                className="flex h-36 w-36 flex-col items-center gap-2 text-center"
              >
                <Icon className="!h-12 !w-12" />
                <span className="text-xs font-bold">{`<${label} />`}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  },
};

export { Icons };
