import { UseFormRegister } from "react-hook-form";
import { FieldErrors } from "react-hook-form";

import { Inputs } from "../AddNavigationForm.types";

interface AddNavigationFormBodyProps {
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
}

export type { AddNavigationFormBodyProps };
