import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";
import Input from "./Input";


const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Label",
    placeholder: "Enter text",
    state: "default",
  },
  argTypes: {
    state: {
      control: "select",
      options: ["default", "error", "warning", "success"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const TextInput: Story = {
  args: {
    type: "text",
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter password",
  },
};

export const WithLabels: Story = {
  args: {
    label: "Email",
    secondaryLabel: "Required",
    helperText: "We will use this for account updates.",
    placeholder: "you@example.com",
    leftIcon: Mail,
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Search posts",
    leftIcon: Search,
    rightIcon: Mail,
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, width: 320 }}>
      <Input label="Default" placeholder="Default input" />
      <Input label="Error" placeholder="Error input" state="error" helperText="This field is required." />
      <Input label="Warning" placeholder="Warning input" state="warning" helperText="Double-check this value." />
      <Input label="Success" placeholder="Success input" state="success" helperText="Looks good." />
      <Input label="Disabled" placeholder="Disabled input" disabled />
    </div>
  ),
};
