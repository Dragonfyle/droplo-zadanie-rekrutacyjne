"use client";

import { forwardRef, useState } from "react";
import { Move as MoveIcon } from "lucide-react";

import AddNavigationForm from "@/components/AddNavigation/AddNavigationForm";

import { SortableSectionItemProps } from "./SortableSectionItem.types";
import SortableSectionItemActions from "./SortableSectionItemActions";
import SortableSectionItemContent from "./SortableSectionItemContent";
import { getParentId } from "../../SortableNavigationList.utils";

export default forwardRef<HTMLLIElement, SortableSectionItemProps>(function SortableSectionItem(
    { name, url, isDragging, isFirstLevel, className, setNodeTree, id, ...restProps },
    dragHandleRef
) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleEdit = () => {
        setIsExpanded(true);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsExpanded(false);
        setIsEditing(false);
    };

    return (
        <li ref={dragHandleRef} className={`w-full ${opacity} ${className}`}>
            <div
                className={`${rounded} flex w-full flex-col justify-between gap-lg border border-border-secondary bg-bg-primary px-3xl py-xl lg:flex-row`}>
                <div className="flex items-center gap-2xl">
                    <div {...restProps} className="cursor-grab">
                        <MoveIcon className="h-5 w-5 touch-none select-none text-tertiary" />
                    </div>

                    <SortableSectionItemContent name={name} url={url} />
                </div>

                <SortableSectionItemActions
                    onExpand={() => setIsExpanded(true)}
                    onRemove={handleRemove}
                    onEdit={handleEdit}
                />
            </div>

            {isExpanded && (
                <div className="flex w-full items-center rounded-bl-md rounded-br-md bg-bg-secondary px-3xl py-xl">
                    <AddNavigationForm
                        parentId={id}
                        onAdd={setNodeTree}
                        onCancel={handleCancel}
                        defaultValues={isEditing ? { name, url } : undefined}
                        confirmButtonLabel={isEditing ? "Zapisz" : "Dodaj"}
                    />
                </div>
            )}
        </li>
    );
});
