import {
  createContext,
  forwardRef,
  ReactNode,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useWatch,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/cn";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>,
) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("group", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ children, className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(
        "mb-0.5 block w-fit text-xs font-bold",
        error && "text-red",
        className,
      )}
      htmlFor={formItemId}
      {...props}
    >
      {children}
      <span className="ml-1 hidden text-red group-aria-[required=true]:inline-block">
        *
      </span>
    </Label>
  );
});
FormLabel.displayName = "FormLabel";

interface FormHintProps {
  leftHint?: ReactNode;
  rightHint?: ReactNode;
  children: ReactNode;
  className?: string;
}

const FormHint = ({
  leftHint,
  rightHint,
  className,
  children,
}: FormHintProps) => {
  return (
    <div
      className={cn(
        "relative flex items-center text-sm",
        "[&_svg]:h-4 [&_svg]:w-4",
        leftHint && "[&>input]:pl-10",
        rightHint && "[&>input]:pr-10",
        className,
      )}
    >
      {leftHint && <div className="absolute left-4">{leftHint}</div>}
      {children}
      {rightHint && <div className=" absolute right-4">{rightHint}</div>}
    </div>
  );
};
FormHint.displayName = "FormHint";

const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <div
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessages = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-x-4 [&:not(:empty)]:mt-0.5", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FormMessages.displayName = "FormMessages";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      data-role="message"
      ref={ref}
      id={formMessageId}
      className={cn("text-xs font-medium text-red", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

interface FormCounterProps {
  limit: number;
  className?: string;
}

const FormCounter = ({ limit, className }: FormCounterProps) => {
  const { name } = useFormField();
  const value = useWatch({ name });

  const currentLength = value.length;

  return (
    <p
      className={cn("group ml-auto mr-4 w-fit text-xs opacity-60", className)}
      data-overlimit={currentLength > limit}
    >
      <span className="transition-colors group-data-[overlimit=true]:text-red">
        {currentLength}
      </span>
      /{limit}
    </p>
  );
};
FormCounter.displayName = "FormCounter";

const FormFooter = ({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-4 flex flex-wrap justify-between gap-x-6 gap-y-4",
      "[&>button]:basis-40",
      className,
    )}
  >
    {children}
  </div>
);
FormFooter.displayName = "FormFooter";

export {
  Form,
  FormControl,
  FormCounter,
  FormDescription,
  FormField,
  FormFooter,
  FormHint,
  FormItem,
  FormLabel,
  FormMessages,
  FormMessage,
  useFormField,
};
