import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AssignmentIcon } from "@/components/icons/assignmentIcon";

interface AddReviewDialogProps {
  validationError: string | undefined;
  onSubmit: () => void;
}

export const AddReviewDialog = ({
  validationError,
  onSubmit,
}: AddReviewDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit, formState } = useFormContext();

  const disabled = formState.isSubmitting || !!validationError;

  const handleEmptySubmit = () => {
    handleSubmit(() => setIsOpen((open) => !open))();
  };

  const handleReviewSubmit = () => {
    onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleEmptySubmit}>
      <Tooltip>
        <DialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="secondary" disabled={disabled}>
              Add review
              <AssignmentIcon />
            </Button>
          </TooltipTrigger>
        </DialogTrigger>
        {validationError && <TooltipContent>{validationError}</TooltipContent>}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm your review</DialogTitle>
          </DialogHeader>
          <p>
            Confirm adding your review.
            <br />
            You will not be able to change or delete it!
          </p>
          <DialogFooter className="flex items-center gap-4">
            <DialogClose asChild>
              <Button variant="secondary" disabled={disabled}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="primary"
              disabled={disabled}
              onClick={handleReviewSubmit}
            >
              Add review
              <AssignmentIcon />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Tooltip>
    </Dialog>
  );
};
