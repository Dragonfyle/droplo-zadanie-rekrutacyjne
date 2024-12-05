import { useState, Dispatch, SetStateAction } from "react";
import { CirclePlus } from "lucide-react";

import Button from "@generics/Button";

import EmptyListPlaceholderText from "./EmptyListPlaceholderText";
import AddNavigation from "../AddNavigation";
import { NodeTree } from "../SortableNavigationList/SortableNavigationList.types";
import { ROOT_NODE_ID } from "../SortableNavigationList/SortableNavigationList.utils";

export default function EmptyListPlaceholder({ handleAdd }: { handleAdd: Dispatch<SetStateAction<NodeTree>> }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="flex w-full flex-col justify-center gap-4xl rounded-md border border-border-secondary bg-bg-secondary px-xl py-3xl">
            <div className="flex flex-col items-center gap-xl">
                <EmptyListPlaceholderText />
                <Button
                    onClick={() => setIsExpanded((prev) => !prev)}
                    label="Dodaj pozycję menu"
                    icon={<CirclePlus size={18} />}
                />
            </div>

            {isExpanded && (
                <AddNavigation
                    parentId={ROOT_NODE_ID}
                    handleAdd={handleAdd}
                    handleCancel={() => setIsExpanded(false)}
                />
            )}
        </section>
    );
}
