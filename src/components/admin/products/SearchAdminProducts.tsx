import { Search } from "lucide-react";

interface SearchAdminProductsProps {
  readonly onSearch: (searchTerm: string) => void;
}

export default function SearchAdminProducts({
  onSearch,
}: SearchAdminProductsProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Buscar productos..."
          className="h-14 w-full rounded-full border border-[#D9E1DE] bg-white pl-14 pr-5 text-sm text-[#3E3A37] outline-none transition placeholder:text-[#B7B2AB] focus:border-[#BFCFC9] focus:ring-2 focus:ring-[#DCE7E2]"
        />
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A8883]" />
      </div>
    </div>
  );
}