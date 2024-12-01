import { Move as MoveIcon } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { NavigationItemProps } from "./NavigationItem.types";
import NavigationItemButtons from "./NavigationItemButtons";
import NavigationItemContent from "./NavigationItemContent";

export default function NavigationItem({ name, url, id }: NavigationItemProps) {
    const { attributes, listeners, setNodeRef, transition, transform } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li
            className="flex w-full flex-col justify-between gap-xl bg-bg-primary px-3xl py-xl first:rounded-t-md lg:flex-row lg:items-center"
            style={style}
            ref={setNodeRef}>
            <div className="flex items-center gap-2xl">
                <MoveIcon className="h-5 w-5 touch-none select-none text-tertiary" {...listeners} {...attributes} />
                <NavigationItemContent name={name} url={url} />
            </div>

            <NavigationItemButtons />
        </li>
    );
}
