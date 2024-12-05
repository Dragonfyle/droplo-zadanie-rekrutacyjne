"use client";

import Link from "next/link";

import { SortableSectionItemContentProps } from "./SortableSectionItemContent.types";

export default function SortableSectionItemContent({ name, url }: SortableSectionItemContentProps) {
    return (
        <div className="flex flex-col gap-sm">
            <p className="text-sm/semibold text-primary">{name}</p>

            <Link href={url} className="w-full text-left text-sm/regular text-tertiary">
                {url}
            </Link>
        </div>
    );
}
