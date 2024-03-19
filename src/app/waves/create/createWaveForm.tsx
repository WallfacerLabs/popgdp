"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  addDays,
  formatDate,
  formatDateRange,
  getStartOfDate,
} from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PageTitle } from "@/components/ui/pageTitle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@/components/icons/calendarIcon";

import { createWaveAction } from "./createWaveAction";
import { createWaveSchema } from "./createWaveSchema";

export function CreateWaveForm() {
  const todayDate = getStartOfDate(new Date());

  const form = useForm<createWaveSchema>({
    resolver: zodResolver(createWaveSchema),
    defaultValues: {
      waveName: "",
      duration: {
        from: todayDate,
        to: addDays(todayDate, 30),
      },
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6"
        onSubmit={form.handleSubmit(async (data) => {
          await createWaveAction(data);
        })}
      >
        <PageTitle>Create new wave</PageTitle>

        <FormField
          control={form.control}
          name="waveName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wave name</FormLabel>
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
                            {formatDateRange(field.value.from, field.value.to)}
                          </>
                        ) : (
                          formatDate(field.value.from)
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto opacity-50" />
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
                    disabled={(date) => date < todayDate}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormFooter className="justify-end">
          <Button disabled={form.formState.isSubmitting}>Create wave</Button>
        </FormFooter>
      </form>
    </Form>
  );
}
