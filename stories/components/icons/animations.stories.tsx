import type { Meta, StoryObj } from "@storybook/react";

import { ProductAnimatedIcon } from "@/components/icons/productAnimatedIcon";

const meta = {
  title: "Animation",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Animation: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-[64px_64px_64px] gap-4">
        <div className="flex flex-col items-center gap-4">
          <ProductAnimatedIcon className="h-10 w-10" variant="linear" />
          <span className="font-bold">current</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <ProductAnimatedIcon className="h-10 w-10" variant="linear" />
          <span className="font-bold">linear</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <ProductAnimatedIcon className="h-10 w-10" variant="ease" />
          <span className="font-bold">ease</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <ProductAnimatedIcon className="h-10 w-10" variant="easeIn" />
          <span className="font-bold">easeIn</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <ProductAnimatedIcon className="h-10 w-10" variant="easeOut" />
          <span className="font-bold">easeOut</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <ProductAnimatedIcon className="h-10 w-10" variant="easeInOut" />
          <span className="font-bold">easeInOut</span>
        </div>
      </div>
    );
  },
};

export { Animation };
