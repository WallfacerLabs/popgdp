"use client";

import { useEffect } from "react";
import { useLogger } from "next-axiom";

import { Button } from "@/components/ui/button";
import { ErrorCircleIcon } from "@/components/icons/errorCircleIcon";
import { RedoArrowIcon } from "@/components/icons/redoArrowIcon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const logger = useLogger();
  useEffect(() => {
    logger.error("Global error boundary caught an error", {
      error,
      digest: error.digest,
    });
  }, [error, logger]);

  return (
    <div className="mt-16 flex h-full flex-grow flex-col items-center justify-center gap-2">
      <ErrorCircleIcon className="h-20 w-20" />
      <h2 className="font-mono text-2xl">Something went wrong!</h2>
      <Button
        className="mt-4 flex items-center justify-center"
        onClick={() => reset()}
      >
        <RedoArrowIcon /> Try again
      </Button>
    </div>
  );
}
