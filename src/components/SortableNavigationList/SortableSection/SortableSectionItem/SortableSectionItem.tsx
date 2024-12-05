"use client";

import { forwardRef } from "react";
import { Move as MoveIcon } from "lucide-react";

import { SortableSectionItemProps } from "./SortableSectionItem.types";
import SortableSectionItemButtons from "./SortableSectionItemButtons";
import SortableSectionItemContent from "./SortableSectionItemContent";

export default forwardRef<HTMLLIElement, SortableSectionItemProps>(function SortableSectionItem(
    { name, url, isDragging, className, ...restProps },
    dragHandleRef
) {
    const opacity = isDragging ? "opacity-30" : "";
    const classes = `flex w-full flex-col justify-between gap-xl bg-bg-primary px-3xl py-xl first:rounded-t-md lg:flex-row lg:items-center ${opacity} ${className}`;

    return (
        <li ref={dragHandleRef} className={classes}>
            <div className="flex items-center gap-2xl">
                <div {...restProps} className="cursor-grab">
                    <MoveIcon className="h-5 w-5 touch-none select-none text-tertiary" />
                </div>
                <SortableSectionItemContent name={name} url={url} />
            </div>

            <SortableSectionItemButtons />
        </li>
    );
});
