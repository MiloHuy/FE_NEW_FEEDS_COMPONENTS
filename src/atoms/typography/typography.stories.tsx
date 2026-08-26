import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    as: "p",
    children: "Keep the interface calm, readable, and easy to scan.",
    font: "sans",
    weight: "normal",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "p", "small", "span"],
    },
    font: {
      control: "select",
      options: ["sans", "mono"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {};

export const Headings: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 520 }}>
      <Typography as="h1">Heading 1</Typography>
      <Typography as="h2">Heading 2</Typography>
      <Typography as="h3">Heading 3</Typography>
      <Typography as="h4">Heading 4</Typography>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, width: 520 }}>
      <Typography as="p">Paragraph text for longer body copy inside forms, cards, and content areas.</Typography>
      <Typography as="small">Small supporting text</Typography>
      <Typography as="span">Inline span text</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 10, width: 320 }}>
      {(["normal", "medium", "semibold", "bold"] as const).map((weight) => (
        <Typography key={weight} weight={weight}>
          {weight}
        </Typography>
      ))}
    </div>
  ),
};
