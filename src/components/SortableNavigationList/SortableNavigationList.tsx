"use client";

import { useState } from "react";

import {
    DndContext,
    PointerSensor,
    KeyboardSensor,
    TouchSensor,
    useSensor,
    useSensors,
    closestCenter,
    DragEndEvent,
    UniqueIdentifier,
} from "@dnd-kit/core";

import NavigationSection from "@components/NavigationSection";

import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function SortableNavigationList() {
    //todo
    const [items, setItems] = useState([
        { name: "Home", url: "/", id: "1" as UniqueIdentifier },
        { name: "About", url: "/about", id: "2" as UniqueIdentifier },
        { name: "Contact", url: "/contact", id: "3" as UniqueIdentifier },
    ]);
    const ids = items.map((item) => item.id);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = ids.indexOf(active.id);
                const newIndex = ids.indexOf(over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <NavigationSection items={items} />
            </SortableContext>
        </DndContext>
    );
}
