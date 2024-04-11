import type { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  CalendarIcon,
  CampaignIcon,
  ClockIcon,
  CloudIcon,
  ComputerIcon,
  PictureIcon,
  SunIcon,
  ThumbUpIcon,
} from "../icons/icons";

const meta = {
  title: "UI/Select",
  component: Select,
} satisfies Meta<typeof Select>;

const OPTIONS = [
  { value: "Sun", icon: <SunIcon /> },
  { value: "Thumb", icon: <ThumbUpIcon />, disabled: true },
  { value: "Cloud", icon: <CloudIcon /> },
  { value: "Clock", icon: <ClockIcon /> },
  { value: "Computer", icon: <ComputerIcon /> },
  { value: "Calendar", icon: <CalendarIcon /> },
  { value: "Campaign", icon: <CampaignIcon /> },
  { value: "Picture", icon: <PictureIcon /> },
];

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map(({ value, disabled, icon }) => (
          <SelectItem key={value} value={value} disabled={disabled}>
            {icon} {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};

export { Default };
