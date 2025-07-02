import type { GetProductsParams } from "@/lib/service/productService";

interface SearchCatalogProps{
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
      <input
        type="text"
        onChange={handleChange}
        placeholder="Buscar productos..."
        className="p-4 mb-4 w-full max-w-7xl bg-white h-12 rounded-3xl"
      />
    </div>
  )
}
