import { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import type { Category, ProductWithSelectionToCategory } from "@/lib/interfaces";
import { categoryService } from "@/lib/service/categoryService";
import { productService } from "@/lib/service/productService";


interface CategoriesAdminEditProps {
  readonly categoryId: string;
  readonly onSave: (productsSelected: ProductWithSelectionToCategory[]) => void;
}

export default function CategoriesAdminEdit({
  categoryId,
  onSave,
}: CategoriesAdminEditProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<ProductWithSelectionToCategory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  const fetchData = async (id: string) => {
    try {
      const fetchedCategory = await categoryService.getById(id);
      setCategory(fetchedCategory);

      const allProducts = await productService.getAll();

      const selectedIds = new Set(
        fetchedCategory?.productsCategory?.map((p) => p.idProduct)
      );

      const withSelection: ProductWithSelectionToCategory[] = allProducts.map((product) => ({
        product,
        selected: selectedIds.has(product.idProduct),
      }));

      withSelection.sort(sortProductsChecked);
      setProducts(withSelection);
      setPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sortProductsChecked = (
    a: ProductWithSelectionToCategory,
    b: ProductWithSelectionToCategory
  ) => {
    if (a.selected === b.selected) return 0;
    return a.selected ? -1 : 1;
  };

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
    page * ITEMS_PER_PAGE
  );

  const toggleProductSelection = (idProduct: string) => {
    setProducts((prev) =>
      prev.map((entry) =>
        entry.product.idProduct === idProduct
          ? { ...entry, selected: !entry.selected }
          : entry
      )
    );
  };

  useEffect(() => {
    fetchData(categoryId);
  }, [categoryId]);

  return (
    <div className="shadow-md rounded-lg p-4 bg-white text-[.75rem] md:text-[.95rem]">
      <div className="flex justify-between items-center mb-4 bg-[#333333]">
        <h1 className="font-bold text-white p-2 rounded">
          Categoría: {category?.name}
        </h1>
        <input
          type="text"
          placeholder="Buscar por nombre o marca ..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="border  border-gray-300 bg-white rounded-2xl px-2 py-1 text-sm w-48 md:w-64 mx-2 text-[.70rem] md:text-[.90rem]"
        >
        </input>
      </div>
      <ul className="space-y-3">
        { paginatedProducts.length === 0 && (
          <li className="text-center text-gray-500 py-4 border-b pb-2">
            No se encontraron productos.
          </li>
        )}
        {paginatedProducts.map(({ product, selected }) => (
          <li
            key={product.idProduct}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex-1">
              <p className="font-semibold">{product.nameProduct}</p>
              <p className="text-sm text-gray-500">{product.brand}</p>
            </div>
            <Checkbox
              checked={selected}
              onChange={() => toggleProductSelection(product.idProduct)}
            />
          </li>
        ))}
      </ul>
      <div className="flex justify-between my-4 items-center">
        {totalPages > 1 && (
          <div className="flex justify-center gap-4">
            <button
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 text-[.6rem] md:text-[.95rem]"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span className="text-gray-600 self-center text-[.6rem] md:text-[.95rem]">
              Página {page} de {totalPages}
            </span>
            <button
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50 text-[.6rem] md:text-[.95rem]"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        )}
        <button
          className="px-3 py-1 text-white bg-(--primary-green) hover:bg-lime-800 rounded disabled:opacity-50 text-[.6rem] md:text-[.95rem]"
          onClick={() => onSave(products)}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
