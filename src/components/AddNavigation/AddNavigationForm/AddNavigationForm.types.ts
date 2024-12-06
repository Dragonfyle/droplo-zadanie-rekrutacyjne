import { Dispatch, SetStateAction } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "@/components/SortableNavigationList";

type Inputs = {
    name: string;
    url: string;
};

type ConfirmButtonLabel = "Dodaj" | "Zapisz";

interface AddNavigationFormProps {
    onAdd: Dispatch<SetStateAction<NodeTree>>;
    onSave?: (data: Inputs) => void;
    onCancel: () => void;
    parentId: UniqueIdentifier;
    defaultValues?: Partial<Inputs>;
    confirmButtonLabel: ConfirmButtonLabel;
    isEditing?: boolean;
}

export type { AddNavigationFormProps, Inputs, ConfirmButtonLabel };
