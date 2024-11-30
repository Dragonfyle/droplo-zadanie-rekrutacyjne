import AddNavigationFormButtons from "./AddNavigationFormButtons";
import AddNavigationFormInputs from "./AddNavigationFormInputs";

export default function AddNavigationForm() {
  return (
    <form className="w-full flex flex-col gap-2xl">
      <AddNavigationFormInputs />
      <AddNavigationFormButtons />
    </form>
  );
}
