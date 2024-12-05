import { Dispatch, SetStateAction } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "@/components/SortableNavigationList/SortableNavigationList.types";

type Inputs = {
    name: string;
    url: string;
};

interface AddNavigationFormProps {
    handleAdd: Dispatch<SetStateAction<NodeTree>>;
    handleCancel: () => void;
    parentId: UniqueIdentifier;
}

export type { AddNavigationFormProps, Inputs };
