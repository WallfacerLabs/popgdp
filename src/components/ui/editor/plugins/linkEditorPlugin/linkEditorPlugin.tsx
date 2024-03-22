import { useEffect, useState } from "react";
import { $createLinkNode } from "@lexical/link";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { Popover } from "@radix-ui/react-popover";
import {
  $createTextNode,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  createCommand,
  LexicalCommand,
} from "lexical";

import { Button } from "@/components/ui/button";
import { getLinkNode } from "@/components/ui/editor/utils/getLinkNode";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LinkIcon } from "@/components/icons/linkIcon";

import { formatButtonVariants } from "../toolbarPlugin";
import { LinkEditorForm } from "./linkEditorForm";

const OPEN_LINK_EDITOR_COMMAND = createCommand<void>();

export interface LinkCommandProps {
  linkUrl: string;
  linkText: string;
}

const INSERT_LINK_COMMAND = createCommand<LinkCommandProps>();
const EDIT_LINK_COMMAND = createCommand<LinkCommandProps>();

interface LinkEditorPluginProps {
  isLink?: boolean;
}

export const LinkEditorPlugin = ({ isLink }: LinkEditorPluginProps) => {
  const [editor] = useLexicalComposerContext();

  const [selectionText, setSelectionText] = useState("");
  const [selectionUrl, setSelectionUrl] = useState<string | undefined>();
  const [currentCommand, setCurrentCommand] =
    useState<LexicalCommand<LinkCommandProps>>(INSERT_LINK_COMMAND);

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand(
        OPEN_LINK_EDITOR_COMMAND,
        () => {
          const selection = $getSelection();
          const linkNode = getLinkNode(selection);
          if (linkNode) {
            setCurrentCommand(EDIT_LINK_COMMAND);
            setSelectionUrl(linkNode.getURL());
            setSelectionText(linkNode.getTextContent());
          } else {
            setCurrentCommand(INSERT_LINK_COMMAND);
            setSelectionUrl(undefined);
            selection && setSelectionText(selection.getTextContent());
          }
          return false;
        },
        COMMAND_PRIORITY_HIGH,
      ),
      editor.registerCommand(
        INSERT_LINK_COMMAND,
        ({ linkUrl, linkText }) => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            const linkNode = $createLinkNode(linkUrl).append(
              $createTextNode(linkText),
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
        ({ linkUrl, linkText }) => {
          const selection = $getSelection();
          const linkNode = getLinkNode(selection);
          linkNode?.setURL(linkUrl);
          linkNode?.getChildren().forEach((node) => node.remove(true));
          linkNode?.append($createTextNode(linkText));
          return true;
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
    return unregister;
  }, [editor]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          onClick={() =>
            editor.dispatchCommand(OPEN_LINK_EDITOR_COMMAND, undefined)
          }
          aria-label="Insert link"
          variant="outline"
          className={formatButtonVariants({ active: isLink })}
        >
          <LinkIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <LinkEditorForm
          editor={editor}
          command={currentCommand}
          initialLinkText={selectionText}
          initialLinkUrl={selectionUrl}
        />
      </PopoverContent>
    </Popover>
  );
};
