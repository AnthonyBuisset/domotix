import type { Meta, StoryObj } from "@storybook/react";
import { View as State } from "./View";

const meta = {
  title: "State",
  component: State,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    label: {
      control: "text",
    },
  },
} satisfies Meta<typeof State>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Disable Out",
  },
};
