import { Subject, BehaviorSubject } from "rxjs";
import type { ToastEvent, ToastItem, ToastOptions } from "./type";

export class ToastService {
  private readonly eventSubject = new Subject<ToastEvent>();
  private readonly itemsSubject = new BehaviorSubject<ToastItem[]>([]);

  readonly items$ = this.itemsSubject.asObservable();
  readonly event$ = this.eventSubject.asObservable();

  constructor() {
    this.eventSubject.subscribe((event) => {
      this.itemsSubject.next(this.reduceItems(this.itemsSubject.getValue(), event));
    });
  }

  getItems = (): ToastItem[] => {
    return this.itemsSubject.getValue();
  };

  subscribe = (listener: () => void): (() => void) => {
    const sub = this.items$.subscribe(listener);

    return () => sub.unsubscribe();
  };

  show(message: string, options?: ToastOptions): string {
    return this.emit(message, options);
  }

  success(message: string, options?: Omit<ToastOptions, "variant">): string {
    return this.emit(message, { ...options, variant: "success" });
  }

  error(message: string, options?: Omit<ToastOptions, "variant">): string {
    return this.emit(message, { ...options, variant: "error" });
  }

  warning(message: string, options?: Omit<ToastOptions, "variant">): string {
    return this.emit(message, { ...options, variant: "warning" });
  }

  info(message: string, options?: Omit<ToastOptions, "variant">): string {
    return this.emit(message, { ...options, variant: "info" });
  }

  dismiss(id: string): void {
    this.eventSubject.next({ type: "dismiss", payload: { id } });
  }

  dismissMany(ids: string[]): void {
    if (!ids.length) return;

    this.eventSubject.next({ type: "dismissMany", payload: { ids } });
  }

  dismissAll(): void {
    this.eventSubject.next({ type: "dismissAll" });
  }

  private emit(message: string, options: ToastOptions = {}): string {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    this.eventSubject.next({
      type: "add",
      payload: {
        id,
        message,
        variant: options.variant ?? "default",
        duration: options.duration ?? 4000,
        description: options.description,
        action: options.action,
      },
    });
    return id;
  }

  private reduceItems(items: ToastItem[], event: ToastEvent): ToastItem[] {
    switch (event.type) {
      case "add":
        return [...items, event.payload];
      case "dismiss":
        return items.filter((item) => item.id !== event.payload.id);
      case "dismissMany": {
        const ids = new Set(event.payload.ids);
        return items.filter((item) => !ids.has(item.id));
      }
      case "dismissAll":
        return [];
      default:
        return items;
    }
  }
}

export const toast = new ToastService();
