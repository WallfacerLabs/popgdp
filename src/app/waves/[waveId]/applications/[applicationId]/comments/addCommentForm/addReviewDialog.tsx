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
import { AssignmentIcon } from "@/components/icons/assignmentIcon";

interface AddReviewDialogProps {
  disabled: boolean;
  onSubmit: () => void;
}

export const AddReviewDialog = ({
  disabled,
  onSubmit,
}: AddReviewDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleSubmit } = useFormContext();

  const handleEmptySubmit = () => {
    handleSubmit(() => setIsOpen((open) => !open))();
  };

  const handleReviewSubmit = () => {
    onSubmit();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleEmptySubmit}>
      <DialogTrigger asChild>
        <Button variant="secondary" disabled={disabled}>
          Add review
          <AssignmentIcon />
        </Button>
      </DialogTrigger>
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
    </Dialog>
  );
};
