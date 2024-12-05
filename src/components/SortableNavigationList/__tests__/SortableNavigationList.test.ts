import { DragEndEvent } from "@dnd-kit/core";
import { expect, it, describe } from "@jest/globals";

import {
    appendChildIdOrThrow,
    destinationIsDecendantOfOrigin,
    getAllIds,
    getParentId,
    getSubtree,
    swapChildren,
    moveToOtherParentOrThrow,
} from "../SortableNavigationList.utils";
import { Node, NodeTree } from "../SortableNavigationList.types";

const mockItemTree: NodeTree = new Map([
    [
        "root",
        {
            name: "root",
            url: "/",
            children: ["a", "b", "c"],
        },
    ],
    [
        "a",
        {
            name: "a",
            url: "/a",
            children: ["a1", "a2"],
        },
    ],
    [
        "a1",
        {
            name: "a1",
            url: "/a1",
        },
    ],
    [
        "a2",
        {
            name: "a2",
            url: "/a2",
        },
    ],
    [
        "b",
        {
            name: "b",
            url: "/b",
            children: ["b1", "b2"],
        },
    ],
    [
        "b1",
        {
            name: "b1",
            url: "/b1",
            children: ["b1.1", "b1.2"],
        },
    ],
    [
        "b1.1",
        {
            name: "b1.1",
            url: "/b1.1",
            children: ["b1.1.1", "b1.1.2"],
        },
    ],
    [
        "b1.1.1",
        {
            name: "b1.1.1",
            url: "/b1.1.1",
        },
    ],
    [
        "b1.1.2",
        {
            name: "b1.1.2",
            url: "/b1.1.2",
        },
    ],
    [
        "b1.2",
        {
            name: "b1.2",
            url: "/b1.2",
        },
    ],
    [
        "b2",
        {
            name: "b2",
            url: "/b2",
        },
    ],
    [
        "c",
        {
            name: "c",
            url: "/c",
        },
    ],
]);

describe("SortableNavigationList utils", () => {
    it("should get all ids from nested structure", () => {
        const result = getAllIds(mockItemTree, "root");

        expect(result).toEqual(["root", "a", "a1", "a2", "b", "b1", "b1.1", "b1.1.1", "b1.1.2", "b1.2", "b2", "c"]);
    });
});

describe("getParent", () => {
    it("should return the root section for top-level items", () => {
        const result = getParentId(mockItemTree, "a");
        expect(result).toEqual("root");
    });

    it("should return first level nested section", () => {
        const result = getParentId(mockItemTree, "b1.1");
        expect(result).toEqual("b1");
    });

    it("should return deeply nested section", () => {
        const result = getParentId(mockItemTree, "b1.1.1");
        expect(result).toEqual("b1.1");
    });

    it("should return undefined for non-existent item", () => {
        const result = getParentId(mockItemTree, "non-existent");
        expect(result).toBeUndefined();
    });
});

describe("moveToOtherParent", () => {
    it("should move a node from one parent to another", () => {
        const nodeTree = structuredClone(mockItemTree);
        const itemId = "b1.1.1";
        const destinationId = "a1";

        const { updatedOriginParent, updatedDestinationParent } = moveToOtherParentOrThrow({
            nodeTree: nodeTree,
            active: { id: itemId } as DragEndEvent["active"],
            over: { id: destinationId } as DragEndEvent["over"],
        });

        expect(updatedOriginParent).toEqual({
            name: "b1.1",
            url: "/b1.1",
            children: ["b1.1.2"],
        });

        expect(updatedDestinationParent).toEqual({
            name: "a",
            url: "/a",
            children: ["b1.1.1", "a1", "a2"],
        });
    });

    it("shouldn't swap if destination is a child of origin", () => {
        const nodeTree = structuredClone(mockItemTree);
        const originId = "b1.1";
        const destinationId = "b1.1.1";

        expect(() =>
            moveToOtherParentOrThrow({
                nodeTree: nodeTree,
                active: { id: originId } as DragEndEvent["active"],
                over: { id: destinationId } as DragEndEvent["over"],
            })
        ).toThrow();
    });
});

describe("destinationIsDecendantOfOrigin", () => {
    it("should return true if destination is a child of origin", () => {
        const result = destinationIsDecendantOfOrigin(mockItemTree, "b1.1.1", "b1.1");

        expect(result).toEqual(true);
    });
});

describe("swapChildren", () => {
    it("should swap two nodes with the same parent", () => {
        const originId = "b1.1";
        const destinationId = "b1.2";

        const parentNode = getParentId(mockItemTree, originId);
        if (!parentNode) {
            throw new Error("Parent node not found");
        }

        const result = swapChildren(
            { id: originId } as DragEndEvent["active"],
            { id: destinationId } as DragEndEvent["over"],
            mockItemTree.get(parentNode) as Node
        );

        expect(result).toEqual([destinationId, originId]);
    });

    it("should swap subtree with the same parent", () => {
        const nodeTree = structuredClone(mockItemTree);
        const originId = "b1";
        const destinationId = "a1";

        const { updatedOriginParent, updatedDestinationParent } = moveToOtherParentOrThrow({
            nodeTree: nodeTree,
            active: { id: originId } as DragEndEvent["active"],
            over: { id: destinationId } as DragEndEvent["over"],
        });

        expect(updatedOriginParent).toEqual({
            name: "b",
            url: "/b",
            children: ["b2"],
        });

        expect(updatedDestinationParent).toEqual({
            name: "a",
            url: "/a",
            children: ["b1", "a1", "a2"],
        });
    });
});

describe("getSubtree", () => {
    it("should return the subtree for a given node", () => {
        const fullTree = getSubtree(mockItemTree, "root");
        const partialTree = getSubtree(mockItemTree, "b1.1");

        expect(fullTree).toEqual(mockItemTree);
        expect(partialTree).toEqual(
            new Map([
                [
                    "b1.1",
                    {
                        name: "b1.1",
                        url: "/b1.1",
                        children: ["b1.1.1", "b1.1.2"],
                    },
                ],
                [
                    "b1.1.1",
                    {
                        name: "b1.1.1",
                        url: "/b1.1.1",
                    },
                ],
                [
                    "b1.1.2",
                    {
                        name: "b1.1.2",
                        url: "/b1.1.2",
                    },
                ],
            ])
        );
    });
});

describe("appendChildIdOrThrow", () => {
    it("should add a child to a parent", () => {
        const parentId = "c";
        const childId = "newChild";
        const children = appendChildIdOrThrow({ nodeTree: mockItemTree, parentId, childId });

        expect(children).toEqual([childId]);
    });
});
