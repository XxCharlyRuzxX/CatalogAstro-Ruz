import { useState } from "react";
import ProductsAdminTable from "./products/ProductsAdminTable";
import CategoriesSection from "./categories/CategoriesSection";
import { Package, Tags } from "lucide-react";

type TabKey = "products" | "categories";

export default function AdminTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("products");

  return (
    <div className="w-full">
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] transition sm:text-sm ${
            activeTab === "products"
              ? "bg-[#2C3E3A] text-white shadow-[0_8px_20px_rgba(44,62,58,0.18)]"
              : "bg-white text-[#2F3433] hover:bg-[#EAEFED]"
          }`}
        >
          <Package className="h-4 w-4" />
          Productos
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("categories")}
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] transition sm:text-sm ${
            activeTab === "categories"
              ? "bg-[#2C3E3A] text-white shadow-[0_8px_20px_rgba(44,62,58,0.18)]"
              : "bg-white text-[#2F3433] hover:bg-[#EAEFED]"
          }`}
        >
          <Tags className="h-4 w-4" />
          Categorías
        </button>
      </div>
      <div className="rounded-[28px] bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] p-6 lg:p-8">
        {activeTab === "products" ? (
          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7E8C87]">
                Gestión
              </p>
              <h2 className="mt-2 text-2xl font-medium text-[#2F3433] sm:text-3xl">
                Administrar Productos
              </h2>
            </div>

            <ProductsAdminTable />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7E8C87]">
                Gestión
              </p>
              <h2 className="mt-2 text-2xl font-medium text-[#2F3433] sm:text-3xl">
                Administrar Categorías
              </h2>
            </div>

            <CategoriesSection />
          </div>
        )}
      </div>
    </div>
  );
}
