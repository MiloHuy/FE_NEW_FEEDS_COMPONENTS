import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "./Box";

const meta: Meta<typeof Box> = {
  title: "Atoms/Box",
  component: Box,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    as: "div",
    padding: "md",
    radius: "md",
    shadow: "none",
    variant: "default",
    fullWidth: false,
    centered: false,
    children: "Box content",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "section", "article", "main", "aside", "header", "footer"],
    },
    padding: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "outlined", "filled", "ghost"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Box>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(180px, 1fr))", gap: 16 }}>
      {(["default", "outlined", "filled", "ghost"] as const).map((variant) => (
        <Box key={variant} variant={variant} padding="lg" radius="md">
          {variant}
        </Box>
      ))}
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      {(["none", "sm", "md", "lg"] as const).map((shadow) => (
        <Box key={shadow} shadow={shadow} padding="lg" radius="md" style={{ width: 120 }}>
          {shadow}
        </Box>
      ))}
    </div>
  ),
};

export const Centered: Story = {
  args: {
    centered: true,
    padding: "xl",
    style: { width: 240, height: 140 },
    children: "Centered content",
  },
};
