export type ToastVariant = "success" | "error" | "warning" | "info" | "default";

export type ToastPosition =
  | "top-right" | "top-left" | "top-center"
  | "bottom-right" | "bottom-left" | "bottom-center";

export interface ToastItem {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export interface ToastOptions {
  variant?: ToastVariant;
  duration?: number;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export type ToastEvent =
  | { type: "add"; payload: ToastItem }
  | { type: "dismiss"; payload: { id: string } }
  | { type: "dismissMany"; payload: { ids: string[] } }
  | { type: "dismissAll" };

export interface ToasterProps {
  position?: ToastPosition;
  maxToasts?: number;
}
