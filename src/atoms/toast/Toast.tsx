import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import clsx from "clsx";
import type { ToasterProps, ToastItem, ToastVariant } from "./type";
import { toast } from "./toast.svc";
import Button from "../button";
import { useToastItems } from "../../hook/components/useToastItems";

const ICONS: Record<ToastVariant, string> = {
  success: "✓",
  error:   "✕",
  warning: "!",
  info:    "i",
  default: "·",
};

function ToastCard({ item }: { item: ToastItem }) {
  const [visible,  setVisible]  = useState(false);
  const [progress, setProgress] = useState(100);

  const timerRef    = useRef<ReturnType<typeof setTimeout>>(undefined);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const rafRef      = useRef<number | undefined>(undefined);
  const startedAt   = useRef(0);
  const remaining   = useRef(item.duration ?? 4000);
  const fullDuration = useRef(item.duration ?? 4000);
  const paused      = useRef(false);

  const clearTimers = useCallback(() => {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    
    setTimeout(() => toast.dismiss(item.id), 300);
  }, [item.id]);

  const startTimer = useCallback(() => {
    if (item.duration === 0) return;

    clearTimers();
    const dur = Math.max(0, remaining.current);

    if (dur === 0) {
      dismiss();
      return;
    }
    
    startedAt.current = Date.now();
    timerRef.current    = setTimeout(dismiss, dur);
    
    intervalRef.current = setInterval(() => {
      if (paused.current) return;
      
      const elapsed = Date.now() - startedAt.current;
      const nextRemaining = Math.max(0, dur - elapsed);
      
      setProgress(Math.max(0, (nextRemaining / fullDuration.current) * 100));
    }, 30);

  }, [clearTimers, dismiss, item.duration]);

  const pauseTimer = () => {
    if (item.duration === 0) return;
    
    paused.current = true;
    remaining.current = Math.max(0, remaining.current - (Date.now() - startedAt.current));
    setProgress(Math.max(0, (remaining.current / fullDuration.current) * 100));
    
    clearTimers();
  };

  const resumeTimer = () => {
    if (item.duration === 0) return;
    paused.current = false;
    startTimer();
  };

  useEffect(() => {
    rafRef.current = requestAnimationFrame(() => {
      setVisible(true);
      startTimer();
    });
    
    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
      }
      clearTimers();
    };
  }, [clearTimers, startTimer]);

  const variant = item.variant ?? "default";

  return (
    <div
      className={clsx("toast-card", `toast-card--${variant}`, visible && "toast-card--visible")}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      role="alert"
      aria-live="polite"
    >
      <span className="toast-card__icon">{ICONS[variant]}</span>

      <div className="toast-card__body">
        <p className="toast-card__message">{item.message}</p>
        {item.description && (
          <p className="toast-card__description">{item.description}</p>
        )}
        {item.action && (
          <button
            className="toast-card__action"
            onClick={() => { item.action?.onClick(); dismiss(); }}
          >
            {item.action.label}
          </button>
        )}
      </div>

      <Button className="toast-card__close" onClick={dismiss} aria-label="Dismiss">
        ✕
      </Button>

      {item.duration !== 0 && (
        <div className="toast-card__progress" style={{ width: `${progress}%` }} />
      )}
    </div>
  );
}

function Toaster({ position = "bottom-right", maxToasts = 5 }: ToasterProps) {
  const items = useToastItems();
  const visibleLimit = Math.max(0, maxToasts);
  const visibleItems = useMemo(
    () => visibleLimit === 0 ? [] : items.slice(-visibleLimit),
    [items, visibleLimit],
  );

  useEffect(() => {
    const overflowCount = items.length - visibleLimit;

    if (overflowCount > 0) {
      toast.dismissMany(items.slice(0, overflowCount).map((item) => item.id));
    }
  }, [items, visibleLimit]);

  return (
    <div className={clsx("toaster", `toaster--${position}`)}>
      {visibleItems.map((item) => (
        <ToastCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Toaster
