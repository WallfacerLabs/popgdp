"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cva, type VariantProps } from "class-variance-authority";
import { useForm } from "react-hook-form";

import { BackButton } from "@/components/ui/backButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { StepperIcon } from "@/app/images/icons/stepperIcon";

import { createApplicationAction } from "./createApplicationAction";
import { createApplicationSchema } from "./createApplicationSchema";

export default function CreateApplication({
  params,
}: {
  params: { waveId: string };
}) {
  const form = useForm<createApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      projectName: "",
      projectEntity: "",
      projectDuration: "",
      projectBudget: "",
      summary: "",
    },
  });

  return (
    <Form {...form}>
      <div className="mb-16 flex items-center gap-4">
        <BackButton href={`/waves/${params.waveId}`} />
        <h2 className="text-2xl font-bold">Apply for the Grant</h2>
      </div>

      <form
        className="flex gap-16"
        onSubmit={form.handleSubmit(async (data) => {
          await createApplicationAction(data, Number(params.waveId));
        })}
      >
        <div className="flex max-h-[420px] w-48 flex-col gap-2">
          <StepperStep active label="Main details" />
          <Separator orientation="vertical" className="mx-4" />
          <StepperStep label="Team information" />
          <Separator orientation="vertical" className="mx-4" />
          <StepperStep label="Grant scoping" />
          <Separator orientation="vertical" className="mx-4" />
          <StepperStep label="Roadmap & timeline" />
          <Separator orientation="vertical" className="mx-4" />
          <StepperStep label="Resources & Sustainability" />
        </div>

        <div className="flex w-full max-w-xl flex-col gap-6">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the name of your project"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectEntity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entity name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter the name of entity responsible for project"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposed project duration</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter proposed project duration"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proposed budget</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter proposed budget" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project summary</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Tell us about your project"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="mt-4 self-end px-16"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}

const stepVariants = cva("flex items-center gap-2", {
  variants: {
    active: {
      true: "text-black",
      false: "text-border",
    },
  },
  defaultVariants: {
    active: false,
  },
});

interface StepProps extends VariantProps<typeof stepVariants> {
  label: string;
}

function StepperStep({ active, label }: StepProps) {
  return (
    <div className={stepVariants({ active })}>
      <StepperIcon />
      <span className="text-xs font-bold capitalize">{label}</span>
    </div>
  );
}
