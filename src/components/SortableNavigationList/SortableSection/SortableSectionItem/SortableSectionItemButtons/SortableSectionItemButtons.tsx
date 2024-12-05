import Button from "@/components/generics/Button";

export default function NavigationItemButtons() {
    const buttonVariant = "plain";

    return (
        <div className="flex w-max divide-x divide-border-primary rounded-md border border-border-primary">
            <Button label="Usuń" variant={buttonVariant} />
            <Button label="Edytuj" variant={buttonVariant} />
            <Button label="Dodaj pozycję menu" variant={buttonVariant} />
        </div>
    );
}
