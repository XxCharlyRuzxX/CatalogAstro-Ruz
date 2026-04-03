import type { GetProductsParams } from "@/lib/service/productService";
import { Search } from "lucide-react";

interface SearchCatalogProps {
  readonly onChangeParams: (params: GetProductsParams) => void;
}

export default function SearchCatalog({ onChangeParams }: SearchCatalogProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeParams({
      searchTerm: event.target.value,
    });
  };

  return (
    <div className="flex justify-center bg-[#2C3E3A] w-full pb-10 md:pb-15">
      <div className="relative w-4/5 max-w-2xl">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Buscar productos..."
          className="h-14 w-full rounded-full border border-[#E4E1DC] bg-white pl-14 pr-5 text-sm text-[#3E3A37] outline-none transition placeholder:text-[#B7B2AB] focus:border-[#BFCFC9] focus:ring-2 focus:ring-[#DCE7E2]"
        />
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A8883]" />
      </div>
    </div>
  );
}
