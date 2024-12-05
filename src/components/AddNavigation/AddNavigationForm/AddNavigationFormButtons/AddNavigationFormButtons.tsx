import Button from "@components/generics/Button";

import { AddNavigationFormButtonsProps } from "./AddNavigationFormButtons.types";

export default function AddNavigationFormButtons({ label, handleCancel }: AddNavigationFormButtonsProps) {
    return (
        <div className="flex gap-md">
            <Button type="submit" label={label} variant="secondary-color" />
            <Button label="Anuluj" variant="secondary" onClick={handleCancel} />
        </div>
    );
}
