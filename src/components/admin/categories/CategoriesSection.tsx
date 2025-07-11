import { useEffect, useState } from "react";
import CategoriesAdminEdit from "./CategoriesAdminEdit";
import CategoriesAdminTable from "./CategoriesAdminTable";
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

export default function CategoriesSection() {
  const [categoryEdit, setCategoryEdit] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleOnDelete = async (categoryId: string) => {
    try {
      await categoryService.deleteCategory(categoryId);
      fetchCategories();
      setCategoryEdit(null);
      toast.success("Categoria eliminada correctamente");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleOnEdit = (categoryId: string) => {
    setCategoryEdit(categoryId);
  };

  const fetchCategories = async () => {
    try {
      const params: GetCategoriesParams = {
        orderBy: "name",
        orderType: "asc",
      };
      const categoriesData = await categoryService.getAll(params);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleOnSumit = async (category: CategoryDTO) => {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-4 p-4 w-full">
      <div>
        <CategoriesAdminTable
          onDelete={handleOnDelete}
          onEdit={handleOnEdit}
          categories={categories}
        />
      </div>
      {categoryEdit && (
        <div>
          <CategoriesAdminEdit
            categoryId={categoryEdit}
            onSave={handleOnSave}
          />
        </div>
      )}
      <AddCategoriesButton onSubmit={handleOnSumit}/>
    </div>
  );
}
