import type { Meta, StoryObj } from "@storybook/react-vite";
import Select from "./Select";

const options = [
  { label: "News feed", value: "feed" },
  { label: "Messages", value: "messages" },
  { label: "Notifications", value: "notifications" },
];

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Destination",
    options,
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

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    secondaryLabel: "Required",
    helperText: "Choose where the item should appear.",
  },
};

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, width: 320 }}>
      <Select label="Default" options={options} />
      <Select label="Error" options={options} state="error" helperText="Please select an option." />
      <Select label="Warning" options={options} state="warning" helperText="This setting affects visibility." />
      <Select label="Success" options={options} state="success" helperText="Selection saved." />
      <Select label="Disabled" options={options} disabled />
    </div>
  ),
};
