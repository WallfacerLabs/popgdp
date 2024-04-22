import { type ReactNode } from "react";

import { type CategoryColor } from "@/types/CategoryColor";
import { CampaignIcon } from "@/components/icons/campaignIcon";
import { CloudIcon } from "@/components/icons/cloudIcon";
import { PictureIcon } from "@/components/icons/pictureIcon";
import { PlusIcon } from "@/components/icons/plusIcon";
import { SdkIcon } from "@/components/icons/sdkIcon";
import { SettingsIcon } from "@/components/icons/settingsIcon";
import { StackIcon } from "@/components/icons/stackIcon";
import { SunIcon } from "@/components/icons/sunIcon";
import { ThumbUpIcon } from "@/components/icons/thumbUpIcon";

const categoryIcons = {
  red: <SunIcon />,
  pink: <ThumbUpIcon />,
  blue: <CloudIcon />,
  orange: <SettingsIcon />,
  purple: <CampaignIcon />,
  green: <PictureIcon />,
  yellow: <SdkIcon />,
  cyan: <StackIcon />,
} satisfies Record<CategoryColor, ReactNode>;

export function getCategoryIcon(
  categoryColor: CategoryColor | undefined,
): ReactNode {
  if (!categoryColor) {
    return <PlusIcon />;
  }

  return categoryIcons[categoryColor];
}
