"use client";

type SearchProps = {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Search({ search, handleSearch }: SearchProps) {

  return (
    <div className="flex w-full justify-center m-4">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Naudotojų paieška"
        className="w-5/6 max-w-2xl h-10 bg-zinc-900 px-4 border border-none rounded-full outline-none shadow-zinc-700/50 shadow-md focus:outline-white/30"
      />
    </div>
  );
}
