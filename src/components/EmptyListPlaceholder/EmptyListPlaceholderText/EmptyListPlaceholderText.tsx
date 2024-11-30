export default function EmptyListPlaceholderText() {
  return (
    <div className="flex flex-col gap-xs">
      <h1 className="text-md/semibold text-center">Menu jest puste</h1>
      <p className="text-sm/regular text-tertiary">
        W tym menu nie ma jeszcze żadnych linków
      </p>
    </div>
  );
}
