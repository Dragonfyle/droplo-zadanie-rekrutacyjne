import { Dispatch, SetStateAction } from "react";

import AddNavigationForm from "./AddNavigationForm";
import { NodeTree } from "../SortableNavigationList/SortableNavigationList.types";
import { UniqueIdentifier } from "@dnd-kit/core";

export default function AddNavigation({
    parentId,
    setNodeTree,
}: {
    parentId: UniqueIdentifier;
    setNodeTree: Dispatch<SetStateAction<NodeTree>>;
}) {
    return (
        <section className="flex w-full justify-center rounded-md border border-border-secondary bg-bg-primary px-xl py-3xl">
            <AddNavigationForm parentId={parentId} setNodeTree={setNodeTree} />
        </section>
    );
}
