import Button from "@/components/generics/Button";

import { NavigationItemButtonsProps } from "./SortableSectionItemButtons.types";

export default function NavigationItemButtons({ handleToggle, handleRemove }: NavigationItemButtonsProps) {
    const buttonVariant = "plain";

    return (
        <div className="flex w-max divide-x divide-border-primary rounded-md border border-border-primary">
            <Button label="Usuń" variant={buttonVariant} onClick={handleRemove} />
            <Button label="Edytuj" variant={buttonVariant} />
            <Button label="Dodaj pozycję menu" variant={buttonVariant} onClick={handleToggle} />
        </div>
    );
}
