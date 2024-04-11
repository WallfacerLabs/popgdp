import type { Meta, StoryObj } from "@storybook/react";

import { ScrollArea } from "@/components/ui/scrollArea";

const meta = {
  title: "UI/ScrollArea",
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded border">
      <div className="p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum soluta
        praesentium quisquam deleniti cumque saepe tenetur, officiis neque
        voluptatum fuga quos, alias tempore, vitae ratione eveniet excepturi
        dolor! Maiores, repellat. Itaque, asperiores, non inventore incidunt
        accusantium deserunt impedit earum commodi debitis eaque quidem ex
        facilis ducimus nihil! Similique tempora molestiae provident voluptas
        veritatis eligendi rem minus placeat, hic pariatur nemo! Repellendus at
        quasi distinctio amet iure eligendi deleniti perspiciatis beatae omnis
        nobis, dolorum modi expedita harum alias odit quos fugiat atque!
        Blanditiis accusamus eligendi omnis error quam quis suscipit earum?
      </div>
    </ScrollArea>
  ),
};

export { Default };
