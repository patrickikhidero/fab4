"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastItem = {
  id: number;
  type: ToastType;
  message: string;
  title?: string;
};

type ToastContextType = {
  showToast: (type: ToastType, message: string, title?: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, title?: string) => {
      const id = Date.now() + Math.floor(Math.random() * 1000);

      setToasts((prev) => [...prev, { id, type, message, title }]);

      window.setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[9999] flex w-[calc(100vw-2rem)] max-w-[420px] flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return ctx;
}

function ToastCard({
  toast,
  onClose,
}: {
  toast: ToastItem;
  onClose: () => void;
}) {
  const styles = getToastStyles(toast.type);

  return (
    <div className="pointer-events-auto overflow-hidden rounded-2xl border bg-white shadow-[0_14px_40px_rgba(0,0,0,0.12)]">
      <div className={`h-1 w-full ${styles.bar}`} />

      <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
        <div className={`mt-0.5 shrink-0 ${styles.iconColor}`}>{styles.icon}</div>

        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-[#272635]">
            {toast.title || styles.defaultTitle}
          </div>

          <p className="mt-1 text-sm leading-6 text-[rgba(39,38,53,0.72)]">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[rgba(39,38,53,0.45)] transition hover:bg-black/5 hover:text-[#272635]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function getToastStyles(type: ToastType) {
  switch (type) {
    case "success":
      return {
        bar: "bg-[#198754]",
        iconColor: "text-[#198754]",
        defaultTitle: "Success",
        icon: <CheckCircle2 className="h-5 w-5" />,
      };

    case "error":
      return {
        bar: "bg-[#dc3545]",
        iconColor: "text-[#dc3545]",
        defaultTitle: "Something went wrong",
        icon: <AlertCircle className="h-5 w-5" />,
      };

    case "warning":
      return {
        bar: "bg-[#f59e0b]",
        iconColor: "text-[#f59e0b]",
        defaultTitle: "Warning",
        icon: <AlertTriangle className="h-5 w-5" />,
      };

    case "info":
    default:
      return {
        bar: "bg-[#0d6efd]",
        iconColor: "text-[#0d6efd]",
        defaultTitle: "Notice",
        icon: <Info className="h-5 w-5" />,
      };
  }
}