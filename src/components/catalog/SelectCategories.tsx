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
    <div className="w-full">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        <button
          type="button"
          onClick={() => handleCategoryChange("all")}
          className={`rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition sm:px-5 sm:py-2.5 sm:text-xs ${
            selectedCategory === "all"
              ? "bg-[#0F6C74] text-white shadow-[0_6px_16px_rgba(79,195,123,0.22)]"
              : "bg-white text-[#2F3433] hover:bg-[#ECE8E2]"
          }`}
        >
          Todas
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategoryChange(category.id)}
            className={`rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] transition sm:px-5 sm:py-2.5 sm:text-xs ${
              selectedCategory === category.id
                ? "bg-[#0F6C74] text-white shadow-[0_6px_16px_rgba(79,195,123,0.22)]"
                : "bg-white text-[#2F3433] hover:bg-[#ECE8E2]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
