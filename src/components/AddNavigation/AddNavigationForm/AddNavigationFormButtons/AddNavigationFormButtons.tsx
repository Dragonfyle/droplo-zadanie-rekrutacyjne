import Button from "@components/generics/Button";

export default function AddNewItemFormButtons() {
    return (
        <div className="flex gap-md">
            <Button type="submit" label="Dodaj" variant="secondary-color" />
            <Button label="Anuluj" variant="secondary" />
        </div>
    );
}
