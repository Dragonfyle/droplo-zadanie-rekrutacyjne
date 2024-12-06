import { Search } from "lucide-react";

import Input from "@components/generics/Input";

import { AddNavigationFormBodyProps } from "./AddNavigationFormBody.types";

export default function AddNavigationFormBody({ register, errors }: AddNavigationFormBodyProps) {
    const border = errors.name ? "border-border-error outline-border-error" : "border-border-primary";

    return (
        <div className="flex flex-col gap-md">
            <Input
                label="Nazwa"
                placeholder="np. Promocje"
                {...register("name", { required: true })}
                className={border}
            />
            {errors.name && <p className="text-sm/semibold text-error">Nazwa jest wymagana</p>}

            <Input
                label="Link"
                placeholder="Wklej lub wyszukaj"
                icon={<Search className="h-5 w-5 text-placeholder" />}
                {...register("url")}
            />
        </div>
    );
}
