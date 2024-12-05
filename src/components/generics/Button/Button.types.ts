type ButtonVariant = "primary" | "secondary" | "secondary-color" | "plain";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    label: string;
    icon?: React.ReactNode;
    variant?: ButtonVariant;
    onClick?: () => void;
}
export type { ButtonProps, ButtonVariant };
