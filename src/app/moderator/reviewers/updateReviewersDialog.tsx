"use client";

import { useState } from "react";
import * as csv from "csv/sync";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EtherscanLink } from "@/components/ui/etherscanLink";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { updateReviewersAction } from "./updateReviewersAction";

const reviewersDataSchema = z.array(
  z.object({
    address: z.string(),
  }),
);

type ReviewersData = z.infer<typeof reviewersDataSchema>;

export function UpdateReviewersDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reviewersData, setReviewersData] = useState<ReviewersData>([]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => setIsDialogOpen(open)}>
      <DialogTrigger asChild>
        <Button>Upload CSV</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update reviewers</DialogTitle>
          <DialogDescription>
            Old reviewers will be replaced with the ones you upload.
          </DialogDescription>
        </DialogHeader>
        <form className="flex w-full flex-col gap-6">
          <Input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const fileBuffer = Buffer.from(await file.arrayBuffer());
              const parsedCsv = csv.parse(fileBuffer, { columns: true });
              const data = reviewersDataSchema.parse(parsedCsv);

              setReviewersData(data);
            }}
          />
          <Table className="max-h-64">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {reviewersData.map(({ address }, index) => (
                <TableRow key={address}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <EtherscanLink ethereumAddress={address} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={async () => {
              await updateReviewersAction(
                reviewersData.map(({ address }) => ({
                  ethereumAddress: address,
                })),
              );
              setIsDialogOpen(false);
            }}
          >
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
