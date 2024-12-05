"use client";

import AddNavigation from "@/components/AddNavigation";
import SortableNavigationList from "@/components/SortableNavigationList";
import EmptyListPlaceholder from "@components/EmptyListPlaceholder";

export default function Home() {
    return (
        <main className="mx-auto flex max-w-[1200px] flex-col gap-4xl p-xl">
            <EmptyListPlaceholder />
            <AddNavigation />

            <SortableNavigationList />
        </main>
    );
}
