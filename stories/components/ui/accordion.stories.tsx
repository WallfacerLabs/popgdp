import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronIcon } from "@/components/icons/chevronIcon";

const meta = {
  title: "UI/Accordion",
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const Single: Story = {
  args: {
    title: "Single",
  },
  render: () => (
    <Accordion type="single">
      <AccordionItem value="single">
        <AccordionTrigger>Single item accordion</AccordionTrigger>
        <AccordionContent>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore at
          voluptates tenetur porro sunt quod voluptatum voluptatem ab iusto
          dolore! Quae architecto exercitationem corporis saepe assumenda quos
          enim nobis! Itaque.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

const Multiple: Story = {
  args: {
    title: "Multiple",
  },
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="first">
        <AccordionTrigger>First item</AccordionTrigger>
        <AccordionContent>First content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="second">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

const WithArrow: Story = {
  args: {
    title: "Multiple",
  },
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="first">
        <AccordionTrigger>
          First item
          <ChevronIcon direction="down" />
        </AccordionTrigger>
        <AccordionContent>First content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="second">
        <AccordionTrigger>
          Second item
          <ChevronIcon direction="down" />
        </AccordionTrigger>
        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export { Single, Multiple, WithArrow };
