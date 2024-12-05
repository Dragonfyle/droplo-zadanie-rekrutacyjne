import { ClientRect } from "@dnd-kit/core";

import { Maybe } from "@/types/global.types";

function isPointerAboveVerticalThreshold(mouseY: Maybe<number>, rect: ClientRect | null) {
    if (!mouseY || !rect) return false;

    const centerY = rect.top + rect.height / 2.5;

    return mouseY < centerY;
}

export { isPointerAboveVerticalThreshold };
