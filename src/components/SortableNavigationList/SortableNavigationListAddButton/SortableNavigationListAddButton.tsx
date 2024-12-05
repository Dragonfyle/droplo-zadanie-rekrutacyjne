import { Dispatch, SetStateAction, useState } from "react";

import AddNavigationForm from "@/components/AddNavigation/AddNavigationForm";
import Button from "@/components/generics/Button";

import { ROOT_NODE_ID } from "../SortableNavigationList.utils";
import { NodeTree } from "../SortableNavigationList.types";

interface SortableNavigationListAddButtonProps {
    handleAdd: Dispatch<SetStateAction<NodeTree>>;
}

export default function SortableNavigationListAddButton({ handleAdd }: SortableNavigationListAddButtonProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="flex w-full flex-col gap-2xl rounded-bl-md rounded-br-md border-t border-border-secondary bg-bg-secondary px-3xl py-xl">
            <Button label="Dodaj pozycję menu" variant="secondary" onClick={() => setIsExpanded((prev) => !prev)} />

            {isExpanded && (
                <AddNavigationForm
                    parentId={ROOT_NODE_ID}
                    handleAdd={handleAdd}
                    handleCancel={() => setIsExpanded(false)}
                />
            )}
        </div>
    );
}
