"use client";

import { forwardRef, useState } from "react";
import { Move as MoveIcon } from "lucide-react";

import AddNavigationForm from "@/components/AddNavigation/AddNavigationForm";

import { SortableSectionItemProps } from "./SortableSectionItem.types";
import SortableSectionItemButtons from "./SortableSectionItemButtons";
import SortableSectionItemContent from "./SortableSectionItemContent";
import { getParentId } from "../../SortableNavigationList.utils";

export default forwardRef<HTMLLIElement, SortableSectionItemProps>(function SortableSectionItem(
    { name, url, isDragging, isFirstLevel, className, setNodeTree, id, ...restProps },
    dragHandleRef
) {
    const [isExpanded, setIsExpanded] = useState(false);

    const rounded = isFirstLevel ? "rounded-t-md" : "";
    const opacity = isDragging ? "opacity-30" : "";

    const handleRemove = () => {
        setNodeTree((prev) => {
            const nodeTreeCopy = structuredClone(prev);
            const parentId = getParentId(nodeTreeCopy, id);
            if (!parentId) return nodeTreeCopy;

            const parentNode = nodeTreeCopy.get(parentId);
            if (!parentNode) return nodeTreeCopy;

            if (parentNode.children) {
                parentNode.children = parentNode.children?.filter((childId) => childId !== id);
                if (parentNode.children.length === 0) {
                    delete parentNode.children;
                }
            }

            nodeTreeCopy.delete(id);

            return nodeTreeCopy;
        });
    };

    return (
        <li ref={dragHandleRef} className={`w-full ${opacity} ${className}`}>
            <div
                className={`${rounded} flex w-full flex-col justify-between border border-border-secondary bg-bg-primary px-3xl py-xl lg:flex-row`}>
                <div className="flex items-center gap-2xl">
                    <div {...restProps} className="cursor-grab">
                        <MoveIcon className="h-5 w-5 touch-none select-none text-tertiary" />
                    </div>

                    <SortableSectionItemContent name={name} url={url} />
                </div>

                <SortableSectionItemButtons
                    handleToggle={() => setIsExpanded((prev) => !prev)}
                    handleRemove={handleRemove}
                />
            </div>

            {isExpanded && (
                <div className="flex w-full items-center rounded-bl-md rounded-br-md bg-bg-secondary px-3xl py-xl">
                    <AddNavigationForm
                        parentId={id}
                        handleAdd={setNodeTree}
                        handleCancel={() => setIsExpanded(false)}
                    />
                </div>
            )}
        </li>
    );
});
