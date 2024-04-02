import { cn } from "@/lib/cn";

import { IconProps } from "./types/Icon";

export const ProductIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={cn("block", className)}
      viewBox="0 0 32 32"
      color="currentColor"
      fill="none"
    >
      <rect width="32" height="32" rx="16" fill="white" />
      <path
        fillRule="evenodd"
        d="M16 20.4445C18.4546 20.4445 20.4444 18.4546 20.4444 16C20.4444 13.5454 18.4546 11.5556 16 11.5556C13.5454 11.5556 11.5555 13.5454 11.5555 16C11.5555 18.4546 13.5454 20.4445 16 20.4445ZM16 23.1111C19.9273 23.1111 23.1111 19.9274 23.1111 16C23.1111 12.0727 19.9273 8.88892 16 8.88892C12.0726 8.88892 8.88885 12.0727 8.88885 16C8.88885 19.9274 12.0726 23.1111 16 23.1111Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.6362 23.3638 2.66667 16 2.66667C8.6362 2.66667 2.66667 8.6362 2.66667 16C2.66667 23.3638 8.6362 29.3333 16 29.3333ZM16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        d="M30.2222 17.3334H1.77777V14.6667H30.2222V17.3334Z"
        fill="currentColor"
      />
    </svg>
  );
};
