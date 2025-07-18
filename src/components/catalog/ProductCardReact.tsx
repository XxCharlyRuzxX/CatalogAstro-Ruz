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
      className=" w-full h-full hover:scale-105 transition-transform duration-300"
    >
      <a
        href={`/product/${product.idProduct}`}
        className="flex flex-col h-full"
      >
        <img
          src={product.imgProduct}
          alt={product.nameProduct}
          className="aspect-square object-cover"
        />
        <div className="p-2 md:p-4 flex flex-col flex-1">
          <div className="flex-grow">
            <p className="p-base my-2 overflow-hidden line-clamp-2">
              {product.nameProduct}
            </p>
          </div>
          <h2 className="text-gray-900  overflow-hidden">
            ${whole}
            <span className="text-[10px] md:text-[14px] ml-[1px]">
              .{decimal}
            </span>
          </h2>
        </div>
      </a>
    </div>
  );
}
