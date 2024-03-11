import { useCallback, useEffect, useState } from "react";
import { errorMessages } from "@/constants/errorMessages";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  $createLinkNode,
  $isAutoLinkNode,
  TOGGLE_LINK_COMMAND,
} from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  LexicalCommand,
} from "lexical";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { $getLinkNode } from "@/lib/getLinkNode";
import { getSelectedNode } from "@/lib/getSelectedNode";
import { sanitizeUrl } from "@/lib/sanitizeUrl";
import { LinkIcon } from "@/components/icons/linkIcon";

import { Button } from "../../button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../form";
import { Input } from "../../input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../../popover";
import { URL_MATCHER } from "./autoLinkPlugin";
import { formatButtonVariants } from "./toolbarPlugin";

const OPEN_LINK_EDITOR_COMMAND = createCommand<void>();

const linkEditorSchema = z.object({
  editorLinkText: z.string(),
  editorLinkUrl: z.string().regex(URL_MATCHER, errorMessages.invalidUrl),
});

type LinkEditorSchema = z.infer<typeof linkEditorSchema>;

interface LinkCommandProps {
  editorLinkText: string;
  editorLinkUrl: string;
}

const INSERT_LINK_COMMAND = createCommand<LinkCommandProps>();
const EDIT_LINK_COMMAND = createCommand<LinkCommandProps>();

interface LinkEditorPluginProps {
  isActive?: boolean;
  isLink?: boolean;
  initialEditorLinkText?: string;
  initialEditorLinkUrl?: string;
}

export const InsertHyperlinkPlugin = ({
  isActive,
  isLink,
  initialEditorLinkText,
  initialEditorLinkUrl,
}: LinkEditorPluginProps) => {
  const [editor] = useLexicalComposerContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectionText, setSelectionText] = useState("");
  const [selectionUrl, setSelectionUrl] = useState<string | undefined>();
  const [currentCommand, setCurrentCommand] =
    useState<LexicalCommand<LinkCommandProps>>(INSERT_LINK_COMMAND);

  const form = useForm<LinkEditorSchema>({
    resolver: zodResolver(linkEditorSchema),
    defaultValues: {
      editorLinkText: initialEditorLinkText,
      editorLinkUrl: initialEditorLinkUrl,
    },
  });

  const insertLink = useCallback(() => {
    if (!isLink) {
      setIsLinkEditMode(true);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      setIsLinkEditMode(false);
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink, setIsLinkEditMode]);

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand(
        OPEN_LINK_EDITOR_COMMAND,
        () => {
          const selection = $getSelection();
          const linkNode = $getLinkNode(selection);
          if (linkNode) {
            setCurrentCommand(EDIT_LINK_COMMAND);
            setSelectionUrl(linkNode.getURL());
            setSelectionText(linkNode.getTextContent());
          } else {
            setCurrentCommand(INSERT_LINK_COMMAND);
            setSelectionUrl(undefined);
            selection && setSelectionText(selection.getTextContent());
          }
          setIsModalVisible(true);
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand(
        INSERT_LINK_COMMAND,
        ({ editorLinkText, editorLinkUrl }) => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const linkNode = $createLinkNode(editorLinkUrl).append(
              $createTextNode(editorLinkText),
            );
            selection.insertNodes([
              $createTextNode(),
              linkNode,
              $createTextNode(),
            ]);
          }
          return true;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand(
        EDIT_LINK_COMMAND,
        ({ editorLinkText, editorLinkUrl }) => {
          const selection = $getSelection();
          const linkNode = $getLinkNode(selection);
          linkNode?.setURL(editorLinkUrl);
          linkNode?.getChildren().forEach((node) => node.remove(true));
          linkNode?.append($createTextNode(editorLinkText));
          return true;
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
    return unregister;
  }, [editor]);

  return (
    <>
      <ToolbarButton
        type="button"
        onClick={() =>
          editor.dispatchCommand(OPEN_LINK_EDITOR_COMMAND, undefined)
        }
        isActive={isActive}
      >
        Icon
      </ToolbarButton>
      {isModalVisible && (
        <CreateHyperlinkModal
          editor={editor}
          command={currentCommand}
          initialUrl={selectionUrl}
          initialLinkText={selectionText}
          closeModal={() => setIsModalVisible(false)}
        />
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            onClick={insertLink}
            aria-label="Insert link"
            variant="ghost"
            className={formatButtonVariants({ active: isLink })}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={form.handleSubmit((data) => {
                editor.dispatchCommand(
                  TOGGLE_LINK_COMMAND,
                  sanitizeUrl(data.editorLinkUrl),
                );
                editor.update(() => {
                  const selection = $getSelection();
                  if ($isRangeSelection(selection)) {
                    const parent = getSelectedNode(selection).getParent();
                    if ($isAutoLinkNode(parent)) {
                      const linkNode = $createLinkNode(parent.getURL(), {
                        rel: parent.__rel,
                        target: parent.__target,
                        title: parent.__title,
                      });
                      parent.replace(linkNode, true);
                    }
                  }
                });
              })}
            >
              <FormField
                control={form.control}
                name="editorLinkText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="editorLinkUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <PopoverClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </PopoverClose>
              <Button disabled={form.formState.isSubmitting}>Add link</Button>
            </form>
          </Form>
        </PopoverContent>
      </Popover>
    </>
  );
};
