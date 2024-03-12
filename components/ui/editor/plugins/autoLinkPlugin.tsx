import { URL_REGEXP } from "@/constants/regExps";
import { AutoLinkPlugin as LexicalAutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";

const MATCHERS = [
  (text: string) => {
    const match = URL_REGEXP.exec(text);
    if (match === null) {
      return null;
    }
    const fullMatch = match[0];
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
    };
  },
];

export const AutoLinkPlugin = () => {
  return <LexicalAutoLinkPlugin matchers={MATCHERS} />;
};
