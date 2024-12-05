"use client";

import { useState } from "react";
import { DndContext, pointerWithin, DragEndEvent, DragStartEvent, UniqueIdentifier, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import useMousePosition from "@/hooks/useMousePosition";

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
import SortableNavigationListAddButton from "./SortableNavigationListAddButton";
import EmptyListPlaceholder from "../EmptyListPlaceholder";

export default function SortableNavigationList() {
    const [activeItemId, setActiveItemId] = useState<UniqueIdentifier | null>(null);
    const mousePosition = useMousePosition();
    const [nodeTree, setNodeTree] = useState<NodeTree>(new Map([[ROOT_NODE_ID, { name: "root", url: "/" }]]));

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
                {ids.length > 1 ? (
                    <div className="w-full rounded-md border border-border-primary bg-bg-secondary first:rounded-t-md lg:items-center">
                        <SortableSection
                            nodeTree={nodeTree}
                            setNodeTree={setNodeTree}
                            id={ROOT_NODE_ID}
                            firstNodeId={ids[1]}
                            isFirstLevel={true}
                        />

                        <SortableNavigationListAddButton handleAdd={setNodeTree} />
                    </div>
                ) : (
                    <EmptyListPlaceholder handleAdd={setNodeTree} />
                )}
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
