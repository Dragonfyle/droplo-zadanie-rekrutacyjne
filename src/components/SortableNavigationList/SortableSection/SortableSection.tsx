"use client";

import { useSortable } from "@dnd-kit/sortable";

import useMousePosition from "@/hooks/useMousePosition";

import SortableSectionItem from "./SortableSectionItem";
import { SortableSectionProps } from "./SortableSection.types";
import { ROOT_NODE_ID } from "../SortableNavigationList.utils";
import { isPointerAboveVerticalThreshold } from "./SortableSection.utils";
import InsertIndicator from "./InsertIndicator";

export default function SortableSection({
    nodeTree,
    id,
    className,
    isSectionDragging = false,
    isFirstLevel = true,
    firstNodeId,
    setNodeTree,
}: SortableSectionProps) {
    const mousePosition = useMousePosition();
    const { setNodeRef, attributes, listeners, isDragging, isOver, rect } = useSortable({
        id,
    });

    const node = nodeTree.get(id);
    const childrenIds = node?.children ?? [];

    if (!node) {
        return null;
    }

    const isItemOrSectionDragging = isDragging || isSectionDragging;
    const isOverSelf = isOver && !isItemOrSectionDragging;
    const isAboveCenter = isPointerAboveVerticalThreshold(mousePosition?.y, rect.current);
    const shouldInsertAbove = isOverSelf && isAboveCenter;
    const shouldInsertInto = isOverSelf && !isAboveCenter;

    const nestingMarginClasses = isFirstLevel ? "" : "ml-4xl lg:ml-20";
    const ulClasses = `${className} ${nestingMarginClasses}`;
    const liClasses = shouldInsertInto ? "bg-bg-tertiary scale-105" : "";

    return (
        <ul className={ulClasses}>
            {id !== ROOT_NODE_ID && (
                <>
                    {shouldInsertAbove && <InsertIndicator />}

                    <SortableSectionItem
                        ref={setNodeRef}
                        setNodeTree={setNodeTree}
                        isDragging={isItemOrSectionDragging}
                        isFirstLevel={id === firstNodeId}
                        id={id}
                        {...node}
                        {...attributes}
                        {...listeners}
                        className={liClasses}
                    />
                </>
            )}

            {childrenIds.map((childId) => (
                <li key={childId}>
                    <SortableSection
                        className={nestingMarginClasses}
                        nodeTree={nodeTree}
                        id={childId}
                        isSectionDragging={isItemOrSectionDragging}
                        firstNodeId={firstNodeId}
                        isFirstLevel={id === ROOT_NODE_ID}
                        setNodeTree={setNodeTree}
                    />
                </li>
            ))}
        </ul>
    );
}
