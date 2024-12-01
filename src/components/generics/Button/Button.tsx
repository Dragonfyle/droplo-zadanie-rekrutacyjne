import { ButtonProps } from "./Button.types";
import { variants } from "./Button.utils";

export default function Button({ label, icon, variant = "primary" }: ButtonProps) {
    const variantClasses = variants[variant];

    return (
        <button className={`flex w-max items-center gap-xs px-[14px] py-[10px] ${variantClasses}`}>
            {icon}
            <p className="text-sm/semibold">{label}</p>
        </button>
    );
}
