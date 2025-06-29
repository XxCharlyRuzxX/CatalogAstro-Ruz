import {orderViaWhatsApp} from "@/utils/selectedProducts";
import MyProductsList from "./MyProductsList";

export default function MyProductsComponent() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
      <div className="md:col-span-3">
        <MyProductsList/>
      </div>

      <div className="flex flex-col items-center justify-start gap-6 md:col-span-2">
        <button
          onClick={() => {orderViaWhatsApp()}}
          className="text-white bg-(--primary-green) px-6 py-3 rounded hover:bg-lime-800 transition-colors duration-300 min-w-2xs flex gap-2 justify-center cursor-pointer"
        >
          <p>Pedir en Tienda</p>
          <img
            src="/icons/whatsapp-logo.svg"
            alt="Carrito"
            className="w-5 h-5"
          />
        </button>
        <img
          src="/icons/supermarket.svg"
          alt="Catálogo"
          width={350}
          height={350}
          className="object-contain"
        />
      </div>
    </div>
  );
}
