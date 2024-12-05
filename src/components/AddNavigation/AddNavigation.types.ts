import { Dispatch, SetStateAction } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "../SortableNavigationList/SortableNavigationList.types";

interface AddNavigationProps {
    parentId: UniqueIdentifier;
    handleAdd: Dispatch<SetStateAction<NodeTree>>;
    handleCancel: () => void;
}

export type { AddNavigationProps };
