import { UseFormRegister } from "react-hook-form";
import { FieldErrors } from "react-hook-form";

import { Inputs } from "../AddNavigationForm.types";

interface AddNavigationFormInputsProps {
    register: UseFormRegister<Inputs>;
    errors: FieldErrors<Inputs>;
}

export type { AddNavigationFormInputsProps };
