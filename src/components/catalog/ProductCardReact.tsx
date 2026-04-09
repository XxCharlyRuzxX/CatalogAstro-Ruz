import type { Product } from "@/lib/interfaces/product";
import AddToCartButton from "../react-components/AddToCardButton";

type Props = {
  readonly product: Product;
};

export default function ProductCard({ product }: Props) {
  const [whole, decimal] = product.priceProduct.toFixed(2).split(".");

  return (
    <div className="w-full">
        <div className="relative overflow-hidden rounded-3xl bg-[#646464]">
          <picture>
            <img
              src={product.imgProduct}
              alt={product.nameProduct}
              className="w-full aspect-4/5 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </picture>
          <AddToCartButton product={product} />
        </div>
        <div className="mt-4 ml-3">
          <h3 className="text-base font-medium text-[#1E1E1C] leading-snug">
            {product.nameProduct}
          </h3>

          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#8A8883]">
            {product.brand}
          </p>

          <p className="mt-2 text-[#0F6C74] text-sm font-medium">
            ${whole}
            <span className="text-xs">.{decimal}</span>
          </p>
        </div>
    </div>
  );
}
