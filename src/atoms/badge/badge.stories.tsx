import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    children: "Badge",
    variant: "default",
    size: "md",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "warning", "success"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    size: "md",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      {(["default", "secondary", "destructive", "outline", "warning", "success"] as const).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Badge key={size} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  ),
};
