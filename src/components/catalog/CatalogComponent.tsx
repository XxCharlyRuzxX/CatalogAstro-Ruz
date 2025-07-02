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
    const categories = await categoryService.getAll();
    setCategories(categories);
  };
  const fetchAllProducts = async () => {
    const products = await productService.getAll();
    setProducts(products);
  }

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
    const params: GetProductsParams = {
      filtredbyCategory: categoryId,
    };
    const data = await productService.getAll(params);
    setProducts(data);
  };

  return (
    <div className="w-full">
      <div className="bg-(--primary-blush) md:px-6 py-6">
        <div className="flex w-full justify-center">
          <SearchCatalog onChangeParams={handleSearchChange} />
        </div>
      </div>
      <div className="bg-white px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SelectCategories
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            categories={categories}
          />
          <ProductsCatalogComponent
            products={products}
          />
        </div>
      </div>
    </div>
  );
}
