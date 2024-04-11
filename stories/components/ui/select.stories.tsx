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
          <SunIcon className="h-4 w-4" /> Sun
        </SelectItem>
        <SelectItem value="thumb" disabled>
          <ThumbUpIcon className="h-4 w-4" /> Thumb
        </SelectItem>
        <SelectItem value="cloud">
          <CloudIcon className="h-4 w-4" /> Cloud
        </SelectItem>
        <SelectItem value="clock">
          <ClockIcon className="h-4 w-4" /> Clock
        </SelectItem>
        <SelectItem value="computer">
          <ComputerIcon className="h-4 w-4" /> Computer
        </SelectItem>
        <SelectItem value="calendar">
          <CalendarIcon className="h-4 w-4" /> Calendar
        </SelectItem>
        <SelectItem value="campaign">
          <CampaignIcon className="h-4 w-4" /> Campaign
        </SelectItem>
        <SelectItem value="picture">
          <PictureIcon className="h-4 w-4" /> Picture
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

export { Default };
