import { type Category , type Product } from  "../interfaces"

export const placeholderCategories: Category[] = [
  { id: "cat-01", name: "Ropa" },
  { id: "cat-02", name: "Deporte" },
  { id: "cat-03", name: "Tecnología" },
  { id: "cat-04", name: "Accesorios" },
];

export const placeholderProducts: Product[] = [
  {
    idProduct: "prod-001",
    nameProduct: "Campera de Cuero",
    imgProduct: "/productos-img.png",
    priceProduct: 159.99,
    description: "Campera resistente al frío con forro térmico.",
    brand: "UrbanStyle",
    categoriesProduct: placeholderCategories,
  },
  {
    idProduct: "prod-002",
    nameProduct: "Zapatillas Running",
    imgProduct: "/productos-img.png",
    priceProduct: 89.5,
    description: "Zapatillas ligeras para running profesional.",
    brand: "SpeedRun",
    categoriesProduct: [placeholderCategories[0], placeholderCategories[1]],
  },
  {
    idProduct: "prod-003",
    nameProduct: "Smartwatch",
    imgProduct: "/productos-img.png",
    priceProduct: 199.0,
    description: "Reloj inteligente con monitor de ritmo cardíaco.",
    brand: "TechWear",
    categoriesProduct: [placeholderCategories[2], placeholderCategories[1]],
  },
  {
    idProduct: "prod-004",
    nameProduct: "Auriculares Bluetooth",
    imgProduct: "/productos-img.png",
    priceProduct: 49.99,
    description: "Auriculares inalámbricos con cancelación de ruido.",
    brand: "SoundPro",
    categoriesProduct: [placeholderCategories[2]],
  },
  {
    idProduct: "prod-005",
    nameProduct: "Gorra Bordada",
    imgProduct: "/productos-img.png",
    priceProduct: 25.0,
    description: "Gorra ajustable con diseño bordado exclusivo.",
    brand: "CapStyle",
    categoriesProduct: [placeholderCategories[3]],
  },
  {
    idProduct: "prod-006",
    nameProduct: "Mochila Deportiva",
    imgProduct: "/productos-img.png",
    priceProduct: 39.0,
    description: "Mochila amplia para actividades deportivas o viajes.",
    brand: "ActiveGear",
    categoriesProduct: [placeholderCategories[1], placeholderCategories[3]],
  },
  {
    idProduct: "prod-007",
    nameProduct: "Remera Básica",
    imgProduct: "/productos-img.png",
    priceProduct: 19.99,
    description: "Remera de algodón 100% cómoda para uso diario.",
    brand: "BasicLine",
    categoriesProduct: [placeholderCategories[0]],
  },
  {
    idProduct: "prod-008",
    nameProduct: "Lentes de Sol Polarizados",
    imgProduct: "/productos-img.png",
    priceProduct: 59.0,
    description: "Lentes de sol con protección UV400.",
    brand: "ShadePro",
    categoriesProduct: [placeholderCategories[3]],
  },
  {
    idProduct: "prod-009",
    nameProduct: "Pantalón Jogger",
    imgProduct: "/productos-img.png",
    priceProduct: 45.5,
    description: "Jogger casual ideal para actividades urbanas.",
    brand: "UrbanStyle",
    categoriesProduct: [placeholderCategories[0], placeholderCategories[1]],
  },
  {
    idProduct: "prod-010",
    nameProduct: "Cargador Portátil",
    imgProduct: "/productos-img.png",
    priceProduct: 29.99,
    description: "Powerbank de 10.000mAh con carga rápida.",
    brand: "VoltCharge",
    categoriesProduct: [placeholderCategories[2]],
  },
];
