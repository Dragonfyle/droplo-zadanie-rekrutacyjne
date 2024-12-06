import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import {
    AppendToParentParams,
    DifferentParentDropParams,
    Node,
    NodeTree,
    ParentManipulationParams,
    SameParentDropParams,
    SwapParentsParams,
    TreeManipulationParams,
} from "./SortableNavigationList.types";
import { isPointerAboveVerticalThreshold } from "./SortableSection";
import assert from "assert";

const ROOT_NODE_ID = "root";

function getAllIds(nodeTree: NodeTree, startSectionId: UniqueIdentifier): UniqueIdentifier[] {
    const startItem = nodeTree.get(startSectionId);

    return [startSectionId, ...(startItem?.children?.flatMap((childId) => getAllIds(nodeTree, childId)) ?? [])];
}

function destinationIsDecendantOfOrigin(
    nodeTree: NodeTree,
    destinationParentId: UniqueIdentifier,
    originParentId: UniqueIdentifier
) {
    const subtree = getSubtree(nodeTree, originParentId);

    return subtree.has(destinationParentId);
}

function swapChildren(
    active: DragEndEvent["active"],
    over: DragEndEvent["over"],
    parentNode: Node
): UniqueIdentifier[] | null {
    const children = parentNode?.children;
    if (!active || !over || !children?.length) return null;

    return arrayMove(children, children.indexOf(active.id), children.indexOf(over.id));
}

function getParentId(nodeTree: NodeTree, id: UniqueIdentifier): UniqueIdentifier | undefined {
    for (const [key, value] of nodeTree.entries()) {
        if (value.children?.includes(id)) {
            return key;
        }
    }
}

function appendChildMutOrThrow({ nodeTree, parentId, childId }: ParentManipulationParams): UniqueIdentifier[] {
    const parentNode = nodeTree.get(parentId);
    if (!parentNode) throw new Error("parent node not found");

    parentNode.children ??= [];
    parentNode.children.push(childId);

    return parentNode.children;
}

function removeChildMutOrThrow({ nodeTree, parentId, childId }: ParentManipulationParams): UniqueIdentifier[] {
    const parentNode = nodeTree.get(parentId);
    if (!parentNode) throw new Error("parent node not found");

    parentNode.children = parentNode.children?.filter((id) => id !== childId);

    return parentNode.children ?? [];
}

function moveToOtherParentOrThrow({ nodeTree, active, over }: SwapParentsParams): {
    updatedOriginParent: Node;
    updatedDestinationParent: Node;
} {
    if (!over) throw new Error("over not found");

    const originParentId = getParentId(nodeTree, active.id);
    const destinationParentId = getParentId(nodeTree, over.id);
    if (!originParentId || !destinationParentId) throw new Error("parent id not found");

    const originParentNode = nodeTree.get(originParentId);
    const destinationParentNode = nodeTree.get(destinationParentId);

    if (destinationIsDecendantOfOrigin(nodeTree, over.id, active.id)) {
        throw new Error("destination is a child of origin. moving node would cause infinite self-referencing");
    }

    const originIndex = originParentNode?.children?.findIndex((childId) => childId === active.id);
    const destinationIndex = destinationParentNode?.children?.findIndex((childId) => childId === over.id);

    assert(originIndex !== undefined, "origin index is undefined");
    assert(originParentNode !== undefined, "origin parent node is undefined");
    assert(destinationIndex !== undefined, "destination index is undefined");
    assert(destinationParentNode !== undefined, "destination parent node is undefined");

    originParentNode.children!.splice(originIndex, 1);

    if (!originParentNode.children?.length) {
        delete originParentNode.children;
    }

    destinationParentNode.children?.splice(destinationIndex, 0, active.id);

    return { updatedOriginParent: originParentNode, updatedDestinationParent: destinationParentNode };
}

function getSubtree(nodeTree: NodeTree, id: UniqueIdentifier): NodeTree {
    const startNode = nodeTree.get(id);
    if (!startNode) return new Map();

    let subTree = new Map([[id, startNode]]);

    if (startNode.children) {
        for (const childId of startNode.children) {
            const childSubtree = getSubtree(nodeTree, childId);
            subTree = new Map([...subTree, ...childSubtree]);
        }
    }

    return subTree;
}

function handleSameParentNodeMut({ active, over, nodeTree, mouseY }: SameParentDropParams) {
    if (!over) return nodeTree;

    const parentId = getParentId(nodeTree, active.id);
    if (!parentId) return nodeTree;

    const parentNode = nodeTree.get(parentId);
    if (!parentNode || over.id === active.id) return nodeTree;

    const isAboveCenter = isPointerAboveVerticalThreshold(mouseY, over.rect);

    if (isAboveCenter) {
        const swappedChildren = swapChildren(active, over, parentNode) ?? parentNode.children;
        nodeTree.set(parentId, { ...parentNode, children: swappedChildren });
        return nodeTree;
    }

    const destinationNode = nodeTree.get(over.id);
    if (!destinationNode) return nodeTree;

    try {
        const updatedDest = appendChildMutOrThrow({ nodeTree, parentId: over.id, childId: active.id });
        const updatedOrigin = removeChildMutOrThrow({ nodeTree, parentId, childId: active.id });

        nodeTree.set(over.id, { ...destinationNode, children: updatedDest });
        nodeTree.set(parentId, { ...parentNode, children: updatedOrigin });
    } catch {}

    return nodeTree;
}

function handleMoveIntoNode({ active, over, nodeTree }: TreeManipulationParams): void {
    if (!over) return;

    const parentNode = nodeTree.get(over.id);
    const originalParentId = getParentId(nodeTree, active.id);

    if (!parentNode || !originalParentId || destinationIsDecendantOfOrigin(nodeTree, over.id, active.id)) return;

    try {
        const updatedOriginChildren = removeChildMutOrThrow({
            nodeTree: structuredClone(nodeTree),
            parentId: originalParentId,
            childId: active.id,
        });

        handleAppendChildToNodeMut({ active, over, updatedOriginChildren, nodeTree });
    } catch {}
}

function handleDifferentParentNodeMut({ active, over, nodeTree, mouseY }: DifferentParentDropParams): NodeTree {
    if (!over) return nodeTree;

    const isAboveCenter = isPointerAboveVerticalThreshold(mouseY, over.rect);

    if (isAboveCenter) {
        handleMoveInFrontOfOver({ active, over, nodeTree });
    } else {
        handleMoveIntoNode({ active, over, nodeTree });
    }

    return nodeTree;
}

function handleMoveInFrontOfOver({ active, over, nodeTree }: Omit<DifferentParentDropParams, "mouseY">): void {
    if (!over) return;

    const originParentId = getParentId(nodeTree, active.id);
    const destinationParentId = getParentId(nodeTree, over.id);
    if (!originParentId || !destinationParentId) return;

    try {
        const { updatedOriginParent, updatedDestinationParent } = moveToOtherParentOrThrow({
            nodeTree,
            active,
            over,
        });

        nodeTree.set(originParentId, updatedOriginParent);
        nodeTree.set(destinationParentId, updatedDestinationParent);
        //we can swallow errors because if they occur, the nodes simply remain in their original place
    } catch {}
}

function handleAppendChildToNodeMut({ active, over, updatedOriginChildren, nodeTree }: AppendToParentParams): void {
    if (!over) return;

    const originParentId = getParentId(nodeTree, active.id);
    if (!originParentId) return;

    const [originParentNode, destinationParentNode] = [nodeTree.get(originParentId), nodeTree.get(over.id)];
    if (!destinationParentNode || !originParentNode || destinationParentNode.children?.includes(active.id)) return;

    const updatedDestChildren = appendChildMutOrThrow({ nodeTree, parentId: over.id, childId: active.id });

    if (updatedOriginChildren.length === 0) {
        delete originParentNode.children;
    } else {
        nodeTree.set(originParentId, { ...originParentNode, children: updatedOriginChildren });
    }

    nodeTree.set(over.id, { ...destinationParentNode, children: updatedDestChildren });
}

export {
    getAllIds,
    getParentId,
    swapChildren,
    moveToOtherParentOrThrow,
    getSubtree,
    ROOT_NODE_ID,
    appendChildMutOrThrow as appendChildIdOrThrow,
    destinationIsDecendantOfOrigin,
    removeChildMutOrThrow as removeChildIdOrThrow,
    handleSameParentNodeMut,
    handleDifferentParentNodeMut,
};
