import type { Meta, StoryObj } from "@storybook/react";
import { View as Gauge } from "./View";
import { Type } from ".";

const meta = {
  title: "Gauge",
  component: Gauge,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Gauge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WeatherTemperature: Story = {
  args: {
    value: 30.2,
    type: Type.WeatherTemperature,
    label: "Garden",
  },
};

export const CpuTemperature: Story = {
  args: {
    value: 57,
    type: Type.CpuTemperature,
    label: "ESP32",
  },
};

export const Voltage5: Story = {
  args: {
    value: 4.22,
    type: Type.Voltage5,
    label: "V user",
  },
};

export const Intensity: Story = {
  args: {
    value: 0.43,
    type: Type.Intensity,
    label: "I user",
  },
};
