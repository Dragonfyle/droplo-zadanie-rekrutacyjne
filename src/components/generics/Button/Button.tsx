import { ButtonProps } from "./Button.types";
import { variants } from "./Button.utils";

export default function Button({ label, icon, variant = "primary", onClick, type = "button" }: ButtonProps) {
    const variantClasses = variants[variant];

    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex w-max items-center gap-xs px-2 py-1 lg:px-[14px] lg:py-[10px] ${variantClasses}`}>
            {icon}
            <p className="text-sm/semibold">{label}</p>
        </button>
    );
}
