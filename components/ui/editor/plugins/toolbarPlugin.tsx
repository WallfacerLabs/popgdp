import { useCallback, useEffect, useRef, useState } from "react";
import * as React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { cva } from "class-variance-authority";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormatBoldIcon } from "@/components/icons/formatBoldIcon";
import { FormatCenterIcon } from "@/components/icons/formatCenterIcon";
import { FormatItalicIcon } from "@/components/icons/formatItalicIcon";
import { FormatJustifyIcon } from "@/components/icons/formatJustifyIcon";
import { FormatLeftIcon } from "@/components/icons/formatLeftIcon";
import { FormatRightIcon } from "@/components/icons/formatRightIcon";
import { FormatUnderlineIcon } from "@/components/icons/formatUnderlineIcon";
import { RedoArrowIcon } from "@/components/icons/redoArrowIcon";
import { UndoArrowIcon } from "@/components/icons/undoArrowIcon";

const LowPriority = 1;

const formatButtonVariants = cva("h-6 w-6 p-0 rounded-sm transition-colors", {
  variants: {
    active: {
      true: "bg-primary text-background",
      false: "bg-background text-primary",
    },
  },
  defaultVariants: {
    active: false,
  },
});

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
    );
  }, [editor, updateToolbar]);

  return (
    <div className="flex items-center gap-0.5 px-4 py-2" ref={toolbarRef}>
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
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="Undo"
        variant="ghost"
        className={formatButtonVariants()}
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
}
