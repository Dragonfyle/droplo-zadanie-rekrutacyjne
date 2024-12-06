import Button from "@components/generics/Button";

import { AddNavigationFormActionsProps } from "./AddNavigationFormActions.types";

export default function AddNavigationFormActions({ label, onCancel }: AddNavigationFormActionsProps) {
    return (
        <div className="flex gap-md">
            <Button type="submit" label={label} variant="secondary-color" />
            <Button label="Anuluj" variant="secondary" onClick={onCancel} />
        </div>
    );
}
