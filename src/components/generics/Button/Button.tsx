import { ButtonProps, ButtonVariant } from "./Button.types";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-button-primary-bg text-button-primary-fg border-button-primary-border",
  secondary:
    "bg-button-secondary-bg text-button-secondary-fg border-button-secondary-border",
  "secondary-color":
    "bg-button-secondary-color-bg text-button-secondary-color-fg border-button-secondary-color-border",
};

export default function Button({
  label,
  icon,
  variant = "primary",
}: ButtonProps) {
  const variantClasses = variants[variant];

  return (
    <button
      className={`border rounded-md px-[14px] py-[10px] w-max flex items-center gap-xs ${variantClasses}`}
    >
      {icon}
      <p className="text-sm/semibold">{label}</p>
    </button>
  );
}
