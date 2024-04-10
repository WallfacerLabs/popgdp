"use client";

import { Fragment } from "react";

import { type Comment } from "@/types/Comment";
import { cn } from "@/lib/cn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

import { CommentBody } from "./commentBody";

interface RepliesListProps {
  replies: Comment[];
}

export const RepliesList = ({ replies }: RepliesListProps) => {
  return (
    <Accordion title="Application details" type="multiple">
      <AccordionItem
        value="applicationDetails"
        className="relative flex flex-col"
      >
        <AccordionContent>
          <div className="flex flex-col gap-4 pl-16 pt-4">
            {replies.map((reply) => (
              <Fragment key={reply.id}>
                <CommentBody comment={reply} />
                <Separator className="last:hidden" />
              </Fragment>
            ))}
          </div>
        </AccordionContent>
        <AccordionTrigger
          className={cn(
            "group w-full justify-center gap-4 px-7 py-2 text-sm text-primary/50",
            "before:pointer-events-none before:absolute before:bottom-4 before:left-7 before:h-[calc(100%-1rem)] before:w-1/2 before:rounded-bl-xl before:border-b before:border-l before:border-b-primary/10",
            "after:pointer-events-none after:absolute after:bottom-4 after:right-4 after:h-[calc(100%-1rem)] after:w-1/2 after:border-b after:border-b-primary/10",
          )}
        >
          <div className="z-10 flex items-center gap-1 bg-background px-2">
            <span className="group-data-[state=open]:hidden">Show</span>
            <span className="group-data-[state=closed]:hidden">Hide</span>
            replies
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </Accordion>
  );
};
