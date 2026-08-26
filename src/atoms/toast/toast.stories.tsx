import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef } from "react";
import Toaster from "./Toast";
import { toast } from "./toast.svc";

const meta: Meta<typeof Toaster> = {
  title: "Atoms/Toast",
  component: Toaster,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Global toast notification system powered by RxJS. Call `toast.*` from anywhere — no context or hook required. Mount `<Toaster />` once at the app root.",
      },
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-right", "top-left", "top-center",
        "bottom-right", "bottom-left", "bottom-center",
      ],
      description: "Where toasts appear on screen",
    },
    maxToasts: {
      control: { type: "number", min: 1, max: 10 },
      description: "Max visible toasts at once",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh", padding: 24, background: "#f8fafc" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

function TriggerButton({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: 8,
        border: "none",
        background: color,
        color: "#fff",
        fontWeight: 500,
        fontSize: 13,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function PersistentToastStory(args: React.ComponentProps<typeof Toaster>) {
  const toastIdRef = useRef<string | null>(null);

  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <TriggerButton
          label="Show persistent"
          color="#0ea5e9"
          onClick={() => {
            toastIdRef.current = toast.info("Uploading files...", { duration: 0 });
          }}
        />
        <TriggerButton
          label="Dismiss it"
          color="#64748b"
          onClick={() => {
            if (toastIdRef.current) toast.dismiss(toastIdRef.current);
          }}
        />
      </div>
      <Toaster {...args} />
    </>
  );
}

function AutoFireToastStory(args: React.ComponentProps<typeof Toaster>) {
  useEffect(() => {
    toast.success("Auto-fired on mount!");
    toast.error("Something went wrong", { description: "Check the logs." });
    toast.warning("Disk space low", {
      action: { label: "Free up space", onClick: () => {} },
    });
  }, []);

  return <Toaster {...args} />;
}

export const AllVariants: Story = {
  args: { position: "bottom-right", maxToasts: 5 },
  render: (args) => (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <TriggerButton label="Success"  color="#16a34a" onClick={() => toast.success("File uploaded successfully!")} />
        <TriggerButton label="Error"    color="#dc2626" onClick={() => toast.error("Something went wrong.")} />
        <TriggerButton label="Warning"  color="#d97316" onClick={() => toast.warning("Low disk space detected.")} />
        <TriggerButton label="Info"     color="#0ea5e9" onClick={() => toast.info("3 files are queued.")} />
        <TriggerButton label="Default"  color="#64748b" onClick={() => toast.show("New update available.")} />
      </div>
      <Toaster {...args} />
    </>
  ),
};

export const WithDescription: Story = {
  args: { position: "bottom-right" },
  render: (args) => (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <TriggerButton
          label="Error with description"
          color="#dc2626"
          onClick={() =>
            toast.error("Upload failed", {
              description: "File exceeds the 2 MB limit. Please compress it and try again.",
            })
          }
        />
        <TriggerButton
          label="Success with description"
          color="#16a34a"
          onClick={() =>
            toast.success("Profile updated", {
              description: "Your changes have been saved successfully.",
            })
          }
        />
      </div>
      <Toaster {...args} />
    </>
  ),
};

export const WithAction: Story = {
  args: { position: "bottom-right" },
  render: (args) => (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <TriggerButton
          label="With action"
          color="#3545d4"
          onClick={() =>
            toast.error("Session expired", {
              description: "Your session timed out.",
              action: { label: "Sign in again", onClick: () => alert("Redirecting to login...") },
            })
          }
        />
        <TriggerButton
          label="Undo action"
          color="#64748b"
          onClick={() =>
            toast.show("Email deleted", {
              action: { label: "Undo", onClick: () => toast.info("Email restored!") },
            })
          }
        />
      </div>
      <Toaster {...args} />
    </>
  ),
};

export const Persistent: Story = {
  args: { position: "bottom-right" },
  render: (args) => <PersistentToastStory {...args} />,
};

export const DismissAll: Story = {
  args: { position: "bottom-right" },
  render: (args) => (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <TriggerButton label="Add 3 toasts"  color="#3545d4" onClick={() => {
          toast.success("First one!");
          toast.warning("Second one!");
          toast.error("Third one!");
        }} />
        <TriggerButton label="Dismiss all" color="#dc2626" onClick={() => toast.dismissAll()} />
      </div>
      <Toaster {...args} />
    </>
  ),
};

export const Positions: Story = {
  args: { maxToasts: 3 },
  argTypes: {
    position: { control: "select" },
  },
  render: (args) => (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <TriggerButton
          label="Fire toast"
          color="#3545d4"
          onClick={() => toast.info(`Position: ${args.position}`)}
        />
      </div>
      <Toaster {...args} />
    </>
  ),
};

export const AutoFire: Story = {
  args: { position: "bottom-right" },
  render: (args) => <AutoFireToastStory {...args} />,
};
