import Input from "@components/generics/Input";
import { Search } from "lucide-react";

export default function AddNewItemFormInputs() {
  return (
    <div className="flex flex-col gap-md">
      <Input label="Nazwa" placeholder="np. Promocje" />
      <Input
        label="Link"
        placeholder="Wklej lub wyszukaj"
        icon={<Search className="text-placeholder" />}
      />
    </div>
  );
}
