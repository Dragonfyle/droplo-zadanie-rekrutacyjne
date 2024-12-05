import { DragEndEvent } from "@dnd-kit/core";

import { NodeTree } from "../SortableNavigationList.types";

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

const mockDragEventActive = (id: string) => ({ id }) as DragEndEvent["active"];
const mockDragEventOver = (id: string) => ({ id, disabled: false }) as DragEndEvent["over"];

export { mockItemTree, mockDragEventActive, mockDragEventOver };
