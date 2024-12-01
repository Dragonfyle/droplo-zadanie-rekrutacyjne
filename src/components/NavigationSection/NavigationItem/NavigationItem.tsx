import { Move as MoveIcon } from "lucide-react";

import { NavigationItemProps } from "./NavigationItem.types";
import NavigationItemButtons from "./NavigationItemButtons";
import NavigationItemContent from "./NavigationItemContent";

export default function NavigationItem({ name, url }: NavigationItemProps) {
    return (
        <li className="flex w-full flex-col justify-between gap-xl bg-bg-primary px-3xl py-xl first:rounded-t-md lg:flex-row lg:items-center">
            <div className="flex items-center gap-2xl">
                <MoveIcon className="h-5 w-5 text-tertiary" />
                <NavigationItemContent name={name} url={url} />
            </div>

            <NavigationItemButtons />
        </li>
    );
}
