import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "../SortableNavigationList.types";

interface SortableSectionProps {
    id: UniqueIdentifier;
    nodeTree: NodeTree;
    className?: string;
    isSectionDragging?: boolean;
    isFirstLevel?: boolean;
}

export type { SortableSectionProps };
