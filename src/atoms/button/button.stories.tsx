import type { Meta, StoryObj } from "@storybook/react-vite";
import { Home, Plus } from "lucide-react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Button",
    variant: "default",
    color: "default",
    size: "md",
    iconOnly: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "tertiary", "success"],
    },
    color: {
      control: "select",
      options: ["default", "success", "warning", "error"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    iconOnly: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    children: <Home size={16} />,
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: (
      <>
        <Plus size={16} />
        Create
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {(["sm", "md", "lg", "xl"] as const).map((size) => (
        <Button key={size} size={size} variant="primary">
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {(["default", "success", "warning", "error"] as const).map((color) => (
        <Button key={color} color={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};
