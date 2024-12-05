import { Dispatch, SetStateAction } from "react";

import { NodeTree } from "../../SortableNavigationList.types";
import { UniqueIdentifier } from "@dnd-kit/core";

interface SortableSectionItemProps {
    name: string;
    url: string;
    isDragging: boolean;
    className?: string;
    isFirstLevel: boolean;
    setNodeTree: Dispatch<SetStateAction<NodeTree>>;
    id: UniqueIdentifier;
}

export type { SortableSectionItemProps };
