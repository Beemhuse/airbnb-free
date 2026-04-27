import { useState, InputHTMLAttributes } from "react";
import clsx from "clsx";

type Props = {
  label: string;
  containerClassName?: string;
  inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FloatingInput({
  label,
  containerClassName,
  inputClassName,
  value = "",
  onChange,
  type = "text",
  ...props
}: Props) {
  const [focused, setFocused] = useState(false);

  const isActive = focused || String(value).length > 0;

  return (
    <div
      className={clsx(
        "relative border border-neutral-300 rounded-lg px-3 pt-5 pb-2 transition-all",
        focused && "border-neutral-500",
        containerClassName
      )}
    >
      {/* LABEL */}
      <label
        className={clsx(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isActive
            ? "top-1 text-xs text-neutral-500"
            : "top-3 text-base text-neutral-400"
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
          "w-full bg-transparent outline-none text-base pt-2",
          inputClassName
        )}
        {...props}
      />
    </div>
  );
}