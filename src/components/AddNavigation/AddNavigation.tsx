import AddNavigationForm from "./AddNavigationForm";
import { AddNavigationProps } from "./AddNavigation.types";

export default function AddNavigation({ parentId, handleAdd, handleCancel, confirmButtonLabel }: AddNavigationProps) {
    return (
        <section className="flex w-full justify-center rounded-md border border-border-secondary bg-bg-primary px-xl py-3xl">
            <AddNavigationForm
                parentId={parentId}
                onAdd={handleAdd}
                onCancel={handleCancel}
                confirmButtonLabel={confirmButtonLabel}
            />
        </section>
    );
}
