import { Dispatch, SetStateAction } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "../SortableNavigationList.types";

interface SortableSectionProps {
    id: UniqueIdentifier;
    nodeTree: NodeTree;
    setNodeTree: Dispatch<SetStateAction<NodeTree>>;
    className?: string;
    isSectionDragging?: boolean;
    isFirstLevel?: boolean;
    firstNodeId: UniqueIdentifier;
}

export type { SortableSectionProps };
