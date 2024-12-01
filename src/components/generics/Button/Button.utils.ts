import { ButtonVariant } from "./Button.types";

const commonClasses = "rounded-md border";

const variants: Record<ButtonVariant, string> = {
    primary: `bg-button-primary-bg text-button-primary-fg border-button-primary-border ${commonClasses}`,
    secondary: `bg-button-secondary-bg text-button-secondary-fg border-button-secondary-border ${commonClasses}`,
    "secondary-color": `bg-button-secondary-color-bg text-button-secondary-color-fg border-button-secondary-color-border ${commonClasses}`,
    plain: "bg-transparent text-button-secondary-fg ",
};

export { variants };
