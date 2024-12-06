import { Dispatch, SetStateAction } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "../SortableNavigationList";
import { ConfirmButtonLabel } from "./AddNavigationForm";

interface AddNavigationProps {
    parentId: UniqueIdentifier;
    handleAdd: Dispatch<SetStateAction<NodeTree>>;
    handleCancel: () => void;
    confirmButtonLabel: ConfirmButtonLabel;
}

export type { AddNavigationProps };
