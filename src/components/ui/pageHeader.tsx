import { cn } from "@/lib/cn";

import { BackButton } from "./backButton";
import { PageTitle } from "./pageTitle";

interface PageHeaderProps {
  title: string;
  backUrl?: string;
  badges?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  backUrl,
  badges,
  children,
  className,
}: PageHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-x-4 gap-y-2",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {backUrl && <BackButton href={backUrl} />}
        {title && <PageTitle>{title}</PageTitle>}
        {badges && (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {badges}
          </div>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {children}
        </div>
      )}
    </div>
  );
};
