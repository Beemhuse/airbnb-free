import { useState, InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  containerClassName?: string;
  inputClassName?: string;
  error?: boolean;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FloatingInput({
  label,
  containerClassName,
  inputClassName,
  value = "",
  onChange,
  type = "text",
  error,
  errorMessage,
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);

  const isActive = focused || String(value).length > 0;

  return (
    <div
      className={clsx(
        "relative rounded-lg border transition-all px-3 pt-6 pb-2",
        "border-input bg-transparent",
        focused && "ring-[3px] ring-ring/50 border-ring",
        (error || errorMessage) && "border-destructive ring-destructive/20",
        "dark:bg-input/30",
        containerClassName
      )}
    >
      {/* LABEL */}
      <label
        className={clsx(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isActive
            ? "top-1 text-xs text-muted-foreground"
            : "top-3 text-base text-muted-foreground"
        )}
      >
        {label}
      </label>

      {/* INPUT */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={clsx(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "w-full min-w-0 bg-transparent text-base outline-none",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "md:text-sm",
          "p-0",

          inputClassName
        )}
        {...props}
      />
      {errorMessage && (
        <p className="absolute left-0 -bottom-5 text-[10px] text-destructive animate-in fade-in slide-in-from-top-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
}