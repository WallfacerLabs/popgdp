import type { Meta, StoryObj } from "@storybook/react";

import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
} from "@/components/ui/radioGroup";

const meta = {
  title: "UI/RadioGroup",
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="first">
      <RadioGroupLabel>
        First
        <RadioGroupItem value="first" id="first" />
      </RadioGroupLabel>
      <RadioGroupLabel>
        Second
        <RadioGroupItem value="second" id="second" />
      </RadioGroupLabel>
      <RadioGroupLabel>
        Third
        <RadioGroupItem value="third" id="third" />
      </RadioGroupLabel>
      <RadioGroupLabel>
        Disabled
        <RadioGroupItem value="disabled" id="disabled" disabled />
      </RadioGroupLabel>
    </RadioGroup>
  ),
};

export { Default };
