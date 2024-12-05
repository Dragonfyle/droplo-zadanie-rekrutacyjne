import { SubmitHandler, useForm } from "react-hook-form";

import AddNavigationFormButtons from "./AddNavigationFormButtons";
import AddNavigationFormInputs from "./AddNavigationFormInputs";
import { AddNavigationFormProps, Inputs } from "./AddNavigationForm.types";

export default function AddNavigationForm({ handleAdd, handleCancel, parentId }: AddNavigationFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        handleAdd((prev) => {
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

        handleCancel();
    };

    return (
        <form
            className="flex w-full flex-col gap-2xl rounded-md border border-border-primary bg-bg-primary px-3xl py-xl"
            onSubmit={handleSubmit(onSubmit)}>
            <AddNavigationFormInputs register={register} errors={errors} />
            <AddNavigationFormButtons handleCancel={handleCancel} />
        </form>
    );
}
