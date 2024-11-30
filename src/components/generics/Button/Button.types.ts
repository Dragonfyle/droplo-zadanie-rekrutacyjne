type ButtonVariant = "filled" | "color" | "plain";

interface ButtonProps {
  label: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
}

export type { ButtonProps, ButtonVariant };
