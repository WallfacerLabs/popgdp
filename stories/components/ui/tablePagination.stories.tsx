import type { Meta, StoryObj } from "@storybook/react";

import {
  TablePagination,
  TablePaginationProps,
} from "@/components/ui/pagination/tablePagination";

const meta = {
  title: "UI/TablePagination",
  component: (args: TablePaginationProps) => <TablePagination {...args} />,
} satisfies Meta<typeof TablePagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};
