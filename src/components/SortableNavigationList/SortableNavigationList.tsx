"use client";

import { useState } from "react";

import { DndContext, pointerWithin, DragEndEvent, DragStartEvent, UniqueIdentifier, DragOverlay } from "@dnd-kit/core";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { NodeTree } from "./SortableNavigationList.types";
import {
    getAllIds,
    getParentId,
    handleSameParentNodeMut,
    handleDifferentParentNodeMut,
    getSubtree,
    ROOT_NODE_ID,
} from "./SortableNavigationList.utils";
import SortableSection from "./SortableSection";
import PresentationalSection from "./PresentationalSection";
import useMousePosition from "@/hooks/useMousePosition";

export default function SortableNavigationList() {
    const [activeItemId, setActiveItemId] = useState<UniqueIdentifier | null>(null);
    const mousePosition = useMousePosition();
    //todo
    const [nodeTree, setNodeTree] = useState<NodeTree>(
        new Map([
            [
                ROOT_NODE_ID,
                {
                    name: "root",
                    url: "/",
                    children: ["a", "b", "c"],
                },
            ],
            [
                "a",
                {
                    name: "a",
                    url: "/a",
                    children: ["a1", "a2"],
                },
            ],
            [
                "a1",
                {
                    name: "a1",
                    url: "/a1",
                },
            ],
            [
                "a2",
                {
                    name: "a2",
                    url: "/a2",
                },
            ],
            [
                "b",
                {
                    name: "b",
                    url: "/b",
                    children: ["b1", "b2"],
                },
            ],
            [
                "b1",
                {
                    name: "b1",
                    url: "/b1",
                    children: ["b1.1", "b1.2"],
                },
            ],
            [
                "b1.1",
                {
                    name: "b1.1",
                    url: "/b1.1",
                    children: ["b1.1.1", "b1.1.2"],
                },
            ],
            [
                "b1.1.1",
                {
                    name: "b1.1.1",
                    url: "/b1.1.1",
                },
            ],
            [
                "b1.1.2",
                {
                    name: "b1.1.2",
                    url: "/b1.1.2",
                },
            ],
            [
                "b1.2",
                {
                    name: "b1.2",
                    url: "/b1.2",
                },
            ],
            [
                "b2",
                {
                    name: "b2",
                    url: "/b2",
                },
            ],
            [
                "c",
                {
                    name: "c",
                    url: "/c",
                },
            ],
        ])
    );

    const ids = getAllIds(nodeTree, ROOT_NODE_ID);

    function handleDragStart(event: DragStartEvent) {
        const {
            active: { id },
        } = event;

        setActiveItemId(id);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!active || !over) return;

        setActiveItemId(null);

        const originParentId = getParentId(nodeTree, active.id);
        const destinationParentId = getParentId(nodeTree, over.id);
        if (!originParentId || !destinationParentId) return;

        setNodeTree((prev) => {
            const nodeTreeCopy = structuredClone(prev);
            const handler =
                originParentId === destinationParentId ? handleSameParentNodeMut : handleDifferentParentNodeMut;

            handler({
                active,
                over,
                nodeTree: nodeTreeCopy,
                mouseY: mousePosition?.y ?? null,
            });

            return nodeTreeCopy;
        });
    }

    const isDragging = !!activeItemId;

    return (
        <DndContext collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                <SortableSection nodeTree={nodeTree} id={ROOT_NODE_ID} />
            </SortableContext>

            <DragOverlay dropAnimation={null}>
                {isDragging && (
                    <PresentationalSection
                        nodeTree={getSubtree(nodeTree, activeItemId)}
                        id={activeItemId}
                        className="origin-top-left scale-75"
                    />
                )}
            </DragOverlay>
        </DndContext>
    );
}
