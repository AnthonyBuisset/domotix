import type { Meta, StoryObj } from "@storybook/react";
import { Background } from ".";

const meta = {
  title: "Background",
  component: Background,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Background>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
