"use client";

type SearchProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Component for searching users.
 * @param search - The search query string.
 * @param handleSearch - The function to handle search input changes.
 * @returns A React component for searching users.
 */
export default function Search({ search, handleSearch }: SearchProps) {
  return (
    <div className="flex w-full justify-center m-4">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Dėstytojų paieška"
        className="w-5/6 max-w-2xl h-10 bg-zinc-900 px-4 border border-none rounded-full shadow-zinc-600 shadow-[inset_0px_5px_4px_-5px] outline-none focus:outline-white/30"
      />
    </div>
  );
}
