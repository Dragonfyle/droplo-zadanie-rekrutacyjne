import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UniqueIdentifier } from "@dnd-kit/core";

import { NodeTree } from "@/components/SortableNavigationList/SortableNavigationList.types";

import AddNavigationFormButtons from "./AddNavigationFormButtons";
import AddNavigationFormInputs from "./AddNavigationFormInputs";
import { Inputs } from "./AddNavigationForm.types";

export default function AddNavigationForm({
    setNodeTree,
    parentId,
}: {
    setNodeTree: Dispatch<SetStateAction<NodeTree>>;
    parentId: UniqueIdentifier;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        setNodeTree((prev) => {
            const nodeTreeCopy = structuredClone(prev);
            const newId = Math.random().toString();

            const parentNode = nodeTreeCopy.get(parentId);
            if (!parentNode) return nodeTreeCopy;

            nodeTreeCopy.set(newId, { name: data.name, url: data.url });
            nodeTreeCopy.set(parentId, {
                ...parentNode,
                children: [...(nodeTreeCopy.get(parentId)?.children ?? []), newId],
            });

            return nodeTreeCopy;
        });
    };

    return (
        <form
            className="flex w-full flex-col gap-2xl rounded-md border border-border-primary bg-bg-primary px-3xl py-xl"
            onSubmit={handleSubmit(onSubmit)}>
            <AddNavigationFormInputs register={register} errors={errors} />
            <AddNavigationFormButtons />
        </form>
    );
}
