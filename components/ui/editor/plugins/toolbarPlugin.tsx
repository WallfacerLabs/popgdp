import { useCallback, useEffect, useState } from "react";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  insertList,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { cva } from "class-variance-authority";
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BulletListIcon } from "@/components/icons/bulletListIcon";
import { FormatBoldIcon } from "@/components/icons/formatBoldIcon";
import { FormatCenterIcon } from "@/components/icons/formatCenterIcon";
import { FormatItalicIcon } from "@/components/icons/formatItalicIcon";
import { FormatJustifyIcon } from "@/components/icons/formatJustifyIcon";
import { FormatLeftIcon } from "@/components/icons/formatLeftIcon";
import { FormatRightIcon } from "@/components/icons/formatRightIcon";
import { FormatUnderlineIcon } from "@/components/icons/formatUnderlineIcon";
import { NumberListIcon } from "@/components/icons/numberListIcon";
import { RedoArrowIcon } from "@/components/icons/redoArrowIcon";
import { UndoArrowIcon } from "@/components/icons/undoArrowIcon";

const formatButtonVariants = cva("h-6 w-6 p-0 rounded-sm transition-colors", {
  variants: {
    active: {
      true: "bg-primary text-background hover:bg-primary/80 focus-visible:bg-primary/80 hover:text-background focus-visible:text-background",
      false: "bg-background text-primary",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          setActiveEditor(newEditor);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      editor.registerCommand(
        INSERT_UNORDERED_LIST_COMMAND,
        () => {
          insertList(editor, "bullet");
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        INSERT_ORDERED_LIST_COMMAND,
        () => {
          insertList(editor, "number");
          return true;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [editor, activeEditor, updateToolbar]);

  return (
    <div className="flex items-center gap-0.5 px-4 py-2">
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        aria-label="Format Bold"
        variant="ghost"
        className={formatButtonVariants({ active: isBold })}
      >
        <FormatBoldIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        aria-label="Format Italics"
        variant="ghost"
        className={formatButtonVariants({ active: isItalic })}
      >
        <FormatItalicIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        aria-label="Format Underline"
        variant="ghost"
        className={formatButtonVariants({ active: isUnderline })}
      >
        <FormatUnderlineIcon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-4 h-4" />

      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        aria-label="Left Align"
        variant="ghost"
        className={formatButtonVariants()}
      >
        <FormatLeftIcon className="h-4 w-4" />
      </Button>

      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        aria-label="Center Align"
        variant="ghost"
        className={formatButtonVariants()}
      >
        <FormatCenterIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        aria-label="Right Align"
        variant="ghost"
        className={formatButtonVariants()}
      >
        <FormatRightIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        aria-label="Justify Align"
        variant="ghost"
        className={formatButtonVariants()}
      >
        <FormatJustifyIcon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-4 h-4" />

      <Button
        onClick={() => {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        }}
        aria-label="Unordered List"
        variant="ghost"
        className={formatButtonVariants()}
      >
        <BulletListIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        }}
        aria-label="Ordered List"
        variant="ghost"
        className={formatButtonVariants()}
      >
        <NumberListIcon className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="mx-4 h-4" />

      <Button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="Undo"
        variant="ghost"
        className={cn(formatButtonVariants(), "ml-auto")}
      >
        <UndoArrowIcon className="h-4 w-4" />
      </Button>
      <Button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label="Redo"
        variant="ghost"
        className={formatButtonVariants()}
      >
        <RedoArrowIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
