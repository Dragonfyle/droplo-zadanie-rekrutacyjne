import Link from "next/link";

import { NavigationItemContentProps } from "./NavigationItemContent.types";

export default function NavigationItemContent({ name, url }: NavigationItemContentProps) {
    return (
        <div className="flex flex-col gap-sm">
            <p className="text-sm/semibold text-primary">{name}</p>

            <Link href={url} className="w-full text-left text-sm/regular text-tertiary">
                {url}
            </Link>
        </div>
    );
}
