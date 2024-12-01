import Button from "@/components/generics/Button";

import NavigationItem from "./NavigationItem";
import { NavigationSectionProps } from "./NavigationSection.types";

export default function NavigationSection({ items }: NavigationSectionProps) {
    function renderItems() {
        return items.map((item) => <NavigationItem key={item.name} {...item} />);
    }

    return (
        <section className="w-full rounded-md border border-border-primary">
            <ul className="w-full divide-y divide-border-secondary">{renderItems()}</ul>

            <div className="flex border-t border-t-border-secondary px-3xl py-2xl">
                <Button label="Dodaj pozycję menu" variant="secondary" />
            </div>
        </section>
    );
}
