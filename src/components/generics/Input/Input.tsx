import { InputProps } from "./Input.types";

export default function Input({ label, placeholder, icon, className, ...restProps }: InputProps) {
    const paddingLeft = icon ? "px-[3rem]" : "px-lg";

    return (
        <div className="flex flex-col gap-sm">
            <label className="text-text-secondary text-sm/medium">{label}</label>

            <div className="grid grid-cols-2 grid-rows-[1fr] items-center">
                <div className="z-10 col-start-1 col-end-1 row-start-1 row-end-1 w-max px-lg">{icon}</div>

                <input
                    placeholder={placeholder}
                    className={`placeholder:text-text-placeholder relative col-start-1 col-end-3 row-start-1 row-end-1 w-full rounded-md border bg-bg-primary placeholder:text-sm/regular ${paddingLeft} py-md ${className}`}
                    {...restProps}
                />
            </div>
        </div>
    );
}
