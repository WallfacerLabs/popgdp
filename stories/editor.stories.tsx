import { Editor, EditorProps } from '@/components/ui/editor';
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from 'react';

const meta = {
  title: "UI/Editor",
  component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

const EditorStory: Story = {
  args: {
    placeholder: "Enter your text here...",
  },
  render: (args: EditorProps) => {
    const [markdown, setMarkdown] = useState<string>('');
    return (
      <div className="flex flex-col gap-4">
        <Editor onChange={setMarkdown} placeholder={args.placeholder} />
        <div>
          <h3>Markdown output:</h3>
          {markdown.split('\n').map((line, i) => (
            <p key={i}>
              {line}
            </p>
          ))}
        </div>
      </div>
    )
  },
};

export { EditorStory };
