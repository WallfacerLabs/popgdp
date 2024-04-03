import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

interface MarkdownPreviewProps {
  body: string;
  className?: string;
}

export function MarkdownPreview({
  body,
  className,
  variant,
  size,
  interactive,
}: MarkdownPreviewProps & VariantProps<typeof markdownVariants>) {
  return (
    <div
      className={cn(
        markdownVariants({ variant, size, interactive }),
        className,
      )}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

const markdownVariants = cva(
  cn(
    "prose",
    "[&_a]:!text-link",
    "[&_code]:text-background [&_code]:bg-primary [&_code]:rounded [&_code]:px-2 [&_code]:py-0.5 [&_code]:font-normal [&_code]:before:content-[unset] [&_code]:after:content-[unset]",
    "[&_pre]:px-2 [&_pre]:py-0.5  [&_pre]:bg-primary [&_pre_code]:bg-[unset] [&_pre]:rounded [&_pre_code]:rounded-[unset] [&_pre_code]:p-0",
    "[&_li]:marker:text-primary/60 [&_li]:marker:m-0 [&_ul]:list-inside [&_ol]:list-inside",
  ),
  {
    variants: {
      variant: {
        block: "",
        inline:
          "[&_ol]:m-0 [&_ol]:inline-flex [&_ol]:p-0 [&_p]:inline [&_ul]:m-0 [&_ul]:inline-flex [&_ul]:p-0",
      },
      size: {
        sm: "prose-sm !leading-6",
        xs: "text-xs !leading-4",
      },
      interactive: {
        true: "",
        false: "pointer-events-none select-none",
      },
    },
    defaultVariants: {
      variant: "block",
      size: "sm",
      interactive: true,
    },
  },
);
