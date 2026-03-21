import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Overlay Container - Top Left */}
      <div className="fixed top-6 left-6 z-[99999] flex flex-col gap-4 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto relative overflow-hidden transform transition-all duration-500 ease-out flex items-center justify-between min-w-[320px] max-w-[420px] px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 bg-[#050314]/90 backdrop-blur-2xl
              text-white font-semibold text-base sm:text-lg tracking-wide animate-[slideInToastLeft_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]
            `}
          >
            {/* Color Accent Indicator */}
            {toast.type === "success" && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500 shadow-[0_0_15px_#34d399]" />
            )}
            {toast.type === "error" && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-rose-500 to-red-600 shadow-[0_0_15px_#f43f5e]" />
            )}
            {toast.type === "info" && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-purple-400 to-indigo-500 shadow-[0_0_15px_#a78bfa]" />
            )}

            <div className="flex items-center gap-4 pl-2">
              {toast.type === "success" && (
                <CheckCircle2
                  className="text-emerald-400 flex-shrink-0"
                  size={26}
                />
              )}
              {toast.type === "error" && (
                <AlertCircle
                  className="text-rose-500 flex-shrink-0"
                  size={26}
                />
              )}
              {toast.type === "info" && (
                <Info className="text-purple-400 flex-shrink-0" size={26} />
              )}
              <span className="leading-snug text-gray-100">
                {toast.message}
              </span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="ml-5 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/5 text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideInToastLeft {
          0% {
            opacity: 0;
            transform: translateX(-100px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
