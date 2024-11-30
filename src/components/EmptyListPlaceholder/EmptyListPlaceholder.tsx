import { CirclePlus } from "lucide-react";

import Button from "@generics/Button";

import EmptyListPlaceholderText from "./EmptyListPlaceholderText";

export default function EmptyListPlaceholder() {
  return (
    <section className="flex justify-center w-full bg-bg-secondary border border-border-secondary rounded-md px-xl py-3xl">
      <div className="flex flex-col gap-xl items-center">
        <EmptyListPlaceholderText />
        <Button label="Dodaj pozycję menu" icon={<CirclePlus size={18} />} />
      </div>
    </section>
  );
}
