import type { GetProductsParams } from "@/lib/service/productService";

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
    <div className="flex justify-center w-full px-4">
      <div className="relative w-full max-w-7xl">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Buscar productos..."
          className="w-full h-12 pl-4 pr-12 rounded-3xl bg-white text-[0.75rem] md:text-[0.875rem] lg:text-[1rem] mb-4"
        />
        <img
          src="/icons/search.svg"
          alt="Buscar"
          className="absolute right-4 top-6 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-amber-100"
        />
      </div>
    </div>
  );
}

