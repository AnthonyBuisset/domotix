import type { Meta, StoryObj } from "@storybook/react";
import { View as Led } from "./View";
import { Color } from ".";

const meta = {
  title: "Led",
  component: Led,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    value: {
      control: "radio",
      options: [Color.Red, Color.Yellow, Color.Green, Color.Blue],
    },
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof Led>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "In Charge",
    value: Color.Green,
  },
};
