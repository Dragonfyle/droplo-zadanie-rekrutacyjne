import { ButtonProps, ButtonVariant } from "./Button.types";

const variants: Record<ButtonVariant, string> = {
  filled:
    "bg-button-primary-bg text-button-primary-fg border-button-primary-border",
  color: "",
  plain: "",
};

export default function Button({
  label,
  icon,
  variant = "filled",
}: ButtonProps) {
  const variantClasses = variants[variant];

  return (
    <button
      className={`rounded-md px-[14px] py-[10px] w-max flex items-center gap-xs ${variantClasses}`}
    >
      {icon}
      <p className="text-sm/semibold">{label}</p>
    </button>
  );
}
