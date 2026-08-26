import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { BaseModal } from "./BaseModal";

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: 8,
  border: "none",
  background: "#3545D4",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 500,
};

const secondaryButtonStyle = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
};

const dangerButtonStyle = {
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  background: "#dc2626",
  color: "#fff",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
};

function DefaultModalStory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={buttonStyle}>
        Open Modal
      </button>

      <BaseModal open={open} onOpenChange={setOpen}>
        <BaseModal.Header>
          <div>
            <BaseModal.Title>Are you absolutely sure?</BaseModal.Title>
            <BaseModal.Description>This action cannot be undone.</BaseModal.Description>
          </div>
          <BaseModal.Close />
        </BaseModal.Header>

        <BaseModal.Content>
          <p style={{ margin: 0, fontSize: 14, color: "#475569", lineHeight: 1.6 }}>
            This will permanently delete your account and remove all data from our servers.
          </p>
        </BaseModal.Content>

        <BaseModal.Footer>
          <BaseModal.Close>
            <button style={secondaryButtonStyle}>Cancel</button>
          </BaseModal.Close>
          <button style={dangerButtonStyle}>Delete</button>
        </BaseModal.Footer>
      </BaseModal>
    </>
  );
}

function FormModalStory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={buttonStyle}>
        Edit Profile
      </button>

      <BaseModal open={open} onOpenChange={setOpen} size="sm">
        <BaseModal.Header>
          <div>
            <BaseModal.Title>Edit profile</BaseModal.Title>
            <BaseModal.Description>Update your account information.</BaseModal.Description>
          </div>
          <BaseModal.Close />
        </BaseModal.Header>

        <BaseModal.Content>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 500, color: "#374151" }}>
              Name
              <input defaultValue="Jane Doe" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, boxSizing: "border-box" }} />
            </label>
            <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 500, color: "#374151" }}>
              Email
              <input defaultValue="jane@example.com" style={{ width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, boxSizing: "border-box" }} />
            </label>
          </div>
        </BaseModal.Content>

        <BaseModal.Footer>
          <BaseModal.Close>
            <button style={secondaryButtonStyle}>Cancel</button>
          </BaseModal.Close>
          <button style={{ ...buttonStyle, padding: "8px 16px", fontSize: 13 }}>Save changes</button>
        </BaseModal.Footer>
      </BaseModal>
    </>
  );
}

function ModalSizesStory() {
  const [size, setSize] = useState<"xs" | "sm" | "md" | "lg" | "xl" | null>(null);

  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(["xs", "sm", "md", "lg", "xl"] as const).map((modalSize) => (
          <button key={modalSize} onClick={() => setSize(modalSize)} style={secondaryButtonStyle}>
            {modalSize}
          </button>
        ))}
      </div>

      {size && (
        <BaseModal open onOpenChange={() => setSize(null)} size={size}>
          <BaseModal.Header>
            <div>
              <BaseModal.Title>Size: {size}</BaseModal.Title>
              <BaseModal.Description>Modal max-width for size "{size}".</BaseModal.Description>
            </div>
            <BaseModal.Close />
          </BaseModal.Header>
          <BaseModal.Content>
            <p style={{ margin: 0, fontSize: 13, color: "#64748b" }}>Content goes here.</p>
          </BaseModal.Content>
        </BaseModal>
      )}
    </>
  );
}

function NoBackdropCloseStory() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{ ...buttonStyle, background: "#dc2626" }}>
        Dangerous action
      </button>

      <BaseModal open={open} onOpenChange={setOpen} modal={false} size="sm">
        <BaseModal.Header>
          <div>
            <BaseModal.Title>Confirm delete</BaseModal.Title>
            <BaseModal.Description>Click outside won't close this.</BaseModal.Description>
          </div>
        </BaseModal.Header>
        <BaseModal.Content>
          <p style={{ margin: 0, fontSize: 14, color: "#475569" }}>
            This dialog requires an explicit action. Clicking the backdrop does nothing.
          </p>
        </BaseModal.Content>
        <BaseModal.Footer>
          <BaseModal.Close>
            <button style={secondaryButtonStyle}>Cancel</button>
          </BaseModal.Close>
          <button onClick={() => setOpen(false)} style={dangerButtonStyle}>
            Delete
          </button>
        </BaseModal.Footer>
      </BaseModal>
    </>
  );
}

const meta: Meta<typeof BaseModal> = {
  title: "Atoms/BaseModal",
  component: BaseModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof BaseModal>;

export const Default: Story = {
  render: () => <DefaultModalStory />,
};

export const WithForm: Story = {
  render: () => <FormModalStory />,
};

export const Sizes: Story = {
  render: () => <ModalSizesStory />,
};

export const NoBackdropClose: Story = {
  render: () => <NoBackdropCloseStory />,
};
