"use client";

import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

import { getInitialConfig } from "./config/editorConfig";
import { AutoLinkPlugin } from "./plugins/autoLinkPlugin";
import LinkPlugin from "./plugins/linkPlugin";
import { ToolbarPlugin } from "./plugins/toolbarPlugin";

interface EditorProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

function Editor({
  onChange,
  placeholder,
  size,
}: EditorProps & VariantProps<typeof editorVariants>) {
  return (
    <LexicalComposer initialConfig={getInitialConfig({ namespace: "Editor" })}>
      <div className="rounded-3xl border shadow-sm transition-colors focus-within:border-primary">
        <ToolbarPlugin />
        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className={editorVariants({ size })} />
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
      <LinkPlugin />
      <AutoLinkPlugin />
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

const editorVariants = cva(
  cn(
    "prose w-full max-w-none border-t bg-transparent px-3 py-2 text-sm",
    "focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ),
  {
    variants: {
      size: {
        small: "min-h-[112px]",
        big: "min-h-[250px]",
      },
    },
    defaultVariants: {
      size: "big",
    },
  },
);

export { Editor, type EditorProps };
