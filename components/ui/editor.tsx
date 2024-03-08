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
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

interface EditorProps {
  onChange: (value: string) => void;
  placeholder?: string
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
      <div className="relative">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="prose min-h-[250px] w-full max-w-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" />
          }
          placeholder={
            placeholder ? (
              <span className="absolute left-3 top-2 text-sm opacity-50 pointer-events-none select-none">
                {placeholder}
              </span>
            ) : null
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
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

export { Editor, type EditorProps }
