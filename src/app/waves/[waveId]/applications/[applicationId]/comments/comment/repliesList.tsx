"use client";

import { Fragment } from "react";

import { type Comment } from "@/types/Comment";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ArrowIcon } from "@/components/icons/arrowIcon";

import { CommentBody } from "./commentBody";

interface RepliesListProps {
  replies: Comment[];
}

export const RepliesList = ({ replies }: RepliesListProps) => {
  return (
    <Accordion title="Application details" type="multiple">
      <AccordionItem value="applicationDetails" className="flex flex-col">
        <AccordionTrigger className="group relative w-full justify-center gap-4 px-4 text-sm text-primary/50 before:h-px before:w-full before:bg-primary/10 after:h-px after:w-full after:bg-primary/10">
          <div className="flex items-center gap-1">
            <span className="group-data-[state=open]:hidden">Show</span>
            <span className="group-data-[state=closed]:hidden">Hide</span>
            replies
            <ArrowIcon direction="down" />
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-10">
          <div className="flex flex-col gap-4">
            {replies.map((reply) => (
              <Fragment key={reply.id}>
                <CommentBody comment={reply} />
                <Separator className="my-6 last:hidden" />
              </Fragment>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
