import { useState } from "react";
import type { Category } from "@/lib/interfaces";

interface SelectCategoriesProps {
  handleCategoryChange: (filterCategory: string) => void;
  selectedCategory: string;
  categories: Category[];
}

export default function SelectCategories({
  handleCategoryChange,
  selectedCategory,
  categories,
}: Readonly<SelectCategoriesProps>) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="p-4">
      <div className="bg-(--primary-blush) rounded">
      <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left py-3 px-3 text-black flex justify-between items-center bg-(--primary-blush) ${
            isOpen ? "bg-(--secondary-blush)" : "bg-(--primary-blush)"
          }`}
        >
          <p>Seleccionar por Categoría</p>
          <span className="text-xl">
          <img
          src={"/icons/expand.svg"}
          alt={"expand-icon"}
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
          </span>
        </button>

        {isOpen && (
          <ul className="transition-all duration-300 ease-in-out">
            <li>
              <button
                type="button"
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left py-3 px-3  ${
                  selectedCategory === "all"
                    ? "bg-(--secondary-blush)"
                    : "hover:bg-gray-300 cursor-pointer"
                }`}
              >
                Todas las Categorías
              </button>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={`w-full text-left py-3 px-3 ${
                    selectedCategory === category.id
                      ? "bg-(--secondary-blush)"
                      : "hover:bg-gray-300 cursor-pointer"
                  }`}
                >
                  {`${category.name} (${category.productsCategory?.length ?? 0})`}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
