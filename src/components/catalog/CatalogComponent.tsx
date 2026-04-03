import type { Category, Product } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import {
  productService,
  type GetProductsParams,
} from "@/lib/service/productService";
import { categoryService } from "@/lib/service/categoryService";
import SearchCatalog from "@/components/catalog/SearchCatalog";
import SelectCategories from "./SelectCategories";
import ProductsCatalogComponent from "./ProductsCatalogComponent";

export default function CatalogComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const fetchCategories = async () => {
    const data = await categoryService.getAll();
    setCategories(data);
  };

  const fetchAllProducts = async () => {
    const data = await productService.getAll();
    setProducts(data);
  };

  useEffect(() => {
    fetchCategories();
    fetchAllProducts();
  }, []);

  const handleSearchChange = async (params: GetProductsParams) => {
    const data = await productService.getAll(params);
    setProducts(data);
  };

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);

    if (categoryId === "all") {
      const data = await productService.getAll();
      setProducts(data);
      return;
    }

    const params: GetProductsParams = {
      filtredbyCategory: categoryId,
    };

    const data = await productService.getAll(params);
    setProducts(data);
  };

  return (
    <div className="w-full bg-[#F1F6F6]">
        <div className="mb-8">
          <SearchCatalog onChangeParams={handleSearchChange} />
        </div>
      <div className="px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mb-8">
          <SelectCategories
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            categories={categories}
            />
        </div>

        <ProductsCatalogComponent products={products} />
        </div>
      </div>
  );
}
