import {
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { formatDate, getStartOfDate } from "@/lib/dates";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
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
import { CalendarIcon } from "@/components/icons/calendarIcon";

export const CalendarField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label = "Start date",
  title,
}: Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
  label?: string;
  title: string;
}) => {
  const todayDate = getStartOfDate(new Date());

  return (
    <div className="border-l p-6 first:border-none">
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem aria-required>
            <div className="mb-4 font-bold">{title}</div>
            <FormLabel>{label}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="h-12 w-40 justify-start gap-2 aria-[invalid=true]:border-red"
                  >
                    <CalendarIcon className="h-6 w-6" />
                    {field.value ? formatDate(field.value) : "Pick a date"}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  defaultMonth={field.value}
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
    </div>
  );
};
