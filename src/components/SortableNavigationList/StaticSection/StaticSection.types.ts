import { UniqueIdentifier } from "@dnd-kit/core";

interface StaticSectionProps {
    children: React.ReactNode;
    Element?: React.ElementType;
    id: UniqueIdentifier;
}

export type { StaticSectionProps };
