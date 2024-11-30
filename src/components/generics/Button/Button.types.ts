type ButtonVariant = "primary" | "secondary" | "secondary-color";

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

export type { ButtonProps, ButtonVariant };
