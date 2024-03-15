import { $isLinkNode, LinkNode } from "@lexical/link";
import { $isRangeSelection, BaseSelection } from "lexical";

export function getLinkNode(selection: BaseSelection | null) {
  let linkNode: LinkNode | null = null;
  if ($isRangeSelection(selection)) {
    const anchorNode = selection.anchor.getNode();
    const anchorParent = anchorNode.getParent();
    const focusNode = selection.focus.getNode();
    const focusParent = focusNode.getParent();
    linkNode = [anchorNode, anchorParent, focusNode, focusParent].find((node) =>
      $isLinkNode(node),
    ) as LinkNode | null;
  }
  return linkNode;
}
