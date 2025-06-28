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
  return (
    <div className="p-4">
      <ul className="bg-(--primary-blush) rounded ">
        <li>
          <button
            type="button"
            onClick={() => handleCategoryChange("all")}
            className={`w-full text-left py-3 px-3 ${
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
    </div>
  );
}
