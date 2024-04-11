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

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="sun">
          <SunIcon /> Sun
        </SelectItem>
        <SelectItem value="thumb" disabled>
          <ThumbUpIcon /> Thumb
        </SelectItem>
        <SelectItem value="cloud">
          <CloudIcon /> Cloud
        </SelectItem>
        <SelectItem value="clock">
          <ClockIcon /> Clock
        </SelectItem>
        <SelectItem value="computer">
          <ComputerIcon /> Computer
        </SelectItem>
        <SelectItem value="calendar">
          <CalendarIcon /> Calendar
        </SelectItem>
        <SelectItem value="campaign">
          <CampaignIcon /> Campaign
        </SelectItem>
        <SelectItem value="picture">
          <PictureIcon /> Picture
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export { Default };
