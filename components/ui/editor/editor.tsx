"use client";

import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import { ToolbarPlugin } from "./plugins/toolbarPlugin";

interface EditorProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

function Editor({ onChange, placeholder }: EditorProps) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: "Editor",
        onError(error) {
          console.error(error);
        },
        nodes: [
          HorizontalRuleNode,
          CodeNode,
          HeadingNode,
          LinkNode,
          ListNode,
          ListItemNode,
          QuoteNode,
        ],
      }}
    >
      <div className="rounded-md border shadow-sm transition-colors focus-within:border-primary">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="prose min-h-[250px] w-full max-w-none border-t bg-transparent px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50" />
            }
            placeholder={
              placeholder ? (
                <span className="pointer-events-none absolute left-3 top-2 select-none text-sm opacity-50">
                  {placeholder}
                </span>
              ) : null
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <HistoryPlugin />
      <ListPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <OnChangePlugin
        onChange={(editor) => {
          editor.read(() => {
            const markdown = $convertToMarkdownString(TRANSFORMERS);
            onChange(markdown);
          });
        }}
      />
    </LexicalComposer>
  );
}

export { Editor, type EditorProps };
