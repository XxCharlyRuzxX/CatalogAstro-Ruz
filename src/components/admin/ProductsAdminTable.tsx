import type { Product } from "@/lib/interfaces";
import { productService } from "@/lib/service/productService";
import { IconButton } from "@mui/material";
import { DataGrid, type GridColDef} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { esES } from "@mui/x-data-grid/locales";
import { Colors } from "@/utils/colors";


export default function ProductsAdminTable() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchAllProducts = async () => {
    const products = await productService.getAll();
    setProducts(products);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "nameProduct",
      headerClassName: 'super-app-theme--header',
      headerName: "Nombre del Producto",
      flex: 2,
    },
    {
      field: "brand",
      headerClassName: 'super-app-theme--header',
      headerName: "Marca",
      flex: 1,
    },
    {
      field: "priceProduct",
      headerName: "Precio",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      valueFormatter: (value?: number) => {
        if (value == null) {
          return '$0.00';
        }
        return `$${value.toFixed(2)}`;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerClassName: 'super-app-theme--header',
      flex: 1,
      sortable: false,
      renderCell: () => (
        <div className="flex items-center justify-center w-full h-full gap-2">
          <IconButton aria-label="editar" size="small">
            <img
              src="/icons/edit.svg"
              alt="Editar"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </IconButton>
          <IconButton aria-label="eliminar" size="small">
            <img
              src="/icons/delete.svg"
              alt="Eliminar"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
  <div className="fixed bottom-10 left-10 z-50">
    <button
      className="group flex items-center rounded-xl bg-blue-500 overflow-hidden transition-all duration-300 ease-in-out w-10 h-10 sm:w-12 sm:h-12 hover:w-42 sm:hover:w-48 px-2 sm:px-3 shadow-lg"
    >
      <img
        src="/icons/add.svg"
        alt="Actualizar"
        className="w-6 h-6 transition-all duration-300 ease-in-out"
      />
      <span
        className="ml-2 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
      >
        <p className="text-[0.75rem] md:text-[0.875rem]">Añadir producto</p>
      </span>
    </button>
  </div>
    <div style={{ height: 650, width: "100%" }} className="md:p-[2rem]">
      <DataGrid
      sx={{
        '& .super-app-theme--header': {
          backgroundColor: "#333333",
          color: Colors.white,
          '& .MuiDataGrid-sortIcon, & .MuiDataGrid-iconSeparator, & .MuiSvgIcon-root': {
            color: Colors.white,
          },
        },
        "& .MuiDataGrid-row": {
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        },
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
        },
      }}
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      rows={products}
      columns={columns}
      getRowId={(row) => row.idProduct}
      pageSizeOptions={[10, 20, 50]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      disableRowSelectionOnClick
      />
    </div>
      </>
  );
}
