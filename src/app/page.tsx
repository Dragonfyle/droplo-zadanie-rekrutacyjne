"use client";

import SortableNavigationList from "@/components/SortableNavigationList";

export default function Home() {
    return (
        <main className="mx-auto flex max-w-[1200px] flex-col gap-4xl p-xl">
            <SortableNavigationList />
        </main>
    );
}
