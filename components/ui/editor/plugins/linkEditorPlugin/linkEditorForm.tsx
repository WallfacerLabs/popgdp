import { zodResolver } from "@hookform/resolvers/zod";
import { TOGGLE_LINK_COMMAND } from "@lexical/link";
import { LexicalCommand, LexicalEditor } from "lexical";
import { useForm } from "react-hook-form";

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
import { PopoverClose } from "@/components/ui/popover";

import { LinkCommandProps } from "./linkEditorPlugin";
import { editorLinkSchema, EditorLinkSchemaType } from "./linkEditorSchema";

interface LinkEditorFormProps {
  editor: LexicalEditor;
  command: LexicalCommand<LinkCommandProps>;
  initialLinkText: string | undefined;
  initialLinkUrl: string | undefined;
}

export const LinkEditorForm = ({
  editor,
  command,
  initialLinkText,
  initialLinkUrl,
}: LinkEditorFormProps) => {
  const form = useForm<EditorLinkSchemaType>({
    resolver: zodResolver(editorLinkSchema),
    defaultValues: {
      linkText: initialLinkText,
      linkUrl: initialLinkUrl,
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(({ linkText, linkUrl }) => {
          editor.dispatchCommand(command, { linkText, linkUrl });
        })}
      >
        <FormField
          control={form.control}
          name="linkText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <PopoverClose asChild>
            <Button
              variant="outline"
              type="button"
              onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)}
            >
              Cancel
            </Button>
          </PopoverClose>
          <Button>Apply</Button>
        </div>
      </form>
    </Form>
  );
};
