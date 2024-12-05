import Button from "@/components/generics/Button";

export default function SortableNavigationListAddButton() {
    return (
        <div className="flex w-full items-center rounded-bl-md rounded-br-md border-t border-border-secondary bg-bg-secondary px-3xl py-xl">
            <Button label="Dodaj pozycję menu" variant="secondary" />
        </div>
    );
}
