import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import type {
  Category,
  ProductWithSelectionToCategory,
} from "@/lib/interfaces";
import { categoryService } from "@/lib/service/categoryService";
import { productService } from "@/lib/service/productService";
import { Search, Tags, X } from "lucide-react";

interface EditCategoryProductsModalProps {
  readonly categoryId: string;
  readonly isOpen: boolean;
  readonly CloseModal: () => void;
  readonly onSave: (productsSelected: ProductWithSelectionToCategory[]) => void;
}

export default function EditCategoryProductsModal({
  categoryId,
  isOpen,
  CloseModal,
  onSave,
}: EditCategoryProductsModalProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<ProductWithSelectionToCategory[]>(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const sortProductsChecked = (
    a: ProductWithSelectionToCategory,
    b: ProductWithSelectionToCategory,
  ) => {
    if (a.selected === b.selected) return 0;
    return a.selected ? -1 : 1;
  };

  const fetchData = async (id: string) => {
    try {
      const fetchedCategory = await categoryService.getById(id);
      setCategory(fetchedCategory);

      const allProducts = await productService.getAll();

      const selectedIds = new Set(
        fetchedCategory?.productsCategory?.map((p) => p.idProduct),
      );

      const withSelection: ProductWithSelectionToCategory[] = allProducts.map(
        (product) => ({
          product,
          selected: selectedIds.has(product.idProduct),
        }),
      );

      withSelection.sort(sortProductsChecked);
      setProducts(withSelection);
      setPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (isOpen && categoryId) {
      fetchData(categoryId);
    }
  }, [categoryId, isOpen]);

  const filteredProducts = products.filter(({ product }) => {
    const search = searchTerm.toLowerCase();
    return (
      product.nameProduct.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const toggleProductSelection = (idProduct: string) => {
    setProducts((prev) =>
      prev.map((entry) =>
        entry.product.idProduct === idProduct
          ? { ...entry, selected: !entry.selected }
          : entry,
      ),
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-white px-5 py-6 shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:px-6">
        <button
          onClick={CloseModal}
          className="sticky top-0 ml-auto flex rounded-full bg-white p-2 text-[#7E8C87] transition hover:bg-[#F1F3F2] hover:text-[#2F3433]"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F3EF]">
            <Tags className="h-6 w-6 text-[#0F6C74]" />
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#7E8C87]">
            Categoría
          </p>

          <h3 className="mt-2 text-xl font-medium text-[#2F3433] sm:text-2xl">
            {category?.name}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[#6B7773]">
            Selecciona los productos que pertenecerán a esta categoría.
          </p>
        </div>

        <div className="mb-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar por nombre o marca..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="h-12 w-full rounded-full border border-[#D9E1DE] bg-[#FAFBFA] pl-12 pr-4 text-sm text-[#2F3433] outline-none transition placeholder:text-[#A0AAA6] focus:border-[#AFC4BD] focus:ring-2 focus:ring-[#DCE7E2]"
            />
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A8883]" />
          </div>
        </div>

        <ul className="space-y-3">
          {paginatedProducts.length === 0 && (
            <li className="rounded-2xl bg-[#FAFBFA] px-4 py-6 text-center text-sm text-[#6B7773]">
              No se encontraron productos.
            </li>
          )}

          {paginatedProducts.map(({ product, selected }) => (
            <li
              key={product.idProduct}
              className="flex items-center justify-between rounded-2xl border border-[#EEF2F0] bg-[#FAFBFA] px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#2F3433]">
                  {product.nameProduct}
                </p>
                <p className="mt-1 text-sm text-[#7E8C87]">{product.brand}</p>
              </div>

              <Checkbox
                checked={selected}
                onChange={() => toggleProductSelection(product.idProduct)}
              />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {totalPages > 1 ? (
            <div className="flex items-center gap-3">
              <button
                className="rounded-full bg-[#F1F3F2] px-4 py-2 text-sm text-[#2F3433] transition hover:bg-[#E4E8E6] disabled:opacity-50"
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
              >
                Anterior
              </button>

              <span className="text-sm text-[#6B7773]">
                Página {page} de {totalPages}
              </span>

              <button
                className="rounded-full bg-[#F1F3F2] px-4 py-2 text-sm text-[#2F3433] transition hover:bg-[#E4E8E6] disabled:opacity-50"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === totalPages}
              >
                Siguiente
              </button>
            </div>
          ) : (
            <div />
          )}

          <button
            className="rounded-2xl bg-[#2C3E3A] px-5 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#243531]"
            onClick={() => {
              onSave(products);
              CloseModal();
            }}
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
