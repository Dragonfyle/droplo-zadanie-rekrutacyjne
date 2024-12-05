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
import { Node } from "../SortableNavigationList.types";
import { mockItemTree, mockDragEventActive, mockDragEventOver } from "./SortableNavitaionList.test.utils";

describe("Tree Navigation Utils", () => {
    describe("getAllIds", () => {
        it("returns all ids in depth-first order", () => {
            expect(getAllIds(mockItemTree, "root")).toEqual([
                "root",
                "a",
                "a1",
                "a2",
                "b",
                "b1",
                "b1.1",
                "b1.1.1",
                "b1.1.2",
                "b1.2",
                "b2",
                "c",
            ]);
        });
    });

    describe("getParentId", () => {
        type TestCase = [string, string, string | undefined];

        const cases: TestCase[] = [
            ["root level item", "a", "root"],
            ["first level nested", "b1.1", "b1"],
            ["deeply nested item", "b1.1.1", "b1.1"],
            ["non-existent item", "non-existent", undefined],
        ];

        it.each(cases)("returns correct parent for %s", (_, input, expected) => {
            expect(getParentId(mockItemTree, input)).toEqual(expected);
        });
    });

    describe("moveToOtherParent", () => {
        it("moves node between parents", () => {
            const nodeTree = structuredClone(mockItemTree);
            const { updatedOriginParent, updatedDestinationParent } = moveToOtherParentOrThrow({
                nodeTree,
                active: mockDragEventActive("b1.1.1"),
                over: mockDragEventOver("a1"),
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

        it("prevents moving parent into its child", () => {
            const nodeTree = structuredClone(mockItemTree);

            expect(() =>
                moveToOtherParentOrThrow({
                    nodeTree,
                    active: mockDragEventActive("b1.1"),
                    over: mockDragEventOver("b1.1.1"),
                })
            ).toThrow();
        });
    });

    describe("swapChildren", () => {
        it("swaps siblings", () => {
            const parentNode = mockItemTree.get(getParentId(mockItemTree, "b1.1")!);

            expect(swapChildren(mockDragEventActive("b1.1"), mockDragEventOver("b1.2"), parentNode as Node)).toEqual([
                "b1.2",
                "b1.1",
            ]);
        });

        it("swaps subtrees", () => {
            const nodeTree = structuredClone(mockItemTree);
            const { updatedOriginParent, updatedDestinationParent } = moveToOtherParentOrThrow({
                nodeTree,
                active: mockDragEventActive("b1"),
                over: mockDragEventOver("a1"),
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
});

describe("destinationIsDecendantOfOrigin", () => {
    it("should return true if destination is a child of origin", () => {
        const result = destinationIsDecendantOfOrigin(mockItemTree, "b1.1.1", "b1.1");

        expect(result).toEqual(true);
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
