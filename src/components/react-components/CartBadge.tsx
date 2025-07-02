import { useEffect, useState } from "react";

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("productsSelected");
    const products = stored ? JSON.parse(stored) : [];
    setCount(products.length);

    const handleStorageChange = () => {
      const updated = localStorage.getItem("productsSelected");
      const parsed = updated ? JSON.parse(updated) : [];
      setCount(parsed.length);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (count === 0) return null;

  return (
    <span style={{backgroundColor: "rgba(220,38,38,0.9)"}} className="absolute -top-[0.1rem] -right-[.6rem] text-white text-xs w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-md">
      {count}
    </span>
  );
}
