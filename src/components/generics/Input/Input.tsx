import { InputProps } from "./Input.types";

export default function Input({ label, placeholder, icon }: InputProps) {
  const paddingLeft = icon ? "px-[3rem]" : "px-lg";

  return (
    <div className="flex flex-col gap-sm">
      <label className="text-sm/medium text-text-secondary">{label}</label>
      <div className="grid grid-cols-2 grid-rows-[1fr] items-center">
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 z-10 px-lg w-max">
          {icon}
        </div>
        <input
          placeholder={placeholder}
          className={`col-start-1 col-end-3 row-start-1 row-end-1 relative w-full
            rounded-md border border-border-primary bg-bg-primary placeholder:text-text-placeholder
            placeholder:text-sm/regular ${paddingLeft} py-md`}
        />
      </div>
    </div>
  );
}
