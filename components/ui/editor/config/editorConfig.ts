import { CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import type { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

type InitialConfig = Parameters<typeof LexicalComposer>[0]["initialConfig"];

interface EditorConfigProps {
  namespace: string;
}

export const getInitialConfig = ({
  namespace,
}: EditorConfigProps): InitialConfig => ({
  namespace,
  theme: {
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
    },
    list: {
      ul: "list-disc",
      ol: "list-decimal",
    },
  },
  onError(error) {
    console.error(error);
  },
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
