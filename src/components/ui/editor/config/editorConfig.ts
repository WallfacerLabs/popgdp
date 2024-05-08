import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import type { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

type InitialConfig = Parameters<typeof LexicalComposer>[0]["initialConfig"];

interface EditorConfigProps {
  initialMarkdown: string | undefined;
  namespace: string;
}

export const getInitialConfig = ({
  initialMarkdown,
  namespace,
}: EditorConfigProps): InitialConfig => ({
  namespace,
  theme: {
    text: {
      bold: "font-bold",
      italic: "italic",
    },
    list: {
      ul: "list-disc",
      ol: "list-decimal",
    },
    link: "text-link underline",
  },
  onError(error) {
    console.error(error);
  },
  editorState: initialMarkdown
    ? () => $convertFromMarkdownString(initialMarkdown, TRANSFORMERS)
    : undefined,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    AutoLinkNode,
    LinkNode,
    HorizontalRuleNode,
  ],
});
