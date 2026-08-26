import type { Meta, StoryObj } from "@storybook/react-vite";
import { getLottieUrl } from "../../assets/utils";
import LottiePlayer from "./LottiePlayer";

const meta: Meta<typeof LottiePlayer> = {
  title: "Atoms/LottiePlayer",
  component: LottiePlayer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    src: getLottieUrl("newFeed"),
    width: 220,
    height: 220,
    loop: true,
    autoplay: true,
    fallback: <div style={{ width: 220, height: 220 }}>Loading animation</div>,
  },
  argTypes: {
    src: {
      control: "text",
    },
    width: {
      control: "text",
    },
    height: {
      control: "text",
    },
    loop: {
      control: "boolean",
    },
    autoplay: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof LottiePlayer>;

export const Default: Story = {};

export const Truck: Story = {
  args: {
    src: getLottieUrl("Truck"),
  },
};

export const Fallback: Story = {
  args: {
    src: "/missing-animation.json",
    fallback: (
      <div style={{ width: 220, height: 220, display: "grid", placeItems: "center", border: "1px solid #e5e7eb", borderRadius: 8 }}>
        Animation unavailable
      </div>
    ),
  },
};
