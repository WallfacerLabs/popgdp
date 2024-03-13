import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Editor, EditorProps } from "@/components/ui/editor/editor";

const meta = {
  title: "UI/Editor",
  component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

const EditorStory: Story = {
  args: {
    placeholder: "Enter your text here...",
    clear: false,
  },
  render: (args: EditorProps) => {
    const [markdown, setMarkdown] = useState<string>("");
    return (
      <div className="flex flex-col gap-4">
        <Editor {...args} onChange={setMarkdown} />
        <div>
          <h3>Markdown output:</h3>
          {markdown.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    );
  },
};

export { EditorStory };
