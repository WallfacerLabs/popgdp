import "@/app/globals.css";
import type { Preview } from "@storybook/react";
import { Inter } from "next/font/google";
import React from 'react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className={inter.className}>
        <Story />
      </div>
    )
  ]
};

export default preview;
