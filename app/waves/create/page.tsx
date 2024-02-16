"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submitButton";
import { createWaveAction } from "./createWaveAction";
import { createWaveSchema } from "./createWaveSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function CreateWave() {
  const form = useForm<createWaveSchema>({
    resolver: zodResolver(createWaveSchema),
    defaultValues: {
      waveName: "",
      duration: {
        from: new Date(),
        to: addDays(new Date(), 30),
      },
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-full max-w-lg"
        onSubmit={form.handleSubmit(async (data) => {
          await createWaveAction(data);
        })}
      >
        <div className="pb-2">Create new wave</div>

        <FormField
          control={form.control}
          name="waveName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="waveName">Wave name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Wave duration</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="pl-3 text-left font-normal"
                    >
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    numberOfMonths={2}
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={form.formState.isSubmitting}>Create wave</Button>
      </form>
    </Form>
  );
}
