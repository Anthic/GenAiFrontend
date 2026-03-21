import gsap from "gsap";
import { useRef } from "react";

interface InputSectionProps {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  label,
  placeholder,
  id,
  value,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = (): void => {
    gsap.to(containerRef.current, {
      boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)",
      borderColor: "rgba(168, 85, 247, 0.4)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleBlur = (): void => {
    gsap.to(containerRef.current, {
      boxShadow: "0 0 0px rgba(168, 85, 247, 0)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full animate-item">
      <label className="text-white text-lg font-medium ml-1" htmlFor={id}>
        {label}
      </label>
      <div
        ref={containerRef}
        className="relative rounded-2xl border border-white/10 bg-[#0c0a1d]/50 backdrop-blur-md transition-all duration-300 overflow-hidden"
      >
        <textarea
          id={id}
          className="w-full bg-transparent p-5 text-gray-300 placeholder-gray-500 outline-none resize-none min-h-[140px]"
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
