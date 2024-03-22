import type { Meta } from "@storybook/react";

import { Switch, SwitchProps } from "@/components/ui/switch";

export default {
  title: "UI/Switch",
  component: Switch,
} as Meta<typeof Switch>;

export const Default = (args: SwitchProps) => <Switch {...args} />;
Default.args = {
  disabled: false,
};
