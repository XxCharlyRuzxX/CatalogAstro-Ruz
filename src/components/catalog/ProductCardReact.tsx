import type { Product } from "@/lib/interfaces/product";
import { Colors } from "@/utils/colors";

type Props = {
  readonly product: Product;
};

export default function ProductCard({ product }: Props) {
  const [whole, decimal] = product.priceProduct.toFixed(2).split(".");

  return (
    <div
      style={{ backgroundColor: Colors.secondaryBlush }}
      className="w-[250px] hover:scale-105 transition-transform duration-300"
    >
      <a href={`/product/${product.idProduct}`}>
        <img
          src={product.imgProduct}
          alt={product.nameProduct}
          className="w-full h-[250px] object-cover"
        />
        <div className="p-4">
          <p className="my-2 text-[16px]">{product.nameProduct}</p>
          <p className="text-gray-900 text-[25px] font-semibold">
            ${whole}
            <span className="text-[14px] ml-[1px]">.{decimal}</span>
          </p>
        </div>
      </a>
    </div>
  );
}

