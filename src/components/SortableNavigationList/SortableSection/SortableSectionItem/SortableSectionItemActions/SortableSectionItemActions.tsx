import Button from "@/components/generics/Button";

import { NavigationItemButtonsProps } from "./SortableSectionItemActions.types";

export default function NavigationItemButtons({ onExpand, onRemove, onEdit }: NavigationItemButtonsProps) {
    const buttonVariant = "plain";

    return (
        <div className="flex w-max divide-x divide-border-primary rounded-md border border-border-primary">
            <Button label="Usuń" variant={buttonVariant} onClick={onRemove} />
            <Button label="Edytuj" variant={buttonVariant} onClick={onEdit} />
            <Button label="Dodaj pozycję menu" variant={buttonVariant} onClick={onExpand} />
        </div>
    );
}
