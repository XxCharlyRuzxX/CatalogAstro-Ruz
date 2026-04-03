import { useEffect, useState } from "react";
import {
  categoryService,
  type GetCategoriesParams,
} from "@/lib/service/categoryService";
import { toast } from "react-toastify";
import {
  type Category,
  type CategoryDTO,
  type ProductWithSelectionToCategory,
} from "@/lib/interfaces/category";
import AddCategoriesButton from "./AddCategoriesButton";
import CategoriesAdminList from "./CategoriesAdminList";
import EditCategoryProductsModal from "./EditCategoryProductModal";


export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryEdit, setCategoryEdit] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const params: GetCategoriesParams = {
        orderBy: "name",
        orderType: "asc",
      };
      const data = await categoryService.getAll(params);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error al obtener las categorías");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOnDelete = async (categoryId: string) => {
    try {
      await categoryService.deleteCategory(categoryId);
      await fetchCategories();
      setCategoryEdit(null);
      toast.success("Categoría eliminada correctamente");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error al eliminar la categoría");
    }
  };

  const handleOnEdit = (categoryId: string) => {
    setCategoryEdit(categoryId);
  };

  const handleOnSave = async (products: ProductWithSelectionToCategory[]) => {
    if (!categoryEdit) return;

    try {
      const productIds = products
        .filter(({ selected }) => selected)
        .map(({ product }) => product.idProduct);

      await categoryService.assignProductsToCategory(categoryEdit, productIds);
      await fetchCategories();

      toast.success("Categoría actualizada correctamente");
      setCategoryEdit(null);
    } catch (error) {
      console.error("Error actualizando productos:", error);
      toast.error("Error al actualizar los productos");
    }
  };

  const handleOnSubmit = async (category: CategoryDTO) => {
    try {
      await categoryService.postCategory(category);
      await fetchCategories();
      toast.success("Categoría creada correctamente");
    } catch (error) {
      console.error("Error creando categoría:", error);
      toast.error("Error al crear la categoría");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <AddCategoriesButton onSubmit={handleOnSubmit} />
      </div>

      <CategoriesAdminList
        categories={categories}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />

      {categoryEdit && (
        <EditCategoryProductsModal
          categoryId={categoryEdit}
          isOpen={!!categoryEdit}
          onSave={handleOnSave}
          CloseModal={() => setCategoryEdit(null)}
        />
      )}
    </div>
  );
}
