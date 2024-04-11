"use client";
export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div className="text-center">
      <h2>Something went wrong!</h2>
      <button
        className="text-blue-700 border rounded-xl border-black p-2 mt-3"
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
