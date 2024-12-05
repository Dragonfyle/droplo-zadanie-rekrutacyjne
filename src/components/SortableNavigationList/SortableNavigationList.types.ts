import { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

type Node = {
    name: string;
    url: string;
    children?: UniqueIdentifier[];
};

type NodeTree = Map<UniqueIdentifier, Node>;

type BaseParams = {
    nodeTree: NodeTree;
    active: DragEndEvent["active"];
    over: DragEndEvent["over"];
};

type ParentManipulationParams = {
    nodeTree: NodeTree;
    parentId: UniqueIdentifier;
    childId: UniqueIdentifier;
};

type TreeManipulationParams = BaseParams;

type SameParentDropParams = BaseParams & {
    mouseY: number | null;
};

type DifferentParentDropParams = BaseParams & {
    mouseY: number | null;
};

type AppendToParentParams = BaseParams & {
    updatedOriginChildren: UniqueIdentifier[];
};

type SwapParentsParams = BaseParams;

export type {
    Node,
    NodeTree,
    BaseParams,
    ParentManipulationParams,
    TreeManipulationParams,
    SameParentDropParams,
    DifferentParentDropParams,
    AppendToParentParams,
    SwapParentsParams,
};
