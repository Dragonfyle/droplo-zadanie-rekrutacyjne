import Button from "@/components/generics/Button";

import { NavigationItemButtonsProps } from "./SortableSectionItemButtons.types";

export default function NavigationItemButtons({ handleToggle, handleRemove, handleEdit }: NavigationItemButtonsProps) {
    const buttonVariant = "plain";

    return (
        <div className="flex w-max divide-x divide-border-primary rounded-md border border-border-primary">
            <Button label="Usuń" variant={buttonVariant} onClick={handleRemove} />
            <Button label="Edytuj" variant={buttonVariant} onClick={handleEdit} />
            <Button label="Dodaj pozycję menu" variant={buttonVariant} onClick={handleToggle} />
        </div>
    );
}
