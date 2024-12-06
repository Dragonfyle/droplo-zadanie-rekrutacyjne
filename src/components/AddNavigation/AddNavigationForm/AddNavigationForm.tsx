import { SubmitHandler, useForm } from "react-hook-form";

import AddNavigationFormActions from "./AddNavigationFormActions";
import AddNavigationFormBody from "./AddNavigationFormBody";
import { AddNavigationFormProps, Inputs } from "./AddNavigationForm.types";

export default function AddNavigationForm({
    onAdd,
    onCancel,
    parentId,
    defaultValues,
    confirmButtonLabel,
}: AddNavigationFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            name: defaultValues?.name ?? "",
            url: defaultValues?.url ?? "",
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        onAdd((prev) => {
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

        onCancel();
    };

    return (
        <form
            className="flex w-full flex-col gap-2xl rounded-md border border-border-primary bg-bg-primary px-3xl py-xl"
            onSubmit={handleSubmit(onSubmit)}>
            <AddNavigationFormBody register={register} errors={errors} />
            <AddNavigationFormActions label={confirmButtonLabel} onCancel={onCancel} />
        </form>
    );
}
