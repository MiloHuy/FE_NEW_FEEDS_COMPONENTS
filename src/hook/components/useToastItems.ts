import { useSyncExternalStore } from "react";
import type { ToastItem } from "../../atoms/toast/type";
import { toast } from "../../atoms/toast/toast.svc";

export function useToastItems(): ToastItem[] {
  return useSyncExternalStore(toast.subscribe, toast.getItems, toast.getItems);
}
