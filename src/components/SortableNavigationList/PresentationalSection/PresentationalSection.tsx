"use client";

import { NodeTree } from "@/components/SortableNavigationList/SortableNavigationList.types";
import SortableSectionItem from "@/components/SortableNavigationList/SortableSection/SortableSectionItem";
import { UniqueIdentifier } from "@dnd-kit/core";

interface StaticSectionProps {
    nodeTree: NodeTree;
    id: UniqueIdentifier;
    className?: string;
}

export default function StaticSection({ nodeTree, id, className }: StaticSectionProps) {
    const node = nodeTree.get(id);
    const childrenIds = node?.children;

    if (!node) {
        console.error("node not found", id);
        return null;
    }

    return (
        <ul className={className}>
            <SortableSectionItem isDragging={false} {...node} />

            {childrenIds?.length &&
                childrenIds.map((childId) => (
                    <StaticSection className="ml-20" key={childId} nodeTree={nodeTree} id={childId} />
                ))}
        </ul>
    );
}