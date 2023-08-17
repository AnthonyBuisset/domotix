export function Slider() {
  return (
    <>
      <label htmlFor="default-range" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Default range
      </label>
      <input
        id="default-range"
        type="range"
        value="50"
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      />
    </>
  );
}
