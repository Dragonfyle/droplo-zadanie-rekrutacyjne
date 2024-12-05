import { Dispatch, SetStateAction } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "../SortableNavigationList/SortableNavigationList.types";
import { ConfirmButtonLabel } from "./AddNavigationForm/AddNavigationForm.types";

interface AddNavigationProps {
    parentId: UniqueIdentifier;
    handleAdd: Dispatch<SetStateAction<NodeTree>>;
    handleCancel: () => void;
    confirmButtonLabel: ConfirmButtonLabel;
}

export type { AddNavigationProps };
