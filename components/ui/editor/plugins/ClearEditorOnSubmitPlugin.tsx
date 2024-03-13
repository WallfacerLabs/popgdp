import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CLEAR_EDITOR_COMMAND } from "lexical";

interface ClearEditorOnSubmitPluginProps {
  clear: boolean;
}

export const ClearEditorOnSubmitPlugin = ({
  clear,
}: ClearEditorOnSubmitPluginProps) => {
  const [editor] = useLexicalComposerContext();

  const clearEditor = useCallback(() => {
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    return true;
  }, [editor]);

  useEffect(() => {
    if (clear) {
      clearEditor();
    }
  }, [clear, editor, clearEditor]);
  return null;
};
